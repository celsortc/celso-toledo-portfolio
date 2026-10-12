(() => {
  const { translate } = window.portfolioI18n;
  const motionButton = document.querySelector('.motion-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  let motionContext;
  let refreshFrame;
  try { paused = localStorage.getItem('portfolio-motion') === 'paused'; } catch { /* Preferences are optional. */ }

  document.querySelector('#year').textContent = new Date().getFullYear();

  function updateMotionButton() {
    const unavailable = !window.gsap || !window.ScrollTrigger;
    const key = reducedMotion.matches ? 'motionReduced' : unavailable ? 'motionUnavailable' : paused ? 'motionOn' : 'motionOff';
    motionButton.dataset.i18n = key;
    motionButton.textContent = translate(key);
    motionButton.disabled = reducedMotion.matches || unavailable;
    motionButton.setAttribute('aria-pressed', String(paused || reducedMotion.matches));
  }

  function configureMotion() {
    motionContext?.revert();
    motionContext = undefined;
    updateMotionButton();
    if (paused || reducedMotion.matches || !window.gsap || !window.ScrollTrigger) return;

    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    motionContext = gsap.matchMedia();
    motionContext.add('(prefers-reduced-motion: no-preference)', () => {
      // The object, rather than the reading surface, carries the motion.
      const sculpture = document.querySelector('.sculpture');
      gsap.from(sculpture, { opacity: 0.4, scale: 0.95, duration: 0.8, ease: 'power3.out' });
      const assembly = gsap.timeline({
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
        defaults: { ease: 'none' }
      });
      assembly.to('.ribbon-front', { x: -120, y: 115, rotation: -8, svgOrigin: '320 310' }, 0)
        .to('.ribbon-back', { x: 140, y: -105, rotation: 8, svgOrigin: '320 310' }, 0)
        .to('.ribbon-middle', { rotation: -4, svgOrigin: '320 310' }, 0)
        .to('.art-orbit', { scale: 0.85, transformOrigin: '50% 50%', opacity: 0.1 }, 0);
    });
    motionContext.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to('.axis-preview', {
        rotation: 1, y: -12, ease: 'none',
        scrollTrigger: { trigger: '.axis-art', start: 'top 90%', end: 'bottom 30%', scrub: 0.6 }
      });
      gsap.to('.inventory-grid', {
        rotation: 2, y: -10, ease: 'none',
        scrollTrigger: { trigger: '.doae-art', start: 'top 90%', end: 'bottom 30%', scrub: 0.6 }
      });
    });
  }

  function refreshMotion() {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(() => window.ScrollTrigger?.refresh());
  }

  motionButton.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('portfolio-motion', paused ? 'paused' : 'enabled'); } catch { /* Keep working without storage. */ }
    configureMotion();
  });
  reducedMotion.addEventListener('change', configureMotion);
  document.addEventListener('portfolio:languagechange', () => { updateMotionButton(); refreshMotion(); });
  document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', refreshMotion));
  document.fonts?.ready.then(refreshMotion);
  configureMotion();

  document.querySelector('.copy-email').addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText('celsortc@outlook.com');
      status.textContent = translate('copied');
    } catch {
      const range = document.createRange();
      range.selectNodeContents(document.querySelector('.email-row > a'));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = translate('copyFailed');
    }
  });
})();
