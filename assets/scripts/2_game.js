let canvas = document.querySelector(".snake__game"),
  context = canvas.getContext("2d"),
  grid = 16,
  count = 0,
  gameCount = 0,
  snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4,
  },
  fire = {
    x: 320,
    y: 320,
  };

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const snakeGame = () => {
  requestAnimationFrame(snakeGame);
  if (++count < 4) {
    return;
  }
  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.x += snake.dx;
  snake.y += snake.dy;
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }
  snake.cells.unshift({ x: snake.x, y: snake.y });
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
  context.fillStyle = "blue";
  context.fillRect(fire.x, fire.y, grid - 1, grid - 1);
  context.fillStyle = "red";
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
    if (cell.x === fire.x && cell.y === fire.y) {
      snake.maxCells++;
      gameCount++;
      checkGameCount();
      document.querySelector(".snake__count_num").innerHTML = gameCount;
      fire.x = getRandomInt(0, 25) * grid;
      fire.y = getRandomInt(0, 25) * grid;
    }
    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        fire.x = getRandomInt(0, 25) * grid;
        fire.y = getRandomInt(0, 25) * grid;
      }
    }
  });
};

const checkGameCount = () => {
  if (gameCount === 10) {
    document.querySelector(".snake__heading").style.display = "none";
    document.querySelector(".snake__count").style.display = "none";
    document.querySelector(".snake").style.display = "none";
    document.querySelector(".snake__modal").style.display = "block";
    document.querySelector(".game-btn").addEventListener("click", () => {
      document.querySelector(".gobelen").style.display = "block";
    });
  }
};

document.addEventListener("keydown", (e) => {
  //left
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(snakeGame);
});
