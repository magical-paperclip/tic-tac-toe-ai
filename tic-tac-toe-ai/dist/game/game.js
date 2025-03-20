"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const minimax_1 = require("../ai/minimax");
class Game {
    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'X'; // X starts the game
        this.minimax = new minimax_1.Minimax();
    }
    initializeBoard() {
        return [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    }
    startGame() {
        console.log("Game started! Player X goes first.");
        this.printBoard();
    }
    playMove(row, col) {
        if (this.board[row][col] === '') {
            this.board[row][col] = this.currentPlayer;
            if (this.checkWinner()) {
                console.log(`Player ${this.currentPlayer} wins!`);
                return true;
            }
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.printBoard();
            if (this.currentPlayer === 'O') {
                const { row, col } = this.minimax.calculateBestMove(this.board, 'O');
                this.playMove(row, col);
            }
            return false;
        }
        else {
            console.log("Invalid move! Try again.");
            return false;
        }
    }
    resetGame() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'X';
        console.log("Game has been reset.");
        this.printBoard();
    }
    checkWinner() {
        // check for a w 
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) {
                return true;
            }
            if (this.board[0][i] && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]) {
                return true;
            }
        }
        if (this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
            return true;
        }
        if (this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
            return true;
        }
        return false;
    }
    printBoard() {
        console.log(this.board.map(row => row.join(' | ')).join('\n---------\n'));
    }
}
exports.Game = Game;
