const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const boardSize = 20;
const cellSize = 20;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
let score = 0;

function createBoard() {
  gameBoard.innerHTML = '';
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (snake.some(segment => segment.x === j && segment.y === i)) {
        cell.classList.add('snake');
      } else if (food.x === j && food.y === i) {
        cell.classList.add('food');
      }
      gameBoard.appendChild(cell);
    }
  }
}

function updateSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function gameLoop() {
  if (checkCollision()) {
    alert(`Game Over! Your score is ${score}`);
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
  } else {
    updateSnake();
    createBoard();
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  if (keyPressed === 37 && direction.x === 0) {
    direction = { x: -1, y: 0 }; // Left arrow
  } else if (keyPressed === 38 && direction.y === 0) {
    direction = { x: 0, y: -1 }; // Up arrow
  } else if (keyPressed === 39 && direction.x === 0) {
    direction = { x: 1, y: 0 }; // Right arrow
  } else if (keyPressed === 40 && direction.y === 0) {
    direction = { x: 0, y: 1 }; // Down arrow
  }
}

document.addEventListener('keydown', changeDirection);

setInterval(gameLoop, 200);

createBoard();
