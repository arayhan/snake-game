//Press any key
const CELL_SIZE = 30;
const SNAKE_COLOR = "orange";
const CANVAR_SIZE = 600;

let snakeCanvas = document.getElementById("snakeBoard");
let ctx = snakeCanvas.getContext("2d");

ctx.canvas.width = CANVAR_SIZE;
ctx.canvas.height = CANVAR_SIZE;

function draw() {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.fillRect(3 * CELL_SIZE, 5 * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

document.addEventListener(
    "keydown",
    () => {
        if (lastDownTarget == canvas) {
            alert("keydown");
        }
    },
    false
);
