# 06 — implementation-roadmap.md

Proyecto: **Propi**
Versión: **v0.1**
Fecha: **2026-03-09**

---

# 1. Objetivo del Documento

Este documento define el **plan de implementación del MVP de Propi**.

El objetivo es dividir el desarrollo en **lotes pequeños y ejecutables** que permitan:

- construir el sistema de forma ordenada
- reducir errores de implementación
- facilitar el trabajo con agentes como Codex
- validar el sistema paso a paso

Cada lote debe producir un resultado funcional verificable.

## Estado actual del roadmap

Al 2026-03-12 el repositorio ya tiene cerrada la base de proyecto y quedó saneado para continuar con implementación auditable:

- Lote 1: base del proyecto listo
- Lote 2: siguiente lote recomendado
- Lote 3: contrato y migración inicial creados, falta validación aplicada sobre entorno local y conexión desde UI

---

# 2. Estrategia de Desarrollo

La implementación del MVP sigue estos principios:

- construir primero la **infraestructura base**
- después la **autenticación**
- luego el **modelo de datos**
- finalmente las **funcionalidades del producto**

Esto evita bloqueos técnicos y simplifica el desarrollo.

---

# 3. Resumen de Lotes

El MVP se divide en **6 lotes principales**.

| Lote   | Objetivo                 |
| ------ | ------------------------ |
| Lote 1 | Base del proyecto        |
| Lote 2 | Sistema de autenticación |
| Lote 3 | Base de datos            |
| Lote 4 | Registro de propinas     |
| Lote 5 | Dashboard                |
| Lote 6 | Historial                |

---

# 4. Lote 1 — Base del Proyecto

## Objetivo

Crear la estructura base del proyecto y configurar las herramientas principales.

---

## Tareas

1. Crear proyecto Next.js
2. Configurar App Router
3. Configurar TypeScript
4. Instalar cliente de Supabase
5. Crear estructura inicial de carpetas
6. Configurar variables de entorno
7. Crear cliente Supabase

---

## Resultado esperado

Debe existir una aplicación que:

- compila correctamente
- puede conectarse a Supabase
- tiene estructura de carpetas clara

## Estado

Completado.

---

## Estructura inicial esperada

```text
/app
/components
/lib
/types
/docs
```

---

# 5. Lote 2 — Autenticación

## Objetivo

Implementar el sistema de autenticación de usuarios.

---

## Tareas

1. Configurar Supabase Auth
2. Crear pantalla **login**
3. Crear pantalla **registro**
4. Implementar login con email y password
5. Implementar registro de usuario
6. Manejar sesión activa
7. Proteger rutas privadas
8. Implementar logout

---

## Rutas a implementar

```text
/login
/register
```

---

## Resultado esperado

Un usuario debe poder:

- crear una cuenta
- iniciar sesión
- cerrar sesión
- acceder a la app autenticado

## Estado

Pendiente. Este es el siguiente lote recomendado.

---

# 6. Lote 3 — Base de Datos

## Objetivo

Implementar el esquema de base de datos definido en `docs/03-database-schema.md`.

---

## Tareas

1. Crear tabla `tips`
2. Definir columnas:

- id
- user_id
- amount
- created_at
- updated_at

3. Crear clave primaria
4. Crear foreign key hacia `auth.users`
5. Agregar restricción `amount > 0`
6. Crear índices necesarios
7. Activar Row Level Security
8. Implementar políticas RLS

---

## Resultado esperado

La base de datos debe permitir:

- insertar propinas
- consultar propinas
- aislar datos por usuario

## Estado

En preparación. El repo ya incluye una migración inicial versionada en `supabase/migrations/20260312094000_001_init_tips.sql`, pero falta ejecutarla y verificarla en el entorno local.

---

# 7. Lote 4 — Registro de Propinas

## Objetivo

Implementar la funcionalidad central del producto: registrar propinas.

---

## Tareas

1. Crear pantalla `/add`
2. Crear formulario para monto
3. Validar monto
4. Insertar registro en tabla `tips`
5. Manejar errores
6. Redirigir al dashboard después de guardar

---

## Resultado esperado

Un usuario autenticado puede:

- registrar una propina
- verla guardada en la base de datos

---

# 8. Lote 5 — Dashboard

## Objetivo

Mostrar un resumen de propinas del usuario.

---

## Tareas

1. Crear pantalla `/`
2. Consultar propinas del usuario
3. Calcular totales:

- hoy
- semana
- mes

4. Mostrar los totales en tarjetas
5. Crear botón para registrar propina
6. Crear botón para ver historial

---

## Resultado esperado

El usuario puede ver:

- cuánto hizo hoy
- cuánto hizo esta semana
- cuánto hizo este mes

---

# 9. Lote 6 — Historial

## Objetivo

Permitir al usuario ver todas sus propinas registradas.

---

## Tareas

1. Crear pantalla `/history`
2. Consultar propinas del usuario
3. Ordenar por fecha descendente
4. Mostrar lista de registros
5. Mostrar monto y hora

---

## Resultado esperado

El usuario puede:

- ver todas sus propinas
- revisar registros pasados

---

# 10. Lote 7 — Pulido del MVP

## Objetivo

Mejorar experiencia y estabilidad del sistema.

---

## Tareas

1. Mejorar UI mobile
2. Mejorar feedback de acciones
3. Manejo de estados de carga
4. Manejo de errores
5. Ajustes visuales
6. Pruebas de flujo completo

---

# 11. Criterios de MVP Terminado

El MVP se considera completo cuando:

- el usuario puede registrarse
- el usuario puede iniciar sesión
- el usuario puede registrar propinas
- el dashboard muestra totales
- el historial funciona
- la seguridad RLS está activa
- la app funciona correctamente en móvil

---

# 12. Flujo de Construcción Recomendado

Orden recomendado para Codex:

```text
1 → base del proyecto
2 → autenticación
3 → base de datos
4 → registrar propina
5 → dashboard
6 → historial
7 → pulido
```

Este orden minimiza dependencias y reduce errores.

---

# 13. Validación del Sistema

Después de implementar todos los lotes, se deben probar los siguientes flujos:

### Flujo completo

```text
crear cuenta
↓
iniciar sesión
↓
registrar propina
↓
ver total en dashboard
↓
ver historial
```

---

# 14. Principio Final

El objetivo del roadmap no es construir una aplicación compleja.

El objetivo es construir **una herramienta simple, usable y rápida**.

El MVP de Propi debe poder desarrollarse en poco tiempo y validarse rápidamente con usuarios reales.

La prioridad siempre debe ser:

**simplicidad + velocidad + utilidad real.**
