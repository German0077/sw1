const canvas = document.getElementById('breakoutCanvas');
const ctx = canvas.getContext('2d');

// Tamaño del canvas
canvas.width = 800;
canvas.height = 600;

// Propiedades de la pala
const paddleWidth = 100;
const paddleHeight = 20;
let paddleX = (canvas.width - paddleWidth) / 2;
const paddleY = canvas.height - paddleHeight - 10;
const paddleSpeed = 20;

// Propiedades de la pelota
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
const ballRadius = 10;
let ballSpeedX = 2;
let ballSpeedY = -2;

// Dibujar la pala
function drawPaddle() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

// Dibujar la pelota
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function startGame() {
    // Actualizar las posiciones de la pelota
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colisiones
    if (ballY - ballRadius < 0) { // Marco superior
        ballSpeedY = -ballSpeedY;
    } 
    if (ballY + ballRadius > canvas.height) { // Marco inferior
        alert("Perdiste");
        resetGame();
    }
    if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) { // Paredes laterales
        ballSpeedX = -ballSpeedX;
    }

    //Pala del jugador
    if (ballY + ballRadius >= paddleY && ballX >= paddleX && ballX <= paddleX + paddleWidth) {
        ballSpeedY = -ballSpeedY;
        ballY = paddleY - ballRadius;
    }

    // Dibuja todo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();

    // Inicia animaciones
    requestAnimationFrame(startGame);

}

// Reiniciar el juego
function resetGame() {
    paddleX = (canvas.width - paddleWidth) / 2;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 2;
    ballSpeedY = -2;
}

// Mover la pala con las flechas del teclado
window.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' && paddleX > 0) {
        paddleX -= paddleSpeed;
    } else if (e.key === 'ArrowRight' && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    }
});

// Inicia el juego la primera vez
startGame();

