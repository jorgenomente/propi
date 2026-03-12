01 — product-brief.md

Proyecto: Propi
Versión: v0.1
Fecha: 2026-03-09

Estado actual: MVP implementado y validado al 2026-03-12. A partir de este punto el trabajo pasa a iteracion sobre la base existente.

1. Visión del Producto

Propi es una aplicación simple para que camareros puedan registrar y visualizar sus propinas diarias.

La aplicación permite guardar rápidamente cada propina recibida y ver cuánto dinero se ha generado:

hoy

esta semana

este mes

El objetivo principal es eliminar la necesidad de recordar o anotar propinas manualmente y permitir que cada camarero tenga claridad sobre cuánto está ganando en propinas.

Propi está diseñado para ser extremadamente simple y rápido de usar, pensado para personas que trabajan en entornos de alto ritmo como restaurantes y bares.

Registrar una propina debe tomar menos de 5 segundos.

2. Problema

Muchos camareros reciben múltiples propinas durante el día y no tienen una forma clara de registrar cuánto han ganado.

Los problemas comunes son:

olvidar cuánto se hizo en propinas en un turno

no tener un registro semanal o mensual

depender de memoria o notas desordenadas

no poder visualizar tendencias de ingresos

Esto genera falta de claridad sobre ingresos reales provenientes de propinas.

3. Solución

Propi ofrece una forma extremadamente simple de registrar propinas y visualizar ingresos acumulados.

La aplicación permite:

registrar una propina en segundos

guardar automáticamente fecha y hora

calcular totales automáticamente

visualizar resúmenes por día, semana y mes

Cada usuario tiene su propio espacio personal dentro del sistema.

4. Tipo de Producto

Propi es un micro SaaS multitenant.

Características principales:

múltiples usuarios

cada usuario tiene su propio registro de propinas

aislamiento de datos por usuario

acceso mediante autenticación

En la arquitectura inicial:

tenant = usuario

Esto significa que cada usuario solamente puede ver y modificar sus propios datos.

5. Usuario Objetivo

Usuario principal:

Camareros / meseros / bartenders

Contexto de uso:

restaurantes

bares

cafeterías

hoteles

Características del usuario:

trabaja en entornos rápidos

necesita registrar datos rápidamente

usa principalmente el móvil

no quiere interfaces complejas

6. Principios del Producto

Propi debe seguir siempre estos principios:

1. Ultra simplicidad

La aplicación debe ser extremadamente simple.

2. Registro en segundos

Registrar una propina no debe tomar más de unos segundos.

3. Mobile-first

El uso principal será desde el teléfono.

4. Cero fricción

El flujo de registro debe ser directo.

5. Datos claros

Los totales deben ser visibles inmediatamente.

7. Funcionalidades del MVP

La primera versión del producto incluye solamente las funcionalidades esenciales.

Autenticación

El sistema debe permitir:

registro de usuario

login

logout

Cada usuario accede a su propio espacio.

Registro de propinas

El usuario puede:

agregar una propina

ingresar el monto

guardar el registro

El sistema automáticamente guarda:

fecha

hora

Dashboard personal

El usuario puede ver:

total de propinas de hoy

total de propinas de esta semana

total de propinas de este mes

Historial de propinas

El usuario puede ver:

lista de propinas registradas

ordenadas por fecha

con monto y hora

8. Funcionalidades Fuera del MVP

Estas funcionalidades NO forman parte de la primera versión.

No deben implementarse inicialmente.

ranking entre usuarios

propinas compartidas

propinas por mesa

registro por turno

categorías de propinas

exportación de datos

analytics avanzados

notificaciones

integraciones externas

Estas funcionalidades pueden evaluarse en versiones futuras.

9. Arquitectura Esperada

La aplicación será construida como una web app moderna.

Tecnologías recomendadas:

Next.js

Supabase

PostgreSQL

Supabase Auth

Row Level Security (RLS)

La seguridad de datos debe estar garantizada mediante RLS.

Cada usuario solo puede acceder a sus propios registros.

10. Principios Técnicos

El sistema debe seguir estos principios técnicos:

arquitectura simple

base de datos clara

seguridad a nivel de base de datos

consultas eficientes

UI rápida y minimalista

11. Objetivo del MVP

El objetivo del MVP es validar que los camareros realmente utilicen la aplicación diariamente.

Indicadores de éxito inicial:

usuarios registrando propinas diariamente

uso recurrente durante turnos

claridad en los totales semanales y mensuales

El MVP debe priorizar terminar rápido y ser usable, no agregar complejidad innecesaria.

12. Futuras Expansiones (Opcional)

En versiones futuras se podrían agregar:

separación efectivo / tarjeta

registro por turno

metas de propinas

gráficos de ingresos

comparación entre semanas

exportación de datos

ranking entre compañeros

Estas funcionalidades no forman parte del MVP inicial.

13. Filosofía del Proyecto

Propi es una herramienta creada por camareros para camareros.

El producto debe mantenerse:

simple

útil

rápido

sin complejidad innecesaria

El objetivo no es crear una plataforma compleja, sino una herramienta práctica que se use todos los días.
