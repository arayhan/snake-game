const CELL_SIZE = 20;
const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 100;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    };
}

let snake = {
    color: "orange",
    position: initPosition(),
};
let apple1 = {
    position: initPosition(),
};
let apple2 = {
    position: initPosition(),
};

function drawGambar(ctx, img, x, y) {
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function startGame() {
    setInterval(function () {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        drawCell(ctx, snake.position.x, snake.position.y, snake.color);
        drawCell(ctx, snake.position.x, snake.position.y, snake.color);
        drawCell(ctx, apple1.position.x, apple1.position.y);
        drawCell(ctx, apple2.position.x, apple2.position.y);
    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.position.x < 0) {
        snake.position.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.position.x >= WIDTH) {
        snake.position.x = 0;
    }
    if (snake.position.y < 0) {
        snake.position.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.position.y >= HEIGHT) {
        snake.position.y = 0;
    }
}

//this
function eat(snake, apple1) {
    //&&
    if (
        snake.position.x == apple1.position.x &&
        snake.position.y == apple1.position.y
    ) {
        apple1.position = initPosition();
    }
}

function moveLeft(snake) {
    snake.position.x--;
    teleport(snake);
    eat(snake, apple1, apple2);
}

function moveRight(snake) {
    snake.position.x++;
    teleport(snake);
    eat(snake, apple1, apple2);
}

function moveDown(snake) {
    snake.position.y++;
    teleport(snake);
    eat(snake, apple1, apple2);
}

function moveUp(snake) {
    snake.position.y--;
    teleport(snake);
    eat(snake, apple1, apple2);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        moveLeft(snake1);
    } else if (event.key === "ArrowRight") {
        moveRight(snake1);
    } else if (event.key === "ArrowUp") {
        moveUp(snake1);
    } else if (event.key === "ArrowDown") {
        moveDown(snake1);
    }
});

startGame();
