//Press any key
const CELL_SIZE = 30;
const SNAKE_COLOR = "orange";
const CANVAR_SIZE = 600;

let snakeCanvas = document.getElementById("snakeBoard");
let ctx = snakeCanvas.getContext("2d");

ctx.canvas.width = CANVAR_SIZE;
ctx.canvas.height = CANVAR_SIZE;

function startGame() {
    ctx.clearRect(0, 0, CANVAR_SIZE, CANVAR_SIZE);
    ctx.fillStyle = SNAKE_COLOR;
    ctx.fillRect(3 * CELL_SIZE, 5 * CELL_SIZE, CELL_SIZE, CELL_SIZE);
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
