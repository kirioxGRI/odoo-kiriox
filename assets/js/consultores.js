/* ===================================================================
   CONSULTORES — render de tarjetas con avatar y enlace a WhatsApp
   =================================================================== */
(function () {
  'use strict';

  const grid = document.getElementById('consGrid');
  const lista = window.KirioxConsultores || [];
  if (!grid || !lista.length) return;

  const esc = s => String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  /* Iniciales para el avatar generado: "Karla Sepúlveda" → "KS" */
  const iniciales = nombre => nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0].toUpperCase())
    .join('');

  const saludo = nombre =>
    `Hola ${nombre}, vengo de la web de Kiriox y quiero conversar sobre Odoo para mi empresa.`;

  const frag = document.createDocumentFragment();

  lista.forEach((c, idx) => {
    const wa = `https://wa.me/${c.wa}?text=${encodeURIComponent(saludo(c.nombre))}`;
    const avatar = c.foto
      ? `<img src="${esc(c.foto)}" alt="Foto de ${esc(c.nombre)}" loading="lazy">`
      : `<span aria-hidden="true">${esc(iniciales(c.nombre))}</span>`;

    const card = document.createElement('article');
    card.className = 'ccard';
    card.innerHTML = `
      <div class="cavatar av-${(idx % 3) + 1}">${avatar}</div>
      <h3>${esc(c.nombre)}</h3>
      <p class="crol">${esc(c.rol)}</p>
      <p class="czona">${esc(c.zona)}</p>
      <a class="ctel mono" href="tel:+${esc(c.wa)}">${esc(c.tel)}</a>
      <a class="btn btn-primary cbtn" href="${esc(wa)}" target="_blank" rel="noopener">
        Escribir por WhatsApp →
      </a>`;
    frag.appendChild(card);
  });

  grid.appendChild(frag);
})();
