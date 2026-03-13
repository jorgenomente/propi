# 05 — pantallas-y-flujos.md

Proyecto: **Propi**
Versión: **v0.1**
Fecha: **2026-03-09**

---

# 1. Objetivo del Documento

Este documento define las **pantallas del sistema y los flujos de usuario del MVP** de Propi.

El objetivo es:

- definir exactamente qué pantallas existen
- especificar qué información contiene cada una
- definir cómo navega el usuario entre ellas
- eliminar ambigüedades para la implementación

El diseño de la aplicación debe seguir siempre estos principios:

- simplicidad extrema
- rapidez de uso
- mobile-first
- mínimo número de pasos

Registrar una propina debe tomar **menos de 5 segundos**.

---

# 2. Estructura General de Pantallas

La base actual de **Propi** contiene **7 pantallas principales**.

## Pantallas públicas

- Iniciar sesión
- Crear cuenta

## Pantallas privadas

- Dashboard (pantalla principal)
- Registrar propina
- Editar propina
- Historial de propinas
- Estadisticas

---

# 3. Mapa General de Navegación

```
            ┌───────────────┐
            │ Crear cuenta  │
            └───────┬───────┘
                    │
                    │
            ┌───────▼───────┐
            │ Iniciar sesión│
            └───────┬───────┘
                    │
                    │ autenticación
                    │
            ┌───────▼───────┐
            │   Dashboard   │
            └───┬───────┬───┘
                │       │
                │       │
        ┌───────▼───┐ ┌─▼─────────┐
        │ Registrar │ │ Historial │
        │ propina   │ │           │
        └───────────┘ └─────┬─────┘
                            │
                     ┌──────▼──────┐
                     │ Editar      │
                     │ propina     │
                     └──────┬──────┘
                            │
                     ┌──────▼──────┐
                     │ Estadisticas│
                     └─────────────┘
```

El **Dashboard es el centro de la aplicación**.

---

# 4. Pantalla 1 — Iniciar sesión

## Ruta

```
/login
```

## Objetivo

Permitir que el usuario acceda a su cuenta personal.

---

## Elementos de la pantalla

### Título

```
Bienvenido de nuevo
```

---

### Campo de correo electrónico

Input:

```
Correo electrónico
```

---

### Campo de contraseña

Input:

```
Contraseña
```

---

### Botón principal

```
Iniciar sesión
```

Acción:

- autenticar usuario usando Supabase Auth

---

### Enlace secundario

```
Crear cuenta
```

Navega a:

```
/register
```

---

## Comportamiento esperado

Si el login es exitoso:

```
redirigir → /
```

---

# 5. Pantalla 2 — Crear cuenta

## Ruta

```
/register
```

---

## Objetivo

Permitir que un nuevo usuario cree una cuenta para utilizar Propi.

---

## Elementos

### Título

```
Crear cuenta
```

---

### Campo correo electrónico

```
Correo electrónico
```

---

### Campo contraseña

```
Contraseña
```

---

### Botón principal

```
Crear cuenta
```

Acción:

- registrar usuario en Supabase Auth

---

### Enlace secundario

```
¿Ya tienes cuenta? Iniciar sesión
```

Navega a:

```
/login
```

---

## Comportamiento esperado

Después del registro:

- crear sesión automáticamente
- redirigir al usuario a:

```
/
```

---

# 6. Pantalla 3 — Dashboard

## Ruta

```
/
```

---

## Objetivo

Mostrar al usuario un **resumen rápido de sus propinas**.

El usuario debe poder ver su situación en **menos de 2 segundos**.

---

# 6.1 Layout General

```
---------------------------------
Propi

Propinas de hoy
$85

Propinas esta semana
$420

Propinas este mes
$1320

[ Registrar propina ]

[ Ver historial ]

---------------------------------
```

---

# 6.2 Elementos

### Encabezado

```
Propi
```

Opcional:

```
Cerrar sesión
```

---

### Tarjeta — Hoy

Mostrar:

```
Propinas de hoy
```

Ejemplo:

```
$85
```

---

### Tarjeta — Esta semana

Mostrar:

```
Propinas esta semana
```

Ejemplo:

```
$420
```

---

### Tarjeta — Este mes

Mostrar:

```
Propinas este mes
```

Ejemplo:

```
$1320
```

---

### Botón principal

```
Registrar propina
```

Acción:

```
navegar → /add
```

---

### Botón secundario

```
Historial
```

Acción:

```
navegar → /history
```

---

# 7. Pantalla 4 — Registrar propina

## Ruta

```
/add
```

---

## Objetivo

Permitir registrar una propina **de forma extremadamente rápida**.

El proceso completo debe tomar **menos de 5 segundos**.

---

# 7.1 Layout

```
Registrar propina

Monto

[ 20 ]

[ Guardar propina ]
```

---

# 7.2 Elementos

### Título

```
Registrar propina
```

---

### Campo monto

Campo numérico.

Ejemplo:

```
20
```

Comportamiento:

- acepta numeros enteros
- formatea miles con punto mientras el usuario escribe

---

### Campo fecha de la propina

Campo tipo fecha.

Comportamiento:

- usa la fecha actual por defecto
- permite registrar una propina atrasada con su dia real
- no permite fechas futuras

---

### Validaciones

El campo debe cumplir:

- obligatorio
- número válido
- mayor que 0

---

### Botón principal

```
Guardar propina
```

Acción:

- insertar registro en la tabla `tips`
- persistir `tip_date` como fecha efectiva del negocio

---

# 7.3 Comportamiento después de guardar

Después de guardar una propina:

```
redirigir → /
```

Esto permite que el usuario vea inmediatamente los nuevos totales actualizados.

---

# 8. Pantalla 5 — Historial

## Ruta

```
/history
```

---

## Objetivo

Permitir al usuario revisar todas sus propinas registradas.

---

# 8.1 Layout

```
Historial

9 Marzo
$20
$10
$5

8 Marzo
$15
$10
```

---

# 8.2 Elementos

### Título

```
Historial
```

---

### Lista de propinas

Cada registro muestra:

```
monto
hora
```

Ejemplo:

```
$20 — 21:34
$10 — 20:10
```

---

### Orden

Ordenadas por:

```
tip_date DESC, created_at DESC
```

Más reciente primero.

Ademas:

- el agrupado principal usa el dia real de la propina
- la hora visible sigue saliendo de `created_at`

---

### Botón volver

```
Volver
```

Acción:

```
navegar → /
```

---

# 8.3 Pantalla 6 — Estadisticas

## Ruta

```
/stats
```

## Objetivo

Permitir al usuario explorar sus propinas por rango de fechas y revisar detalle diario sin salir de su cuenta.

## Elementos

- presets rapidos:
  - Ultimos 7 dias
  - Este mes
  - Mes anterior
- filtro personalizado:
  - desde
  - hasta
- resumen del rango:
  - total
  - cantidad
  - promedio por dia
- tabla diaria
- detalle por jornada

## Contrato funcional

- fuente principal: `tips`
- filtro de negocio: `tip_date`
- orden del detalle: `created_at desc`

---

# 8.4 Pantalla 7 — Editar propina

## Ruta

```text
/edit/[id]
```

## Objetivo

Permitir corregir una propina cargada con monto o fecha equivocada, o eliminarla si no debe existir.

## Elementos

- formulario con:
  - monto
  - fecha de la propina
- botón `Guardar cambios`
- acción destructiva `Eliminar propina`

## Contrato funcional

- fuente principal: `tips`
- lookup por `id`
- actualización de negocio sobre:
  - `amount`
  - `tip_date`
- eliminación del registro dentro del mismo tenant

---

# 9. Flujos de Usuario

---

# 9.1 Flujo — Crear cuenta

```
Crear cuenta
↓
Registrar usuario
↓
Sesión creada
↓
Dashboard
```

---

# 9.2 Flujo — Iniciar sesión

```
Iniciar sesión
↓
Autenticación
↓
Dashboard
```

---

# 9.3 Flujo — Registrar propina

```
Dashboard
↓
Registrar propina
↓
Ingresar monto
↓
Guardar
↓
Dashboard actualizado
```

---

# 9.4 Flujo — Ver historial

```
Dashboard
↓
Historial
↓
Lista de propinas
```

---

# 9.5 Flujo — Ver estadisticas

```
Dashboard o Historial
↓
Estadisticas
↓
Elegir preset o rango
↓
Ver resumen diario y detalle por jornada
```

---

# 9.6 Flujo — Corregir o eliminar propina

```text
Historial
↓
Editar
↓
Cambiar monto o fecha
↓
Guardar cambios

o

Eliminar propina
↓
Historial actualizado
```

---

# 10. Reglas de UX Importantes

Codex debe respetar estas reglas:

### 1 — mínimo número de clics

Registrar una propina debe requerir **máximo 2 acciones**.

---

### 2 — interfaz limpia

No agregar:

- filtros
- configuraciones
- tabs innecesarios

---

### 3 — optimizado para móvil

Los botones deben ser grandes y fáciles de presionar.

---

### 4 — feedback inmediato

Después de registrar una propina, el usuario debe ver los totales actualizados inmediatamente.

---

# 11. Componentes Reutilizables

Se recomienda crear componentes reutilizables simples.

### TarjetaResumenPropinas

Usada en:

- hoy
- semana
- mes

---

### ItemPropina

Usado en:

- historial

---

### BotonPrincipal

Botón reutilizable para acciones principales.

---

# 12. Datos necesarios por pantalla

| Pantalla          | Datos necesarios                          |
| ----------------- | ----------------------------------------- |
| Dashboard         | totales calculados por `tip_date`         |
| Registrar propina | alta de propina con fecha real            |
| Editar propina    | detalle de `tip` por `id`                 |
| Historial         | lista de propinas agrupada por `tip_date` |
| Estadisticas      | rango, resumen diario y detalle por dia   |

---

# 13. Consultas necesarias

### Dashboard

Necesita consultar:

- total hoy
- total semana
- total mes

---

### Historial

Consulta base:

```
select *
from tips
where user_id = auth.uid()
order by tip_date desc, created_at desc
```

### Estadisticas

Consulta base:

- filtrar por `tip_date`
- agrupar por dia
- ordenar el detalle por `created_at desc`

---

# 14. Criterios de Correctitud

La implementación será correcta si:

- el usuario puede crear cuenta
- el usuario puede iniciar sesión
- el usuario puede registrar propinas
- el dashboard muestra totales
- el historial muestra registros
- la aplicación funciona correctamente en móvil
- el flujo es rápido y simple

---

# 15. Conclusión

El diseño de pantallas de Propi debe mantenerse deliberadamente minimalista.

La base operativa actual necesita:

- autenticación
- dashboard
- registro de propinas
- historial
- estadisticas iniciales

El éxito del producto dependerá de:

**simplicidad + rapidez de uso + claridad de los datos.**
