# Prompts Log

## 2026-03-12 09:29:55 -0300 | Lote: 2026-03-12-git-cierre-01

- Objetivo: comitear y pushear todo lo pendiente del repositorio luego de validar el estado del lote.
- Prompt completo:

```text
ayudame a comitear y pushear todo lo pendiente en el repo
```

## 2026-03-12 09:34:58 -0300 | Lote: 2026-03-12-saneamiento-01

- Objetivo: sanear la documentación, alinear nombres y referencias del repo, y crear la migración inicial versionada de `tips`.
- Prompt completo:

```text
si hagamos eso empecemos con saneamiento y coherencia
```

## 2026-03-12 09:45:00 -0300 | Lote: 2026-03-12-auth-01

- Objetivo: implementar Lote 2 de autenticación con login, registro, logout, protección de rutas y smoke E2E mínima.
- Prompt completo:

```text
ok sigamos
```

## 2026-03-12 09:52:28 -0300 | Lote: 2026-03-12-deploy-01

- Objetivo: validar build, corregir un cruce server/client que rompía `next build` y desplegar el estado actual del MVP a Vercel.
- Prompt completo:

```text
$vercel-deploy
```

## 2026-03-12 10:00:00 -0300 | Lote: 2026-03-12-cierre-02

- Objetivo: reemplazar `middleware` por `proxy`, revalidar el repo y comitear/pushear todo el estado pendiente en un solo cierre.
- Prompt completo:

```text
eso es porque instale el skill de vercel-deploy. asi que comitea y pushea todo junto. antes de eso cambia el middleware por proxy para evitar ese warning
```

## 2026-03-12 10:08:00 -0300 | Lote: 2026-03-12-tips-01

- Objetivo: implementar registro real de propinas, conectar dashboard e historial a `tips` y ampliar la smoke E2E.
- Prompt completo:

```text
ok todo parece funcionar bien hasta ahora asi que podemos continuar
```

## 2026-03-12 09:59:38 -0300 | Lote: 2026-03-12-deploy-prod-01

- Objetivo: ejecutar despliegue productivo con Vercel CLI y verificar el estado inicial de la URL publicada.
- Prompt completo:

```text
npx vercel --prod
```

## 2026-03-12 10:26:21 -0300 | Lote: 2026-03-12-deploy-prod-02

- Objetivo: eliminar el warning de `turbopack.root`, revalidar la build y desplegar la version actual a produccion.
- Prompt completo:

```text
hagamos eso comit y push, despues pulir el warning y desplegar a prod
```

## 2026-03-12 11:58:42 -0300 | Lote: 2026-03-12-polish-01

- Objetivo: cerrar Lote 7 de pulido del MVP con estados de carga, error recuperable y feedback consistente en formularios y smoke E2E.
- Prompt completo:

```text
si avancemos
```

## 2026-03-12 12:05:00 -0300 | Lote: 2026-03-12-mvp-close-01

- Objetivo: cerrar formalmente el MVP en documentacion y dejar explicitada la transicion a una fase de iteracion sobre la base ya implementada.
- Prompt completo:

```text
ok hamos cierre del mvp y a partir de aqui lo que vamos a hacer es iterar lo que ya tenemos
```

## 2026-03-12 12:27:51 -0300 | Lote: 2026-03-12-redesign-01

- Objetivo: tomar `diseno/` como referencia visual, adaptar sus tokens al proyecto actual y rediseñar todas las pantallas del MVP sin cambiar logica de negocio.
- Prompt completo:

```text
si la carpeta diseno es solo un design system que me gustaria implementar en toda la aplicacion para cambiar como se va ahora mismo. Esto es de una app que hice anteriormente, asi que toma las referencias e implementalas en todas las paginas
```

## 2026-03-12 12:39:51 -0300 | Lote: 2026-03-12-redesign-close-01

- Objetivo: comitear, pushear y desplegar a produccion la iteracion visual completa del MVP.
- Prompt completo:

```text
ok ahora si. vamos a comitear y pushear todo hasta ahora y despues desplegamos a prod
```

## 2026-03-12 13:51:25 -0300 | Lote: 2026-03-12-stats-tipdate-01

- Objetivo: agregar soporte para registrar propinas con fecha real (`tip_date`) y construir un primer modulo de estadisticas por rango sobre esa fecha efectiva.
- Prompt completo:

```text
ok si hagamos eso
```

## 2026-03-12 14:15:17 -0300 | Lote: 2026-03-12-auth-seed-01

- Objetivo: corregir el warning de inputs en auth y dejar un usuario demo local persistente para pruebas despues de `supabase db reset`.
- Prompt completo:

```text
cuando intento hacer login en local me dice esto ... puede ser tambien que la cuenta que habia creado se borro? insertemos credenciales en local para usar de prueba
```

## 2026-03-13 10:32:28 -0300 | Lote: 2026-03-13-tips-edit-01

- Objetivo: permitir corregir o eliminar propinas mal registradas desde la aplicacion, sin tocar base manualmente.
- Prompt completo:

```text
adelante
```

## 2026-03-13 10:48:24 -0300 | Lote: 2026-03-13-dashboard-ux-01

- Objetivo: simplificar acceso desde dashboard e input flow, haciendo clicable `Registros` hacia historial y quitando elementos sin utilidad visible.
- Prompt completo:

```text
luego en el dashboard hay una seccion que dice Actividad...
```

## 2026-03-13 11:02:09 -0300 | Lote: 2026-03-13-install-banner-01

- Objetivo: incentivar la instalacion en pantalla de inicio con un banner y una guia por plataforma, usando prompt nativo en Android cuando exista.
- Prompt completo:

```text
Me gustaria que ubiera un banner que diga agrega propi a tu pantalla de inicio...
```

## 2026-03-13 11:22:30 -0300 | Lote: 2026-03-13-private-ux-polish-01

- Objetivo: pulir la experiencia en rutas privadas, simplificando acciones redundantes y aclarando flujos de historial, edicion y acceso.
- Prompt completo:

```text
en el dashboard el boton de cerrar sesion vamos a moverlo hacia arriba a la derecha al otro lado de propi.. Mejor hagamos una especie de topbar que tenga propi, el usuario logeado y cerrar sesion. despues sacamos ese text oque dice sesion activa, guarda cada monto al instante.... es redundante

despues mas abajo donde dice metodo en el 3. agrega para revisar o editar tus registros como para aclarar que se pueden editar

quita tambien el boton de cerrar sesion desde /history y tambien desde /estadisticas. que ese boton de cerrar sesion solo este disponible en el dashboard de inicio

despues en /add vamos a quitar el texto que dice guarda el monto y, si hace falta....... ya que el texto que dice registro directo explica lo mismo de arriba
```
