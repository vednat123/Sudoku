
document.addEventListener('DOMContentLoaded', () => {
    const puzzle_nums = [
        [
            5, 3, -1, -1, 7, -1, -1, -1, -1,
            6, -1, -1, 1, 9, 5, -1, -1, -1,
            -1, 9, 8, -1, -1, -1, -1, 6, -1,
            8, -1, -1, -1, 6, -1, -1, -1, 3,
            4, -1, -1, 8, -1, 3, -1, -1, 1,
            7, -1, -1, -1, 2, -1, -1, -1, 6,
            -1, 6, -1, -1, -1, -1, 2, 8, -1,
            -1, -1, -1, 4, 1, 9, -1, -1, 5,
            -1, -1, -1, -1, 8, -1, -1, 7, 9
        ],
        [
            1, -1, 4, -1, -1, 7, -1, -1, -1,
            -1, 3, -1, -1, 6, -1, -1, -1, 9,
            -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1
        ],
        [
            -1, -1, 5, 3, -1, -1, -1, -1, -1,
            -1, 7, -1, -1, 9, -1, 6, -1, -1,
            -1, -1, -1, -1, -1, -1,-1, -1, 1,
            9, -1, -1, -1, 5, 6, -1, -1, -1,
            6, -1, -1, -1, -1, -1, -1, -1, 3,
            -1, -1, -1, 9, 7, -1, -1, -1, 5,
            4, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, 2, -1, 1, -1, -1, 4, -1,
            -1, -1, -1, -1, -1, 2, 9, -1, -1
        ],
        [
            -1, -1, 9, 5, -1, -1, 7, 3, -1,
            2, -1, -1, 9, 4, -1, -1, -1, 6,
            4,  8,  1, -1, -1,  3,  2,  9, -1,
            -1, -1,  3, 7, 2, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1,  1, 8, 3, -1, -1,
            -1, 2, 5, 4, -1, -1,  9, 1, 3,
            3, -1, -1, -1,  7,  2, -1, -1, 4,
            -1, 7, 4, -1, -1, 9, 6, -1, -1
        ],
        [
            -1, -1, -1,  2,  1, -1,  4, -1, -1,
            1,  7,  6,  8, -1, -1,  9, -1, -1,
            3, -1, -1,  9, -1, -1, -1, -1,  8,
            -1, -1, -1,  1, -1,  7, -1,  3, -1,
            -1, -1,  3, -1,  4, -1,  7, -1, -1,
            -1,  1, -1,  3, -1,  6, -1, -1, -1,
            8, -1, -1, -1, -1,  5, -1, -1,  3,
            -1, -1,  2, -1, -1,  8,  6,  1,  7,
            -1, -1,  7, -1,  6,  1, -1, -1, -1
        ],
        [
            7, 8, -1, 4, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, 3, -1, -1, -1,
            2, -1, -1, -1, 1, -1, -1, -1, 9,
            6, -1, -1, -1, -1, -1, 2, 7, -1,
            -1, 9, 7, -1, 2, -1, 6, 5, -1,
            -1, 1, 4, -1, -1, -1, -1, -1, 3,
            4, -1, -1, -1, 6, -1, -1, -1, 2,
            -1, -1, -1, 3, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, 9, -1, 3, 7
        ]
    ];

    let puzzle = [];
    let moveHistory = [];
    let activeDigit = null;
    let startTime = null;


    function getRandomPuzzle()
    {
        const index = Math.floor(Math.random() * puzzle_nums.length);
        return [...puzzle_nums[index]];
    }

    function initGame() {
        puzzle = getRandomPuzzle();
        moveHistory = [];
        activeDigit = null;
        startTime = new Date();

        const board = document.getElementById('board');
        board.innerHTML = '';
        buildBoard();
        addInteractivity();
        highlightConflicts();
    }

    function buildBoard() {
        const board = document.getElementById('board');
        for (let row = 0; row < 9; row++) {
            const tr = document.createElement('tr');
            for (let col = 0; col < 9; col++) {
                const index = row * 9 + col;
                const value = puzzle[index];
                const td = document.createElement('td');
                td.id = `cell${row}${col}`;
                if (value !== -1) {
                    td.textContent = value;
                }
                tr.appendChild(td);
            }
            board.appendChild(tr);
        }
    }

    function highlightConflicts() {
        const cells = document.querySelectorAll('#board td');
        cells.forEach(cell => cell.classList.remove('error'));
        const allCells = Array.from(cells);
        const positions = allCells.map(cell => {
            const row = parseInt(cell.id.charAt(4), 10);
            const col = parseInt(cell.id.charAt(5), 10);
            return { row, col, cell };
        });
        positions.forEach(({ row, col, cell }) => {
            const val = cell.textContent.trim();
            if (val) {
                positions.forEach(({ row: r2, col: c2, cell: cell2 }) => {
                    if (cell2 !== cell && cell2.textContent.trim() === val) {
                        if (sameRow(col, row, c2, r2) ||
                            sameColumn(col, row, c2, r2) ||
                            sameBlock(col, row, c2, r2)) {
                            cell.classList.add('error');
                            cell2.classList.add('error');
                        }
                    }
                });
            }
        });
    }

    function sameBlock(x1, y1, x2, y2) {
        const firstRow = Math.floor(y1 / 3) * 3;
        const firstCol = Math.floor(x1 / 3) * 3;
        return (y2 >= firstRow && y2 <= (firstRow + 2) &&
            x2 >= firstCol && x2 <= (firstCol + 2));
    }

    function sameRow(x1, y1, x2, y2) {
        return y1 === y2;
    }

    function sameColumn(x1, y1, x2, y2) {
        return x1 === x2;
    }


    function isBoardCompleteAndValid() {
        const cells = document.querySelectorAll('#board td');
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent.trim() === '') return false;
            if (cells[i].classList.contains('error')) return false;
        }
        return true;
    }


    function recordCompletionTime() {
        const endTime = new Date();
        const durationMs = endTime - startTime;
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        const mm = minutes < 10 ? '0' + minutes : minutes;
        const ss = seconds < 10 ? '0' + seconds : seconds;

        const now = new Date();
        const yyyy = now.getFullYear();
        const mmdd = (now.getMonth() + 1).toString().padStart(2, '0');
        const dd = now.getDate().toString().padStart(2, '0');
        const dateString = `${yyyy}/${mmdd}/${dd}`;

        const durationString = `${mm}:${ss}`;

        const existingScores = JSON.parse(localStorage.getItem('sudokuHighScores') || '[]');
        existingScores.push({ date: dateString, duration: durationString });
        localStorage.setItem('sudokuHighScores', JSON.stringify(existingScores));

        alert(`Congratulations! You finished in ${mm}:${ss}. A new high score has been recorded.`);
    }

    function addInteractivity() {
        const boardCells = document.querySelectorAll('#board td');
        boardCells.forEach(cell => {
            cell.addEventListener('mouseenter', () => {
                cell.style.backgroundColor = '#f5dd90';
            });
            cell.addEventListener('mouseleave', () => {
                cell.style.backgroundColor = '';
            });
            cell.addEventListener('click', () => {
                if (activeDigit) {
                    moveHistory.push({
                        cellId: cell.id,
                        oldValue: cell.textContent,
                        newValue: activeDigit
                    });
                    cell.textContent = activeDigit;
                    cell.classList.add('user-input');

                    highlightConflicts();

                    if (isBoardCompleteAndValid()) {
                        recordCompletionTime();
                    }
                }
            });
        });

        const paletteCells = document.querySelectorAll('#palette td');
        paletteCells.forEach(cell => {
            cell.addEventListener('mouseenter', () => {
                cell.style.backgroundColor = '#f5dd90';
            });
            cell.addEventListener('mouseleave', () => {
                cell.style.backgroundColor = '';
            });
            cell.addEventListener('click', () => {
                if (cell.querySelector('img')) {
                    undoLastMove();
                } else {
                    activeDigit = cell.textContent.trim();
                }
            });
        });


        const newGameButton = document.getElementById('newGameBtn');
        newGameButton.addEventListener('click', () => {
            initGame();
        });
    }

    function undoLastMove() {
        if (moveHistory.length > 0) {
            const lastMove = moveHistory.pop();
            const cell = document.getElementById(lastMove.cellId);
            cell.textContent = lastMove.oldValue;
            if (!lastMove.oldValue) {
                cell.classList.remove('user-input');
            }
            highlightConflicts();
        }
    }


    initGame();
});
