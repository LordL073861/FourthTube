# YouTube 3DS Next

YouTube 3DS Next conserva el cliente nativo FourthTube como base compatible con libctru/Citro2D y añade un backend independiente en `backend/` para cuentas y sincronización. La reproducción usa únicamente fuentes autorizadas; no se descargan vídeos ni se eluden controles de acceso.

## Estado actual

- Cliente nativo existente: búsqueda, navegación, historial y reproductor heredado de FourthTube.
- Backend inicial: Next.js App Router, Better Auth con email/contraseña y endpoints versionados `/api/v1/health`, `/api/v1/library` y `/api/v1/subscriptions`.
- Persistencia Neon: tablas de sesión/cuenta y tablas de biblioteca, preferencias y suscripciones.
- CI: workflow reproducible que recupera submódulos, ejecuta `make` y publica únicamente artefactos de una compilación correcta.

## Límites verificados

La compilación y reproducción en una Old 2DS física requieren hardware y toolchain devkitPro; no se declara verificación física desde CI. CIA requiere herramientas de empaquetado y claves de firma configuradas fuera del repositorio, por lo que el workflow no fabrica un CIA falso.

## Backend

`cd backend && npm run dev` inicia el backend. Configure `DATABASE_URL` y `BETTER_AUTH_SECRET` mediante el entorno de Vercel. El endpoint de salud es `GET /api/v1/health`. Las rutas de biblioteca y suscripciones requieren una sesión Better Auth y validan el cuerpo JSON con Zod: `GET/POST /api/v1/library` y `GET/POST /api/v1/subscriptions`. Todas las consultas se filtran por el usuario de la sesión; no se aceptan identificadores de usuario desde el cliente.
