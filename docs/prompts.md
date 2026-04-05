# Prompts Log

## 2026-04-04 22:28:38 -0300 | Lote: 2026-04-04-dashboard-tighten-01

- Objetivo: simplificar el hero del dashboard, dar mas protagonismo a `Ir a estadisticas`, compactar montos del grafico y reforzar sutilmente la animacion del boton flotante.
- Prompt completo:

```text
quitemos la seccion foco actual y en tendencia de 7 dias me gusta pero las cantidades se solapan con las que estan allado quizas ahi tenemos que usar K para mil asi queda todo cortito y quizas quitar los ,00 del final  y vamos a colocar ir a estadisticas como algo con mas protagonismo y visible ya que esta muy bueno. cambiemos el copy del dashboard por algo mas simple. y quitar la informacion adicional tambien porque ya la app se sobre entiende. podriamos agregar una pequena animaion en el boton flotante de agregar propina
```

## 2026-04-04 22:20:13 -0300 | Lote: 2026-04-04-dashboard-interactive-01

- Objetivo: volver el dashboard mas interactivo y atractivo sin salir del MVP, reforzando lectura visual, actividad reciente y feedback al registrar una propina.
- Prompt completo:

```text
que se te ocurre hacer para que el dashboard sea un poco mas interactivo o atractivo o mas interesante

ok adelante
```

## 2026-04-04 19:46:26 -0300 | Lote: 2026-04-04-stats-redesign-01

- Objetivo: rediseñar `/stats` para que las estadisticas se entiendan de forma mas grafica, simple y estimulante, usando barras por semana y por mes sobre los datos existentes.
- Prompt completo:

```text
vamos a trabajar sobre http://localhost:3000/stats no me gusta como se ve ahora. la idea es que podamos ver la informacion de una manera mas grafica, quuiero ver barras por semana y por mes, que sea algo mas estimulante y mas simple y facil para el usuario ver sus estadisticas de cuando dinero hizo esta semana este mes o en el tiempo que sea. quiero que veas la pagina y que con los datos que tenemos me hagas una propuesta para que todo esto se vea de mejor manera. adelante
```

## 2026-04-04 12:38:53 -0300 | Lote: 2026-04-04-performance-01

- Objetivo: revisar por que la app tarda en abrir y aplicar optimizaciones concretas para acelerar la carga inicial sin salir del MVP.
- Prompt completo:

```text
la app tarda mucho en abrir podemos chequear que podemos hacer para volverla mas rapida
```

## 2026-04-04 12:57:04 -0300 | Lote: 2026-04-04-share-01

- Objetivo: agregar un botón en el dashboard que abra WhatsApp con el enlace de la app para facilitar compartirla.
- Prompt completo:

```text
ok adelante. me gustaria tambien agregar en el dashboard un boton de compartir app que sea facil para que se abra whatsapp y se comparta el link de la app y asi puedo seleccionar a quien enviarselo
```

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

## 2026-03-13 12:01:24 -0300 | Lote: 2026-03-13-install-modal-scroll-01

- Objetivo: corregir el modal de instrucciones de instalacion para que el contenido completo sea visible y pueda scrollearse en mobile.
- Prompt completo:

```text
falto agregar el scroll en el modal de ver instrucciones. cuando lo abro no se ve toda la info completa y no la puedo scrolear. arregla eso
```

## 2026-04-04 21:49:36 -0300 | Lote: 2026-04-04-stats-data-integrity-01

- Objetivo: asegurar que dashboard y estadisticas consideren todos los registros reales del usuario sin recortes silenciosos ni desalineacion entre rangos.
- Prompt completo:

```text
me estoy dando cuenta de que no funciona tan bien con los registros actuales de los usuaeios por ejemplo en mi cuenta decia que tenia ingresos  de 900mil pesos o por ahi con pero solo me esta contando pocos registros en las barras chrqiea que se esyan considerando todos los registros. es importante que no se pierdan datos ya que hay usuarios activos ahora que miran su informacion
```

## 2026-04-04 22:06:00 -0300 | Lote: 2026-04-04-add-page-cleanup-01

- Objetivo: quitar la seccion visual `Registro directo` de la pantalla de registrar propina porque no agrega valor al flujo.
- Prompt completo:

```text
en registrar propina hay un card que dice registro directo. vamos a quitar esa seccion no agrega nada
```

## 2026-04-04 22:18:00 -0300 | Lote: 2026-04-04-floating-add-cta-01

- Objetivo: hacer mas evidente la accion principal del producto reforzando el boton flotante de agregar propina con texto y efecto visual.
- Prompt completo:

```text
agreguemos algun efecto al boton flotante que tiene el + de agregar propina. y agreguemos tabien el texto ya que esa es la unica funcion importante de la app
```

## 2026-04-04 22:24:00 -0300 | Lote: 2026-04-04-floating-add-motion-01

- Objetivo: agregar una microanimacion al CTA flotante para remarcar la accion central de registrar propinas.
- Prompt completo:

```text
si eso
```
