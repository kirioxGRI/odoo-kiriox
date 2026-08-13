# Despliegue en Cloudflare Pages

Sitio estático puro: **no hay build, no hay dependencias**. Cloudflare solo tiene que copiar
los archivos tal como están en la raíz del repositorio.

## Opción A — Conectar el repositorio (recomendada)

Cada `git push` a `main` publica automáticamente; cada rama y Pull Request genera una URL de
vista previa.

1. En el panel de Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**.
2. Elige el repositorio `kirioxGRI/odoo-kiriox` y la rama de producción `main`.
3. Configuración de compilación:

   | Campo | Valor |
   |---|---|
   | Framework preset | **None** |
   | Build command | *(vacío)* |
   | Build output directory | **`/`** |
   | Root directory | *(vacío)* |

4. **Save and Deploy**. En menos de un minuto queda en `https://<proyecto>.pages.dev`.

## Opción B — Publicar desde la terminal

Sin conectar Git, útil para una prueba rápida:

```bash
npx wrangler login
npx wrangler pages deploy . --project-name=kiriox-landing
```

## Después del primer despliegue

### 1. Dominio propio
**Custom domains → Set up a domain** e ingresa el dominio (ej. `kiriox.com`). Si el DNS ya está
en Cloudflare, el registro se crea solo; si no, te indica el CNAME a configurar. El certificado
TLS se emite automáticamente.

### 2. Actualizar el dominio en el código
Tres archivos tienen `https://kiriox.com` como marcador de posición. Reemplázalo por el dominio
real antes de indexar el sitio:

```bash
# desde la raíz del proyecto
sed -i 's|https://kiriox.com|https://TU-DOMINIO.com|g' index.html robots.txt sitemap.xml
```

Afecta a: `<link rel="canonical">`, las etiquetas `og:url` y `og:image`, el `Sitemap:` de
`robots.txt` y el `<loc>` de `sitemap.xml`.

### 3. Datos de contacto reales
`assets/js/config.js` tiene el WhatsApp que recibe el formulario (`18296389999`) y el correo
`hola@kiriox.com`. Verifica que ambos sean los definitivos.

## Qué hace cada archivo de configuración

| Archivo | Función |
|---|---|
| `_headers` | Cabeceras de seguridad (CSP estricta, nosniff, Referrer-Policy) y política de caché: el HTML se revalida siempre, los estáticos se cachean 24 h. |
| `_redirects` | `301` desde el nombre viejo `kiriox-odoo-partner.html` y atajos `/assessment`, `/consultoras`, `/modulos`. |
| `robots.txt` | Permite la indexación y apunta al sitemap. |
| `sitemap.xml` | Una sola URL; actualiza `<lastmod>` en cambios importantes de contenido. |

### Sobre la CSP
La política de `_headers` no permite `'unsafe-inline'`: **no agregues atributos `style="..."`
ni `<script>` o `<style>` incrustados en el HTML**, porque el navegador los bloqueará. Todo
estilo va en `assets/css/` y todo script en `assets/js/`. Los únicos dominios externos
permitidos son `fonts.googleapis.com` (hojas de estilo) y `fonts.gstatic.com` (fuentes).

Si más adelante se agrega analítica, hay que añadir su dominio a `script-src` y `connect-src`.
Web Analytics de Cloudflare se inyecta automáticamente y requiere sumar
`https://static.cloudflareinsights.com` a `script-src`.

## Probar en local antes de publicar

Abrir `index.html` con doble clic funciona, pero **no aplica `_headers` ni `_redirects`**. Para
verificar el sitio tal como se servirá en producción:

```bash
npx wrangler pages dev .
```

## Verificación rápida post-despliegue

- [ ] Se ve el logo en el encabezado y el favicon en la pestaña.
- [ ] El carrusel de módulos muestra las 30 tarjetas y avanza solo.
- [ ] Las tres consultoras aparecen con su foto y su botón abre WhatsApp.
- [ ] El formulario, con Empresa/Contacto/Correo llenos, abre WhatsApp hacia `18296389999`.
- [ ] `https://TU-DOMINIO.com/kiriox-odoo-partner.html` redirige a la raíz.
- [ ] La consola del navegador no reporta violaciones de CSP.
