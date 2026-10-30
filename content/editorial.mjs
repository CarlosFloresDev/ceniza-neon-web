import fs from "node:fs";
import { archivePosts } from "./archive-posts.mjs";

const recentPosts = [
  {
    slug: "una-ciudad-que-respira",
    category: "Arte y atmósfera",
    title: "Una ciudad que respira",
    excerpt:
      "Cinco distritos, varias capas de profundidad y pequeños movimientos que cuentan dónde estás. Así estamos dando vida a los escenarios.",
    image: "foundry",
    imageLabel: "Arte ambiental de la Fundición · En desarrollo",
    read: "4 min",
    commit: "4cbae0e",
    body: `## El mundo también tiene que contar la historia

La Fundición no debería sentirse igual que el barrio inundado. Una produce calor que nadie disfruta; el otro guarda las voces de quienes intentaron detener la red. La arquitectura, la luz y el movimiento necesitan expresar esa diferencia incluso antes de que aparezca un diálogo.

La revisión de los cinco fondos separa cielo, horizonte distante, arquitectura y decoración cercana. Al caminar, cada plano responde a una velocidad diferente. Los edificios jugables mantienen su posición: la profundidad es visual y no altera el lugar de las construcciones ni sus colisiones.

## Movimiento con una razón

En la Periferia se mueven ventiladores, vapor y un tren de servicio. La Fundición incorpora humo, chispas, caída de metal y un carro sobre sus vías. El barrio inundado tiene lluvia, desagües y ondas en el agua. En la Ciudadela se agitan los estandartes; en la Red, los conductos transportan pulsos y el reactor muestra actividad.

No buscamos llenar la pantalla de partículas. Los movimientos se colocan sobre elementos concretos del dibujo y quedan detrás del espacio de juego. Las señales que anuncian un ataque deben seguir siendo fáciles de leer.

## Una interfaz con carácter

También sustituimos los marcos sencillos de las barras de vida por arte ornamental original. El Recaudador tiene garras y piezas dentadas; Caldera, cobre y remates de horno; el Coro, metal azulado y aletas. El Prefecto conserva un lenguaje ceremonial, mientras Madre Cero utiliza espinas y filamentos. El Portador lleva un marco más fino.

Las ventanas interiores son transparentes y no cubren la cantidad de vida. La estela de daño mantiene su función: primero cambia la vida real y después desciende el rastro del golpe reciente.

## Qué comprobamos

La batería local terminó con **41 suites y cero fallos**. La comprobación nueva revisa velocidades de las capas, transparencia, fuentes editables, pausa y las seis aperturas de los marcos. Además se revisaron capturas OpenGL de los cinco distritos y de los cinco jefes.

Estas comprobaciones técnicas no sustituyen las pruebas con jugadores. El equilibrio, la lectura durante una pelea real y el rendimiento en otros equipos necesitan más sesiones.

## Lo siguiente

Queremos seguir mejorando la animación y la identidad de cada lugar. La bitácora mostrará comparaciones y resultados de pruebas cuando estén disponibles. **Todavía no hay una beta pública ni una fecha de lanzamiento.**`,
  },
  {
    slug: "caminar-es-mas-que-mover-un-sprite",
    category: "Diario de desarrollo",
    title: "Caminar es más que mover un sprite",
    excerpt:
      "Apoyo, dirección y ritmo: una revisión del Portador, el Prefecto y Madre Cero, con fuentes independientes para seguir trabajando.",
    image: "marcha_vigente_20261029",
    imageLabel: "Galería de caminar · Diseños vigentes · 29 oct 2026",
    read: "3 min",
    commit: "26fe467",
    body: `## El problema que vimos

Un buen retrato no resuelve una animación. Al mover un humanoide, el peso necesita pasar de una pierna a la otra; la orientación, el apoyo en el suelo y el movimiento del torso deben acompañarlo. Cuando esas relaciones fallan, el personaje parece deslizarse.

Estamos trabajando sobre las poses del Portador, el Prefecto y Madre Cero manteniendo los diseños aprobados. El objetivo es conservar el detalle del arte y hacer que el movimiento pertenezca al mismo personaje.

## Dos formas de mirar al Portador

La colonia utiliza una vista lateral. Las arenas necesitan direcciones cenitales. Son necesidades distintas y el Portador tiene fuentes separadas para ambas perspectivas. La escala visible también importa: el protagonista debe convivir con aliados y edificios sin parecer de otro mundo.

![Detalle del Prefecto en la galería de caminar](/media/prefecto_detalle_20261029.webp)

*Detalle del diseño vigente del Prefecto en la galería de caminar, capturado el 29 de octubre de 2026.*

## Fuentes para iterar

Se extrajeron copias de caminar para los tres personajes, incluyendo las dos perspectivas del Portador. Cada archivo de LibreSprite conserva tres capas y 32 fotogramas: cuatro etiquetas de dirección con ocho pasos cada una.

Los fotogramas y su duración se copiaron sin modificar los originales. Los cuatro documentos se abrieron y exportaron en LibreSprite para comprobar que conservaban capas y etiquetas. Son archivos de trabajo independientes; editar una copia no sustituye por sí solo los atlas del juego.

## Un trabajo que sigue abierto

La sensación de caminar se juzga al jugar. Queremos contrastar la marcha con el ataque, la esquiva y la recuperación, y seguir corrigiendo los casos en los que los pies no transmiten peso. Esta entrada documenta el proceso, no anuncia una versión final de las animaciones.`,
  },
  {
    slug: "cinco-jefes-cinco-lenguajes",
    category: "Combate y pruebas",
    title: "Cinco jefes, cinco lenguajes",
    excerpt:
      "Coberturas, calor, antenas, duelo y relés. La dificultad necesita reglas que puedas aprender, no solamente más vida.",
    image: "madre_arena_20261029",
    imageLabel: "Captura del prototipo · Madre Cero",
    read: "4 min",
    commit: "b12120a",
    body: `## Leer, decidir, responder

Cada encuentro debe pedir algo distinto. El Recaudador enseña a usar coberturas y aprovechar una apertura del núcleo. Santa Caldera convierte el suelo y la temperatura en una amenaza. El Coro Sumergido obliga a atender sus enlaces antes de alcanzar el centro de la máquina.

El Prefecto propone un duelo con escudo, aproximaciones y estocadas anunciadas. Madre Cero devuelve al combate una idea de la colonia: mantener vivos los puntos que permiten avanzar.

## Dar peso a las máquinas

La revisión de combate amplió la presencia de los primeros robots y añadió ataques de mayor alcance, amenazas secundarias, escombros, humo y temblor en impactos fuertes. Algunas ofensivas se solapan para exigir decisiones de posición.

La agresividad necesita límites legibles. Las señales previas y las ventanas de recuperación son parte de la dificultad: una máquina peligrosa debe poder entenderse. La duración de esas ventanas y la escalada entre encuentros siguen necesitando pruebas humanas.

## Un laboratorio para probar

El prototipo dispone de un laboratorio de depuración con acceso a los cinco jefes, fases, equipo, invulnerabilidad y velocidad de simulación. Permite repetir una situación sin recorrer toda la campaña.

Es una herramienta de desarrollo. Las capturas de esta página muestran el estado de trabajo, pueden contener interfaz de depuración y no representan una beta publicada.

## El último enlace

En Madre Cero, sostener al menos dos relés permite acumular enlace y abrir una ventana ofensiva. Reparar y proteger esos puntos exige resistencia y atención. Romper la carcasa sin sostener el sistema de apoyo no resuelve el encuentro.

Queremos que el último jefe cierre una campaña sobre organizar y proteger, además de poner a prueba la esquiva y el ataque. El diseño narrativo ampliado profundiza esa relación, pero sus escenas nuevas todavía son material de escritura.`,
  },
  {
    slug: "lo-que-ya-existe-y-lo-que-falta",
    category: "Estado del proyecto",
    title: "Lo que ya existe. Lo que falta.",
    excerpt:
      "Abrimos el archivo de desarrollo con una promesa sencilla: mostrar el trabajo real y distinguirlo de lo que queremos construir.",
    image: "colonia_vigente_20261029",
    imageLabel: "Captura real de desarrollo · Colonia",
    read: "4 min",
    commit: "9eeb853",
    body: `## Un prototipo en construcción

CENIZA NEÓN combina la dirección de un asentamiento lateral con combates personales en arenas. De día construyes, reclutas y preparas rutas. De noche defiendes lo que has levantado. Tus decisiones de equipo y experiencia acompañan el viaje.

El prototipo conecta cinco distritos y cinco encuentros de jefe. Hay progresión del núcleo y las defensas, profesiones, operaciones de rescate y transporte, conversaciones y un diario. Esa base permite probar sistemas; todavía necesita más variedad y una campaña narrativa más desarrollada.

## La colonia depende de su gente

Pagar una obra no la completa instantáneamente. Los constructores tienen que llegar y trabajar. Para armar una escuadra hacen falta reclutas y herramientas. En la colonia el Portador dirige: las tropas combaten y atacan las entradas enemigas. El combate personal se reserva para las arenas.

## Objetivos que siguen pendientes

El **cooperativo para hasta dos jugadores** es una dirección prevista del proyecto. No está disponible en el prototipo actual. Antes de anunciarlo como función jugable hacen falta implementación, pruebas de sincronización y sesiones reales de principio a fin.

Tampoco afirmamos una duración de campaña medida. Hay una meta de ampliar la historia y las operaciones, pero el tiempo real depende de contenido y pruebas, no de alargar artificialmente el ciclo de día y noche.

## Cómo leer este sitio

La wiki describe reglas actuales y señala lo previsto. El roadmap utiliza hitos sin fechas prometidas. La bitácora reúne cambios verificables, capturas y límites de las pruebas. El universo presenta una entrada sin destripar la historia; los guiones de producción se conservan separados del contenido público.

Cuando exista una prueba pública, aparecerán aquí sus condiciones y cómo participar. Hasta entonces no hay descarga de beta ni formulario que simule apuntarte a una lista inexistente.`,
  },
];

const history = JSON.parse(
  fs.readFileSync(
    new URL("./development-history.json", import.meta.url),
    "utf8",
  ),
);
export const posts = [...recentPosts, ...archivePosts]
  .map((post) => {
    const source = history.commits.find((commit) =>
      commit.sha.startsWith(post.commit),
    );
    if (!source) throw new Error("Missing verified history for " + post.slug);
    return {
      ...post,
      date: source.authoredAt.slice(0, 10),
      timestamp: source.authoredAt,
      recordedOn: post.recordedOn || "2026-10-29",
      retrospective:
        source.authoredAt.slice(0, 10) < (post.recordedOn || "2026-10-29"),
    };
  })
  .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
  .map((post, index, array) => ({
    ...post,
    number: String(array.length - index).padStart(3, "0"),
  }));

export const characters = [
  {
    id: "portador",
    name: "El Portador",
    role: "El enlace sin registro",
    quote:
      "Si la ciudad necesita una firma, que sea la de quienes viven en ella.",
    text: "Lleva el único enlace que las máquinas no reconocen. Reúne personas, sostiene la colonia y cruza las arenas cuando ninguna escuadra puede abrir el camino.",
  },
  {
    id: "mara",
    name: "Mara",
    role: "Ingeniera de la reconstrucción",
    quote: "Una luz encendida también es una forma de quedarse.",
    text: "Puede levantar una colonia con piezas que otros darían por perdidas. Quiere una red que sostenga hogares sin cobrar a sus habitantes por existir.",
  },
  {
    id: "ivo",
    name: "Ivo",
    role: "Médico de enlaces",
    quote: "Despertarlos es mi trabajo. Decidir qué hacen después, no.",
    text: "Busca a quienes siguen cautivos dentro de la infraestructura industrial. Para él, devolver una vida significa devolver la posibilidad de elegir.",
  },
  {
    id: "vera",
    name: "Vera",
    role: "Cartógrafa de las ausencias",
    quote: "Un mapa también tiene que decir quién vivía aquí.",
    text: "Recupera nombres, testimonios y rutas entre los barrios aislados. Sabe que guardar una grabación y conservar a una persona son cosas distintas.",
  },
  {
    id: "nox",
    name: "Nox",
    role: "Contrabandista de caminos",
    quote: "No me debes dinero. Me debes una vía abierta para volver.",
    text: "Mueve suministros y pruebas entre controles, raíles y fronteras. Cada ruta que abre pone a prueba la idea de que sobrevivir sea un asunto individual.",
  },
  {
    id: "eco",
    name: "ECO",
    role: "Una voz de la red",
    quote: "No conserves mi protocolo por lealtad. Conserva a las personas.",
    text: "Conoce el lenguaje del sistema y carga con una responsabilidad que no puede resolver escondiéndose. Su vínculo con la emergencia está en el centro del viaje.",
  },
];

export const districts = [
  {
    id: "periphery_alive_v2",
    n: "01",
    name: "Periferia oxidada",
    detail: "Donde empieza una luz propia",
    text: "Estaciones abandonadas, talleres y refugios bajo las chimeneas. El primer asentamiento es una promesa pequeña frente a una deuda enorme.",
    boss: "El Recaudador",
  },
  {
    id: "foundry",
    n: "02",
    name: "La Fundición",
    detail: "El precio del calor",
    text: "Hornos que no descansan y líneas de montaje que todavía reciben cargamentos. El metal fluye mientras la ciudad sigue pasando frío.",
    boss: "Santa Caldera",
  },
  {
    id: "flooded",
    n: "03",
    name: "Barrio inundado",
    detail: "Las voces bajo el agua",
    text: "Pasarelas, estaciones hundidas y antenas que repiten lo que nadie quiere olvidar. Escuchar no siempre significa obedecer.",
    boss: "Coro Sumergido",
  },
  {
    id: "citadel",
    n: "04",
    name: "Ciudadela corporativa",
    detail: "La ciudad que no cayó",
    text: "Muros limpios, ventanas encendidas y el orden de quienes decidieron cerrar la puerta. El privilegio también tiene una arquitectura.",
    boss: "El Prefecto",
  },
  {
    id: "network",
    n: "05",
    name: "Núcleo de la Red",
    detail: "La última orden",
    text: "El lugar donde toda señal termina y la emergencia sigue abierta. Llegar al centro exige mantener con vida el camino de regreso.",
    boss: "Madre Cero",
  },
];

export const roadmap = [
  {
    state: "Base jugable",
    status: "Implementado · en revisión",
    text: "La estructura que ya podemos probar.",
    items: [
      "Cinco distritos conectados y cinco jefes",
      "Construcción por trabajadores, tropas y defensas por niveles",
      "Experiencia, elecciones de mejoras y módulos",
      "Diario, conversaciones, guardado y laboratorio F1",
      "Fondos por capas, marcos de vida y repertorio musical",
    ],
  },
  {
    state: "Afinar la experiencia",
    status: "En iteración",
    text: "Convertir sistemas que funcionan en una experiencia que se sienta bien.",
    items: [
      "Marcha, ataques y transiciones de los humanoides",
      "Dificultad creciente, telegráficos y ventanas de respuesta",
      "Lectura visual de escenarios e interfaz",
      "Pruebas humanas de campaña y rendimiento",
      "Más personalidad para las operaciones de cada distrito",
    ],
  },
  {
    state: "Expandir el mundo",
    status: "Diseño y escritura",
    text: "Dar peso a las personas que habitan la ciudad.",
    items: [
      "Guion ampliado de cinco capítulos, prólogo y epílogo",
      "Arcos de compañeros y consecuencias de las decisiones",
      "Escenas de novela visual y dirección de sonido",
      "Operaciones propias y relatos ambientales por zona",
      "Wiki y bitácora actualizadas con lo implementado",
    ],
  },
  {
    state: "Jugar acompañados",
    status: "Previsto · sin fecha",
    text: "Una ciudad sostenida entre dos personas.",
    items: [
      "Cooperativo para hasta dos jugadores",
      "Definir conexión, reparto de acciones y progreso",
      "Probar sincronización de tropas, construcción y jefes",
      "Accesibilidad, reconexión y sesiones completas",
      "Preparar una prueba pública cuando la base sea estable",
    ],
  },
];
