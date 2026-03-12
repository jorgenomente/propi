# 11 — mvp-release-checklist.md

Proyecto: **Propi**
Version: **v0.1**
Estado: **MVP cerrado**
Fecha de cierre: **2026-03-12**

---

# 1. Objetivo

Este documento deja constancia de que el MVP comprometido por la documentacion del repositorio fue implementado, validado y puesto en produccion.

Tambien define el criterio de trabajo a partir de ahora: iterar sobre la base actual, no reconstruirla.

---

# 2. Alcance MVP cerrado

El cierre cubre:

- autenticacion con registro, login y logout
- proteccion de rutas privadas
- registro de propinas en `tips`
- dashboard con totales reales
- historial real por usuario
- RLS activa sobre `public.tips`
- smoke E2E minima de flujos criticos
- despliegue productivo operativo

---

# 3. Checklist de cierre

- [x] `login` implementado
- [x] `register` implementado
- [x] logout implementado
- [x] rutas privadas protegidas
- [x] tabla `tips` creada con migracion versionada
- [x] RLS activa y policies minimas creadas
- [x] formulario `/add` guarda datos reales
- [x] dashboard `/` muestra totales reales
- [x] historial `/history` lista datos reales
- [x] `npm run lint` OK
- [x] `npm run build` OK
- [x] `npx playwright test` OK
- [x] QA manual local OK
- [x] QA manual prod OK
- [x] deploy productivo operativo

---

# 4. Estado operativo actual

El MVP se considera cerrado.

Esto significa:

- la base tecnica actual es la referencia de trabajo
- los siguientes cambios deben tratarse como iteraciones
- cualquier mejora debe justificar impacto real en uso, claridad o confiabilidad

---

# 5. Regla para iteraciones siguientes

Las proximas iteraciones deben priorizar:

1. reducir friccion de uso
2. mejorar claridad visual y feedback
3. endurecer confiabilidad y manejo de errores
4. validar necesidades reales antes de agregar nuevas features

No abrir Post-MVP por inercia.

Primero observar, luego ajustar.
