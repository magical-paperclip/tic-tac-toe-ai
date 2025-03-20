"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Minimax = void 0;
class Minimax {
    calculateBestMove(board, player) {
        let bestScore = player === 'X' ? -Infinity : Infinity;
        let bestMove = { row: -1, col: -1 };
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === '') {
                    board[row][col] = player;
                    let score = this.minimax(board, player === 'X' ? 'O' : 'X');
                    board[row][col] = ''; // undo the move
                    if (player === 'X' && score > bestScore) {
                        bestScore = score;
                        bestMove = { row, col };
                    }
                    else if (player === 'O' && score < bestScore) {
                        bestScore = score;
                        bestMove = { row, col };
                    }
                }
            }
        }
        return bestMove;
    }
    minimax(board, player) {
        const winner = this.checkWinner(board);
        if (winner === 'X')
            return 1;
        if (winner === 'O')
            return -1;
        if (this.isBoardFull(board))
            return 0;
        let bestScore = player === 'X' ? -Infinity : Infinity;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === '') {
                    board[row][col] = player;
                    let score = this.minimax(board, player === 'X' ? 'O' : 'X');
                    board[row][col] = ''; // undo the move
                    if (player === 'X') {
                        bestScore = Math.max(score, bestScore);
                    }
                    else {
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
        }
        return bestScore;
    }
    checkWinner(board) {
        const winningCombinations = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ];
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
                return board[a[0]][a[1]];
            }
        }
        return null;
    }
    isBoardFull(board) {
        return board.every(row => row.every(cell => cell !== ''));
    }
}
exports.Minimax = Minimax;
