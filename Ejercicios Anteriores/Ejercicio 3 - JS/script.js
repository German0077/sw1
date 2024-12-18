// Cargar el diccionario (palabras generadas aleatoriamente desde https://www.palabrasaleatorias.com )
let diccionario = ["electricidad", "integral", "triunfador", "aplaudir", "remitente", 
      "asfixiar", "periódico", "aguacero", "freno", "cátedra"];

// Función para poner en mayúscula la primera letra de las palabras
function capitalizar(palabra) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}

// Función para generar la contraseña
function generarContraseña() {
    const numPalabras = parseInt(document.getElementById('numPalabras').value);
    const conMayuscula = document.getElementById('capitalizar').checked;
    const sinRepetir = document.getElementById('sinRepetir').checked;

    if (numPalabras < 1 || numPalabras > 10) {
        alert('El número de palabras debe estar entre 1 y 10.');
        return;
    }

    let palabrasDisponibles = [...diccionario];
    let contraseña = [];

    for (let i = 0; i < numPalabras; i++) {
        
        // Elegir una palabra aleatoria
        const indiceAleatorio = Math.floor(Math.random() * palabrasDisponibles.length);
        let palabraSeleccionada = palabrasDisponibles[indiceAleatorio];

        // Capitalizar si está habilitado
        if (conMayuscula) {
            palabraSeleccionada = capitalizar(palabraSeleccionada);
        }

        contraseña.push(palabraSeleccionada);

        // Si no se pueden repetir, eliminar la palabra de las disponibles
        if (sinRepetir) {
            palabrasDisponibles.splice(indiceAleatorio, 1);
        }
    }

    // Mostrar la contraseña generada en la página
    document.getElementById('outputContraseña').innerText = contraseña.join('');
}
