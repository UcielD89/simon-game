"use strict";
// Variables de control del flujo del juego
var estado_juego = "inicio";
var puede_jugar = false;
var indice_actual = 0;
// Inicializa el juego vinculando todos los eventos del DOM
function inicializar_juego() {
  var boton_empezar = document.getElementById("boton__empezar");
  var boton_reiniciar = document.getElementById("boton__reiniciar");
  var boton_ranking = document.getElementById("boton__ranking");
  var boton_ranking_juego_termiando = document.getElementById("boton__ranking__juego-terminando");
  var boton_cerrar_ranking = document.getElementById("cerrar-ranking");
  var tablero__boton = document.querySelectorAll(".tablero__boton");
  var boton_ordenar_puntaje = document.getElementById("ordenar-puntaje");
  var boton_ordenar_fecha = document.getElementById("ordenar-fecha");
  boton_empezar.addEventListener("click", manejar_inicio_juego);
  boton_reiniciar.addEventListener("click", manejar_reinicio_juego);
  boton_ranking.addEventListener("click", manejar_mostrar_ranking);
  boton_ranking_juego_termiando.addEventListener("click", manejar_mostrar_ranking);
  boton_cerrar_ranking.addEventListener("click", manejar_cerrar_ranking);
  boton_ordenar_puntaje.addEventListener("click", manejar_ordenar_puntaje);
  boton_ordenar_fecha.addEventListener("click", manejar_ordenar_fecha);
  for (var i = 0; i < tablero__boton.length; i++) {;
    tablero__boton[i].addEventListener("click", manejar_click_color);
  }
}
// Maneja el inicio del juego validando el nombre del jugador
function manejar_inicio_juego() {
  var input_nombre = document.getElementById("campo__nombre");
  var nombre = input_nombre.value.trim();
  var error_nombre = document.getElementById("campo__error-nombre");
  if (!validar_nombre(nombre)) {
    error_nombre.textContent = "El nombre debe tener al menos 3 letras";
    error_nombre.style.display = "block";
    return;
  }
  error_nombre.style.display = "none";
  nombre_jugador = nombre;
  var pantalla_inicio = document.getElementById("seccion__inicio");
  var pantalla_juego = document.getElementById("seccion__juego");
  pantalla_inicio.style.display = "none";
  pantalla_juego.style.display = "flex";
  iniciar_partida();
}
// Inicia una nueva partida limpiando datos previos
function iniciar_partida() {
  limpiar_secuencias();
  estado_juego = "jugando";
  iniciar_tiempo();
  agregar_nuevo_color();
}
// Agrega un nuevo color a la secuencia y la muestra
function agregar_nuevo_color() {
  puede_jugar = false;
  crear_secuencia();
  actualizar_nivel();
  mostrar_secuencia();
}
// Muestra la secuencia completa iluminando cada boton uno por uno
function mostrar_secuencia() {
  indice_actual = 0;
  var intervalo_secuencia = setInterval(function () {
    if (indice_actual < secuencia_juego.length) {
      iluminar_boton(secuencia_juego[indice_actual]);
      indice_actual++;
    } else {
      clearInterval(intervalo_secuencia);
      puede_jugar = true;
    }
  }, 600);
}
// Ilumina un boton aplicando la clase activo y reproduce su sonido
function iluminar_boton(indice) {
  var botones = document.querySelectorAll(".tablero__boton");
  var boton = botones[indice];

  boton.classList.add("activo");
  reproducir_sonido(indice);
  setTimeout(function () {
    boton.classList.remove("activo");
  }, 400);
}
// Reproduce el sonido correspondiente al boton presionado
function reproducir_sonido(indice) {
  if (indice == 0) {
    playTone("amarillo");
  }
  if (indice == 1) {
    playTone("azul");
  }
  if (indice == 2) {
    playTone("verde");
  }
  if (indice == 3) {
    playTone("rojo");
  }
}
// Maneja el click del jugador en un boton de color
function manejar_click_color(evento) {
  if (!puede_jugar || estado_juego !== "jugando") {
    return;
  }

  var boton = evento.currentTarget;
  var color_index = parseInt(boton.getAttribute("data-color"));

  iluminar_boton(color_index);
  crear_secuencia_jugador(color_index);
  verificar_secuencia();
}
// Verifica si la secuencia del jugador es correcta
function verificar_secuencia() {
  var es_correcto = comparar_secuencia(secuencia_juego, secuencia_jugador);
  if (!es_correcto) {
    finalizar_juego(false);
    return;
  }
  actualizar_puntaje();
  if (secuencia_jugador.length === secuencia_juego.length) {
    puede_jugar = false;
    secuencia_jugador.length = 0;
    setTimeout(function () {
      agregar_nuevo_color();
    }, 1000);
  }
}

// Actualiza el puntaje mostrado en pantalla
function actualizar_puntaje() {
  var puntaje_elemento = document.getElementById("puntaje__contador");
  puntaje_elemento.textContent = total_punto;  
}
// Actualiza el nivel actual mostrado en pantalla
function actualizar_nivel() {
  var nivel_elemento = document.getElementById("nivel__contandor");
  nivel_elemento.textContent = obtener_nivel_actual();
}
// Finaliza el juego calculando el puntaje y guardando la partida
function finalizar_juego(gano) {
  estado_juego = "finalizado";
  puede_jugar = false;
  detener_tiempo();
  var total_ms = calcular_segundos(tiempo_transcurrido);
  var penalizacion_total = penalizacion_tiempo(total_ms, penalizacion);
  var puntaje_final = calculo_punto(penalizacion_total, secuencia_juego);
  var nivel_final = obtener_nivel_actual();
  guardar_partida(
    nombre_jugador,
    puntaje_final,
    nivel_final,
    tiempo_transcurrido
  );
  mostrar_modal_fin_juego(puntaje_final, nivel_final);
}
// Muestra el modal de fin de juego con el puntaje final
function mostrar_modal_fin_juego(puntaje, nivel) {
  var pantalla_juego = document.getElementById("seccion__juego");
  var seccion_juego_terminado = document.getElementById("seccion__juego-terminado");
  var puntaje_final = document.getElementById("puntaje__contador");
  var nivel_final = document.getElementById("nivel__contandor");
  puntaje_final.textContent = puntaje;
  nivel_final.textContent = nivel;
  pantalla_juego.style.display = "none";
  seccion_juego_terminado.style.display = "flex";
}
// Cierra el modal de fin de juego
function manejar_seccion_cerrar() {
  var seccion = document.getElementById("seccion__juego-terminado");
  seccion.style.display = "none";
}
// Reinicia el juego volviendo a la pantalla inicial
function manejar_reinicio_juego() {
  var pantalla_juego = document.getElementById("seccion__juego");
  var pantalla_inicio = document.getElementById("seccion__inicio");
  var pantalla_juego_terminado = document.getElementById("seccion__juego-terminado");
  pantalla_juego.style.display = "none";
  pantalla_juego_terminado.style.display = "none";
  pantalla_inicio.style.display = "flex";
  reiniciar_juego();
  var puntaje_elemento = document.getElementById("puntaje__contador");
  var nivel_elemento = document.getElementById("nivel__contandor");
  puntaje_elemento.textContent = "0";
  nivel_elemento.textContent = "0";
}
// Muestra el modal de ranking ordenado por puntaje
function manejar_mostrar_ranking() {
  var modal_ranking = document.getElementById("modal-ranking");
  var partidas = obtener_partidas();
  var partidas_ordenadas = ordenar_partidas_por_puntaje(partidas);

  mostrar_lista_partidas(partidas_ordenadas);
  modal_ranking.style.display = "flex";
}
// Cierra el modal de ranking
function manejar_cerrar_ranking() {
  var modal_ranking = document.getElementById("modal-ranking");
  modal_ranking.style.display = "none";
}
// Ordena el ranking por puntaje y actualiza la vista
function manejar_ordenar_puntaje() {
  var partidas = obtener_partidas();
  var partidas_ordenadas = ordenar_partidas_por_puntaje(partidas);
  mostrar_lista_partidas(partidas_ordenadas);
}
// Ordena el ranking por fecha y actualiza la vista
function manejar_ordenar_fecha() {
  var partidas = obtener_partidas();
  var partidas_ordenadas = ordenar_partidas_por_fecha(partidas);
  mostrar_lista_partidas(partidas_ordenadas);
}
// Muestra la lista de partidas en el modal de ranking
function mostrar_lista_partidas(partidas) {
  var lista = document.getElementById("lista-partidas");
  lista.innerHTML = "";
  if (partidas.length === 0) {
    lista.innerHTML = "<p>No hay partidas guardadas</p>";
    return;
  }
  for (var i = 0; i < partidas.length; i++) {
    var partida = partidas[i];
    var fila = document.createElement("div");
    fila.className = "fila-partida";
    var posicion = document.createElement("span");
    posicion.textContent = i + 1 + ".";
    var nombre = document.createElement("span");
    nombre.textContent = partida.nombre;
    var puntaje = document.createElement("span");
    puntaje.textContent = "Puntos: " + partida.puntaje;
    var nivel = document.createElement("span");
    nivel.textContent = "Nivel: " + partida.nivel;
    var fecha = document.createElement("span");
    fecha.textContent = partida.fecha;
    fila.appendChild(posicion);
    fila.appendChild(nombre);
    fila.appendChild(puntaje);
    fila.appendChild(nivel);
    fila.appendChild(fecha);
    lista.appendChild(fila);
  }
}
// Inicializa el juego cuando el DOM este completamente cargado
document.addEventListener("DOMContentLoaded", inicializar_juego);
