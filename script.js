// ========================================== SECTION: INITIALIZATION
let snakeCanvas = document.getElementById("snakeBoard");
let lifeCanvas = document.getElementById("lifeBoard");

let snakeCtx = snakeCanvas.getContext("2d");
let lifeCtx = lifeCanvas.getContext("2d");

const CANVAS_SIZE = snakeCtx.canvas.width;
const CELL_SIZE = 20;
const SNAKE_COLOR = "orange";
const REDRAW_INTERVAL = 20;

function clearCanvas() {
    snakeCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function initPosition() {
    return Math.floor(Math.random() * (CANVAS_SIZE / CELL_SIZE)) * CELL_SIZE;
}

const LIFE = {
    count: 3,
    position: {
        x: 10,
        y: 10,
    },
};

const APPLE = [
    {
        position: {
            x: initPosition(),
            y: initPosition(),
        },
        position: {
            x: initPosition(),
            y: initPosition(),
        },
    },
];

const SNAKE = {
    position: {
        x: initPosition(),
        y: initPosition(),
    },
};

// ========================================== SECTION: GAMEPLAY
function drawApple() {
    let img = new Image();
    img.src = "./assets/images/apple.png";

    APPLE.forEach((apple) =>
        snakeCtx.drawImage(
            img,
            apple.position.x,
            apple.position.y,
            CELL_SIZE,
            CELL_SIZE
        )
    );
}

function drawLife() {
    let img = new Image();
    img.src = "/assets/images/heart-red.png";

    for (let i = 0; i < LIFE.count; i++) {
        const margin = i * 3;
        lifeCtx.drawImage(
            img,
            LIFE.position.x + i * CELL_SIZE + margin,
            LIFE.position.y,
            CELL_SIZE,
            CELL_SIZE
        );
    }
}

function drawSnake() {
    snakeCtx.fillStyle = SNAKE_COLOR;
    snakeCtx.fillRect(SNAKE.position.x, SNAKE.position.y, CELL_SIZE, CELL_SIZE);
}

function startGame() {
    function teleport() {
        if (SNAKE.position.x < 0) {
            SNAKE.position.x = CANVAS_SIZE - CELL_SIZE;
        }
        if (SNAKE.position.x >= CANVAS_SIZE) {
            SNAKE.position.x = 0;
        }
        if (SNAKE.position.y < 0) {
            SNAKE.position.y = CANVAS_SIZE - CELL_SIZE;
        }
        if (SNAKE.position.y >= CANVAS_SIZE) {
            SNAKE.position.y = 0;
        }
    }

    function moveLeft() {
        SNAKE.position.x -= CELL_SIZE;
        teleport();
    }

    function moveRight() {
        SNAKE.position.x += CELL_SIZE;
        teleport();
    }

    function moveDown() {
        SNAKE.position.y += CELL_SIZE;
        teleport();
    }

    function moveUp() {
        SNAKE.position.y -= CELL_SIZE;
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

    setInterval(function () {
        snakeCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        drawLife();
        drawSnake();
        drawApple();
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
