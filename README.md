# 🎮 Juego Simon

Repositorio oficial del **Juego Simon**  
Proyecto académico desarrollado para la materia **Introducción a la Programación Web** – Carrera **LGTI**

---

## 📌 Descripción General

Este proyecto consiste en una implementación completa del clásico juego **“Simón Dice”**, desarrollada utilizando **HTML5, CSS3 y JavaScript (ES5)**.  
El objetivo es repetir correctamente una secuencia de colores generada de forma aleatoria, la cual aumenta su dificultad en cada nivel.

---

## ✨ Características Principales

- Implementación completa de la lógica del juego
- Flujo de juego controlado por estados
- Sistema de niveles y puntaje
- Ranking persistente mediante `localStorage`
- Interfaz responsiva y animada
- Validaciones y control de errores del usuario

---

## 🧩 Funcionalidades del Juego

### 🔹 Generación y validación de secuencias
- Generación automática de patrones aleatorios (valores 0–3)
- Registro de la secuencia ingresada por el jugador
- Comparación paso a paso entre la secuencia del juego y la del usuario
- Detección inmediata de errores

### 🔹 Gestión del estado del juego
- Control de estados: inicio, jugando y finalizado
- Prevención de acciones inválidas fuera del flujo esperado
- Limpieza completa del estado para reinicios seguros

---

## 🏆 Ranking y Flujo Avanzado

### 🔸 Inicio y ejecución de la partida
- Validación del nombre del jugador
- Transición controlada entre pantallas
- Reproducción visual y sonora de la secuencia
- Captura y verificación de cada jugada

### 🔸 Sistema de niveles y puntaje
- Incremento progresivo de dificultad
- Puntaje dinámico basado en:
  - Nivel alcanzado
  - Penalización por tiempo de juego

### 🔸 Cronómetro y penalización
- Medición del tiempo total de partida en milisegundos
- Penalización proporcional según duración del juego

### 🔸 Persistencia y ranking
- Almacenamiento de partidas en `localStorage`
- Datos guardados:
  - Nombre del jugador
  - Puntaje final
  - Nivel alcanzado
  - Tiempo total
  - Fecha de la partida
- Visualización del ranking en un modal
- Ordenamiento por puntaje o fecha

---

## 🕹️ Cómo Jugar

1. Ingresar el nombre del jugador
2. Presionar **Iniciar Juego**
3. Observar la secuencia de colores
4. Repetir la secuencia en el orden correcto
5. Avanzar de nivel o finalizar la partida al cometer un error
6. Consultar el ranking al finalizar

---

## 🗂️ Estructura del Proyecto

```text
/css
└── contacto.css
└── normalize.css
└── styles.css
/img
/js
└── audio.js
└── contacto.js
└── login.js
└── script.js
/.gitignore
/contacto.html
/index.html
/LICENSE
/README.md
```

## 🛠️ Tecnologías Utilizadas

### 🔹 HTML5
- Estructura semántica correcta
- Uso de `doctype`, `meta charset` y `viewport`

### 🔹 CSS3
- Diseño con **Flexbox**
- Animaciones y transiciones
- Diseño completamente responsivo
- Sin uso de Grid ni Float

### 🔹 JavaScript (ES5 estricto)
- Uso de `'use strict'`
- Sin características ES6
- Manejo de eventos con `addEventListener`
- Manipulación del DOM
- Persistencia con `localStorage`

---

## 👥 Autores

**Daro, Uciel**  
**Corbalán, Franco**

- 🎓 Carrera: LGTI 2025  
- 📘 Materia: Introducción a la Programación Web  
- 👨‍🏫 Profesor: Ing. Marañes Darío