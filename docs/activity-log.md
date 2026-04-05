# Activity Log

## 2026-04-04 22:28:38 -0300 | Lote: 2026-04-04-dashboard-tighten-01 | Tipo: ui

- Descripcion: simplificacion del dashboard quitando el bloque `Foco actual`, hero con copy mas directo, CTA de estadisticas mucho mas visible, montos compactos en la tendencia de 7 dias para evitar solapes, limpieza de texto secundario y refuerzo de la microanimacion del boton flotante de agregar propina.
- Archivos afectados: app/(private)/dashboard-shell.tsx, components/tips/floating-add-tip-button.tsx, app/globals.css, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK.
- Commit hash: pendiente

## 2026-04-04 22:20:13 -0300 | Lote: 2026-04-04-dashboard-interactive-01 | Tipo: ui

- Descripcion: rediseño interactivo del dashboard con tarjetas clicables para cambiar el foco entre hoy/semana/mes, feedback visual al volver desde `/add`, tendencia simple de 7 dias, bloque de ultimo movimiento y lista de actividad reciente, manteniendo el alcance del MVP.
- Archivos afectados: app/(private)/page.tsx, app/(private)/dashboard-shell.tsx, app/(private)/add/actions.ts, app/globals.css, lib/tips.ts, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK.
- Commit hash: pendiente

## 2026-04-04 19:46:26 -0300 | Lote: 2026-04-04-stats-redesign-01 | Tipo: ui

- Descripcion: rediseño de `/stats` para priorizar lectura visual rapida con hero de totales, barras por semana y por mes, ranking de dias mas fuertes y detalle reciente mas compacto; tambien se extendio `lib/tips.ts` con agregaciones reutilizables por periodo.
- Archivos afectados: app/(private)/stats/page.tsx, lib/tips.ts, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK.
- Commit hash: pendiente

## 2026-04-04 12:38:53 -0300 | Lote: 2026-04-04-performance-01 | Tipo: ui

- Descripcion: optimizacion de apertura inicial mediante diferimiento del banner PWA y FAB del layout privado, reduccion del trabajo del dashboard para no leer todo el historial en cada carga, y ajuste del `proxy` para no procesar assets con extension.
- Archivos afectados: app/(private)/layout.tsx, app/(private)/page.tsx, components/tips/private-route-chrome.tsx, lib/tips.ts, proxy.ts, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK.
- Commit hash: pendiente

## 2026-04-04 12:57:04 -0300 | Lote: 2026-04-04-share-01 | Tipo: ui

- Descripcion: agregue un botón de compartir Propi vía WhatsApp en el dashboard para que el usuario pueda abrir fácilmente WhatsApp y enviar el enlace de la app.
- Archivos afectados: app/(private)/page.tsx, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: pendiente.
- Commit hash: pendiente

## 2026-03-12 09:29:55 -0300 | Lote: 2026-03-12-git-cierre-01 | Tipo: infra

- Descripcion: validacion previa al cierre del lote, registro operativo obligatorio y preparacion de commit/push de todos los cambios pendientes.
- Archivos afectados: docs/prompts.md, docs/activity-log.md, repositorio completo segun `git status --short`.
- Resultado de tests: `npm run lint` OK; `npm run build` OK.
- Commit hash: `de9ba7c`

## 2026-03-12 09:34:58 -0300 | Lote: 2026-03-12-saneamiento-01 | Tipo: docs

- Descripcion: saneamiento de nombres canónicos de documentos, corrección de referencias operativas, limpieza de `AGENTS.md` y creación de migración inicial versionada para `tips` con RLS.
- Archivos afectados: AGENTS.md, docs/\*.md, docs/09-initial-sql-schema.sql, supabase/migrations/20260312094000_001_init_tips.sql, supabase/seed.sql.
- Resultado de tests: `npm run lint` OK; `npm run build` OK; `npx supabase db reset` OK; verificacion SQL OK (`tips` creada, RLS enabled/forced, 4 policies creadas, SELECT permitido=1 y denegado=0 en prueba con rollback).
- Commit hash: `b0952ed`

## 2026-03-12 09:45:00 -0300 | Lote: 2026-03-12-auth-01 | Tipo: ui

- Descripcion: implementacion de autenticacion MVP con `/login`, `/register`, logout SSR, proteccion de rutas privadas via middleware y smoke E2E minima de auth.
- Archivos afectados: app/(auth)/_, app/(private)/_, app/auth/logout/route.ts, components/auth/logout-form.tsx, lib/supabase/middleware.ts, proxy.ts, e2e/auth.smoke.spec.ts, playwright.config.ts, docs/06-implementation-roadmap.md, docs/07-repo-structure.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK; `npx playwright test` OK.
- Commit hash: `7b1ace2`

## 2026-03-12 09:52:28 -0300 | Lote: 2026-03-12-deploy-01 | Tipo: infra

- Descripcion: correccion de build SSR separando `buttonVariants` a un modulo compartido no cliente y despliegue de preview en Vercel con tarball reducido para evitar `FUNCTION_PAYLOAD_TOO_LARGE`.
- Archivos afectados: components/ui/button.tsx, components/ui/button-variants.ts, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK; deploy Vercel OK (`status: BUILDING`, `deploymentId: dpl_536Yxrr3PY4W5rU7qhgX2T6DEBdL`).
- Commit hash: `7b1ace2`

## 2026-03-12 10:00:00 -0300 | Lote: 2026-03-12-cierre-02 | Tipo: infra

- Descripcion: reemplazo de `middleware.ts` por `proxy.ts` para alinearse con Next.js 16 y cierre conjunto de auth + deploy en un unico commit/push.
- Archivos afectados: proxy.ts, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK; `npx playwright test` OK; warning de `middleware` eliminado.
- Commit hash: `7b1ace2`

## 2026-03-12 10:08:00 -0300 | Lote: 2026-03-12-tips-01 | Tipo: ui

- Descripcion: implementacion de registro real de propinas en `/add`, conexion del dashboard a totales de `tips`, historial real por fecha y ampliacion de la smoke E2E para cubrir alta de propina.
- Archivos afectados: app/(private)/add/\*, app/(private)/page.tsx, app/(private)/history/page.tsx, lib/tips.ts, e2e/auth.smoke.spec.ts, docs/06-implementation-roadmap.md, docs/07-repo-structure.md, docs/prompts.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK; `npx playwright test` OK.
- Commit hash: `7f740bb`

## 2026-03-12 09:59:38 -0300 | Lote: 2026-03-12-deploy-prod-01 | Tipo: infra

- Descripcion: despliegue productivo con `npx vercel --prod` sobre `jorgenomentes-projects/propi`; el CLI alcanzo la fase `Deploying outputs...` y la URL productiva ya responde desde Vercel.
- Archivos afectados: docs/prompts.md, docs/activity-log.md.
- Resultado de tests: deploy productivo iniciado OK; URL `https://propi-4v4v4256c-jorgenomentes-projects.vercel.app` responde `HTTP 401`, consistente con proteccion de acceso del proyecto en Vercel.
- Commit hash: `3c7e566`

## 2026-03-12 10:26:21 -0300 | Lote: 2026-03-12-deploy-prod-02 | Tipo: infra

- Descripcion: configuracion de `turbopack.root` para fijar el workspace root correcto antes del siguiente despliegue productivo.
- Archivos afectados: next.config.ts, app/globals.css, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK sin warning de lockfiles; `npx vercel --prod` OK; alias productivo asignado a `https://propi-jade.vercel.app`; verificacion manual del usuario OK en local y prod luego de quitar imports CSS de paquetes.
- Commit hash: 3bf797d

## 2026-03-12 11:58:42 -0300 | Lote: 2026-03-12-polish-01 | Tipo: ui

- Descripcion: cierre del pulido MVP con estados `loading` para auth y privadas, error boundary recuperable en privadas, feedback accesible en formularios, empty state reforzado en dashboard y smoke E2E ampliada con escenarios de error.
- Archivos afectados: app/(auth)/auth-form.tsx, app/(auth)/login/page.tsx, app/(auth)/register/page.tsx, app/(auth)/loading.tsx, app/(private)/page.tsx, app/(private)/add/tip-form.tsx, app/(private)/loading.tsx, app/(private)/error.tsx, e2e/auth.smoke.spec.ts, docs/prompts.md, docs/06-implementation-roadmap.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK; `npx playwright test` OK.
- Commit hash: 1204627

## 2026-03-12 12:05:00 -0300 | Lote: 2026-03-12-mvp-close-01 | Tipo: docs

- Descripcion: cierre formal del MVP en la documentacion del repo y explicitacion de la fase siguiente como iteracion sobre la base ya implementada.
- Archivos afectados: docs/01-product-brief.md, docs/06-implementation-roadmap.md, docs/11-mvp-release-checklist.md, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: no aplica por tratarse de un lote solo de documentacion.
- Commit hash: 118b2b8

## 2026-03-12 12:27:51 -0300 | Lote: 2026-03-12-redesign-01 | Tipo: ui

- Descripcion: adopcion visual del design system de `diseno/` en la app MVP mediante nuevos tokens teal/surface, reestilado de primitives y rediseño de auth, dashboard, registro de propina e historial, manteniendo la logica existente.
- Archivos afectados: app/globals.css, app/(auth)/_, app/(private)/_, components/auth/\_, components/ui/button-variants.ts, components/ui/card.tsx, components/ui/input.tsx, tsconfig.json, eslint.config.mjs, e2e/auth.smoke.spec.ts, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK; `npx playwright test` OK. `diseno/` se excluyo de lint/build para conservarlo como referencia y no como parte ejecutable del producto.
- Commit hash: 9e4baf5

## 2026-03-12 12:39:51 -0300 | Lote: 2026-03-12-redesign-close-01 | Tipo: infra

- Descripcion: cierre en git y despliegue productivo de la iteracion visual del MVP con la nueva direccion UI.
- Archivos afectados: docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `git push origin main` OK; `npx vercel --prod` OK; alias productivo actualizado a `https://propi-jade.vercel.app`.
- Commit hash: 60471c5

## 2026-03-12 13:51:25 -0300 | Lote: 2026-03-12-stats-tipdate-01 | Tipo: schema

- Descripcion: incorporacion de `tip_date` como fecha efectiva de negocio, soporte para cargar propinas atrasadas con su dia real, nueva pantalla `/stats` con presets y rango personalizado, y ajuste de dashboard/historial para resumir por fecha efectiva en lugar de `created_at`.
- Archivos afectados: supabase/migrations/20260312130500_002_add_tip_date.sql, app/(private)/add/\*, app/(private)/page.tsx, app/(private)/history/page.tsx, app/(private)/stats/page.tsx, app/(private)/layout.tsx, components/tips/\*, lib/tips.ts, e2e/auth.smoke.spec.ts, docs/03-database-schema.md, docs/05-pantallas-y-flujos.md, docs/06-implementation-roadmap.md, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK; `npx playwright test` OK; `npx supabase db reset` OK.
- Commit hash: pendiente

## 2026-03-12 14:15:17 -0300 | Lote: 2026-03-12-auth-seed-01 | Tipo: infra

- Descripcion: correccion del warning de `defaultValue` en el formulario de auth mediante remount del campo email y reemplazo del seed SQL roto por un flujo correcto de usuario demo local via Auth admin API (`scripts/seed-demo-auth.mjs`).
- Archivos afectados: app/(auth)/auth-form.tsx, supabase/seed.sql, scripts/seed-demo-auth.mjs, package.json, docs/09.1-supabase-setup.md, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK; `npx supabase db reset` OK; `npm run db:seed:auth-demo` OK; verificacion de login demo OK.
- Commit hash: pendiente

## 2026-03-13 10:32:28 -0300 | Lote: 2026-03-13-tips-edit-01 | Tipo: ui

- Descripcion: incorporacion de pantalla `/edit/[id]` para corregir monto y fecha de una propina existente, mas eliminacion explicita desde la misma vista y acceso de entrada desde historial.
- Archivos afectados: app/(private)/add/tip-form.tsx, app/(private)/edit/[id]/\_, app/(private)/history/page.tsx, lib/tips.ts, e2e/auth.smoke.spec.ts, docs/05-pantallas-y-flujos.md, docs/06-implementation-roadmap.md, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK; `npx playwright test` OK.
- Commit hash: pendiente

## 2026-03-13 10:48:24 -0300 | Lote: 2026-03-13-dashboard-ux-01 | Tipo: ui

- Descripcion: ajuste de UX en dashboard y captura rapida; `Registros` ahora navega a `/history`, se elimina el bloque `Estado`, y se quita `Cerrar sesion` de `/add` para reducir ruido en ese punto del flujo.
- Archivos afectados: app/(private)/page.tsx, app/(private)/add/page.tsx, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: pendiente.
- Commit hash: pendiente

## 2026-03-13 11:02:09 -0300 | Lote: 2026-03-13-install-banner-01 | Tipo: ui

- Descripcion: incorporacion de banner de instalacion en rutas privadas con CTA para agregar Propi a pantalla de inicio, modal de instrucciones para iPhone/Android y uso de `beforeinstallprompt` en Android Chrome cuando el navegador lo permite.
- Archivos afectados: components/pwa/install-app-banner.tsx, app/(private)/layout.tsx, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: pendiente.
- Commit hash: pendiente

## 2026-03-13 11:22:30 -0300 | Lote: 2026-03-13-private-ux-polish-01 | Tipo: ui

- Descripcion: refinamiento de UX en rutas privadas; dashboard con topbar que concentra marca, usuario y cierre de sesion; remocion de acciones redundantes de logout fuera del inicio; limpieza de copy duplicado en `/add`; y aclaracion en dashboard de que historial tambien permite editar registros.
- Archivos afectados: app/(private)/add/page.tsx, app/(private)/edit/[id]/page.tsx, app/(private)/history/page.tsx, app/(private)/page.tsx, app/(private)/stats/page.tsx, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK.
- Commit hash: pendiente

## 2026-03-13 12:01:24 -0300 | Lote: 2026-03-13-install-modal-scroll-01 | Tipo: ui

- Descripcion: correccion del modal de instrucciones para agregar Propi a la pantalla de inicio, habilitando scroll interno real en mobile para que todo el contenido quede accesible.
- Archivos afectados: components/pwa/install-app-banner.tsx, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK.
- Commit hash: pendiente

## 2026-04-04 21:49:36 -0300 | Lote: 2026-04-04-stats-data-integrity-01 | Tipo: ui

- Descripcion: correccion de integridad en lecturas de propinas para usuarios con muchos registros; `lib/tips.ts` ahora pagina todas las consultas para evitar recortes silenciosos, el snapshot del dashboard calcula semana/mes desde la fecha minima realmente necesaria, y `/stats` abre sobre todo el historial con acceso explicito a ese preset.
- Archivos afectados: lib/tips.ts, app/(private)/stats/page.tsx, app/(private)/page.tsx, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK.
- Commit hash: pendiente

## 2026-04-04 22:06:00 -0300 | Lote: 2026-04-04-add-page-cleanup-01 | Tipo: ui

- Descripcion: eliminacion del card informativo `Registro directo` en `/add` para dejar la pantalla enfocada solo en la captura de la propina.
- Archivos afectados: app/(private)/add/page.tsx, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK.
- Commit hash: pendiente

## 2026-04-04 22:18:00 -0300 | Lote: 2026-04-04-floating-add-cta-01 | Tipo: ui

- Descripcion: refuerzo visual del boton flotante principal con texto siempre visible y halo sutil para destacar que agregar propina es la accion central de la app.
- Archivos afectados: components/tips/floating-add-tip-button.tsx, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK.
- Commit hash: pendiente

## 2026-04-04 22:24:00 -0300 | Lote: 2026-04-04-floating-add-motion-01 | Tipo: ui

- Descripcion: incorporacion de una microanimacion periodica al CTA flotante de agregar propina para reforzar su prioridad visual sin volverlo invasivo y respetando reduced motion.
- Archivos afectados: app/globals.css, components/tips/floating-add-tip-button.tsx, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK.
- Commit hash: pendiente
