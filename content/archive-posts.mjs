// Retrospective entries: development dates are supplied by the Git manifest.
export const archivePosts = [
  {
    slug: "el-primer-paso",
    category: "Origen del proyecto",
    title: "El primer paso",
    excerpt:
      "El 22 de septiembre empezó el prototipo: movimiento, combate de práctica y las primeras reglas de una colonia que debía resistir.",
    image: null,
    imageLabel: "Ficha editorial del archivo · Sin captura de esa versión",
    read: "2 min",
    commit: "d0557a6",
    references: ["d0557a6", "ec13bc4"],
    body: `## Antes de los cinco distritos

El primer commit conservado en este repositorio es del **22 de septiembre de 2026**. Su título registra el inicio de CENIZA NEÓN con movimiento y combate de práctica. Incluye una escena de jugador, un enemigo de entrenamiento, el mundo inicial y una prueba de combate.

Todavía no es el juego que muestran las capturas actuales. Es el punto en el que empiezan a comprobarse las acciones básicas: moverse, atacar y relacionarse con un espacio que responde.

## La colonia aparece ese mismo día

Un segundo avance, \`ec13bc4\`, añade colonia y tres asedios, junto con una guía de arte. El historial incorpora pruebas de asedio y una simulación de sesión. La pregunta del prototipo deja de ser solo si el personaje puede combatir: también importa si lo construido puede resistir.

El sistema y los diseños han cambiado desde entonces. Este registro conserva el origen sin atribuir al primer día las mecánicas, la historia ni la presentación que llegaron después.

## Lo que podemos documentar

Esta entrada se redactó retrospectivamente a partir de los commits. No conservamos aquí una captura verificada de esa primera versión, por lo que su portada es una ficha editorial, no una reconstrucción visual presentada como screenshot.

El objetivo del archivo es que el trabajo tenga memoria: registrar qué existía en cada momento y evitar que las mejoras posteriores borren el recorrido.`,
  },
  {
    slug: "el-errante-empieza-a-moverse",
    category: "Primeras animaciones",
    title: "El Errante empieza a moverse",
    excerpt:
      "El 23 de septiembre llegaron los sprites y cinco animaciones del Errante. Un primer paso para que el enemigo tuviera presencia propia.",
    image: null,
    imageLabel: "Ficha editorial del archivo · Sin captura de esa versión",
    read: "2 min",
    commit: "bcae175",
    body: `## De la regla al personaje

El commit del **23 de septiembre de 2026** registra la integración de sprites y cinco animaciones del Errante. El cambio incorpora secuencias gráficas, incluidos fotogramas de ataque, en lugar de describir al enemigo únicamente mediante su comportamiento.

Era una de las primeras necesidades del proyecto: que una amenaza pudiera reconocerse por su silueta y sus acciones, no solo por el hecho de perseguir al jugador.

## Aprender a leer un movimiento

Una animación cumple una función además de dar apariencia. El comienzo de una acción, el contacto y la recuperación necesitan comunicar cuándo está ocurriendo algo. El trabajo posterior sobre enemigos y humanoides sigue partiendo de ese problema.

No utilizamos una imagen del Portador o de los jefes actuales para representar este avance: pertenecen a otras etapas. Tampoco afirmamos que las animaciones iniciales fueran definitivas.

## Un registro retrospectivo

La fecha corresponde al avance conservado en Git. El artículo se escribió después, al ordenar la bitácora. Su ficha de archivo permite reconocer esa diferencia y seguir la evolución hasta los diseños de combate actuales.`,
  },
  {
    slug: "el-ferrocarril-llega-a-la-arena",
    category: "Campaña y combate",
    title: "El ferrocarril llega a la arena",
    excerpt:
      "El 12 de octubre se integró la arena cenital del Recaudador. La dirección de la colonia y el combate personal empezaban a encontrar espacios distintos.",
    image: null,
    imageLabel: "Ficha editorial del archivo · Sin captura de esa versión",
    read: "3 min",
    commit: "bab7e80",
    references: ["bab7e80", "5d969e1", "55d2a24"],
    body: `## Una escala distinta para el combate

El **12 de octubre de 2026** el historial incorpora la arena cenital y al jefe Recaudador. Ese avance añade piezas de escenario, vistas del Portador y componentes para un enfrentamiento que se mira y se juega de forma distinta a la colonia lateral.

Separar estos espacios permite dar otra función al movimiento: en la colonia importa recorrer y organizar un frente; en una arena importa leer una amenaza, colocarse y aprovechar una apertura.

## El tren conecta el recorrido

Ese mismo día aparecen en el historial repetidores, estación ferroviaria y base de expediciones. Más adelante se registra la ambientación de la arena. El encuentro empieza a pertenecer a una ruta industrial, con una razón para viajar hasta él.

Esto no significa que ya existieran los cinco capítulos actuales ni que el diseño del jefe estuviera cerrado. Las sucesivas revisiones cambiaron sus materiales, presencia y animaciones.

## Conservar el recorrido sin confundir versiones

La portada de esta entrada es una ficha del archivo. No reutilizamos una captura antigua del Recaudador como imagen de una actualización reciente. Las fichas de wiki y los registros sobre arte vigente muestran la revisión posterior identificada por su fecha.

Esta entrada se reconstruyó a partir de tres referencias del historial: arena, ferrocarril y ambientación. No equivale a una publicación realizada aquel día ni a una beta que se distribuyera entonces.`,
  },
  {
    slug: "cinco-capitulos-una-ruta",
    category: "Historia y campaña",
    title: "Cinco capítulos, una ruta",
    excerpt:
      "El 28 de octubre se conectaron los cinco capítulos, sus operaciones narrativas y los encuentros finales de la Ciudadela y la Red.",
    image: "citadel",
    imageLabel:
      "Arte ambiental del distrito · Ilustración de referencia, no captura de la versión histórica",
    read: "3 min",
    commit: "20fa1c0",
    body: `## El viaje encuentra una estructura

El avance del **28 de octubre de 2026** conecta cinco capítulos con operaciones narrativas y jefes finales. La ruta ya no termina en los primeros distritos: alcanza la Ciudadela corporativa y el Núcleo de la Red.

El cambio incorpora el contenido de campaña, los escenarios finales y el trabajo sobre sus encuentros. Da un lugar al Prefecto y a Madre Cero dentro del recorrido, en vez de tratarlos solo como pruebas independientes.

## Construir también prepara el viaje

Las operaciones de rescate, relé y transporte vinculan infraestructura, personas y desplazamiento. El objetivo de la colonia no es esperar a que pase un número fijo de noches: hay trabajo que completar para abrir la siguiente ruta.

La historia conecta ese trabajo con una emergencia que la red nunca ha dado por terminada. Los compañeros aportan motivos diferentes para avanzar: construir, despertar, conservar nombres y abrir caminos.

## Tener final no significa tener una campaña terminada

Este hito aporta estructura y desenlace al prototipo. No demuestra una duración de campaña concreta ni resuelve por sí solo la variedad de operaciones o el equilibrio de todos los encuentros.

Los diseños de los personajes y las arenas siguieron cambiando. La imagen que acompaña esta entrada es arte ambiental del distrito, identificado como referencia; no es una captura que afirme documentar el estado exacto de aquel commit.`,
  },
  {
    slug: "la-historia-encuentra-sus-rostros",
    category: "Novela visual",
    title: "La historia encuentra sus rostros",
    excerpt:
      "Los retratos manga y las conversaciones de novela visual se integraron el 28 de octubre, junto con una revisión de coherencia de las estructuras.",
    image: "novela_visual",
    imageLabel:
      "Sistema de novela visual del prototipo · Captura de desarrollo usada como referencia del sistema",
    read: "3 min",
    commit: "fb1e711",
    body: `## Personas al otro lado del diálogo

El commit del **28 de octubre de 2026** integra la presentación manga de la novela visual y unifica las estructuras industriales. Los retratos aprobados dan una identidad consistente a Mara, Ivo, Vera, Nox, ECO, el Portador y los antagonistas.

La conversación puede presentar una intervención como parte de una escena, con interlocutores reconocibles, en lugar de depositar toda la historia en un bloque de texto sobre el mundo.

## Coherencia fuera del retrato

El mismo avance trabaja estructuras con materiales compartidos. La intención es que edificios, personajes y lugares parezcan pertenecer al mismo proyecto, incluso cuando la perspectiva o el tamaño cambian.

Los sprites de combate se revisaron de nuevo después. Un retrato aprobado no demuestra que todas sus animaciones ya tuvieran el mismo nivel de detalle: ese trabajo aparece en las entradas siguientes.

## Un sistema y una historia en evolución

La imagen acompaña la explicación del sistema de conversaciones, no una nueva escena anunciada como implementada. La ampliación narrativa escrita para la web permanece como propuesta de producción hasta que se adapte e integre en el juego.

El registro se redactó retrospectivamente. Su fecha de avance procede de Git y se muestra separada de la fecha de redacción.`,
  },
  {
    slug: "el-diseno-aprobado-llega-al-combate",
    category: "Arte de personajes",
    title: "El diseño aprobado llega al combate",
    excerpt:
      "El 29 de octubre se renovaron el Portador y los jefes con poses ilustradas y animaciones montadas en LibreSprite.",
    image: "marcha_vigente_20261029",
    imageLabel:
      "Galería de caminar · Diseños ilustrados vigentes · Captura del 29 de octubre de 2026",
    read: "3 min",
    commit: "646591d",
    body: `## Conservar la identidad entre perspectivas

El avance del **29 de octubre de 2026** renueva el Portador y los jefes con poses ilustradas y animaciones en LibreSprite. La revisión busca acercar la identidad del combate al arte de personajes aprobado, manteniendo vistas adecuadas para colonia y arena.

El problema no era solo añadir más detalle. También había que controlar escala, orientación y selección de poses para que el personaje conservara su forma cuando cambiaba de dirección.

## Fuentes editables

LibreSprite permite revisar lienzos, anclajes y tiempos junto a los fotogramas. Los atlas utilizados por Godot se exportan desde fuentes que pueden seguir corrigiéndose; la imagen del personaje no queda como una ilustración aislada sin relación con el movimiento.

La galería muestra los diseños vigentes del Portador, el Recaudador, Caldera, el Coro, el Prefecto y Madre Cero. No es una captura de los modelos sustituidos.

## La marcha sigue siendo un trabajo propio

Conseguir una silueta reconocible no resuelve automáticamente cómo apoya el pie o recupera el peso. Las revisiones siguientes afinan la marcha de los humanoides, los ataques y los efectos. El registro más reciente de caminar documenta además la separación de esas fuentes para trabajar sobre ellas.`,
  },
];
