import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

(() => {
  const controller = new AbortController();
  const listen = (target, event, handler) =>
    target.addEventListener(event, handler, { signal: controller.signal });
  const { translate } = window.portfolioI18n;
  const motionButton = document.querySelector(".motion-toggle");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let paused = false;
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
    updateMotionButton();
    refreshMotion();
  }
  function refreshMotion() {
    if (controller.signal.aborted) return;
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
  }
  listen(motionButton, "click", () => {
    paused = !paused;
    try {
      localStorage.setItem("portfolio-motion", paused ? "paused" : "enabled");
    } catch {
      /* Keep working without storage. */
    }
    configureMotion();
  });
  listen(reducedMotion, "change", configureMotion);
  listen(document, "portfolio:languagechange", () => {
    updateMotionButton();
    refreshMotion();
  });
  document
    .querySelectorAll("details")
    .forEach((detail) => listen(detail, "toggle", refreshMotion));
  document.fonts?.ready.then(refreshMotion);
  configureMotion();
  listen(document.querySelector(".copy-email"), "click", async () => {
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
  import.meta.hot?.dispose(() => {
    controller.abort();
    cancelAnimationFrame(refreshFrame);
  });
})();
