10 — first-build-task-for-codex.md

Nota de estado: este documento queda como referencia histórica del arranque del repo. El estado operativo actual vive en `docs/06-implementation-roadmap.md` y en `AGENTS.md`.

Proyecto: Propi
Versión: v0.1
Fecha: 2026-03-09

1. Objetivo de Esta Tarea

Este documento define la primera tarea de implementación para Codex.

El objetivo es iniciar la construcción del proyecto Propi implementando el Lote 1 — Base del proyecto, siguiendo estrictamente los documentos dentro de /docs.

Codex debe actuar como implementador disciplinado, no como diseñador del producto.

2. Contexto del Proyecto

Propi es una aplicación web simple para que camareros puedan:

registrar propinas

ver totales diarios

ver totales semanales

ver totales mensuales

revisar historial

El proyecto utiliza el stack:

Next.js

TypeScript

Supabase

PostgreSQL

Supabase Auth

Row Level Security

Toda la arquitectura del proyecto está documentada en:

/docs 3. Documentos que Codex Debe Leer Primero

Antes de escribir código, Codex debe revisar:

/docs/01-product-brief.md
/docs/02-system-architecture.md
/docs/06-implementation-roadmap.md
/docs/07-repo-structure.md

Estos documentos definen:

alcance del MVP

arquitectura

estructura del repositorio

orden de implementación

4. Tarea a Ejecutar

Codex debe implementar Lote 1 — Base del proyecto.

Este lote consiste en preparar la infraestructura inicial del proyecto.

5. Pasos de Implementación

Codex debe realizar las siguientes acciones.

Paso 1 — Crear proyecto Next.js

Inicializar proyecto con:

Next.js

TypeScript

App Router

El proyecto debe ser configurado para desarrollo moderno.

Paso 2 — Instalar dependencias necesarias

Instalar como mínimo:

npm install @supabase/supabase-js

Opcional:

npm install clsx

No instalar librerías innecesarias.

Paso 3 — Crear estructura del repositorio

La estructura inicial debe coincidir con lo definido en:

docs/07-repo-structure.md

Estructura mínima esperada:

app/
components/
lib/
types/
styles/
docs/
public/
Paso 4 — Crear estructura de rutas

Dentro de /app crear:

app/

(auth)/
login/
page.tsx

register/
page.tsx

(private)/
page.tsx

add/
page.tsx

history/
page.tsx

Estas páginas pueden comenzar como placeholders simples.

Paso 5 — Configurar cliente Supabase

Crear carpeta:

lib/supabase

Crear archivos:

client.ts
server.ts

El cliente debe leer las variables de entorno:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
Paso 6 — Crear archivo .env.local.example

Este archivo debe contener:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

No incluir valores reales.

Paso 7 — Crear estilos base

Crear carpeta:

styles/

Archivo:

styles/globals.css

Configurar estilos mínimos para layout simple.

Paso 8 — Crear componentes base

Dentro de:

components/ui

Crear componentes iniciales:

Button.tsx
Card.tsx
Input.tsx

Estos pueden ser simples wrappers de HTML para empezar.

Paso 9 — Crear README inicial

Crear archivo:

README.md

Debe incluir:

descripción del proyecto

stack tecnológico

instrucciones básicas de instalación

6. Resultado Esperado

Después de completar esta tarea, el proyecto debe tener:

estructura clara de carpetas

proyecto Next.js funcionando

rutas creadas

cliente Supabase configurado

variables de entorno definidas

componentes base creados

La aplicación debe compilar sin errores.

7. Qué NO Debe Hacer Codex

Codex NO debe todavía:

implementar lógica de autenticación

crear tablas de base de datos

implementar RLS

crear consultas SQL

implementar dashboard

implementar registro de propinas

implementar historial

agregar librerías innecesarias

crear backend custom

Estas tareas pertenecen a lotes posteriores.

8. Validación de la Implementación

Antes de terminar esta tarea, Codex debe verificar:

el proyecto compila

la estructura del repo coincide con repo-structure.md

las rutas existen

el cliente Supabase está configurado

no hay errores de TypeScript

9. Entregable Esperado

El resultado de esta tarea debe ser:

proyecto base funcionando

estructura del repo completa

rutas creadas

dependencias instaladas

cliente Supabase listo para usar

Este entregable corresponde a:

Lote 1 — Base del proyecto 10. Instrucción Final para Codex

Implementa únicamente Lote 1.

No avances a funcionalidades del producto.

Cuando termines:

revisa que todo compile

revisa que la estructura del repo sea correcta

confirma que el proyecto está listo para comenzar el siguiente lote.

La prioridad es:

estructura clara + proyecto funcional + base limpia para continuar el desarrollo.
