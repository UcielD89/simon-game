"use strict";
var estado_juego = "inicio";
var puede_jugar = false;
var indice_actual = 0;
function reproducir_sonido(indice) {
  if (indice === 0) {
    playTone("amarillo");
  }
  if (indice === 1) {
    playTone("azul");
  }
  if (indice === 2) {
    playTone("verde");
  }
  if (indice === 3) {
    playTone("rojo");
  }
}
function iluminar_boton(indice) {
  var botones;
  var boton;
  botones = document.querySelectorAll(".tablero-boton");
  boton = botones[indice];
  boton.classList.add("activo");
  reproducir_sonido(indice);
  setTimeout(function () {
    boton.classList.remove("activo");
  }, 400);
}
function mostrar_secuencia() {
  var intervalo_secuencia;
  indice_actual = 0;
  intervalo_secuencia = setInterval(function () {
    if (indice_actual < secuencia_juego.length) {
      iluminar_boton(secuencia_juego[indice_actual]);
      indice_actual++;
    } else {
      clearInterval(intervalo_secuencia);
      puede_jugar = true;
    }
  }, 600);
}
function actualizar_puntaje() {
  var puntaje_elemento;
  puntaje_elemento = document.getElementById("puntaje-contador");
  puntaje_elemento.textContent = total_punto;
}
function actualizar_nivel() {
  var nivel_elemento;
  nivel_elemento = document.getElementById("nivel-contandor");
  nivel_elemento.textContent = obtener_nivel_actual();
}
function agregar_nuevo_color() {
  puede_jugar = false;
  crear_secuencia();
  actualizar_nivel();
  mostrar_secuencia();
}
function mostrar_modal_fin_juego(puntaje, nivel) {
  var modal_juego_terminado;
  var puntaje_final;
  var nivel_final;
  modal_juego_terminado = document.getElementById("modal-juego-terminado");
  puntaje_final = document.getElementById("puntaje-final-contador");
  nivel_final = document.getElementById("nivel-final-contador");
  puntaje_final.textContent = puntaje;
  nivel_final.textContent = nivel;
  modal_juego_terminado.style.display = "flex";
}
function finalizar_juego() {
  var total_ms;
  var penalizacion_total;
  var puntaje_final;
  var nivel_final;
  estado_juego = "finalizado";
  puede_jugar = false;
  detener_tiempo();
  total_ms = calcular_segundos(tiempo_transcurrido);
  penalizacion_total = penalizacion_tiempo(total_ms, penalizacion);
  puntaje_final = total_punto - penalizacion_total;
  if (puntaje_final < 0) {
    puntaje_final = 0;
  }
  nivel_final = obtener_nivel_actual();
  guardar_partida(
    nombre_jugador,
    puntaje_final,
    nivel_final,
    tiempo_transcurrido
  );
  mostrar_modal_fin_juego(puntaje_final, nivel_final);
}
function verificar_secuencia() {
  var es_correcto;
  es_correcto = comparar_secuencia(secuencia_juego, secuencia_jugador);
  if (!es_correcto) {
    finalizar_juego(false);
    return;
  }
  total_punto = total_punto + 1;
  actualizar_puntaje();
  if (secuencia_jugador.length === secuencia_juego.length) {
    puede_jugar = false;
    secuencia_jugador.length = 0;
    setTimeout(function () {
      agregar_nuevo_color();
    }, 1000);
  }
}
function manejar_click_color(evento) {
  var boton;
  var color_index;
  if (!puede_jugar || estado_juego !== "jugando") {
    return;
  }
  boton = evento.currentTarget;
  color_index = parseInt(boton.getAttribute("data-color"));
  iluminar_boton(color_index);
  crear_secuencia_jugador(color_index);
  verificar_secuencia();
}
function iniciar_partida() {
  limpiar_secuencias();
  estado_juego = "jugando";
  iniciar_tiempo();
  agregar_nuevo_color();
}
function manejar_inicio_juego() {
  var input_nombre;
  var txt_nombre_jugador;
  var nombre;
  var error_nombre;
  var pantalla_inicio;
  var pantalla_juego;
  input_nombre = document.getElementById("campo-nombre");
  txt_nombre_jugador = document.getElementById("jugador");
  nombre = input_nombre.value.trim();
  error_nombre = document.getElementById("campo-error-nombre");
  if (!validar_nombre(nombre)) {
    error_nombre.textContent = "El nombre debe tener al menos 3 letras";
    error_nombre.style.display = "block";
    return;
  }
  error_nombre.style.display = "none";
  txt_nombre_jugador.innerText = nombre;
  nombre_jugador = nombre;
  pantalla_inicio = document.getElementById("seccion-inicio");
  pantalla_juego = document.getElementById("seccion-juego");
  pantalla_inicio.style.display = "none";
  pantalla_juego.style.display = "flex";
  iniciar_partida();
}
function manejar_reinicio_juego() {
  var pantalla_juego;
  var pantalla_inicio;
  var modal_juego_terminado;
  var puntaje_elemento;
  var nivel_elemento;
  var tiempo_elemento;
  pantalla_juego = document.getElementById("seccion-juego");
  pantalla_inicio = document.getElementById("seccion-inicio");
  modal_juego_terminado = document.getElementById("modal-juego-terminado");
  pantalla_juego.style.display = "none";
  modal_juego_terminado.style.display = "none";
  pantalla_inicio.style.display = "flex";
  reiniciar_juego();
  puntaje_elemento = document.getElementById("puntaje-contador");
  nivel_elemento = document.getElementById("nivel-contandor");
  tiempo_elemento = document.getElementById("tiempo-contador");
  puntaje_elemento.textContent = "0";
  nivel_elemento.textContent = "0";
  tiempo_elemento.textContent = "0:00";
}
function mostrar_lista_partidas(partidas) {
  var lista;
  var i;
  var partida;
  var fila;
  var posicion;
  var nombre;
  var puntaje;
  var nivel;
  var fecha;
  lista = document.getElementById("lista-partidas");
  lista.innerHTML = "";
  if (partidas.length === 0) {
    lista.innerHTML = "<p>No hay partidas guardadas</p>";
    return;
  }
  for (i = 0; i < partidas.length; i++) {
    partida = partidas[i];
    fila = document.createElement("div");
    fila.className = "fila-partida";
    posicion = document.createElement("span");
    posicion.textContent = i + 1 + ".";
    nombre = document.createElement("span");
    nombre.textContent = partida.nombre;
    puntaje = document.createElement("span");
    puntaje.textContent = "Puntos: " + partida.puntaje;
    nivel = document.createElement("span");
    nivel.textContent = "Nivel: " + partida.nivel;
    fecha = document.createElement("span");
    fecha.textContent = partida.fecha;
    fila.appendChild(posicion);
    fila.appendChild(nombre);
    fila.appendChild(puntaje);
    fila.appendChild(nivel);
    fila.appendChild(fecha);
    lista.appendChild(fila);
  }
}
function manejar_cerrar_ranking() {
  var modal_ranking;
  modal_ranking = document.getElementById("modal-ranking");
  modal_ranking.style.display = "none";
}
function manejar_ordenar_puntaje() {
  var partidas;
  var partidas_ordenadas;
  partidas = obtener_partidas();
  partidas_ordenadas = ordenar_partidas_por_puntaje(partidas);
  mostrar_lista_partidas(partidas_ordenadas);
}
function manejar_ordenar_fecha() {
  var partidas;
  var partidas_ordenadas;
  partidas = obtener_partidas();
  partidas_ordenadas = ordenar_partidas_por_fecha(partidas);
  mostrar_lista_partidas(partidas_ordenadas);
}
function manejar_mostrar_ranking() {
  var modal_ranking;
  var partidas;
  var partidas_ordenadas;
  modal_ranking = document.getElementById("modal-ranking");
  partidas = obtener_partidas();
  partidas_ordenadas = ordenar_partidas_por_puntaje(partidas);
  mostrar_lista_partidas(partidas_ordenadas);
  modal_ranking.style.display = "flex";
}
function inicializar_juego() {
  var boton_empezar;
  var boton_reiniciar;
  var boton_ranking;
  var boton_ranking_juego_termiando;
  var boton_cerrar_ranking;
  var tablero_boton;
  var boton_ordenar_puntaje;
  var boton_ordenar_fecha;
  var i;
  boton_empezar = document.getElementById("boton-empezar");
  boton_reiniciar = document.getElementById("boton-reiniciar");
  boton_ranking = document.getElementById("boton-ranking");
  boton_ranking_juego_termiando = document.getElementById(
    "boton-ranking-juego-terminando"
  );
  boton_cerrar_ranking = document.getElementById("cerrar-ranking");
  tablero_boton = document.querySelectorAll(".tablero-boton");
  boton_ordenar_puntaje = document.getElementById("ordenar-puntaje");
  boton_ordenar_fecha = document.getElementById("ordenar-fecha");
  boton_empezar.addEventListener("click", manejar_inicio_juego);
  boton_reiniciar.addEventListener("click", manejar_reinicio_juego);
  boton_ranking.addEventListener("click", manejar_mostrar_ranking);
  boton_ranking_juego_termiando.addEventListener(
    "click",
    manejar_mostrar_ranking
  );
  boton_cerrar_ranking.addEventListener("click", manejar_cerrar_ranking);
  boton_ordenar_puntaje.addEventListener("click", manejar_ordenar_puntaje);
  boton_ordenar_fecha.addEventListener("click", manejar_ordenar_fecha);
  for (i = 0; i < tablero_boton.length; i++) {
    tablero_boton[i].addEventListener("click", manejar_click_color);
  }
}
document.addEventListener("DOMContentLoaded", inicializar_juego);
