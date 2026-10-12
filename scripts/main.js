(() => {
  const { translate } = window.portfolioI18n;
  const motionButton = document.querySelector(".motion-toggle");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let paused = false;
  let motionContext;
  let refreshFrame;
  try {
    paused = localStorage.getItem("portfolio-motion") === "paused";
  } catch {
    /* Preferences are optional. */
  }

  document.querySelector("#year").textContent = new Date().getFullYear();

  const menu = document.querySelector("#site-menu");
  const menuToggle = document.querySelector(".menu-toggle");
  const themeToggle = document.querySelector(".theme-toggle");
  let theme = "dark";
  try {
    theme =
      localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark";
  } catch {
    /* Theme preferences are optional. */
  }

  function applyTheme() {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content =
      theme === "dark" ? "#000000" : "#fafafa";
    themeToggle.setAttribute("aria-checked", String(theme === "dark"));
    themeToggle.dataset.i18nAria =
      theme === "dark" ? "themeLight" : "themeDark";
    themeToggle.setAttribute(
      "aria-label",
      translate(themeToggle.dataset.i18nAria),
    );
  }
  applyTheme();
  themeToggle.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    applyTheme();
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* Still works without storage. */
    }
  });

  menuToggle.addEventListener("click", () => {
    menu.showModal();
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  });
  document
    .querySelector(".menu-close")
    .addEventListener("click", () => menu.close());
  menu.addEventListener("close", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
  menu.addEventListener("click", (event) => {
    if (event.target !== menu) return;
    const bounds = menu.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      menu.close();
  });
  menu.querySelectorAll("nav a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.close();
      const target = document.querySelector(link.getAttribute("href"));
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }),
  );

  document.querySelectorAll(".name-line").forEach((line) => {
    const letters = [...line.textContent].map((letter) => {
      const span = document.createElement("span");
      span.className = "name-letter";
      span.textContent = letter;
      return span;
    });
    line.replaceChildren(...letters);
  });

  function prepareTagline() {
    const tagline = document.querySelector(".hero-tagline p");
    const text = translate("heroTagline");
    const parts = text.split(/(\s+)/);
    const wordCount = parts.filter((part) => part.trim()).length;
    let index = 0;
    const fragments = parts.map((part) => {
      if (/^\s+$/.test(part)) return document.createTextNode(part);
      const word = document.createElement("span");
      word.className = "tagline-word";
      word.textContent = part;
      word.style.setProperty("--enter-delay", `${index * 70}ms`);
      word.style.setProperty(
        "--exit-delay",
        `${(wordCount - 1 - index) * 70}ms`,
      );
      index += 1;
      return word;
    });
    const accessibleText = document.createElement("span");
    accessibleText.className = "visually-hidden";
    accessibleText.textContent = text;
    const visualText = document.createElement("span");
    visualText.setAttribute("aria-hidden", "true");
    visualText.append(...fragments);
    tagline.replaceChildren(accessibleText, visualText);
  }
  prepareTagline();

  function updateMotionButton() {
    document.documentElement.dataset.motion =
      paused || reducedMotion.matches ? "reduced" : "enabled";
    const unavailable = !window.gsap || !window.ScrollTrigger;
    const key = reducedMotion.matches
      ? "motionReduced"
      : unavailable
        ? "motionUnavailable"
        : paused
          ? "motionOn"
          : "motionOff";
    motionButton.dataset.i18n = key;
    motionButton.textContent = translate(key);
    motionButton.disabled = reducedMotion.matches || unavailable;
    motionButton.setAttribute(
      "aria-pressed",
      String(paused || reducedMotion.matches),
    );
  }

  function configureMotion() {
    motionContext?.revert();
    motionContext = undefined;
    updateMotionButton();
    if (
      paused ||
      reducedMotion.matches ||
      !window.gsap ||
      !window.ScrollTrigger
    )
      return;

    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    motionContext = gsap.matchMedia();
    motionContext.add("(prefers-reduced-motion: no-preference)", () => {
      // One entrance sequence; the tagline and project copy stay stable.
      gsap.from(".name-letter", {
        opacity: 0,
        y: -20,
        stagger: 0.05,
        duration: 0.5,
        ease: "power3.out",
      });
      const assembly = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
        defaults: { ease: "none" },
      });
      assembly
        .to(".name-line:first-child", { x: -32, y: -20 }, 0)
        .to(".name-line:last-child", { x: 32, y: 20 }, 0)
        .to(".hero-portrait img", { scale: 1.08, y: 10 }, 0);
    });
    motionContext.add(
      "(min-width: 761px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.to(".axis-preview", {
          rotation: 1,
          y: -12,
          ease: "none",
          scrollTrigger: {
            trigger: ".axis-art",
            start: "top 90%",
            end: "bottom 30%",
            scrub: 0.6,
          },
        });
        gsap.to(".inventory-grid", {
          rotation: 2,
          y: -10,
          ease: "none",
          scrollTrigger: {
            trigger: ".doae-art",
            start: "top 90%",
            end: "bottom 30%",
            scrub: 0.6,
          },
        });
      },
    );
  }

  function refreshMotion() {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(() => window.ScrollTrigger?.refresh());
  }

  motionButton.addEventListener("click", () => {
    paused = !paused;
    try {
      localStorage.setItem("portfolio-motion", paused ? "paused" : "enabled");
    } catch {
      /* Keep working without storage. */
    }
    configureMotion();
  });
  reducedMotion.addEventListener("change", configureMotion);
  document.addEventListener("portfolio:languagechange", () => {
    prepareTagline();
    updateMotionButton();
    refreshMotion();
  });
  document
    .querySelectorAll("details")
    .forEach((detail) => detail.addEventListener("toggle", refreshMotion));
  document.fonts?.ready.then(refreshMotion);
  configureMotion();

  document.querySelector(".copy-email").addEventListener("click", async () => {
    const status = document.querySelector(".copy-status");
    try {
      await navigator.clipboard.writeText("celsortc@outlook.com");
      status.textContent = translate("copied");
    } catch {
      const range = document.createRange();
      range.selectNodeContents(document.querySelector(".email-row > a"));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = translate("copyFailed");
    }
  });
})();
