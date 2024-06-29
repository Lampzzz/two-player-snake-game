class Snake {
  constructor(x, y, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.cells = [];
    this.color = color;
    this.maxCells = 4;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    // Horizontal
    if (this.x >= canvas.width) {
      this.x = 0;
    } else if (this.x < -grid) {
      this.x = canvas.width;
    }

    // Vertical
    if (this.y >= canvas.height) {
      this.y = 0;
    } else if (this.y < -grid) {
      this.y = canvas.height;
    }
  }

  updateSnakeMove() {
    this.cells.unshift({ x: this.x, y: this.y });

    if (this.cells.length > this.maxCells) {
      this.cells.pop();
    }
  }

  grow() {
    this.maxCells++;
  }
}

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
// const eat = new Audio("eatfood.mp3");
// const gameover = new Audio("gameover.mp3");
const grid = 16;
let score1 = 0;
let score2 = 0;
let gameSpeed = 0;

const snake1 = new Snake(20, 200, grid, 0, "blue");
const snake2 = new Snake(380, 200, -grid, 0, "green");

const apple = {
  x: randomAppleSpawn(),
  y: randomAppleSpawn(),
};

requestAnimationFrame(game);

function game() {
  requestAnimationFrame(game);

  if (gameSpeed < 5) {
    gameSpeed++;
    return;
  }

  gameSpeed = 0;

  context.clearRect(0, 0, canvas.width, canvas.height);

  snake1.move();
  snake2.move();

  snake1.updateSnakeMove();
  snake2.updateSnakeMove();

  drawApple();

  drawSnakeCell(snake1);
  drawSnakeCell(snake2);
}

function randomAppleSpawn() {
  const spawn = Math.floor(Math.random() * (25 - 0)) + 0;
  return spawn * grid;
}

function drawApple() {
  context.fillStyle = "red";
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
}

function drawSnakeCell(snake) {
  snake.cells.forEach(function (cell, index) {
    context.fillStyle = snake.color;
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    eatApple(snake, cell, index);
  });
}

function eatApple(snake, cell, index) {
  if (cell.x === apple.x && cell.y === apple.y) {
    // eat.play();

    if (snake == snake1) {
      document.getElementById("score1").innerHTML = ++score1;
    } else {
      document.getElementById("score2").innerHTML = ++score2;
    }

    apple.x = randomAppleSpawn();
    apple.y = randomAppleSpawn();

    snake.grow();

    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        console.log("test");
        // gameover.play();
      }
    }
  }
}

// Snake Direction
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp" && snake1.dy === 0) {
    snake1.dy = -grid;
    snake1.dx = 0;
  } else if (e.key === "ArrowDown" && snake1.dy === 0) {
    snake1.dy = grid;
    snake1.dx = 0;
  } else if (e.key === "ArrowRight" && snake1.dx === 0) {
    snake1.dy = 0;
    snake1.dx = grid;
  } else if (e.key === "ArrowLeft" && snake1.dx === 0) {
    snake1.dy = 0;
    snake1.dx = -grid;
  }

  if (e.key === "w" && snake2.dy === 0) {
    snake2.dy = -grid;
    snake2.dx = 0;
  } else if (e.key === "s" && snake2.dy === 0) {
    snake2.dy = grid;
    snake2.dx = 0;
  } else if (e.key === "d" && snake2.dx === 0) {
    snake2.dy = 0;
    snake2.dx = grid;
  } else if (e.key === "a" && snake2.dx === 0) {
    snake2.dy = 0;
    snake2.dx = -grid;
  }
});
