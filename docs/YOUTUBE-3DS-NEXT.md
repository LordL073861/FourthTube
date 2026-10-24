# YouTube 3DS Next

YouTube 3DS Next conserva el cliente nativo FourthTube como base compatible con libctru/Citro2D y añade un backend independiente en `backend/` para cuentas y sincronización. La reproducción usa únicamente fuentes autorizadas; no se descargan vídeos ni se eluden controles de acceso.

## Estado actual

- Cliente nativo existente: búsqueda, navegación, historial y reproductor heredado de FourthTube.
- Backend inicial: Next.js App Router, Better Auth con email/contraseña y endpoint `/api/v1/health`.
- Persistencia Neon: tablas de sesión/cuenta y tablas de biblioteca, preferencias y suscripciones.
- CI: workflow reproducible que recupera submódulos, ejecuta `make` y publica únicamente artefactos de una compilación correcta.

## Límites verificados

La compilación y reproducción en una Old 2DS física requieren hardware y toolchain devkitPro; no se declara verificación física desde CI. CIA requiere herramientas de empaquetado y claves de firma configuradas fuera del repositorio, por lo que el workflow no fabrica un CIA falso.

## Backend

`cd backend && npm run dev` inicia el backend. Configure `DATABASE_URL` y `BETTER_AUTH_SECRET` mediante el entorno de Vercel. El endpoint de salud es `GET /api/v1/health`.
