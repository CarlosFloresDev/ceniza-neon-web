# Producción e integración futura

## Inventario de escenas

El guion contiene 36 escenas: tres de prólogo, seis en cada uno de los cinco capítulos y tres de epílogo. La estructura desarrolla el recorrido completo; todavía requiere lectura editorial, montaje, integración y pruebas humanas. El número de escenas o palabras no demuestra una duración de cuatro horas.

| Bloque | Escenas | Función | Espacio seguro |
| --- | --- | --- | --- |
| Prólogo | P00–P02 | Marca de cobro, lámpara, encuentro con ECO | Refugio |
| Periferia | I01–I06 | Construcción de confianza, rescate y primer permiso compartido | Refugio y estación |
| Fundición | II01–II06 | Cautivos, distribución de calor y consentimiento | Almacén desacoplado y estación |
| Inundado | III01–III06 | Memoria, duelo, archivo y responsabilidad de ECO | Refugio elevado |
| Ciudadela | IV01–IV06 | Beneficiarios, pruebas, evacuación y caída del Prefecto | Estación y pausas antes/después del duelo |
| Red | V01–V06 | Separar servicios de autoridad y sostener la revocación | Salas ya aisladas y preparación |
| Epílogo | E01–E03 | Consecuencias concretas, trabajo y pertenencia | Asentamientos |

Las escenas de encuentro no deben detener a un enemigo a mitad de un golpe para proyectar una conversación extensa. El montaje utiliza entrada, cambio de fase controlado y victoria confirmada. Los avisos tácticos durante el combate se mantienen breves y con prioridad sobre ambientación.

## Contrato de integración con el prototipo

Las operaciones actuales de rescate, relé y transporte existen en los cinco capítulos. Antes de sustituir una por una operación exclusiva propuesta hay que definir condiciones de inicio, rutas, fallos recuperables, recompensas únicas y cómo se persiste su estado. La web no debe anunciar que esas operaciones nuevas ya están presentes.

La integración de diálogos debe utilizar claves estables, cajas legibles y retratos correctos. El objetivo de referencia es una intervención breve por caja; los parlamentos largos de estos documentos se dividirán en pausas semánticas sin cortar una palabra ni cambiar de hablante. No confundir una dirección de cámara con una línea que aparezca en pantalla.

Las escenas vistas se guardan para el diario. Volver a leerlas no debe repetir recompensas, reabrir operaciones ni alterar decisiones. Saltar una conversación conserva la elección confirmada o pide confirmación antes de omitirla; no selecciona una consecuencia material sin advertirlo.

## Estados narrativos propuestos

| Clave | Valores | Consecuencia visible |
| --- | --- | --- |
| `story_v2.periphery_route` | `lit_corridor`, `upper_repair` | Objeto de la lámpara y reconocimiento del rescate |
| `story_v2.foundry_heat` | `insulation`, `clinical_buffer` | Arquitectura de apoyo y trabajo de Ada |
| `story_v2.archive_custody` | `consented_access`, `distributed_custody` | Memorial y forma de consultar testimonios |
| `story_v2.citadel_route` | `lift_first`, `rail_first` | Secuencia de evacuación y reparaciones |
| `story_v2.authority` | `rotating_delegates`, `local_revocation` | Gesto de renovación del epílogo |
| `story_v2.portador_link` | `removed`, `carried_offline` | Apariencia del enlace después del final |

Son especificaciones, no claves ya añadidas al guardado. Cada operación debe confirmar el estado solo cuando se complete o se acepte la decisión correspondiente. La migración de una partida antigua tiene que permitir continuar sin inventar conversaciones vistas ni volver a cobrar costes.

Ninguna elección almacena bondad o maldad. Si una ruta requiere recursos distintos, la interfaz indica las cantidades antes de aceptar. El fallo debe poder recuperarse sin obligar a recargar por desconocer un dato oculto. Las consecuencias de un fracaso jugable necesitan escenas propias antes de habilitarlas.

## Cooperativo: guion y decisiones

El Testigo tiene retrato y configuración pendientes; no usar el retrato de un compañero para aparentar que existe un segundo protagonista. Su participación puede incorporarse como línea alternativa breve en llegada, decisión y desenlace. El resto de la escena conserva su estructura para no multiplicar innecesariamente la localización.

La sesión necesita una sola decisión persistente por hito. Antes de implementar una votación, definir cómo salir de un desacuerdo, qué sucede si alguien se desconecta y cómo se revisa la opción. La campaña individual siempre puede terminar con la confirmación de los asentamientos. El diseño no exige comprar o conectar otro jugador para obtener un final completo.

## Dirección visual

Los retratos aprobados son referencia de identidad: cabello, color de ojos, circuitos, ropa y materiales. No generar rostros nuevos para la misma persona sin comparación. El Portador no se convierte en un soldado de armadura blanca; Mara mantiene chaqueta amarilla y equipo de soldadura; Ivo conserva monóculo y abrigo clínico; Vera, bufanda violeta; Nox, cabello azul; ECO, proyección blanca y cian.

Los planos de conversación deben usar fondos adaptados a su distrito. La iluminación de la escena puede modificar la paleta, pero no borrar los rasgos de identificación. Mantener márgenes para cajas de diálogo, sin textos integrados dentro de la pintura.

### Placas prioritarias

1. Mesa de reparación de la lámpara: imagen ya creada para la web, con Mara y Portador.
2. Andén de la Periferia al amanecer, con espacio para personajes a ambos lados.
3. Almacén médico desacoplado de la Fundición: tecnología funcional y salida visible.
4. Refugio elevado del barrio inundado, marcas de agua y archivo protegido.
5. Galería de la Ciudadela con ascensor y puertas de servicio, no un castillo ajeno al mundo.
6. Mesa de enlace frente a la Red, tres estados legibles y luz de la lámpara.
7. Estación del epílogo: mismo encuadre del prólogo, modificaciones pequeñas y reconocibles.

Las placas 2–7 son lista de producción pendiente, no imágenes generadas que se afirme tener. El teaser utiliza las ilustraciones y capturas existentes sin fingir que esas escenas ya son cinemáticas del juego.

## Sonido

El repertorio actual contiene 21 pistas. Para la web se extrajo `TITLE` de los comentarios Vorbis. «Dusk Beacon» acompaña el teaser; las pistas no se renombran por su función en el juego. Las dos variantes de «Dissonant Pulse» y «Foundry District» deben distinguirse por identificador aunque compartan nombre.

La dirección de una escena no fija una música exclusiva de jefe cuando el juego usa una bolsa compartida. Antes de integrar sincronización narrativa hay que decidir si se mantiene esa bolsa o se establecen selecciones específicas. No cambiarla desde un guion sin revisar el comportamiento actual.

Ambientes por capítulo: metal y respiración de vapor; flujo térmico; lluvia y frecuencias de sonar; mecanismos limpios y eco de galería; ventilación profunda y pulsos de datos. En el epílogo, la voz vecinal y una bomba local sustituyen la orden central. La mezcla debe permitir entender el diálogo sin subir el volumen global.

Subtítulos separados de los carteles de arte, identificación de hablante y opción de reducir temblores/destellos. Los silencios de duelo no pueden confundirse con una carga bloqueada: mantener una presencia ambiental y control de avance visible.

## Plan de revisión

- Lectura completa para comprobar nombres, causalidad y continuidad de información.
- Revisar que cada compañero inicia acciones y puede disentir, no solo comentar al protagonista.
- Comprobar que el rescate distingue personas vivas y registros de memoria.
- Revisar la respuesta del grupo a ECO sin perdón automático ni bloqueo de progreso.
- Medir lectura real y sesiones de juego por capítulo; cortar repeticiones antes de alargar temporizadores.
- Probar que las elecciones producen objetos, conversaciones o situaciones observables.
- Verificar guardado, repetición de diario, saltado y futura desconexión cooperativa.
- Someter el arco del Prefecto y el desenlace a una revisión del autor antes de integrarlos.

## Reutilización pública

La página del universo ofrece premisa, personajes y distritos sin describir la revelación de ECO, las órdenes concretas del Consejo o el desenlace. Las frases nuevas de presentación se identifican como propuesta ampliada. El guion de producción no se despliega en el sitio ni se enlaza desde el dossier de prensa.
