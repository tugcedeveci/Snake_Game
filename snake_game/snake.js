const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCountX = 30;
let tileCountY = 21;
let tileSizeX = canvas.width / tileCountX - 2;
let tileSizeY = canvas.height / tileCountY + 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let inputsXVelocity = 0;
let inputsYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

function drawGame() {

    xVelocity = inputsXVelocity;
    yVelocity = inputsYVelocity;

    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    if (score > 5) {
        speed = 9;
    }
    if (score > 10) {
        speed = 11;
    }

    setTimeout(drawGame, 1000 / speed);

}


function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '15px Verdana'
    ctx.fillText('Score ' + score, canvas.width - 70, 30);
}

function clearScreen() {
    ctx.fillStyle = '#f7e5d2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
let gameOver = false;
function isGameOver() {

    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    if (headX < 0) {
        gameOver = true;

    }

    else if (headX === tileCountX) {
        gameOver = true;
    }

    else if (headY < 0) {
        gameOver = true;
    }

    else if (headY === tileCountY) {
        gameOver = true;
    }

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '50px Verdana';

        if (gameOver) {
            var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop('0', 'magenta');
            gradient.addColorStop('0.5', 'orange');
            gradient.addColorStop('1.0', 'red');

            ctx.fillStyle = gradient;

            ctx.fillText('Game Over!', canvas.width / 3.3, canvas.height / 2);

        }


        ctx.fillText('Game Over!', canvas.width / 3.3, canvas.height / 2);


    }

    return gameOver;
}

function drawSnake() {


    ctx.fillStyle = 'green';

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCountX, part.y * tileCountY, tileSizeX, tileSizeY);
    }

    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = '#f6bd60';
    ctx.fillRect(headX * tileCountX, headY * tileCountY, tileSizeX, tileSizeY);

}



function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCountX, appleY * tileCountY, tileSizeX, tileSizeY);
}

function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCountX);
        appleY = Math.floor(Math.random() * tileCountY);
        tailLength++;
        score++;
    }
}


document.body.addEventListener('keydown', keyDown);

function keyDown(event) {

    //up
    if (event.keyCode == 38 || event.keyCode == 87) {
        if (inputsYVelocity == 1) {
            return;
        }
        inputsYVelocity = -1;
        inputsXVelocity = 0;
    }

    //down

    if (event.keyCode == 40 || event.keyCode == 83) {
        if (inputsYVelocity == -1) {
            return;
        }
        inputsYVelocity = 1;
        inputsXVelocity = 0;
    }

    //left
    if (event.keyCode == 37 || event.keyCode == 65) {
        if (inputsXVelocity == 1) {
            return;
        }
        inputsYVelocity = 0;
        inputsXVelocity = -1;
    }

    //right

    if (event.keyCode === 39 || event.keyCode == 68) {
        if (inputsXVelocity == -1) {
            return;
        }
        inputsYVelocity = 0;
        inputsXVelocity = 1;
    }
}

var start = document.querySelector('#start');

start.onclick = function () {
    if (gameOver) {

        clearScreen();

        score = 0;
        drawScore();

        headX = 10;
        headY = 10;
        appleX = 5;
        appleY = 5;
        inputsXVelocity = 0;
        inputsYVelocity = 0;
        xVelocity = inputsXVelocity;
        yVelocity = inputsYVelocity;
        tailLength = 2;

        changeSnakePosition();
        checkAppleCollision();
        drawApple();
        drawSnake();
        drawGame();

        gameOver = false;

    }

}
drawGame();
