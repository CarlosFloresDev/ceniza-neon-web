export const wiki = [
  {
    slug: "primeros-pasos",
    group: "Empezar",
    title: "Primeros pasos",
    summary:
      "Qué haces en la colonia, cómo prepararte y cuándo cambia el combate.",
    body: `## Tu primera luz

En la colonia eres un comandante. Construye infraestructura, incorpora habitantes y entrega herramientas para formar profesiones. Tus tropas defienden los frentes y asaltan las entradas enemigas. El Portador no resuelve esos combates golpeando personalmente.

Empieza por seguir el objetivo de la interfaz. Un generador operativo permite alimentar la defensa; el cuartel y los reclutas sostienen la escuadra. Reserva recursos para reparar en lugar de gastarlos todos en ampliar.

## Antes de que anochezca

- Comprueba qué obras están terminadas: encargar no equivale a construir.
- Asegura trabajadores y herramientas, no solo cimientos.
- Revisa energía, tropas y estado de los dos frentes.
- Recoge experiencia y elige mejoras que complementen tu equipo.

## La campaña cambia de escala

Cada distrito combina colonia, operaciones y un jefe. En las arenas controlas el combate personal. Los objetivos concretos del diario y de la interfaz indican cómo preparar el viaje.

No hay una beta pública disponible. Esta guía describe el prototipo de desarrollo revisado el 29 de octubre de 2026.`,
  },
  {
    slug: "ciclo-dia-noche",
    group: "Colonia",
    title: "Día, aviso y noche",
    summary:
      "Preparación, presión y continuidad: la defensa no termina en una victoria automática.",
    body: `## Un ciclo para tomar decisiones

El ciclo actual distribuye 180 segundos de día, 20 de aviso y 90 de noche. Durante la preparación decides qué construir y qué frente reforzar. El aviso permite volver a posiciones seguras. La noche comprueba si la colonia puede sostenerse.

La luz y el cielo cambian con la fase. Los fondos vivos son presentación ambiental: no añaden colisiones ni cambian las reglas del asedio.

## No se gana esperando

La campaña no concluye automáticamente al tercer amanecer. Los días continúan mientras cumples operaciones y condiciones para viajar. La composición nocturna crece hasta su tercera etapa; tardar en aprender no provoca un crecimiento indefinido.

La duración de un ciclo no demuestra la duración de una campaña completa. Todavía no se publica una estimación de horas verificada con jugadores.`,
  },
  {
    slug: "nucleo-y-construccion",
    group: "Colonia",
    title: "Núcleo y construcción",
    summary:
      "Tres niveles, trabajadores reales y desbloqueos ligados al corazón de la colonia.",
    body: `## Pagar encarga una obra

Un constructor debe llegar y trabajar para completar o mejorar una estructura. El peligro cercano puede interrumpir la tarea. El progreso de las obras se guarda.

| Nivel del núcleo | Integridad | Qué permite |
| --- | --- | --- |
| 1 | 300 | Defensas de nivel 1, cuartel, generador y profesiones iniciales |
| 2 | 450 | Defensas de nivel 2, guardianes, técnicos, médicos y servicios de apoyo |
| 3 | 650 | Defensas de nivel 3 y fortificación avanzada |

## Subir de nivel

La mejora a nivel 2 cuesta 60 de chatarra y exige generador y cuatro defensas centrales operativas. La de nivel 3 cuesta 120, requiere haber resistido una noche y contar con dos instalaciones. El núcleo necesita trabajo de construcción; hasta dos constructores pueden colaborar.

El nivel del núcleo limita el de murallas y torretas. Al mejorar, la integridad máxima aumenta y se conserva el daño sufrido. No se consume un núcleo de evolución de armas.

Estas cifras son del prototipo y pueden cambiar durante el equilibrio. Las descripciones de la interfaz tienen prioridad cuando una versión posterior ajuste costes.`,
  },
  {
    slug: "murallas-y-torretas",
    group: "Colonia",
    title: "Murallas y torretas",
    summary: "Mejoras visuales y funcionales que siguen el nivel de tu núcleo.",
    body: `## Fortificar con criterio

Murallas y torretas tienen tres niveles y diseños distintos. Mejorarlas requiere chatarra, permiso del núcleo y trabajo de un constructor. La acción de mejora es E; la alimentación de torretas se controla con T, sin compartir la misma acción.

| Estructura | Nivel 1 | Nivel 2 | Nivel 3 |
| --- | --- | --- | --- |
| Muralla · integridad | 240 | 480 | 720 |
| Torreta · integridad | 100 | 200 | 300 |

Las mejoras cuestan 25 y 50 de chatarra. Las torretas avanzadas aumentan daño, alcance y cadencia. Sus cabezales apuntan, giran y retroceden; cada nivel tiene su propio cañón.

## No descuides la energía

Una defensa no es solo su silueta. Comprueba que la obra esté completa, que tenga alimentación y que exista un frente que cubrir. Mantén trabajadores disponibles para reparar después de una noche difícil.`,
  },
  {
    slug: "reclutas-y-profesiones",
    group: "Colonia",
    title: "Reclutas y profesiones",
    summary:
      "Cómo pasan los habitantes de esperar una oportunidad a sostener la colonia.",
    body: `## Personas, herramientas y trabajo

Para formar una profesión hacen falta habitantes reclutados y herramientas disponibles. Un arma en el suelo no convierte instantáneamente a cualquier figura visible en un soldado: su estado y los requisitos de la colonia importan.

Los constructores ejecutan obras. Los recuperadores sostienen la economía. Los tiradores componen el fuego inicial de las escuadras. Con núcleo 2 se abren guardianes, técnicos y médicos, junto con instalaciones de apoyo.

## Preparar una escuadra

Construye el cuartel, incorpora gente desde los campamentos y compra fusiles y escudos en el taller. Combinar protección y alcance permite avanzar con menos bajas que depender únicamente de disparos.

Los técnicos participan en operaciones físicas: deben caminar hasta un relé y trabajar para recuperarlo. Pagar o acercar al Portador no sustituye ese trabajo.

Si alguien no recoge una herramienta, revisa primero que sea un recluta disponible, que la profesión esté desbloqueada y que exista un camino seguro.`,
  },
  {
    slug: "escuadras-y-portales",
    group: "Colonia",
    title: "Escuadras y portales",
    summary:
      "Por qué el Portador dirige y cómo responden las entradas al asalto.",
    body: `## Dar la orden

F envía la escuadra hacia el frente donde está el Portador. Otra pulsación retira la orden. Necesitas cuartel, reclutas y herramientas. Las tropas se defienden durante el desplazamiento, aunque estén lejos del cuartel.

En la colonia ni el ataque manual ni las armas automáticas personales dañan enemigos o entradas. Los módulos del Portador transmiten bonificaciones a los soldados, por lo que desarrollar equipo sigue teniendo utilidad.

## Una entrada que se defiende

El primer impacto y los umbrales de 200 y 100 de vida activan defensores. Tras un aviso de 0,8 segundos salen dos enemigos desde el portal. Su reserva no se repone al retirarte; destruir la entrada cancela respuestas pendientes.

Esos defensores no entregan botín, experiencia ni cofres. La defensa no puede utilizarse como una granja infinita. Las brechas intermedias también pueden provocar un contraataque al caer si quedan entradas en ese frente.

## El mapa actual

Los cinco capítulos tienen 2, 4, 6, 8 y 8 entradas: repetidores terminales y brechas intermedias. Son posiciones prefijadas; todavía no se anuncia generación procedural del mapa.`,
  },
  {
    slug: "experiencia-y-mejoras",
    group: "Progresión",
    title: "Experiencia y mejoras",
    summary: "Sube de nivel y elige una dirección para tu equipo.",
    body: `## Elegir importa

Recoger experiencia permite subir de nivel y escoger entre las mejoras que ofrece el sistema. Las opciones incluyen armas y pasivas; sus iconos ayudan a reconocerlas. La clínica permite consultar y configurar lo que ya has obtenido.

El prototipo incluye módulos con presupuesto de equipo y recetas de evolución. Una evolución requiere desarrollar el arma y su pasiva correspondiente; el cofre debe ofrecerla cuando se cumplan las condiciones. No basta con encontrar un icono nuevo.

## Dos contextos de utilidad

En la colonia el equipo apoya a las tropas mediante bonificaciones. En las arenas vuelven el ataque personal y las armas automáticas. Antes de cambiar de distrito, revisa cómo se complementan tu alcance, movilidad y resistencia.

El catálogo completo del documento de diseño sigue siendo un objetivo. Esta wiki no presenta todas las armas imaginadas como si ya fueran jugables.`,
  },
  {
    slug: "operaciones-y-viaje",
    group: "Campaña",
    title: "Operaciones y viaje",
    summary:
      "Rescatar, recuperar un relé y escoltar un transporte para abrir la ruta.",
    body: `## Tres operaciones de la campaña actual

**Rescate occidental.** Acércate al punto y mantén E. La operación entrega conversación, datos y recursos una sola vez. Si hay una brecha entre la colonia y el rescate, despeja primero el frente con tus tropas.

**Relé oriental.** Necesita energía, 30 de chatarra y un técnico contratado. El técnico camina hasta el relé y trabaja seis segundos. La recuperación no ocurre solo por pagar.

**Transporte occidental.** Se activa después de las dos operaciones anteriores. Debes acompañarlo con al menos una tropa armada cerca. F permite retirar el asalto para reorganizar la escolta. El transporte tiene integridad y puede necesitar reparaciones.

## Viajar preparado

El diario y la interfaz muestran las condiciones de operación y estabilidad. Abrir la ruta en tren exige completar trabajo real en el distrito. Al viajar se vuelve a levantar una colonia de nivel 1, conservando las mejoras neuronales y habitantes económicos según el progreso guardado.

La expansión narrativa propone operaciones exclusivas por zona; esa variedad adicional todavía no está implementada.`,
  },
  {
    slug: "recaudador",
    group: "Jefes",
    title: "El Recaudador",
    summary:
      "Una máquina de cobro convertida en el primer bloqueo del ferrocarril.",
    body: `## Encuentro de la Periferia

El Recaudador protege su núcleo desde el frente y presiona con maquinaria pesada. Aprende a usar la cobertura y a distinguir una ofensiva de su recuperación. El terreno tiene una composición de depósito y canales, con elementos que refuerzan su identidad ferroviaria.

## Qué observar

- Posición de las coberturas respecto a la dirección de la amenaza.
- Señales previas a un ataque fuerte.
- Apertura del núcleo y tiempo real para golpear y retirarte.

Los robots iniciales recibieron más presencia visual y ofensivas de mayor alcance. Su humo, escombros y temblor de impacto comunican peso, pero no sustituyen el anuncio de peligro.

La dificultad relativa entre los cinco jefes sigue en revisión. No se afirma que el primer encuentro esté cerrado o equilibrado para todo tipo de jugador.`,
  },
  {
    slug: "santa-caldera",
    group: "Jefes",
    title: "Santa Caldera",
    summary: "Hornos, presión y suelo peligroso en el corazón de la Fundición.",
    body: `## El calor como lenguaje

Santa Caldera conserva el cobre, las tuberías y la presión de la industria. Sus ataques amplían el espacio amenazado y pueden combinarse con peligros secundarios. Una posición cómoda puede dejar de ser segura si ignoras la siguiente señal.

## Preparar la respuesta

Lee las rejillas y las zonas anunciadas. Conserva resistencia para desplazarte y aprovecha la purga de enfriamiento para acercarte. Una animación de recuperación es una invitación temporal, no permiso para permanecer junto al núcleo indefinidamente.

Las partículas de horno y el metal fundido del fondo pertenecen al ambiente. Los avisos de combate son la información que debe guiar tu movimiento.

El equilibrio de agresividad y solapamiento está sujeto a sesiones de prueba.`,
  },
  {
    slug: "coro-sumergido",
    group: "Jefes",
    title: "Coro Sumergido",
    summary:
      "Tres enlaces, pulsos y una máquina que convierte memoria en repetición.",
    body: `## Escuchar las señales

El Coro utiliza enlaces que protegen su centro. El objetivo no consiste en perseguir el núcleo desde el primer instante: primero debes atender las antenas y esquivar sus pulsos.

La apariencia combina corrosión, antenas, resonadores y goteo. Su marco de vida utiliza metal azulado y remates marinos para distinguir este encuentro del lenguaje de cobre de la Fundición.

## Priorizar

Observa qué enlaces siguen activos y qué zonas está marcando el sonar. Romper el orden de protección abre oportunidades de daño. Conserva espacio para reaccionar a las ondas y evita que tu ruta de retirada termine contra otro peligro.

La historia ampliada profundiza el vínculo entre las voces y el barrio. Los nuevos diálogos escritos se consideran material propuesto hasta integrarlos en el juego.`,
  },
  {
    slug: "prefecto",
    group: "Jefes",
    title: "El Prefecto",
    summary:
      "Escudo, estocada y recuperación: un duelo bajo las luces de la Ciudadela.",
    body: `## Un adversario que cierra el frente

El Prefecto rodea al Portador y utiliza el escudo para protegerse. Alterna salvas y estocadas anunciadas. Tras una estocada puede seguir un barrido: salir del círculo es parte de la respuesta.

Durante su recuperación puede recibir daño doble. La segunda fase encadena dos estocadas; comprometer toda la resistencia en el primer movimiento deja poco margen para la continuación.

## Espacio y lectura

La arena utiliza contornos biselados, coberturas y señalización dorada. Su identidad visual combina marfil, latón y una ceremonia que contrasta con el estado del resto de la ciudad.

Las animaciones humanoides siguen afinándose. La marcha y el ataque deben transmitir intención sin alterar la lectura del escudo ni de la estocada.`,
  },
  {
    slug: "madre-cero",
    group: "Jefes",
    title: "Madre Cero",
    summary:
      "El encuentro final exige sostener una red antes de alcanzar su centro.",
    body: `## Mantener el enlace

La arena tiene tres relés aliados. Mantener al menos dos activos acumula 18 segundos de enlace y abre una ventana ofensiva de siete segundos. En esa apertura, el núcleo recibe daño doble.

E cerca de un relé recupera 45 de integridad por 25 de resistencia. Q consume 35 y protege los relés durante cuatro segundos, con doce de enfriamiento. La reparación puede recuperar un relé apagado.

## Bajo presión

Los pulsos señalan dónde golpearán. En segunda fase también marcan al jugador. Las tropas llevadas desde la colonia contribuyen a reducir el daño a los relés; una escuadra preparada importa incluso al final de la ruta.

La plataforma tiene doce lados. El exterior incorpora arquitectura de la Red y partículas, dejando el área transitable y los avisos libres.

El guion completo contiene revelaciones que esta ficha evita. La ampliación de la historia no cambia por sí sola las reglas actuales del encuentro.`,
  },
  {
    slug: "controles-y-accesibilidad",
    group: "Empezar",
    title: "Controles y accesibilidad",
    summary:
      "Las acciones principales y las opciones para reducir efectos visuales.",
    body: `## Acciones de referencia

| Tecla | Acción |
| --- | --- |
| E | Interactuar, encargar, mejorar o reparar según contexto |
| F | Ordenar asalto o retirar la escuadra |
| J | Ataque personal en arenas |
| T | Alimentación de torretas |
| V | Subir o bajar de la plataforma cuando esté disponible |
| L | Diario |
| F1 | Laboratorio de desarrollo |

Consulta las indicaciones del juego para movimiento, esquiva y acciones contextuales. Los controles pueden cambiar durante el desarrollo.

## Menos estímulos

Las opciones permiten reducir destellos y partículas. La pausa detiene la animación ambiental de los distritos. Las señales de peligro y las barras deben conservar su función aunque reduzcas efectos.

Esta web respeta la preferencia de movimiento reducido del sistema, ofrece navegación por teclado y reproduce audio solo cuando lo pides.`,
  },
  {
    slug: "cooperativo",
    group: "Futuro",
    title: "Cooperativo para dos",
    summary:
      "La dirección prevista del multijugador y las preguntas que faltan por resolver.",
    body: `## Previsto, todavía no disponible

El proyecto quiere incorporar cooperativo para hasta dos jugadores. El prototipo revisado es una experiencia de un jugador; no incluye una beta multijugador funcional.

## Qué debe resolverse

- Conexión de la sesión y recuperación tras una desconexión.
- Autoridad de construcción, recursos y órdenes de escuadra.
- Progreso compartido y guardado entre sesiones.
- Sincronización de enemigos, proyectiles, señales y daño.
- Cámara y presencia de ambos jugadores en colonia y arenas.
- Diálogos, elecciones y accesibilidad para dos participantes.

El guion ampliado propone cómo reconocer a un segundo enlace sin reemplazar a los compañeros de historia. Es una propuesta narrativa, no una implementación de red.

Cuando haya una prueba disponible, la bitácora explicará sus condiciones. No hay fecha anunciada.`,
  },
];
