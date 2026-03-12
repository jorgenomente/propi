# Activity Log

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
- Commit hash: pendiente

## 2026-03-12 10:26:21 -0300 | Lote: 2026-03-12-deploy-prod-02 | Tipo: infra

- Descripcion: configuracion de `turbopack.root` para fijar el workspace root correcto antes del siguiente despliegue productivo.
- Archivos afectados: next.config.ts, docs/prompts.md, docs/activity-log.md.
- Resultado de tests: `npm run lint` OK; `npm run build` OK sin warning de lockfiles; `npx vercel --prod` OK; alias productivo asignado a `https://propi-jade.vercel.app`. Verificacion por `curl` no disponible en sandbox por fallo de DNS local (`Could not resolve host`).
- Commit hash: pendiente
