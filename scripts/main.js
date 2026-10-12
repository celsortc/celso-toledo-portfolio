import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  gsap.registerPlugin(ScrollTrigger);
  function updateMotionButton() {
    document.documentElement.dataset.motion =
      paused || reducedMotion.matches ? "reduced" : "enabled";
    const key = reducedMotion.matches
      ? "motionReduced"
      : paused
        ? "motionOn"
        : "motionOff";
    motionButton.dataset.i18n = key;
    motionButton.textContent = translate(key);
    motionButton.disabled = reducedMotion.matches;
    motionButton.setAttribute(
      "aria-pressed",
      String(paused || reducedMotion.matches),
    );
  }
  function configureMotion() {
    motionContext?.revert();
    motionContext = undefined;
    updateMotionButton();
    if (paused || reducedMotion.matches) return;
    motionContext = gsap.matchMedia();
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
    refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
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
