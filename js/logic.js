'use strict';
var secuencia_juego=[];
var secuncia_jugador=[];
function color_random(){
    return  Math.floor(Math.random()*4);
}
function crear_sencuencia(){
    var valores = color_random();
    secuencia_juego.push(valores);
    return secuencia_juego;
}
/*console.log(crear_sencuencia());*/
function crear_sencuencia_jugador(valor){
    secuncia_jugador.push(valor);
    return secuncia_jugador;
}
/*console.log(crear_sencuencia_jugador(0));*/
function comparar_secuencia(secuencia_juego,secuncia_jugador){
    for (var i = 0; i<secuencia_juego.length;i++){
        if(secuencia_juego[i]!== secuncia_jugador[i]){
            return false;
        }
    }
    return true;
}
/*console.log(comparar_secuencia(secuencia_juego,secuncia_jugador));*//
function limpiar_secuencias(){
    secuencia_juego.length = 0;
    secuncia_jugador.length = 0;
}