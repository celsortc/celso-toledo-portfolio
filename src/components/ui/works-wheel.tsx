import * as React from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  title: string;
  image: string;
  href: string;
  description: string;
  kind: string;
  status: string;
  technologies: string[];
  notes: string[];
  imageLabel: string;
}
export interface WorksWheelProps {
  items: WorksWheelItem[];
  label: string;
  action: string;
  detailsLabel: string;
  hint: string;
  previousLabel: string;
  nextLabel: string;
  className?: string;
}

// Geometry from the supplied wheel. Two works start as a drum, without a sparse ring.
const CARD_RATIO = 1.45;
const STEP = 40;
const DRUM = 2.22;
const LENS = 2.7;
const BOW = 1.82;
const EASE = 0.12;
const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));
const rad = (angle: number) => (angle * Math.PI) / 180;

function ProjectCopy({
  item,
  action,
  detailsLabel,
}: {
  item: WorksWheelItem;
  action: string;
  detailsLabel: string;
}) {
  return (
    <>
      <p className="project-meta">
        <span>{item.kind}</span>
        <span className="status-dot" aria-hidden="true" />
        <span>{item.status}</span>
      </p>
      <h3>{item.title}</h3>
      <p className="project-description">{item.description}</p>
      <ul className="tech-list">
        {item.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <a
        className="project-link"
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {action}
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
      <details>
        <summary>{detailsLabel}</summary>
        {item.notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </details>
    </>
  );
}

export function WorksWheel({
  items,
  label,
  action,
  detailsLabel,
  hint,
  previousLabel,
  nextLabel,
  className,
}: WorksWheelProps) {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  const tabsRef = React.useRef<(HTMLButtonElement | null)[]>([]);
  const selectRef = React.useRef<(index: number, instant?: boolean) => void>(
    () => {},
  );
  const [active, setActive] = React.useState(0);
  const [animated, setAnimated] = React.useState(false);
  const [stage, setStage] = React.useState({ w: 0, h: 0 });
  const last = Math.max(0, items.length - 1);
  const instance = React.useId().replace(/:/g, "");

  React.useEffect(() => {
    const query = window.matchMedia(
      "(min-width:1024px) and (min-height:700px) and (prefers-reduced-motion:no-preference)",
    );
    const read = () =>
      setAnimated(
        query.matches && document.documentElement.dataset.motion !== "reduced",
      );
    read();
    query.addEventListener("change", read);
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    return () => {
      query.removeEventListener("change", read);
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (!animated || !stageRef.current) return;
    const el = stageRef.current;
    const measure = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  const metrics = React.useMemo(() => {
    const cardW = Math.min(stage.h * 0.42 * CARD_RATIO, stage.w * 0.46);
    const cardH = cardW / CARD_RATIO;
    return {
      cardW,
      cardH,
      drumR: cardH * DRUM,
      bow: cardH * BOW,
      depth: cardH * LENS,
    };
  }, [stage]);

  React.useEffect(() => {
    if (!animated || !stage.h || !hostRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    let frame = 0,
      turn = 0,
      target = 0,
      previous = -1,
      disposed = false;
    const paint = () => {
      frame = 0;
      const gap = target - turn;
      turn = Math.abs(gap) < 0.0005 ? target : turn + gap * EASE;
      if (Math.abs(target - turn) < 0.0005) turn = target;
      if (wheelRef.current)
        wheelRef.current.style.transform = `translateZ(${-metrics.drumR}px)`;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const distance = i - turn,
          angle = distance * STEP;
        const bow = -metrics.bow * (1 - Math.cos(rad(angle)));
        card.style.transform = `translateX(${bow}px) rotateX(${angle}deg) translateZ(${metrics.drumR}px)`;
        card.style.opacity = Math.abs(distance) > 1.6 ? "0" : "1";
        card.style.zIndex = String(Math.round(100 - Math.abs(distance) * 2));
      });
      const near = clamp(Math.round(turn), 0, last);
      if (near !== previous) {
        previous = near;
        setActive(near);
      }
      if (Math.abs(target - turn) > 0.0005 && !disposed)
        frame = requestAnimationFrame(paint);
    };
    const schedule = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(paint);
    };
    const trigger = ScrollTrigger.create({
      trigger: hostRef.current,
      start: "top 104px",
      end: "bottom bottom",
      onUpdate: (self) => {
        target = self.progress * last;
        schedule();
      },
      onRefresh: (self) => {
        target = self.progress * last;
        turn = target;
        schedule();
      },
    });
    selectRef.current = (next, instant = false) => {
      next = clamp(next, 0, last);
      if (instant) {
        turn = next;
        target = next;
        schedule();
      }
      window.scrollTo({
        top:
          trigger.start +
          (trigger.end - trigger.start) * (last ? next / last : 0),
        behavior: instant ? "instant" : "smooth",
      });
    };
    target = trigger.progress * last;
    turn = target;
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      trigger.kill();
      selectRef.current = () => {};
    };
  }, [animated, stage.h, metrics, last]);

  if (!items.length) return null;
  if (!animated)
    return (
      <div className={cn("works-static", className)} aria-label={label}>
        {items.map((item) => (
          <article className="project" key={item.title}>
            <div className="works-static-cover">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                width="1200"
                height="828"
              />
              <p>{item.imageLabel}</p>
            </div>
            <div className="project-copy">
              <ProjectCopy
                item={item}
                action={action}
                detailsLabel={detailsLabel}
              />
            </div>
          </article>
        ))}
      </div>
    );

  return (
    <div className={cn("works-scroll", className)} ref={hostRef}>
      <section ref={stageRef} className="works-stage" aria-label={label}>
        <div className="works-index" role="tablist" aria-label={label}>
          {items.map((item, i) => (
            <button
              key={item.title}
              ref={(node) => {
                tabsRef.current[i] = node;
              }}
              type="button"
              role="tab"
              id={`${instance}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${instance}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={(event) => selectRef.current(i, event.detail === 0)}
              onKeyDown={(event) => {
                const direction =
                  event.key === "ArrowRight"
                    ? 1
                    : event.key === "ArrowLeft"
                      ? -1
                      : 0;
                if (direction) {
                  event.preventDefault();
                  const next = clamp(i + direction, 0, last);
                  selectRef.current(next, true);
                  tabsRef.current[next]?.focus({ preventScroll: true });
                }
              }}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div
          className="works-description project-copy"
          id={`${instance}-panel`}
          role="tabpanel"
          aria-labelledby={`${instance}-tab-${active}`}
        >
          <ProjectCopy
            item={items[active]}
            action={action}
            detailsLabel={detailsLabel}
          />
        </div>
        <div
          className="works-lens"
          style={{ perspective: `${metrics.depth}px` }}
          aria-hidden="true"
        >
          <div ref={wheelRef} className="works-drum">
            {items.map((item, i) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                tabIndex={-1}
                className="works-drum-card"
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                  pointerEvents: i === active ? "auto" : "none",
                }}
              >
                <img
                  src={item.image}
                  alt=""
                  draggable={false}
                  width="1200"
                  height="828"
                />
              </a>
            ))}
          </div>
        </div>
        <div className="works-controls">
          <p>{hint}</p>
          <div>
            <button
              type="button"
              disabled={active === 0}
              aria-label={previousLabel}
              onClick={(event) =>
                selectRef.current(active - 1, event.detail === 0)
              }
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              disabled={active === last}
              aria-label={nextLabel}
              onClick={(event) =>
                selectRef.current(active + 1, event.detail === 0)
              }
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
        <p className="works-image-label">{items[active].imageLabel}</p>
      </section>
    </div>
  );
}
export default WorksWheel;
