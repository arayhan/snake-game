const CELL_SIZE = 20;
const SNAKE_COLOR = "orange";
const CANVAR_SIZE = 600;
const REDRAW_INTERVAL = 100;
const WIDTH = CANVAR_SIZE / CELL_SIZE;
const HEIGHT = CANVAR_SIZE / CELL_SIZE;

let snakePositionX = Math.floor((Math.random() * CANVAR_SIZE) / CELL_SIZE);
let snakePositionY = Math.floor((Math.random() * CANVAR_SIZE) / CELL_SIZE);

function startGame() {
    setInterval(function () {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAR_SIZE, CANVAR_SIZE);
        ctx.fillStyle = SNAKE_COLOR;
        ctx.fillRect(
            snakePositionX * CELL_SIZE,
            snakePositionY * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
    }, REDRAW_INTERVAL);
}

function teleport() {
    if (snakePositionX < 0) {
        snakePositionX = CANVAR_SIZE / CELL_SIZE - 1;
    }
    if (snakePositionX >= WIDTH) {
        snakePositionX = 0;
    }
    if (snakePositionY < 0) {
        snakePositionY = CANVAR_SIZE / CELL_SIZE - 1;
    }
    if (snakePositionY >= HEIGHT) {
        snakePositionY = 0;
    }
}

function moveLeft() {
    snakePositionX--;
    teleport();
}

function moveRight() {
    snakePositionX++;
    teleport();
}

function moveDown() {
    snakePositionY++;
    teleport();
}

function moveUp() {
    snakePositionY--;
    teleport();
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        moveLeft();
    } else if (event.key === "ArrowRight") {
        moveRight();
    } else if (event.key === "ArrowUp") {
        moveUp();
    } else if (event.key === "ArrowDown") {
        moveDown();
    }
});

startGame();
