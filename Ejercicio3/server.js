const http = require('http');
const url = require('url');
const fs = require('fs');

// Palabras del ejercicio anterior cambiando las que tenía tildes por similares
const palabras = [
  'electricidad', 'integral', 'triunfador', 'aplaudir', 'remitente', 'asfixiar', 'periodista', 'aguacero', 
  'freno', 'catedral'
];

// Función para generar una contraseña aleatoria
function generarContraseña(numPalabras) {
    let contrasena = [];
    for (let i = 0; i < numPalabras; i++) {
      const palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];
      contrasena.push(palabraAleatoria.charAt(0).toUpperCase() + palabraAleatoria.slice(1));
    }
    return contrasena.join('');
}

//Crear el servidor
const server = http.createServer((req, res) => {
  // Parsear la URL para obtener el número de palabras
  const queryObject = url.parse(req.url, true).query;
  const numPalabras = parseInt(queryObject.X) || 3; //Por defecto serán 3 palabras

  // Generar la contraseña
  const contrasena = generarContraseña(numPalabras);

  // Enviar la respuesta con la contraseña generada
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Tu password aleatoria es: ${contrasena}`); //Lo he puesto en inglés para que no de problemas la ñ
});

// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
