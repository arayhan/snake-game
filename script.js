// ==========================================
// SECTION: INITIALIZATION
// ==========================================

let snakeCanvas = document.getElementById("snakeBoard");
let lifeCanvas = document.getElementById("lifeBoard");
let elScore = document.getElementById("score");
let elSpeed = document.getElementById("speed");
let elLevel = document.getElementById("level");

let snakeCtx = snakeCanvas.getContext("2d");
let lifeCtx = lifeCanvas.getContext("2d");

let snakeInterval;

const CANVAS_SIZE = snakeCtx.canvas.width;
const CELL_SIZE = CANVAS_SIZE / 20;
const REDRAW_INTERVAL = 20;

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

function isPrimeNumber(num) {
    for (var i = 2; i <= Math.floor(num / 2); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function initPosition() {
    return Math.floor(Math.random() * (CANVAS_SIZE / CELL_SIZE)) * CELL_SIZE;
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function playSound(src) {
    const audio = new Audio();
    audio.src = src;
    audio.play();
}

function getImage(src) {
    let img = new Image();
    img.src = src;
    return img;
}

// ==========================================
// SECTION: OBJECTS
// ==========================================

const GAME = {
    score: {
        value: 0,
    },
    level: {
        value: 0,
    },
};

const LIFE = {
    value: 3,
    container: {
        position: {
            x: 10,
            y: 10,
        },
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

function initHeadBody() {
    const head = {
        position: {
            x: initPosition(),
            y: initPosition(),
        },
    };

    const body = [
        {
            position: {
                x: head.position.x,
                y: head.position.y,
            },
        },
    ];

    return {
        head: head,
        body: body,
    };
}

const SNAKE = {
    color: "orange",
    direction: initDirection(),
    speed: 100,
    ...initHeadBody(),
};

const HEART = {
    show: false,
    position: {
        x: initPosition(),
        y: initPosition(),
    },
};

// ==========================================
// SECTION: DRAW FUNCTIONS
// ==========================================
function drawApple() {
    APPLE.forEach((apple) =>
        snakeCtx.drawImage(
            getImage("./assets/images/apple.png"),
            apple.position.x,
            apple.position.y,
            CELL_SIZE,
            CELL_SIZE
        )
    );
}

function drawHeart() {
    if (HEART.show) {
        snakeCtx.drawImage(
            getImage("/assets/images/heart.gif"),
            HEART.position.x,
            HEART.position.y,
            CELL_SIZE,
            CELL_SIZE
        );
    }
}

function drawLife() {
    for (let i = 0; i < LIFE.value; i++) {
        const margin = i * 3;
        lifeCtx.drawImage(
            getImage("/assets/images/heart-red.png"),
            LIFE.container.position.x + i * CELL_SIZE + margin,
            LIFE.container.position.y,
            CELL_SIZE,
            CELL_SIZE
        );
    }
}

function drawSnake() {
    SNAKE.body.forEach((body, index) => {
        snakeCtx.fillStyle = SNAKE.color;
        if (index > 0) snakeCtx.fillRect(body.position.x, body.position.y, CELL_SIZE, CELL_SIZE);
    });
    snakeCtx.drawImage(
        getImage("/assets/images/kepala.png"),
        SNAKE.head.position.x,
        SNAKE.head.position.y,
        CELL_SIZE,
        CELL_SIZE
    );
}

function drawScore() {
    elScore.innerHTML = GAME.score.value;
}

function drawSpeed() {
    elSpeed.innerHTML = SNAKE.speed / 1000 + "ms";
}

function drawLevel() {
    elLevel.innerHTML = GAME.level.value;
}

function drawMap() {
    snakeCtx.drawImage(getImage("/assets/images/ground.png"), 0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

// ==========================================
// SECTION: GAMEPLAY
// ==========================================

function levelUp() {
    playSound("./assets/audio/nextlevel.mp3");
    GAME.level.value += 1;
    SNAKE.speed -= 20;
    clearInterval(snakeInterval);
    snakeInterval = setInterval(() => move(SNAKE.direction), SNAKE.speed);
}

function eatApple() {
    APPLE.forEach(function (apple, index) {
        if (SNAKE.head.position.x == apple.position.x && SNAKE.head.position.y == apple.position.y) {
            GAME.score.value += 1;

            if (GAME.score.value > 2 && isPrimeNumber(GAME.score.value)) {
                HEART.show = true;
            }

            if (GAME.score.value % 5 === 0) {
                levelUp();
            }

            playSound("./assets/audio/eat.mp3");

            APPLE[index].position.x = initPosition();
            APPLE[index].position.y = initPosition();

            SNAKE.body.push({ position: { x: SNAKE.head.position.x, y: SNAKE.head.position.y } });
        }
    });
}

function eatHeart() {
    if (HEART.show && SNAKE.head.position.x == HEART.position.x && SNAKE.head.position.y == HEART.position.y) {
        LIFE.value += 1;
        HEART.show = false;
        playSound("./assets/audio/life.wav");
        HEART.position.x = initPosition();
        HEART.position.y = initPosition();
    }
}

function teleport() {
    if (SNAKE.head.position.x < 0) {
        SNAKE.head.position.x = CANVAS_SIZE;
    } else if (SNAKE.head.position.x >= CANVAS_SIZE) {
        SNAKE.head.position.x = 0 - CELL_SIZE;
    } else if (SNAKE.head.position.y < 0) {
        SNAKE.head.position.y = CANVAS_SIZE;
    } else if (SNAKE.head.position.y >= CANVAS_SIZE) {
        SNAKE.head.position.y = 0 - CELL_SIZE;
    }
}

function move(direction) {
    teleport();
    eatApple();
    eatHeart();

    switch (direction) {
        case DIRECTION.LEFT:
            SNAKE.direction = DIRECTION.LEFT;
            SNAKE.head.position.x -= CELL_SIZE;
            break;
        case DIRECTION.RIGHT:
            SNAKE.direction = DIRECTION.RIGHT;
            SNAKE.head.position.x += CELL_SIZE;
            break;
        case DIRECTION.DOWN:
            SNAKE.direction = DIRECTION.DOWN;
            SNAKE.head.position.y += CELL_SIZE;
            break;
        case DIRECTION.UP:
            SNAKE.direction = DIRECTION.UP;
            SNAKE.head.position.y -= CELL_SIZE;
            break;
    }

    moveBody();
}

function moveBody() {
    SNAKE.body.unshift({ position: { x: SNAKE.head.position.x, y: SNAKE.head.position.y } });
    SNAKE.body.pop();
}

function startGame() {
    setInterval(function () {
        clearCanvas();
        drawMap();
        drawScore();
        drawSpeed();
        drawLevel();
        drawLife();
        drawSnake();
        drawApple();
        drawHeart();
    }, REDRAW_INTERVAL);

    snakeInterval = setInterval(() => move(SNAKE.direction), SNAKE.speed);

    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
            if (SNAKE.direction !== DIRECTION.RIGHT) {
                if (SNAKE.direction !== DIRECTION.LEFT) playSound("./assets/audio/left.mp3");
                move(DIRECTION.LEFT);
            }
        } else if (event.key === "ArrowRight") {
            if (SNAKE.direction !== DIRECTION.RIGHT) playSound("./assets/audio/right.mp3");
            move(DIRECTION.RIGHT);
        } else if (event.key === "ArrowUp") {
            if (SNAKE.direction !== DIRECTION.UP) playSound("./assets/audio/up.mp3");
            move(DIRECTION.UP);
        } else if (event.key === "ArrowDown") {
            if (SNAKE.direction !== DIRECTION.DOWN) playSound("./assets/audio/down.mp3");
            move(DIRECTION.DOWN);
        }
    });
}

// ==========================================
// SECTION: START MENU
// ==========================================

function startMenu() {
    snakeCtx.font = "24px Lalezar";
    snakeCtx.textAlign = "center";
    snakeCtx.fillText("START GAME", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    snakeCtx.fillText("START GAME", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    snakeCtx.fillText("START GAME", CANVAS_SIZE / 2, CANVAS_SIZE / 2);

    snakeCtx.font = "18px Fredoka";
    snakeCtx.textAlign = "center";
    snakeCtx.fillText("-- Press any key to continue --", CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 30);

    document.addEventListener("keydown", () => startGame());
}

// ==========================================
// SECTION: INITIATION
// ==========================================

function initialize() {
    startGame();
}
