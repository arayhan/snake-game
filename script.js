const CELL_SIZE = 20;
const SNAKE_COLOR = "orange";
const CANVAR_SIZE = 600;
const WIDTH = CANVAR_SIZE / CELL_SIZE;
const HEIGHT = CANVAR_SIZE / CELL_SIZE;


let snakeCanvas = document.getElementById("snakeBoard");
let ctx = snakeCanvas.getContext("2d");
let img = document.getElementById("apple");

ctx.canvas.width = CANVAR_SIZE;
ctx.canvas.height = CANVAR_SIZE;


let apple1 = {
    position: {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

let apple2 = {
    position: {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function drawGambar(ctx, img, x, y) {
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function startGame() {
    ctx.clearRect(0, 0, CANVAR_SIZE, CANVAR_SIZE);
    ctx.fillStyle = SNAKE_COLOR;
    ctx.fillRect(3 * CELL_SIZE, 5 * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    drawGambar(ctx, img, apple1.position.x, apple1.position.y, CELL_SIZE, CELL_SIZE);
    drawGambar(ctx, img, apple2.position.x, apple2.position.y, CELL_SIZE, CELL_SIZE);

}

function startMenu() {
    const drawTitle = () => {
        ctx.font = "24px Lalezar";
        ctx.textAlign = "center";
        ctx.fillText("START GAME", CANVAR_SIZE / 2, CANVAR_SIZE / 2);
    };

    const drawSubTitle = () => {
        ctx.font = "18px Fredoka";
        ctx.textAlign = "center";
        ctx.fillText(
            "-- Press any key to continue --",
            CANVAR_SIZE / 2,
            CANVAR_SIZE / 2 + 28
        );
    };

    drawTitle();
    drawSubTitle();

    document.addEventListener(
        "keydown",
        () => {
            startGame();
        },
        false
    );
}

startMenu();