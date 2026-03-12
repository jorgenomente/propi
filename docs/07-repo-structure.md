# 07 — repo-structure.md

Proyecto: **Propi**
Versión: **v0.1**
Fecha: **2026-03-09**

---

# 1. Objetivo del Documento

Este documento define la **estructura oficial del repositorio** para el proyecto **Propi**.

El objetivo es:

- mantener una organización clara del código
- evitar duplicación de lógica
- facilitar el trabajo con Codex
- permitir crecimiento futuro sin romper la estructura inicial

La estructura debe mantenerse **simple y predecible**.

---

# 2. Principios de Organización

La estructura del repositorio debe seguir estos principios:

### 1. Separación clara de responsabilidades

Cada carpeta debe tener un propósito claro.

### 2. Simplicidad

El MVP no necesita estructuras complejas.

### 3. Escalabilidad

Debe permitir agregar funcionalidades futuras sin reorganizar todo el proyecto.

### 4. Convenciones consistentes

Nombres de carpetas y archivos deben ser consistentes.

---

# 3. Estructura General del Proyecto

La estructura base del proyecto debe ser la siguiente:

```text
propi/

app/
components/
lib/
types/
styles/
docs/
public/
e2e/

package.json
tsconfig.json
next.config.js
playwright.config.ts
.env.local
README.md
```

---

# 4. Carpeta `/app`

Contiene las **rutas del sistema** utilizando el **App Router de Next.js**.

---

## Estructura esperada

```text
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
```

---

# 5. Grupo `(auth)`

Contiene las pantallas públicas relacionadas con autenticación.

```text
(auth)/
login/
register/
```

---

## `/login`

Pantalla para iniciar sesión.

Archivo principal:

```text
page.tsx
```

Responsabilidades:

- formulario de login
- conexión con Supabase Auth
- redirección al dashboard

---

## `/register`

Pantalla para crear cuenta.

Archivo principal:

```text
page.tsx
```

Responsabilidades:

- formulario de registro
- creación de usuario
- redirección al dashboard

---

# 6. Grupo `(private)`

Contiene todas las rutas que requieren usuario autenticado.

```text
(private)/
```

---

## `/`

Dashboard principal.

Archivo:

```text
page.tsx
```

Responsabilidades:

- mostrar totales
- acceso rápido a registrar propina
- acceso a historial

---

## `/add`

Pantalla para registrar una propina.

Archivo:

```text
page.tsx
```

Responsabilidades:

- formulario simple
- insertar propina
- redirigir al dashboard

---

## `/history`

Pantalla de historial.

Archivo:

```text
page.tsx
```

Responsabilidades:

- mostrar lista de propinas
- ordenar por fecha

---

# 7. Carpeta `/components`

Contiene **componentes reutilizables de interfaz**.

Estructura sugerida:

```text
components/

ui/
   Button.tsx
   Card.tsx
   Input.tsx

tips/
   TipForm.tsx
   TipListItem.tsx
   TipSummaryCard.tsx

layout/
   Header.tsx
```

---

## `/components/ui`

Componentes básicos de UI reutilizables.

Ejemplos:

- botones
- inputs
- tarjetas

---

## `/components/tips`

Componentes específicos de la funcionalidad de propinas.

Ejemplos:

### TipForm

Formulario para registrar propina.

### TipListItem

Elemento de lista para historial.

### TipSummaryCard

Tarjeta para mostrar totales.

---

# 8. Carpeta `/e2e`

Contiene pruebas end-to-end de smoke y flujos criticos.

Estructura inicial:

```text
e2e/
  auth.smoke.spec.ts
```

Responsabilidades:

- validar redirects de auth
- validar registro
- validar login y logout

---

# 9. Carpeta `/lib`

Contiene utilidades y lógica de infraestructura.

Estructura sugerida:

```text
lib/
  tips.ts

supabase/
   client.ts
   server.ts

queries/
   tips.ts

utils/
   formatCurrency.ts
   dateHelpers.ts
```

---

## `/lib/supabase`

Configuración del cliente Supabase.

Archivos esperados:

```text
client.ts
server.ts
```

Responsabilidades:

- crear cliente Supabase
- manejar sesión
- conexión con base de datos

## `/lib/tips.ts`

Centraliza consultas simples y formateo para:

- resumen de dashboard
- historial
- helpers de moneda y fecha

---

## `/lib/queries`

Contiene funciones para interactuar con la base de datos.

Ejemplo:

```text
tips.ts
```

Funciones esperadas:

- crear propina
- obtener historial
- obtener totales

---

## `/lib/utils`

Funciones utilitarias.

Ejemplos:

```text
formatCurrency.ts
dateHelpers.ts
```

---

# 10. Carpeta `/types`

Contiene **tipos TypeScript compartidos**.

Estructura sugerida:

```text
types/

database.types.ts
tip.ts
```

---

## `database.types.ts`

Tipos generados desde Supabase.

---

## `tip.ts`

Tipo del modelo de propina.

Ejemplo:

```ts
export interface Tip {
  id: string;
  user_id: string;
  amount: number;
  created_at: string;
  updated_at: string;
}
```

---

# 11. Carpeta `/styles`

Contiene estilos globales.

Ejemplo:

```text
styles/

globals.css
```

Si se usa Tailwind, esta carpeta puede mantenerse mínima.

---

# 12. Carpeta `/docs`

Contiene toda la documentación del proyecto.

Estructura esperada:

```text
docs/

01-product-brief.md
02-system-architecture.md
03-database-schema.md
04-rls-policies.md
05-pantallas-y-flujos.md
06-implementation-roadmap.md
07-repo-structure.md
```

Esta carpeta funciona como **fuente de verdad del proyecto**.

---

# 13. Carpeta `/public`

Contiene archivos estáticos.

Ejemplos:

```text
public/

logo.svg
favicon.ico
```

---

# 14. Variables de Entorno

Archivo:

```text
.env.local
```

Variables esperadas:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Estas variables permiten conectar el frontend con Supabase.

---

# 15. Archivo `README.md`

Debe contener:

- descripción del proyecto
- instrucciones de instalación
- instrucciones de desarrollo

---

# 16. Reglas para Codex

Codex debe respetar las siguientes reglas:

1. no crear carpetas adicionales innecesarias
2. no duplicar lógica en múltiples lugares
3. usar `/components` para UI reutilizable
4. usar `/lib` para lógica e infraestructura
5. mantener rutas dentro de `/app`
6. mantener documentación dentro de `/docs`
7. mantener el proyecto simple

---

# 17. Criterios de Correctitud

La estructura será considerada correcta si:

- las rutas están dentro de `/app`
- los componentes están en `/components`
- la lógica de datos está en `/lib`
- los tipos están en `/types`
- la documentación está en `/docs`

La estructura debe ser **clara incluso para un desarrollador que vea el proyecto por primera vez**.

---

# 18. Conclusión

La estructura del repositorio de Propi debe mantenerse **simple, clara y organizada**.

Una estructura pequeña bien organizada es preferible a una arquitectura compleja innecesaria.

La prioridad del proyecto es:

**velocidad de desarrollo + claridad del código + facilidad de mantenimiento.**
