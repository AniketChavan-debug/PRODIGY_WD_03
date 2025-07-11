const statusDiv = document.getElementById('status');
const cells = [...document.getElementsByClassName('cell')];
const resetBtn = document.getElementById('reset');
const resetScoresBtn = document.getElementById('resetScores');
const scoreXSpan = document.getElementById('scoreX');
const scoreOSpan = document.getElementById('scoreO');

let board = Array(9).fill('');
let currentPlayer = 'X';
let isActive = true;
const winConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Load scores from localStorage:
let scoreX = parseInt(localStorage.getItem('scoreX')) || 0;
let scoreO = parseInt(localStorage.getItem('scoreO')) || 0;
scoreXSpan.textContent = `X: ${scoreX}`;
scoreOSpan.textContent = `O: ${scoreO}`;

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
resetScoresBtn.addEventListener('click', () => {
  scoreX = scoreO = 0;
  updateScoresDisplay();
  localStorage.removeItem('scoreX');
  localStorage.removeItem('scoreO');
});

function handleCellClick(e) {
  const idx = e.target.dataset.index;
  if (board[idx] || !isActive) return;
  board[idx] = currentPlayer;
  e.target.textContent = currentPlayer;
  checkResult();
  if (isActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `Turn: ${currentPlayer}`;
  }
}

function checkResult() {
  let win = winConditions.some(([a,b,c]) =>
    board[a] && board[a] === board[b] && board[a] === board[c]
  );
  if (win) {
    statusDiv.textContent = `Player ${currentPlayer} wins!`;
    isActive = false;
    if (currentPlayer === 'X') scoreX++; else scoreO++;
    saveAndUpdateScores();
    return;
  }
  if (!board.includes('')) {
    statusDiv.textContent = `It's a draw!`;
    isActive = false;
  }
}

function resetGame() {
  board.fill('');
  isActive = true;
  currentPlayer = 'X';
  statusDiv.textContent = `Turn: ${currentPlayer}`;
  cells.forEach(c => c.textContent = '');
}

function saveAndUpdateScores() {
  localStorage.setItem('scoreX', scoreX);
  localStorage.setItem('scoreO', scoreO);
  updateScoresDisplay();
}

function updateScoresDisplay() {
  scoreXSpan.textContent = `X: ${scoreX}`;
  scoreOSpan.textContent = `O: ${scoreO}`;
}
