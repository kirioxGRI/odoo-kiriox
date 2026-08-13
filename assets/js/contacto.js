/* ===================================================================
   CONTACTO — enlaces de WhatsApp y correo del pie
   =================================================================== */
(function () {
  'use strict';

  const cfg = window.KirioxConfig || {};
  const wa = document.getElementById('wa_link');
  const mail = document.getElementById('mail_link');

  if (wa && cfg.WHATSAPP) {
    wa.href = `https://wa.me/${cfg.WHATSAPP}`;
    wa.target = '_blank';
    wa.rel = 'noopener';
  }
  if (mail && cfg.EMAIL) {
    mail.href = `mailto:${cfg.EMAIL}`;
  }
})();
