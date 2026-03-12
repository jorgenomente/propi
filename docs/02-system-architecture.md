# 02 — system-architecture.md

Proyecto: **Propi**  
Versión: **v0.1**  
Fecha: **2026-03-09**

---

# 1. Objetivo del Documento

Este documento define la arquitectura general de **Propi**, una aplicación web simple y multitenant para registro personal de propinas.

El objetivo es establecer una base técnica clara para implementación, mantenimiento y evolución del producto, manteniendo el enfoque en:

- simplicidad
- seguridad
- velocidad de uso
- mobile-first
- aislamiento de datos por usuario

Este documento debe servir como guía de implementación para desarrollo humano y para agentes como Codex.

---

# 2. Resumen Arquitectónico

Propi es una **web app multitenant simple** donde cada usuario autenticado registra y visualiza sus propias propinas.

La arquitectura inicial se basa en:

- **Frontend**: Next.js App Router
- **Backend**: Supabase
- **Base de datos**: PostgreSQL
- **Autenticación**: Supabase Auth
- **Seguridad de acceso**: Row Level Security (RLS)

La aplicación sigue un modelo de aislamiento simple:

**tenant = usuario**

Esto significa que cada usuario funciona como su propio espacio aislado y solo puede acceder a sus registros.

---

# 3. Principios Arquitectónicos

La arquitectura de Propi debe respetar siempre estos principios:

## 3.1 Simplicidad primero

No introducir capas, módulos o patrones innecesarios para un MVP pequeño.

## 3.2 Seguridad en base de datos

La seguridad no depende solo del frontend.  
El aislamiento de datos debe garantizarse con **RLS** en PostgreSQL / Supabase.

## 3.3 Mobile-first

La experiencia principal será desde teléfono móvil.

## 3.4 Flujo rápido

La app debe minimizar clics, formularios y fricción operativa.

## 3.5 Evolución incremental

La arquitectura debe permitir crecer después sin sobrediseñar la versión inicial.

---

# 4. Modelo de Multitenancy

## 4.1 Estrategia inicial

El modelo multitenant de Propi es intencionalmente simple:

- existe una sola aplicación
- existen múltiples usuarios autenticados
- cada usuario solo puede ver y operar sus propios datos
- no existen organizaciones, sucursales ni jerarquías complejas en el MVP

## 4.2 Regla base de aislamiento

Todos los registros de negocio deben estar asociados a:

- `user_id`

Toda consulta, inserción, actualización o eliminación debe respetar la identidad del usuario autenticado.

## 4.3 Tenant boundary

La frontera de aislamiento del tenant está dada por:

- `auth.uid()` en Supabase
- columnas `user_id` en tablas de negocio
- políticas RLS

---

# 5. Capas del Sistema

La arquitectura del sistema se divide en cuatro capas principales.

## 5.1 Capa de Presentación

Responsable de:

- renderizar pantallas
- capturar interacción del usuario
- mostrar resúmenes e historial
- gestionar estados de UI

Tecnología principal:

- Next.js
- React
- componentes UI simples
- estilos mobile-first

## 5.2 Capa de Aplicación

Responsable de:

- coordinar acciones del usuario
- transformar datos para la UI
- invocar operaciones en Supabase
- encapsular lógica de casos de uso simples

Ejemplos:

- crear propina
- obtener total de hoy
- obtener total semanal
- obtener total mensual
- listar historial

## 5.3 Capa de Persistencia

Responsable de:

- guardar datos en PostgreSQL
- consultar datos
- aplicar RLS
- mantener integridad de datos

Tecnología principal:

- Supabase PostgreSQL

## 5.4 Capa de Identidad y Seguridad

Responsable de:

- registro
- login
- sesión
- obtención del usuario autenticado
- control de acceso por usuario

Tecnología principal:

- Supabase Auth
- RLS

---

# 6. Componentes Principales del Sistema

## 6.1 Frontend Web App

El frontend debe incluir como mínimo:

- pantalla de login / registro
- dashboard personal
- formulario rápido para registrar propina
- pantalla de historial

## 6.2 Supabase Auth

Administra:

- creación de cuentas
- login por email y password
- sesión activa
- identificación del usuario

## 6.3 Base de Datos

Administra:

- tabla de propinas
- relación de cada propina con su usuario
- timestamps
- consultas agregadas

## 6.4 Políticas RLS

Garantizan que:

- un usuario solo puede leer sus propias propinas
- un usuario solo puede insertar propinas para sí mismo
- un usuario solo puede actualizar o borrar sus propios registros si esa funcionalidad existe

---

# 7. Estructura Funcional de la Aplicación

## 7.1 Módulo de Autenticación

Responsabilidades:

- registro de usuario
- login
- logout
- protección de rutas privadas
- recuperación de sesión

## 7.2 Módulo de Registro de Propinas

Responsabilidades:

- capturar monto
- validar monto
- crear registro
- guardar fecha/hora automática
- confirmar al usuario que se guardó correctamente

## 7.3 Módulo de Dashboard

Responsabilidades:

- mostrar total de hoy
- mostrar total semanal
- mostrar total mensual
- mostrar cantidad de registros recientes si se desea

## 7.4 Módulo de Historial

Responsabilidades:

- listar propinas del usuario
- ordenar por fecha descendente
- mostrar monto y timestamp
- permitir navegación simple por registros

---

# 8. Rutas de la Aplicación

La aplicación debe mantener una estructura de rutas simple y clara.

## 8.1 Rutas públicas

### `/login`

Pantalla de inicio de sesión.

### `/register`

Pantalla de creación de cuenta.

---

## 8.2 Rutas privadas

### `/`

Dashboard principal del usuario autenticado.

Contenido esperado:

- resumen del día
- resumen semanal
- resumen mensual
- acceso rápido para agregar propina

### `/add`

Pantalla o modal de registro de propina.

### `/history`

Pantalla de historial personal.

---

# 9. Flujo General de Usuario

## 9.1 Registro / acceso

1. el usuario entra a la app
2. crea su cuenta o inicia sesión
3. el sistema crea o recupera su sesión
4. el usuario accede a su dashboard personal

## 9.2 Registro de una propina

1. el usuario toca “Agregar propina”
2. ingresa el monto
3. confirma
4. el sistema guarda:
   - monto
   - user_id
   - created_at
5. la app actualiza los totales

## 9.3 Consulta de resumen

1. el usuario entra al dashboard
2. el sistema consulta sus propinas
3. calcula o recupera:
   - total de hoy
   - total semanal
   - total mensual
4. la UI muestra los resultados

## 9.4 Consulta de historial

1. el usuario entra a historial
2. el sistema consulta solo registros del usuario autenticado
3. la UI muestra la lista ordenada por fecha descendente

---

# 10. Modelo de Datos Conceptual

## 10.1 Entidad principal del MVP

### User

Representa al camarero autenticado.

### Tip

Representa una propina registrada por el usuario.

## 10.2 Relación principal

- un usuario tiene muchas propinas
- una propina pertenece a un solo usuario

---

# 11. Decisiones Técnicas Clave

## 11.1 Usar Supabase como backend integral

Se recomienda Supabase porque resuelve de forma integrada:

- auth
- postgres
- RLS
- cliente JS
- despliegue rápido del MVP

## 11.2 Usar App Router de Next.js

Permite:

- estructura moderna
- separación clara de rutas
- buena base para crecimiento futuro

## 11.3 Usar RLS desde el inicio

Aunque el producto sea pequeño, la seguridad multitenant debe quedar blindada desde la base.

## 11.4 Evitar backend custom innecesario

En el MVP no se necesita un backend separado tipo Express, Nest o similar.

La app puede operar con:

- frontend en Next.js
- Supabase como backend

---

# 12. Estrategia de Consultas y Agregación

La aplicación necesita principalmente dos tipos de consultas:

## 12.1 Consultas transaccionales

Para:

- insertar una nueva propina
- listar historial

## 12.2 Consultas agregadas

Para:

- total de hoy
- total de esta semana
- total de este mes

Estas consultas pueden resolverse inicialmente con SQL simple o vistas si luego se desea ordenar mejor la capa de datos.

---

# 13. Validaciones del Sistema

## 13.1 Validaciones de UI

El frontend debe validar:

- que el monto exista
- que el monto sea numérico
- que el monto sea mayor que cero

## 13.2 Validaciones en base de datos

La base debe reforzar:

- `amount > 0`
- `user_id` obligatorio
- `created_at` obligatorio con valor por defecto

---

# 14. Seguridad

## 14.1 Autenticación obligatoria

Ninguna funcionalidad de negocio debe estar disponible sin sesión activa.

## 14.2 Aislamiento por usuario

Toda tabla de negocio debe tener `user_id`.

## 14.3 Políticas RLS obligatorias

La protección real de datos debe aplicarse en base de datos, no solo en frontend.

## 14.4 No confiar en datos del cliente

El frontend no debe decidir qué registros pertenecen a quién.  
La base de datos debe imponer esa regla.

---

# 15. Estructura de Proyecto Recomendada

Esta es una estructura sugerida para el repo.

```text
/app
  /(auth)
    /login
      page.tsx
    /register
      page.tsx
  /(private)
    /page.tsx
    /add
      page.tsx
    /history
      page.tsx

/components
  /auth
  /dashboard
  /tips
  /ui

/lib
  /supabase
    client.ts
    server.ts
  /utils
  /validators

/types
  database.types.ts
  tip.ts

/docs
  01-product-brief.md
  02-system-architecture.md
16. Responsabilidades por Carpeta
/app

Define rutas y composición de páginas.

/components

Contiene componentes reutilizables de UI y bloques funcionales.

/lib/supabase

Contiene configuración y helpers para conexión a Supabase.

/lib/validators

Contiene validaciones de formularios y reglas simples de entrada.

/types

Contiene tipos compartidos para la app.

/docs

Contiene documentación fuente del proyecto.

17. Casos de Uso del MVP
17.1 Crear cuenta

Como usuario, quiero crear una cuenta para usar la aplicación de forma personal.

17.2 Iniciar sesión

Como usuario, quiero iniciar sesión para ver mis datos.

17.3 Registrar propina

Como usuario, quiero guardar una propina rápidamente para no olvidarla.

17.4 Ver total diario

Como usuario, quiero ver cuánto hice hoy.

17.5 Ver total semanal

Como usuario, quiero ver cuánto hice esta semana.

17.6 Ver total mensual

Como usuario, quiero ver cuánto hice este mes.

17.7 Ver historial

Como usuario, quiero revisar mis registros pasados.

18. Restricciones del MVP

Para mantener la app simple, el MVP NO debe incluir:

organizaciones

roles complejos

tablas de equipos

invitaciones entre usuarios

dashboards globales

métricas comparativas entre camareros

sistema de pagos

suscripciones

exportaciones

integraciones externas

19. Escalabilidad Futura

La arquitectura inicial debe permitir crecer a futuro, por ejemplo hacia:

separación por tipos de propina

propinas por turno

propinas por lugar de trabajo

equipos o grupos

comparación temporal avanzada

dashboard de manager

Pero nada de eso debe afectar el diseño simple del MVP actual.

20. Criterios de Buena Implementación

La implementación será considerada correcta si cumple con lo siguiente:

el usuario puede registrarse e iniciar sesión

puede agregar propinas en segundos

puede ver sus totales personales

puede consultar su historial

ningún usuario puede acceder a datos de otro usuario

la app funciona bien en móvil

el flujo principal tiene mínima fricción

21. Conclusión

La arquitectura de Propi debe mantenerse deliberadamente simple.

No se busca construir una plataforma compleja, sino una herramienta personal, rápida y segura para registro de propinas.

La combinación de:

Next.js

Supabase Auth

PostgreSQL

RLS

permite construir un MVP sólido, seguro y fácil de evolucionar, sin introducir complejidad innecesaria.

La prioridad es:

terminar una primera versión usable, rápida y confiable.
```
