/* ===================================================================
   CARRUSEL — render de tarjetas, navegación y autoavance
   =================================================================== */
(function () {
  'use strict';

  const carousel = document.getElementById('carousel');
  const modulos  = window.KirioxModulos || [];
  if (!carousel || !modulos.length) return;

  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');
  const carIndex = document.getElementById('carIndex');
  const carTotal = document.getElementById('carTotal');

  /* ---------- Render de tarjetas ---------- */
  const frag = document.createDocumentFragment();
  modulos.forEach((m, idx) => {
    const card = document.createElement('article');
    card.className = 'mcard';
    card.innerHTML = `
      <div class="mhead">
        <div class="mico">${m.i}</div>
        <span class="mnum">${String(idx + 1).padStart(2, '0')}</span>
      </div>
      <h3>${m.n}</h3>
      <p>${m.d}</p>
      <span class="mcat">${m.c}</span>`;
    frag.appendChild(card);
  });
  carousel.appendChild(frag);
  if (carTotal) carTotal.textContent = String(modulos.length).padStart(2, '0');

  /* ---------- Navegación ---------- */
  function step() {
    const card = carousel.querySelector('.mcard');
    if (!card) return 320;
    const gap = parseFloat(getComputedStyle(carousel).gap) || 18;
    return card.getBoundingClientRect().width + gap;
  }

  function updateIndex() {
    if (!carIndex) return;
    const idx = Math.round(carousel.scrollLeft / step()) + 1;
    carIndex.textContent = String(Math.min(idx, modulos.length)).padStart(2, '0');
  }

  if (prevBtn) prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -step(), behavior: 'smooth' }));
  if (nextBtn) nextBtn.addEventListener('click', () => carousel.scrollBy({ left:  step(), behavior: 'smooth' }));
  carousel.addEventListener('scroll', () => window.requestAnimationFrame(updateIndex));

  /* ---------- Autoavance con pausa en interacción ---------- */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const delay  = (window.KirioxConfig && window.KirioxConfig.AUTOPLAY_MS) || 4200;
  let auto = null, paused = false;

  function nearEnd() {
    return carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4;
  }

  function startAuto() {
    if (reduce || auto) return;
    auto = setInterval(() => {
      if (paused) return;
      if (nearEnd()) carousel.scrollTo({ left: 0, behavior: 'smooth' });
      else carousel.scrollBy({ left: step(), behavior: 'smooth' });
    }, delay);
  }

  ['mouseenter', 'focusin', 'pointerdown', 'touchstart']
    .forEach(e => carousel.addEventListener(e, () => { paused = true; }, { passive: true }));
  ['mouseleave', 'focusout']
    .forEach(e => carousel.addEventListener(e, () => { paused = false; }));

  startAuto();
})();
