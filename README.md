# Landing Kiriox · Partner de Odoo (RD)

Landing estática, sin build ni dependencias. Se abre directo con doble clic o se sirve como archivos estáticos.

**Despliegue:** Cloudflare Pages — ver [DEPLOY.md](DEPLOY.md).

## Estructura

```
index.html                   Marcado de la página (secciones comentadas)
_headers · _redirects        Configuración de Cloudflare Pages
robots.txt · sitemap.xml     SEO
assets/
  css/
    tokens.css               Paleta, tipografías y medidas (variables CSS)
    base.css                 Reset, tipografía, utilidades y bandas
    components.css           Marca, botones y chips reutilizables
    header.css               Barra superior fija
    hero.css                 Hero + cluster de tiles
    value.css                Propuesta de valor
    modulos.css              Carrusel de módulos
    precios.css              Tarjetas de precios
    kiriox.css               "Por qué Kiriox" + panel DGII
    assessment.css           Formulario y mensajes
    consultores.css          Tarjetas de consultoras + avatares
    footer.css               Pie
  js/
    config.js                WhatsApp, correo y ritmo del carrusel  ← EDITAR AQUÍ
    modulos.data.js          Catálogo de módulos (datos)
    consultores.data.js      Consultoras y sus números (datos)      ← EDITAR AQUÍ
    carousel.js              Render + navegación + autoavance
    consultores.js           Render de tarjetas de consultoras
    form.js                  Validación y envío por WhatsApp / correo
    contacto.js              Enlaces de contacto del pie
  img/
    isotipo-positivo.svg     Logo para fondo claro (encabezado + favicon)
    isotipo-negativo.svg     Logo para fondo oscuro (pie)
    karla.png · anita.png · rubi.png        Fotos originales
    *-avatar.jpg                            Recortes cuadrados usados en las tarjetas
    og-cover.jpg                            Imagen al compartir el enlace (1200×630)
```

> **Sin estilos ni scripts incrustados.** La CSP de producción bloquea `style="..."`,
> `<style>` y `<script>` dentro del HTML. Todo estilo va en `assets/css/` y todo
> script en `assets/js/`.

## Metodología en la página

La sección de assessment presenta el mecanismo completo —**Assessment inicial → Roadmap →
Discovery detallado → Implementación**— para posicionar el assessment como puerta de entrada
a la metodología, no como una promoción. El primer paso lleva la insignia "sin costo".

Los scripts se cargan con `defer` en orden: `config` → `modulos.data` → el resto.
Cada módulo JS es un IIFE que sale sin error si su sección no está en el DOM.

## Paleta

| Rol | Color |
|---|---|
| Base principal | `#FFFFFF` |
| Gris de apoyo | `#F2F3F4` |
| Azul profundo (titulares, pie, panel) | `#02066F` |
| Azul vivo (acento, foco, destacados) | `#2000B1` |
| Naranja (llamados a la acción) | `#ED4B00` |

Todo se controla desde `assets/css/tokens.css`: cambiar un token propaga el cambio a toda la página.

## Tareas comunes

- **Cambiar el WhatsApp que recibe el formulario o el correo:** `assets/js/config.js`.
- **Agregar, quitar o editar una consultora:** `assets/js/consultores.data.js`. El campo `wa` debe ir en
  formato internacional y solo dígitos (ej. `18293937869`); `tel` es lo que ve el visitante.
- **Cambiar la foto de una consultora:** los avatares usan recortes cuadrados optimizados
  (`assets/img/*-avatar.jpg`), generados a partir de las fotos originales del mismo directorio.
  Para reemplazar una, guarda un recorte cuadrado del rostro (mínimo 240×240 px, los ojos a
  ~40 % de la altura) con el mismo nombre. Si el campo `foto` queda vacío, la tarjeta vuelve
  automáticamente a las iniciales sobre un degradado de marca.
- **Agregar o quitar un módulo del carrusel:** `assets/js/modulos.data.js` (el contador se actualiza solo).
- **Ajustar colores:** `assets/css/tokens.css`.
- **Reemplazar el logo:** sustituye `assets/img/isotipo-positivo.svg` (fondo claro) y
  `assets/img/isotipo-negativo.svg` (fondo oscuro) conservando los nombres; el encabezado,
  el pie y el favicon apuntan a esas dos rutas.
- **Nota sobre emojis:** evita los emojis de bandera (🇩🇴, 🇨🇴). Windows no los dibuja y se ven
  como las letras "DO" / "CO".
- **Agregar una sección:** crea `assets/css/<seccion>.css`, enlázalo en el `<head>` y usa `.band-paper` o `.band-mist` para alternar el fondo.
