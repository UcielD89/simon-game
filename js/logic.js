'use strict';
// Variables globales del juego
var secuencia_juego = [];
var secuencia_jugador = [];
var intervalo = null;
var tiempo_transcurrido = "00:00:00";
var penalizacion = 20;
var total_punto = 0;
var nombre_jugador = "";
// Valida que el nombre tenga al menos 3 caracteres
function validar_nombre(nombre) {
    if (nombre.length < 3) {
        return false;
    }
    return true;
}
// Genera un numero aleatorio entre 0 y 3 para representar los colores
function color_random() {
    return Math.floor(Math.random() * 4);
}
// Agrega un nuevo color aleatorio a la secuencia del juego
function crear_secuencia() {
    var valores = color_random();
    secuencia_juego.push(valores);
    return secuencia_juego;
}
// Agrega el color presionado por el jugador a su secuencia
function crear_secuencia_jugador(valor) {
    secuencia_jugador.push(valor);
    return secuencia_jugador;
}
// Compara la secuencia del jugador con la secuencia correcta
function comparar_secuencia(secuencia_juego, secuencia_jugador) {
    for (var i = 0; i < secuencia_jugador.length; i++) {
        if (secuencia_juego[i] !== secuencia_jugador[i]) {
            return false;
        }
    }
    return true;
}
// Limpia ambas secuencias para iniciar una nueva partida
function limpiar_secuencias() {
    secuencia_juego.length = 0;
    secuencia_jugador.length = 0;
}
// Inicia el cronometro de la partida y actualiza cada 10ms
function iniciar_tiempo() {
    var tiempo_inicial = Date.now();
    intervalo = setInterval(function() {
        var tiempo_actual = Date.now();
        var transcurrido = tiempo_actual - tiempo_inicial;
        var ms = transcurrido % 1000;
        var ms_formateado = ms.toString().padStart(3, '0');
        var segundos = Math.floor((transcurrido / 1000) % 60);
        var segundos_formateados = segundos.toString().padStart(2, '0');
        var minutos = Math.floor(transcurrido / 60000);
        var minutos_formateados = minutos.toString().padStart(2, '0');
        tiempo_transcurrido = minutos_formateados + ":" + segundos_formateados + ":" + ms_formateado;
        var tiempo_elemento = document.getElementById("tiempo__contador");
        if (tiempo_elemento) {
            tiempo_elemento.textContent = minutos_formateados + ":" + segundos_formateados;
        }
    }, 10);
}
// Detiene el cronometro de la partida
function detener_tiempo() {
    clearInterval(intervalo);
}
// Convierte el tiempo en formato MM:SS:MS a milisegundos totales
function calcular_segundos(tiempo_transcurrido) {
    var tiempo_partes = tiempo_transcurrido.split(":");
    var minutos = parseInt(tiempo_partes[0], 10);
    var segundos = parseInt(tiempo_partes[1], 10);
    var milisegundos = parseInt(tiempo_partes[2], 10);
    var total_ms = (minutos * 60000) + (segundos * 1000) + milisegundos;
    return total_ms;
}
// Calcula cuantos puntos se deben restar segun el tiempo transcurrido
function penalizacion_tiempo(total_ms, penalizacion) {
    var penalizacion_ms = penalizacion * 1000;
    var penalizacion_total = Math.floor(total_ms / penalizacion_ms);
    return penalizacion_total;
}
// Calcula el puntaje final: 2 puntos por nivel menos la penalizacion
function calculo_punto(penalizacion_total, secuencia_juego) {
    var puntos = secuencia_juego.length;
    total_punto = puntos - penalizacion_total;
    if (total_punto < 0) {
        total_punto = 0;
    }
    return total_punto;
}

// Guarda la partida actual en localStorage con todos sus datos
function guardar_partida(nombre, puntaje, nivel, tiempo) {
    var partidas = localStorage.getItem("partidas");
    var lista_partidas = [];
    if (partidas !== null) {
        lista_partidas = JSON.parse(partidas);
    }
    var fecha_actual = new Date();
    var fecha_formateada = fecha_actual.toLocaleDateString() + " " + fecha_actual.toLocaleTimeString();
    var nueva_partida = {
        nombre: nombre,
        puntaje: puntaje,
        nivel: nivel,
        tiempo: tiempo,
        fecha: fecha_formateada
    };
    lista_partidas.push(nueva_partida);
    localStorage.setItem("partidas", JSON.stringify(lista_partidas));
}
// Obtiene todas las partidas guardadas en localStorage
function obtener_partidas() {
    var partidas = localStorage.getItem("partidas");
    if (partidas === null) {
        return [];
    }
    return JSON.parse(partidas);
}
// Ordena las partidas de mayor a menor puntaje
function ordenar_partidas_por_puntaje(partidas) {
    return partidas.sort(function(a, b) {
        return b.puntaje - a.puntaje;
    });
}
// Ordena las partidas de mas reciente a mas antigua
function ordenar_partidas_por_fecha(partidas) {
    return partidas.sort(function(a, b) {
        var fecha_a = new Date(a.fecha);
        var fecha_b = new Date(b.fecha);
        return fecha_b - fecha_a;
    });
}
// Obtiene el nivel actual del juego
function obtener_nivel_actual() {
    return secuencia_juego.length;
}
// Reinicia todas las variables para comenzar una nueva partida
function reiniciar_juego() {
    limpiar_secuencias();
    detener_tiempo();
    tiempo_transcurrido = "00:00:00";
    total_punto = 0;
    var tiempo_elemento = document.getElementById("tiempo__contador");
    if (tiempo_elemento) {
        tiempo_elemento.textContent = "0:00";
    }
}