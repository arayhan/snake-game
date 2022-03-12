//Press any key
const CELL_SIZE = 30;
const SNAKE_COLOR = 'orange';

function draw() {
  alert('Click OK to start game');

  let snakeCanvas = document.getElementById('snakeBoard');
  let ctx = snakeCanvas.getContext('2d');

  ctx.fillStyle = SNAKE_COLOR;
  ctx.fillRect(3 * CELL_SIZE, 5 * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

var lastDownTarget, canvas;

document.addEventListener(
  'keydown',
  function (event) {
    if (lastDownTarget == canvas) {
      alert('keydown');
    }
  },
  false
);
