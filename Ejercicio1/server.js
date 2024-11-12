// Importar los módulos necesarios
const http = require('http');
const os = require('os');
const fs = require('fs');
const process = require('process');

// Cargar configuración desde config.json
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const intervalSeconds = config.intervalSeconds;

// Mostrar información inicial del sistema y la versión de Node.js
console.log('--- Información del sistema ---');
console.log(`Sistema operativo: ${os.type()} ${os.release()}`);
console.log(`Memoria total del sistema: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`);
console.log(`Número de CPUs: ${os.cpus().length}`);
console.log(`Versión de Node.js: ${process.version}`);

// Crear el servidor
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Servidor activo</h1>');
});

// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Mostrar información periódica
function mostrarInfoPeriodica() {
  console.log('\n--- Información periódica ---');
  
  if (config.mostrarCPU) {
    const cpu = process.cpuUsage();
    console.log(`Uso de CPU (usuario): ${(cpu.user / 1000000).toFixed(2)} ms`);
    console.log(`Uso de CPU (sistema): ${(cpu.system / 1000000).toFixed(2)} ms`);
  }

  if (config.mostrarMemoria) {
    const memoria = process.memoryUsage();
    const memoriaTotalMB = (memoria.rss + memoria.heapTotal + memoria.heapUsed) / 1024 / 1024;
    console.log(`Memoria total usada por el proceso: ${memoriaTotalMB.toFixed(2)} MB`);
  }

  if (config.mostrarTiempoSistema) {
    console.log(`Tiempo activo del sistema: ${(os.uptime() / 60).toFixed(2)} minutos`);
  }

  if (config.mostrarTiempoNode) {
    console.log(`Tiempo de ejecución de Node.js: ${(process.uptime() / 60).toFixed(2)} minutos`);
  }
}

// Ejecutar la función periódicamente
setInterval(mostrarInfoPeriodica, intervalSeconds * 1000);
