// ========================================== SECTION: INITIALIZATION
let snakeCanvas = document.getElementById("snakeBoard");
let lifeCanvas = document.getElementById("lifeBoard");

let snakeCtx = snakeCanvas.getContext("2d");
let lifeCtx = lifeCanvas.getContext("2d");

const CANVAS_SIZE = snakeCtx.canvas.width;
const CELL_SIZE = 20;
const SNAKE_COLOR = "orange";
const REDRAW_INTERVAL = 20;

// ========================================== SECTION: GAMEPLAY
function initPosition() {
    return {
        x: Math.floor(Math.random() * (CANVAS_SIZE - CELL_SIZE)),
        x: Math.floor(Math.random() * (CANVAS_SIZE - CELL_SIZE)),
        y: Math.floor(Math.random() * (CANVAS_SIZE - CELL_SIZE)),
        y: Math.floor(Math.random() * (CANVAS_SIZE - CELL_SIZE)),
    };
}

const LIFE = {
    count: 3,
    position: {
        x: 10,
        y: 10,
    },
};

function clearCanvas() {
    snakeCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    snakeCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    snakeCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function drawSnake() {
    snakeCtx.fillStyle = SNAKE_COLOR;
    snakeCtx.fillRect(CELL_SIZE, CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawLife(count, x, y) {
    let img = new Image();
    img.src = "/assets/images/heart-red.png";

    for (let i = 0; i < count; i++) {
        const margin = i * 3;
        lifeCtx.drawImage(
            img,
            x + i * CELL_SIZE + margin,
            y,
            CELL_SIZE,
            CELL_SIZE
        );
    }
}

function startGame() {
    setInterval(function () {
        clearCanvas();
        drawSnake();
        drawLife(LIFE.count, LIFE.position.x, LIFE.position.y);
    }, REDRAW_INTERVAL);
}

// ========================================== SECTION: START MENU
const drawTitle = () => {
    snakeCtx.font = "24px Lalezar";
    snakeCtx.textAlign = "center";
    snakeCtx.fillText("START GAME", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    snakeCtx.fillText("START GAME", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    snakeCtx.fillText("START GAME", CANVAS_SIZE / 2, CANVAS_SIZE / 2);

    snakeCtx.font = "18px Fredoka";
    snakeCtx.textAlign = "center";
    snakeCtx.fillText(
        "-- Press any key to continue --",
        CANVAS_SIZE / 2,
        CANVAS_SIZE / 2 + 30
    );
};

function startMenu() {
    drawTitle();

    document.addEventListener("keydown", function () {
        startGame();
    });
}

// ========================================== SECTION: INITIATION
function initialize() {
    startGame();
}
