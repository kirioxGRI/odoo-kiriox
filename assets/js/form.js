/* ===================================================================
   FORMULARIO — checkboxes de áreas y envío por WhatsApp / correo
   =================================================================== */
(function () {
  'use strict';

  const cfg     = window.KirioxConfig || {};
  const sendBtn = document.getElementById('sendBtn');
  const formOk  = document.getElementById('formOk');
  if (!sendBtn || !formOk) return;

  /* ---------- Checkboxes de áreas ---------- */
  document.querySelectorAll('#areas .check').forEach(lbl => {
    const box = lbl.querySelector('input');
    if (box) box.addEventListener('change', () => lbl.classList.toggle('on', box.checked));
  });

  /* ---------- Utilidades ---------- */
  const val = id => {
    const el = document.getElementById(id);
    return el ? (el.value || '').trim() : '';
  };

  const esc = s => String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const mostrar = (tipo, html) => {
    formOk.className = `form-ok show ${tipo}`;
    formOk.innerHTML = html;
  };

  /* ---------- Envío ---------- */
  sendBtn.addEventListener('click', () => {
    const empresa = val('f_empresa');
    const nombre  = val('f_nombre');
    const email   = val('f_email');
    const tel     = val('f_tel');
    const users   = val('f_users');
    const actual  = val('f_actual');
    const areas   = [...document.querySelectorAll('#areas input:checked')].map(c => c.value);

    if (!empresa || !nombre || !email) {
      mostrar('error', 'Faltan datos: completa <b>Empresa</b>, <b>Contacto</b> y <b>Correo</b> para enviar tu solicitud.');
      return;
    }

    const msg =
`Hola Kiriox, quiero solicitar un assessment de Odoo.

Empresa: ${empresa}
Contacto: ${nombre}
Correo: ${email}
WhatsApp/Tel: ${tel || '—'}
Usuarios estimados: ${users}
Sistema actual: ${actual}
Áreas de interés: ${areas.length ? areas.join(', ') : '—'}`;

    const wa   = `https://wa.me/${cfg.WHATSAPP}?text=${encodeURIComponent(msg)}`;
    const mail = `mailto:${cfg.EMAIL}?subject=${encodeURIComponent('Solicitud de assessment Odoo — ' + empresa)}&body=${encodeURIComponent(msg)}`;

    window.open(wa, '_blank', 'noopener');

    mostrar('ok',
      `¡Listo, ${esc(nombre)}! Abrimos WhatsApp con tu solicitud. Si no se abrió, ` +
      `<a href="${esc(wa)}" target="_blank" rel="noopener">toca aquí</a> o escríbenos por ` +
      `<a href="${esc(mail)}">correo</a>.`);
  });
})();
