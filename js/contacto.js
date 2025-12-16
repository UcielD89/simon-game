'use strict';

/* ******************************************************************************
 * INICIALIZACIÓN Y VINCULACIÓN DE EVENTOS
 * ******************************************************************************/

/**
 * Inicializa el formulario de contacto vinculando el evento de envío.
 * Se ejecuta cuando el DOM está completamente cargado.
 */
function inicializar_contacto() {
    var formulario = document.getElementById("formulario__contacto");
    formulario.addEventListener("submit", manejar_envio_formulario);
}

/* ******************************************************************************
 * FUNCIONES DE VALIDACIÓN
 * ******************************************************************************/

/**
 * Valida que el nombre sea alfanumérico.
 * Requerimiento obligatorio: nombre alfanumérico.
 * @param {string} nombre - Nombre ingresado en el formulario.
 * @returns {boolean} true si es válido, false si contiene caracteres no permitidos.
 */
function validar_nombre_contacto(nombre) {
    var patron = /^[a-zA-Z0-9\s]+$/;
    return patron.test(nombre) && nombre.trim().length > 0;
}

/**
 * Valida que el email tenga un formato válido.
 * Requerimiento obligatorio: email válido.
 * @param {string} email - Email ingresado en el formulario.
 * @returns {boolean} true si el formato es válido, false en caso contrario.
 */
function validar_email(email) {
    var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(email);
}

/**
 * Valida que el mensaje tenga más de 5 caracteres.
 * Requerimiento obligatorio: mensaje con más de 5 caracteres.
 * @param {string} mensaje - Mensaje ingresado en el formulario.
 * @returns {boolean} true si tiene más de 5 caracteres, false en caso contrario.
 */
function validar_mensaje(mensaje) {
    return mensaje.trim().length > 5;
}

/* ******************************************************************************
 * FUNCIONES DE MANEJO DE ERRORES
 * ******************************************************************************/

/**
 * Muestra un mensaje de error en el campo correspondiente.
 * @param {string} idError - ID del elemento donde mostrar el error.
 * @param {string} mensaje - Mensaje de error a mostrar.
 */
function mostrar_error(idError, mensaje) {
    var elementoError = document.getElementById(idError);
    elementoError.textContent = mensaje;
    elementoError.style.display = "block";
}

/**
 * Oculta el mensaje de error de un campo.
 * @param {string} idError - ID del elemento de error a ocultar.
 */
function ocultar_error(idError) {
    var elementoError = document.getElementById(idError);
    elementoError.textContent = "";
    elementoError.style.display = "none";
}

/**
 * Limpia todos los mensajes de error del formulario.
 */
function limpiar_errores() {
    ocultar_error("error__nombre");
    ocultar_error("error__email");
    ocultar_error("error__mensaje");
}

/* ******************************************************************************
 * MANEJADOR DE ENVÍO DEL FORMULARIO
 * ******************************************************************************/

/**
 * Maneja el evento de envío del formulario.
 * Valida todos los campos y, si son válidos, abre el cliente de correo.
 * Requerimiento obligatorio: al enviar se abre la herramienta de envío de emails.
 * @param {Event} evento - Evento del formulario.
 */
function manejar_envio_formulario(evento) {
    evento.preventDefault();
    limpiar_errores();
    var nombre = document.getElementById("nombre__contacto").value;
    var email = document.getElementById("email__contacto").value;
    var mensaje = document.getElementById("mensaje__contacto").value;
    var esValido = true;
    if (!validar_nombre_contacto(nombre)) {
        mostrar_error("error__nombre", "El nombre debe ser alfanumérico");
        esValido = false;
    }
    if (!validar_email(email)) {
        mostrar_error("error__email", "El email no es válido");
        esValido = false;
    }
    if (!validar_mensaje(mensaje)) {
        mostrar_error("error__mensaje", "El mensaje debe tener más de 5 caracteres");
        esValido = false;
    }
    if (esValido) {
        abrir_cliente_email(nombre, email, mensaje);
    }
}

/**
 * Abre el cliente de correo predeterminado del sistema operativo.
 * Construye un mailto con los datos del formulario.
 * @param {string} nombre - Nombre del remitente.
 * @param {string} email - Email del remitente.
 * @param {string} mensaje - Mensaje del formulario.
 */
function abrir_cliente_email(nombre, email, mensaje) {
    var asunto = "Contacto desde Simon Says - " + nombre;
    var cuerpo = "Nombre: " + nombre + "%0D%0A";
    cuerpo += "Email: " + email + "%0D%0A%0D%0A";
    cuerpo += "Mensaje:%0D%0A" + encodeURIComponent(mensaje);
    var mailtoLink = "mailto:contacto@simonsays.com?subject=" + encodeURIComponent(asunto) + "&body=" + cuerpo;
    window.location.href = mailtoLink;
}

/* ******************************************************************************
 * INICIO DE LA APLICACIÓN
 * ******************************************************************************/

document.addEventListener("DOMContentLoaded", inicializar_contacto);