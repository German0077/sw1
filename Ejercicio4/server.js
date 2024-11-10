const http = require('http');
const axios = require('axios');
const cheerio = require('cheerio');

const URL = 'https://elpais.com/'; //Vamos a extraer los titulares actuales de EL PAÍS
const intervalo = 60000; // Intervalo de 1 minuto

async function obtenerTitulares() {
  try {
    const respuesta = await axios.get(URL);
    const html = respuesta.data;

    // Cargar el HTML en Cheerio
    const $ = cheerio.load(html);

    // Seleccionar los titulares
    $('h2.c_t').each((index, element) => {
      const titular = $(element).text().trim();

      // Mostrar el titular de cada noticia en la consola
      console.log(`Titular ${index + 1}: ${titular}`);
      console.log('-----------------------------');
    });
  } catch (error) {
    console.error('Error al descargar o procesar el HTML:', error);
  }
}

setInterval(obtenerTitulares, intervalo);
obtenerTitulares();



//Crear el servidor (código del ejercicio 1)
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Servidor activo</h1>');
  });

// Iniciar el servidor (código del ejercicio 1)
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
