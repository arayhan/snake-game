// ==========================================
// SECTION: INITIALIZATION
// ==========================================

let snakeCanvas = document.getElementById("snakeBoard");
let lifeCanvas = document.getElementById("lifeBoard");
let elScore = document.getElementById("score");

let snakeCtx = snakeCanvas.getContext("2d");
let lifeCtx = lifeCanvas.getContext("2d");

const CANVAS_SIZE = snakeCtx.canvas.width;
const CELL_SIZE = 20;
const SNAKE_COLOR = "orange";
const REDRAW_INTERVAL = 20;
const SNAKE_INTERVAL = 80;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
};

// ==========================================
// SECTION: HELPER FUNCTIONS
// ==========================================

function clearCanvas() {
    snakeCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function initPosition() {
    return Math.floor(Math.random() * (CANVAS_SIZE / CELL_SIZE)) * CELL_SIZE;
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{ x: head.x, y: head.y }];
    return {
        head: head,
        body: body,
    };
}

function isPrimeNumber(num) {
    var x = 0;
    for (var i = 2; i <= Math.floor(num / 2); i++) {
        x++;
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

// ==========================================
// SECTION: OBJECTS
// ==========================================

const SCORE = {
    value: 0,
};

const LIFE = {
    value: 3,
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
    },
    {
        position: {
            x: initPosition(),
            y: initPosition(),
        },
    },
];

const SNAKE = {
    color: SNAKE_COLOR,
    ...initHeadAndBody(),
    position: {
        x: initPosition(),
        y: initPosition(),
    },
    direction: initDirection(),
};

const HEART = {
    show: false,
    position: {
        x: initPosition(),
        y: initPosition(),
    },
};

// ==========================================
// SECTION: GAMEPLAY
// ==========================================

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

function drawHeart() {
    let img = new Image();
    img.src = "/assets/images/heart.gif";

    if (HEART.show) {
        snakeCtx.drawImage(
            img,
            HEART.position.x,
            HEART.position.y,
            CELL_SIZE,
            CELL_SIZE
        );
    }
}

function drawLife() {
    let img = new Image();
    img.src = "/assets/images/heart-red.png";

    for (let i = 0; i < LIFE.value; i++) {
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
    function eat() {
        let eat = new Audio();
        eat.src = "./assets/audio/eat.mp3";
        APPLE.forEach(function (apple, index) {
            if (
                SNAKE.position.x == apple.position.x &&
                SNAKE.position.y == apple.position.y
            ) {
                SCORE.value += 1;

                if (SCORE.value > 2 && isPrimeNumber(SCORE.value)) {
                    HEART.show = true;
                }

                eat.play();
                APPLE[index].position.x = initPosition();
                APPLE[index].position.y = initPosition();
                SNAKE.body.push({ x: SNAKE.head.x, y: SNAKE.head.y });
            }
        });
    }

    function drawBody() {
        drawBody(snakeCtx, SNAKE.head.x, SNAKE.head.y, SNAKE.color);
        for (let i = 1; i < SNAKE.body.length; i++) {
            drawBody(snakeCtx, SNAKE.body[i].x, SNAKE.body[i].y, SNAKE.color);
        }
    }

    function eatHeart() {
        let life = new Audio();
        life.src = "./assets/audio/life.wav";

        if (
            SNAKE.position.x == HEART.position.x &&
            SNAKE.position.y == HEART.position.y
        ) {
            if (HEART.show) {
                LIFE.value += 1;
                HEART.show = false;
            }

            life.play();
            HEART.position.x = initPosition();
            HEART.position.y = initPosition();
        }
    }

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
        eat();
        eatHeart();
    }

    function moveRight() {
        SNAKE.position.x += CELL_SIZE;
        teleport();
        eat();
        eatHeart();
    }

    function moveDown() {
        SNAKE.position.y += CELL_SIZE;
        teleport();
        eat();
        eatHeart();
    }

    function moveUp() {
        SNAKE.position.y -= CELL_SIZE;
        teleport();
        eat();
        eatHeart();
    }

    // load audio files

    let up = new Audio();
    let right = new Audio();
    let left = new Audio();
    let down = new Audio();

    up.src = "./assets/audio/up.mp3";
    down.src = "./assets/audio/down.mp3";
    right.src = "./assets/audio/right.mp3";
    left.src = "./assets/audio/left.mp3";

    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
            left.play();
            moveLeft();
            SNAKE.direction = DIRECTION.LEFT;
        } else if (event.key === "ArrowRight") {
            moveRight();
            right.play();
            SNAKE.direction = DIRECTION.RIGHT;
        } else if (event.key === "ArrowUp") {
            moveUp();
            up.play();
            SNAKE.direction = DIRECTION.UP;
        } else if (event.key === "ArrowDown") {
            moveDown();
            down.play();
            SNAKE.direction = DIRECTION.DOWN;
        }
    });

    setInterval(function () {
        elScore.innerHTML = SCORE.value;
        snakeCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        drawLife();
        drawSnake();
        drawApple();
        drawHeart();
    }, REDRAW_INTERVAL);

    setInterval(function () {
        switch (SNAKE.direction) {
            case DIRECTION.LEFT:
                moveLeft();
                break;
            case DIRECTION.RIGHT:
                moveRight();
                break;
            case DIRECTION.DOWN:
                moveDown();
                break;
            case DIRECTION.UP:
                moveUp();
                break;
        }
    }, SNAKE_INTERVAL);
}

function moveBody() {
    SNAKE.body.unshift({ x: SNAKE.head.x, y: SNAKE.head.y });
    SNAKE.body.pop();
}

// ==========================================
// SECTION: START MENU
// ==========================================

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

// ==========================================
// SECTION: INITIATION
// ==========================================

function initialize() {
    startGame();
}
