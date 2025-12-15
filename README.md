# Juego Simon
Repositorio oficial / Juego Simon 
Este es un proyecto desarrollado con fines académicos para la materia "Introducción a la Programación Web" de la carrera LGTI. Consiste en una implementación completa del clásico juego "Simón Dice" utilizando tecnologías web estándar: HTML5, CSS3 y JavaScript (ES5).

##  Características Principales
El proyecto implementa la lógica completa del juego "Simon Says", cumpliendo con todos los requerimientos obligatorios y deseados especificados para el trabajo final integrador.

# feature-patron
Generación de secuencia del juego:
La función crear_sencuencia() agrega un nuevo número aleatorio (0–3) al array secuencia_juego, representando el patrón que el usuario debe repetir.
Registro de la secuencia del jugador:
crear_sencuencia_jugador(valor) almacena la entrada del usuario para poder validar su progreso.
Comparación de secuencias:
La función comparar_secuencia() realiza una comparación paso a paso entre la secuencia generada por el juego y la ingresada por el jugador.
Devuelve true si las jugadas coinciden o false si el usuario comete un error.
Limpieza del estado del juego:
limpiar_secuencias() restablece ambas secuencias (secuencia_juego y secuncia_jugador) para iniciar una nueva partida o reiniciar el nivel.

# feature-flujo-ranking
Gestión del flujo completo del juego y ranking persistente:
Control del estado del juego:
Se incorporan variables de control (estado_juego, puede_jugar, indice_actual) para gestionar las distintas etapas del juego (inicio, jugando y finalizado), evitando acciones inválidas fuera del flujo esperado.
Inicialización y vinculación de eventos del DOM:
La función inicializar_juego() centraliza la asignación de todos los eventos del usuario (inicio de juego, clics de colores, reinicio, visualización y cierre del ranking), asegurando un punto único de arranque cuando el DOM está completamente cargado.
Flujo de inicio de partida:
manejar_inicio_juego() valida el nombre del jugador y gestiona la transición entre la pantalla inicial y la pantalla de juego, iniciando una nueva partida de forma controlada.
Ejecución del juego y validación de jugadas:
Se implementa la lógica de:
generación progresiva de la secuencia,
reproducción visual y sonora del patrón,
captura de la secuencia ingresada por el jugador,
verificación paso a paso de la jugada mediante verificar_secuencia().
Gestión de niveles y puntaje:
El sistema actualiza dinámicamente el nivel y el puntaje en pantalla, calculando el puntaje final en función del nivel alcanzado y una penalización por tiempo de juego.
Cronómetro y penalización por tiempo:
Se incorpora un cronómetro que mide la duración de la partida en milisegundos, aplicando penalizaciones proporcionales al tiempo transcurrido mediante penalizacion_tiempo().
Persistencia de partidas con localStorage:
Cada partida finalizada se guarda en localStorage, almacenando nombre del jugador, puntaje, nivel alcanzado, tiempo total y fecha de la partida.
Visualización y ordenamiento del ranking:
Se implementa un modal de ranking que permite:
mostrar todas las partidas guardadas,
ordenar el ranking por puntaje o por fecha,
renderizar dinámicamente la lista de resultados en pantalla.
Reinicio y limpieza del estado:
Las funciones de reinicio permiten volver al estado inicial del juego, limpiando secuencias, cronómetro y variables de control para comenzar una nueva partida sin inconsistencias.

## Cómo Jugar


## Estructura del Proyecto

simon-says/
├── css/
│   └── styles.css        # Estilos, animaciones y diseño responsivo
├── js/
│   ├── logic.js          # Lógica del juego y funciones core
│   └── script.js         # Flujo del juego y manejo del DOM
├── img/                  # Recursos de imagen
├── index.html            # Página principal del juego
└── README.md             # Documentación del proyecto.

## Tecnologías Utilizadas
* **HTML5**: Estructura semántica con doctype, viewport y charset correctamente definidos
* **CSS3**: 
  * Diseño con Flexbox (sin uso de grid ni float)
  * Animaciones y transiciones fluidas
  * Diseño completamente responsivo
* **JavaScript (ES5 estricto)**:
  * Código en modo estricto (`'use strict'`)
  * Sin uso de ES6 (let, const, arrow functions)
  * Manejo de eventos con `addEventListener`
  * Almacenamiento con `localStorage`
  * Manipulación del DOM

## Autores
**Daro, Uciel - Corbalan Franco**
- Carrera: LGTI 2025
- Materia: Introducción a la Programación Web
- Profesor: Ing. Marañes Darío