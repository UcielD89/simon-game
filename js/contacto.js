"use strict";
var formulario;
function validar_nombre_contacto(nombre) {
  var patron;
  patron = /^[a-zA-Z0-9\s]+$/;
  return patron.test(nombre) && nombre.trim().length > 0;
}
function validar_email(email) {
  var patron;
  patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(email);
}
function validar_mensaje(mensaje) {
  return mensaje.trim().length > 5;
}
function ocultar_error(idError) {
  var elementoError;
  elementoError = document.getElementById(idError);
  elementoError.textContent = "";
  elementoError.style.display = "none";
}
function mostrar_error(idError, mensaje) {
  var elementoError;
  elementoError = document.getElementById(idError);
  elementoError.textContent = mensaje;
  elementoError.style.display = "block";
}
function limpiar_errores() {
  ocultar_error("error-nombre");
  ocultar_error("error-email");
  ocultar_error("error-mensaje");
}
function abrir_cliente_email(nombre, email, mensaje) {
  var asunto;
  var cuerpo;
  var mailtoLink;
  asunto = "Contacto desde Simon Says - " + nombre;
  cuerpo = "Nombre: " + nombre + "%0D%0A";
  cuerpo += "Email: " + email + "%0D%0A%0D%0A";
  cuerpo += "Mensaje:%0D%0A" + encodeURIComponent(mensaje);
  mailtoLink =
    "mailto:contacto@simonsays.com?subject=" +
    encodeURIComponent(asunto) +
    "&body=" +
    cuerpo;
  window.location.href = mailtoLink;
}
function manejar_envio_formulario(evento) {
  var nombre;
  var email;
  var mensaje;
  var esValido;
  evento.preventDefault();
  limpiar_errores();
  nombre = document.getElementById("nombre-contacto").value;
  email = document.getElementById("email-contacto").value;
  mensaje = document.getElementById("mensaje-contacto").value;
  esValido = true;
  if (!validar_nombre_contacto(nombre)) {
    mostrar_error("error-nombre", "El nombre debe ser alfanumérico");
    esValido = false;
  }
  if (!validar_email(email)) {
    mostrar_error("error-email", "El email no es válido");
    esValido = false;
  }
  if (!validar_mensaje(mensaje)) {
    mostrar_error("error-mensaje", "El mensaje debe tener más de 5 caracteres");
    esValido = false;
  }
  if (esValido) {
    abrir_cliente_email(nombre, email, mensaje);
  }
}
function inicializar_contacto() {
  formulario = document.getElementById("formulario-contacto");
  formulario.addEventListener("submit", manejar_envio_formulario);
}
document.addEventListener("DOMContentLoaded", inicializar_contacto);
