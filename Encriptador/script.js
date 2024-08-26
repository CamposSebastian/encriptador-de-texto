// Selección de elementos del DOM
var entradaTexto = document.querySelector(".entrada-texto");
var salidaTexto = document.querySelector(".salida-texto");
var seccionTexto1 = document.querySelector(".texto1");
var seccionTexto2 = document.querySelector(".texto2");
var btnCopiar = document.querySelector(".copiar");
var restriccion = document.querySelector(".restriccion"); // Selecciona el elemento de advertencia

// Función para validar el texto de entrada
function validar(textoValidar) {
    const letrasPermitidas = /^[a-z\s]+$/; // Expresión regular para solo letras minúsculas y espacios
    return letrasPermitidas.test(textoValidar);
}

// Función para resaltar caracteres inválidos
function resaltarCaracteresInvalidos(texto) {
    var textoResaltado = "";
    const letrasPermitidas = /^[a-z\s]+$/;

    for (var posicion = 0; posicion < texto.length; posicion++) {
        if (!letrasPermitidas.test(texto.charAt(posicion))) {
            textoResaltado += `<span style="color: red;">${texto.charAt(posicion)}</span>`;
        } else {
            textoResaltado += texto.charAt(posicion);
        }
    }
    return textoResaltado;
}

// Función para validar el texto y mostrar advertencia si es necesario
function validarTexto(texto) {
    if (!validar(texto)) {
        alert("Por favor verficar el texto ingresado")
        restriccion.innerHTML = resaltarCaracteresInvalidos(texto) + " &#9888; Solo letras minúsculas y sin acentos.";
        restriccion.style.display = "block"; // Muestra la advertencia
        return false;
    }
    restriccion.style.display = "none"; // Oculta la advertencia si es válido
    return true;
}


// Función para encriptar el texto
function encriptar() {
    var texto = entradaTexto.value;
    var salida = "";

    if (!validarTexto(texto)) return; // Valida el texto antes de continuar

    for (var posicion = 0; posicion < texto.length; posicion++) {
        switch (texto.charAt(posicion)) {
            case 'a':
                salida += "ai";
                break;
            case 'e':
                salida += "enter";
                break;
            case 'i':
                salida += "imes";
                break;
            case 'o':
                salida += "ober";
                break;
            case 'u':
                salida += "ufat";
                break;
            default:
                salida += texto.charAt(posicion);
        }
    }

    entradaTexto.value = "";
    salidaTexto.value = salida;
    ocultar();
}

// Función para desencriptar el texto
function desencriptar() {
    var texto = entradaTexto.value;
    var salida = "";

    if (!validarTexto(texto)) return; // Valida el texto antes de continuar

    for (var posicion = 0; posicion < texto.length; posicion++) {
        if (texto.startsWith("ai", posicion)) {
            salida += "a";
            posicion += 1;
        } else if (texto.startsWith("enter", posicion)) {
            salida += "e";
            posicion += 4;
        } else if (texto.startsWith("imes", posicion)) {
            salida += "i";
            posicion += 3;
        } else if (texto.startsWith("ober", posicion)) {
            salida += "o";
            posicion += 3;
        } else if (texto.startsWith("ufat", posicion)) {
            salida += "u";
            posicion += 3;
        } else {
            salida += texto.charAt(posicion);
        }
    }

    entradaTexto.value = "";
    salidaTexto.value = salida;
    ocultar();
}

// Función para ocultar elementos y mostrar la salida
function ocultar() {
    salidaTexto.style.background = "white";
    seccionTexto1.style.display = "none";
    seccionTexto2.style.display = "none";
    btnCopiar.style.display = "";
    restriccion.style.display = "none"; // Oculta la advertencia
}

// Función para restaurar la vista original
function mostrar() {
    salidaTexto.style.background = "#FFF no-repeat center url(imagenes/notexto.png)";
    seccionTexto1.style.display = "";
    seccionTexto2.style.display = "";
    btnCopiar.style.display = "none";
}

// Función para copiar el texto encriptado/desencriptado
function copiar() {
    var textoCopiado = salidaTexto.value;
    navigator.clipboard.writeText(textoCopiado);

    var anuncio = document.querySelector(".anuncio");
    anuncio.textContent = "Texto copiado";
    anuncio.style.display = "block";

    setTimeout(() => {
        anuncio.style.display = "none";
        salidaTexto.value = "";
        mostrar();
    }, 950);
}
