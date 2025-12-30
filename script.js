const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");

let board = Array(9).fill("");
let gameActive = true;

let playerScore = 0;
let aiScore = 0;
let drawScore = 0;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

// Create cells
boardEl.innerHTML = "";
board.forEach((_, i) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.onclick = () => playerMove(i, cell);
    boardEl.appendChild(cell);
});

function playerMove(index, cell) {
    if (!gameActive || board[index] !== "") return;

    board[index] = "X";
    cell.innerText = "X";

    if (checkWinner("X")) {
        playerScore++;
        document.getElementById("playerScore").innerText = playerScore;
        endGame("You Win!");
        return;
    }

    if (isDraw()) {
        drawScore++;
        document.getElementById("drawScore").innerText = drawScore;
        endGame("Draw!");
        return;
    }

    statusEl.innerText = "AI Turn...";
    setTimeout(aiMove, 500);
}

function aiMove() {
    let emptyCells = board
        .map((v, i) => v === "" ? i : null)
        .filter(v => v !== null);

    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[move] = "O";
    boardEl.children[move].innerText = "O";

    if (checkWinner("O")) {
        aiScore++;
        document.getElementById("aiScore").innerText = aiScore;
        endGame("AI Wins!");
        return;
    }

    if (isDraw()) {
        drawScore++;
        document.getElementById("drawScore").innerText = drawScore;
        endGame("Draw!");
        return;
    }

    statusEl.innerText = "Your Turn (X)";
}

function checkWinner(player) {
    for (let pattern of winPatterns) {
        if (pattern.every(i => board[i] === player)) {
            pattern.forEach(i => boardEl.children[i].classList.add("win"));
            gameActive = false;
            return true;
        }
    }
    return false;
}

function isDraw() {
    return board.every(cell => cell !== "");
}

function endGame(msg) {
    statusEl.innerText = msg;
    gameActive = false;
}

function resetGame() {
    board.fill("");
    gameActive = true;
    statusEl.innerText = "Your Turn (X)";
    [...boardEl.children].forEach(c => {
        c.innerText = "";
        c.classList.remove("win");
    });
}
