"use strict";
var secuencia_juego = [];
var secuencia_jugador = [];
var intervalo = null;
var tiempo_transcurrido = "00:00:00";
var penalizacion = 20;
var total_punto = 0;
var nombre_jugador = "";
function validar_nombre(nombre) {
  if (nombre.length < 3) {
    return false;
  }
  return true;
}
function color_random() {
  return Math.floor(Math.random() * 4);
}
function crear_secuencia() {
  var valores;
  valores = color_random();
  secuencia_juego.push(valores);
  return secuencia_juego;
}
function crear_secuencia_jugador(valor) {
  secuencia_jugador.push(valor);
  return secuencia_jugador;
}
function limpiar_secuencias() {
  secuencia_juego.length = 0;
  secuencia_jugador.length = 0;
}
function comparar_secuencia(secuencia_juego, secuencia_jugador) {
  var i;
  for (i = 0; i < secuencia_jugador.length; i++) {
    if (secuencia_juego[i] !== secuencia_jugador[i]) {
      return false;
    }
  }
  return true;
}
function detener_tiempo() {
  clearInterval(intervalo);
}
function iniciar_tiempo() {
  var tiempo_inicial;
  tiempo_inicial = Date.now();
  intervalo = setInterval(function () {
    var tiempo_actual;
    var transcurrido;
    var ms;
    var ms_formateado;
    var segundos;
    var segundos_formateados;
    var minutos;
    var minutos_formateados;
    var tiempo_elemento;
    tiempo_actual = Date.now();
    transcurrido = tiempo_actual - tiempo_inicial;
    ms = transcurrido % 1000;
    ms_formateado = ms.toString().padStart(3, "0");
    segundos = Math.floor((transcurrido / 1000) % 60);
    segundos_formateados = segundos.toString().padStart(2, "0");
    minutos = Math.floor(transcurrido / 60000);
    minutos_formateados = minutos.toString().padStart(2, "0");
    tiempo_transcurrido =
      minutos_formateados + ":" + segundos_formateados + ":" + ms_formateado;
    tiempo_elemento = document.getElementById("tiempo-contador");
    if (tiempo_elemento) {
      tiempo_elemento.textContent =
        minutos_formateados + ":" + segundos_formateados;
    }
  }, 10);
}
function calcular_segundos(tiempo_transcurrido) {
  var tiempo_partes;
  var minutos;
  var segundos;
  var milisegundos;
  var total_ms;
  tiempo_partes = tiempo_transcurrido.split(":");
  minutos = parseInt(tiempo_partes[0], 10);
  segundos = parseInt(tiempo_partes[1], 10);
  milisegundos = parseInt(tiempo_partes[2], 10);
  total_ms = minutos * 60000 + segundos * 1000 + milisegundos;
  return total_ms;
}
function penalizacion_tiempo(total_ms, penalizacion) {
  var penalizacion_ms;
  var penalizacion_total;
  penalizacion_ms = penalizacion * 1000;
  penalizacion_total = Math.floor(total_ms / penalizacion_ms);
  return penalizacion_total;
}
function calculo_punto(penalizacion_total, secuencia_juego) {
  var puntos;
  puntos = secuencia_juego.length;
  total_punto = puntos - penalizacion_total;
  if (total_punto < 0) {
    total_punto = 0;
  }
  return total_punto;
}
function obtener_partidas() {
  var partidas;
  partidas = localStorage.getItem("partidas");
  if (partidas === null) {
    return [];
  }
  return JSON.parse(partidas);
}
function guardar_partida(nombre, puntaje, nivel, tiempo) {
  var partidas;
  var lista_partidas;
  var fecha_actual;
  var fecha_formateada;
  var nueva_partida;
  partidas = localStorage.getItem("partidas");
  lista_partidas = [];
  if (partidas !== null) {
    lista_partidas = JSON.parse(partidas);
  }
  fecha_actual = new Date();
  fecha_formateada =
    fecha_actual.toLocaleDateString() + " " + fecha_actual.toLocaleTimeString();
  nueva_partida = {
    nombre: nombre,
    puntaje: puntaje,
    nivel: nivel,
    tiempo: tiempo,
    fecha: fecha_formateada,
  };
  lista_partidas.push(nueva_partida);
  localStorage.setItem("partidas", JSON.stringify(lista_partidas));
}
function ordenar_partidas_por_puntaje(partidas) {
  return partidas.sort(function (a, b) {
    return b.puntaje - a.puntaje;
  });
}
function ordenar_partidas_por_fecha(partidas) {
  return partidas.sort(function (a, b) {
    var fecha_a;
    var fecha_b;
    fecha_a = new Date(a.fecha);
    fecha_b = new Date(b.fecha);
    return fecha_b - fecha_a;
  });
}
function obtener_nivel_actual() {
  return secuencia_juego.length;
}
function reiniciar_juego() {
  var tiempo_elemento;
  limpiar_secuencias();
  detener_tiempo();
  tiempo_transcurrido = "00:00:00";
  total_punto = 0;
  tiempo_elemento = document.getElementById("tiempo-contador");
  if (tiempo_elemento) {
    tiempo_elemento.textContent = "0:00";
  }
}
