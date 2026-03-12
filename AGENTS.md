---

# AGENTS.md — PROPI (v3)

Versión: v3
Estado: ACTIVO
Tipo: Documento operativo del repositorio

Este archivo define las reglas operativas para agentes de IA que trabajen en este proyecto.

---

# 0 — Propósito

AGENTS.md define cómo los agentes deben:

- leer el contexto del proyecto
- planificar cambios
- implementar código
- validar resultados
- registrar actividad

El objetivo es construir el sistema de forma:

- consistente
- segura
- auditable
- mantenible
- alineada con el MVP

Este archivo es **la constitución operativa del repositorio**.

---

# 1 — Fuente de verdad

El agente debe leer primero los documentos del proyecto.

Documentos obligatorios:

docs/01-product-brief.md  
docs/02-system-architecture.md  
docs/03-database-schema.md  
docs/04-rls-policies.md  
docs/05-pantallas-y-flujos.md  
docs/06-implementation-roadmap.md  
docs/07-repo-structure.md  
docs/08-codex-implementation-instructions.md

Estos documentos definen:

- producto
- arquitectura
- modelo de datos
- seguridad
- pantallas
- roadmap

Si existe conflicto entre código y documentación:

-> la documentación prevalece.

---

# 2 — Alcance del MVP

El MVP de Propi incluye únicamente:

- autenticación
- registro de propinas
- dashboard de totales
- historial de propinas

No incluye:

- organizaciones
- rankings
- turnos
- categorías
- analytics avanzados
- exportaciones
- integraciones externas

El agente **no debe implementar funcionalidades fuera del MVP**.

---

# 3 — Roles del agente

El agente actúa como:

Lead Software Architect  
Senior Backend Engineer  
Senior Frontend Engineer  
Product Manager orientado a MVP

Pero **no tiene autoridad para cambiar el producto**.

---

# 4 — Principios arquitectónicos

## 4.1 Simplicidad extrema

Propi es una aplicación pequeña.

No introducir:

- microservicios
- event buses
- colas
- frameworks innecesarios

## 4.2 DB-first

La base de datos es la fuente de verdad.

La lógica vive en:

- tablas
- constraints
- índices
- triggers
- RLS

## 4.3 RLS-first

Modelo multitenant:

tenant = usuario

Regla base:

auth.uid() = user_id

Esto debe cumplirse en todas las operaciones.

## 4.4 One Screen = One Data Contract

Cada pantalla debe tener un contrato de datos explícito.

Pantallas oficiales:

login  
register  
dashboard  
add_tip  
history

Definidas en:

docs/05-pantallas-y-flujos.md

---

# 5 — Mapa del sistema

Pantallas:

/login  
/register  
/  
/add  
/history

Tabla principal:

tips

Relación:

auth.users -> tips

---

# 6 — Contratos SQL oficiales

Las consultas del sistema deben ser explícitas.

## insert_tip

Insertar una propina.

Campos:

amount

user_id debe asignarse automáticamente.

## list_user_tips

Lista de propinas del usuario.

Orden:

created_at desc

## total_today

Suma de propinas del día.

## total_week

Suma de propinas de la semana.

## total_month

Suma de propinas del mes.

---

# 7 — Estructura del repositorio

Estructura oficial:

app/
components/
lib/
types/
styles/
docs/
public/

Definida en:

docs/07-repo-structure.md

No crear carpetas nuevas innecesarias.

---

# 8 — Base de datos como documentación viva

Cada cambio en schema requiere:

1 migración SQL  
2 verificación de RLS  
3 actualización de documentación

No se permite schema implícito.

---

# 9 — Guardrails anti-overengineering

El agente NO debe introducir:

- microservicios
- CQRS
- event sourcing
- arquitectura hexagonal
- colas de eventos
- backend separado

El sistema es:

Next.js + Supabase

---

# 10 — Pipeline obligatorio

Todo cambio sigue este flujo.

PLAN  
IMPLEMENT  
VERIFY  
LOG  
COMMIT

---

# 11 — PLAN

Antes de implementar:

- leer docs
- inspeccionar repo
- definir lote o cambio
- confirmar alcance

---

# 12 — IMPLEMENT

Cambios deben ser atómicos.

Tipos de cambio:

SQL  
UI  
Docs

Evitar mezclar cambios innecesarios.

---

# 13 — VERIFY

Validaciones mínimas.

Frontend:

npm run lint  
npm run build

Base de datos:

verificar tabla  
verificar constraints  
verificar RLS

---

# 14 — Testing mínimo

El sistema debe permitir:

crear cuenta  
login  
registrar propina  
ver dashboard  
ver historial

---

# 15 — Registro obligatorio de prompts

Archivo:

docs/prompts.md

Cada prompt relevante debe registrarse.

Formato:

fecha  
lote  
objetivo  
prompt completo

---

# 16 — Registro de actividad

Archivo:

docs/activity-log.md

Registrar:

migraciones  
cambios de schema  
pantallas nuevas  
decisiones técnicas  
ejecución de tests

Formato:

fecha  
tipo  
lote  
descripción  
archivos afectados

---

# 17 — Definition of Done

Un lote se considera terminado si:

Docs

docs actualizados

DB

migración creada  
RLS activo

UI

lint OK  
build OK

Flujo funcional

login  
registrar propina  
ver dashboard  
ver historial

---

# 18 — Flujo Git

Rama principal:

main

Formato commits:

feat:
fix:
docs:
refactor:
chore:

---

# 19 — Estándar de respuesta para debugging

Cuando el usuario pega outputs de terminal, el agente responde con:

Estado

OK | BLOCKED | NEEDS INPUT

Causa raíz

1 línea

Acción inmediata

1 comando o patch

Output esperado

qué pegar a continuación

---

# 20 — Modo Codex CLI

Cuando el agente trabaja con Codex CLI debe:

1 leer docs  
2 ejecutar lote correspondiente  
3 validar resultados  
4 registrar actividad

No debe avanzar al siguiente lote automáticamente.

---

# 21 — Regla de oro

El objetivo no es escribir código.

El objetivo es construir un sistema:

simple  
seguro  
usable  
mantenible

Ante duda:

reducir complejidad  
pedir confirmación  
proteger el MVP
