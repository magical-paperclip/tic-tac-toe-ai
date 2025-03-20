import { Minimax } from '../ai/minimax';

export class Game {
    private board: string[][];
    private currentPlayer: string;
    private minimax: Minimax;

    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'X'; // X starts the game
        this.minimax = new Minimax();
    }

    private initializeBoard(): string[][] {
        return [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    }

    public startGame(): void {
        console.log("Game started! Player X goes first.");
        this.printBoard();
    }

    public playMove(row: number, col: number): boolean {
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
        } else {
            console.log("Invalid move! Try again.");
            return false;
        }
    }

    public resetGame(): void {
        this.board = this.initializeBoard();
        this.currentPlayer = 'X';
        console.log("Game has been reset.");
        this.printBoard();
    }

    public checkWinner(): boolean {
        // Check rows, columns, and diagonals for a winner
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

    private printBoard(): void {
        console.log(this.board.map(row => row.join(' | ')).join('\n---------\n'));
    }
}