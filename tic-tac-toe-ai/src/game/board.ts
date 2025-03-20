class Board {
    private board: string[][];
    private size: number;

    constructor(size: number = 3) {
        this.size = size;
        this.board = this.initialize();
    }

    initialize(): string[][] {
        return Array.from({ length: this.size }, () => Array(this.size).fill(''));
    }

    makeMove(row: number, col: number, player: string): boolean {
        if (this.board[row][col] === '') {
            this.board[row][col] = player;
            return true;
        }
        return false;
    }

    checkWinner(): string | null {
        // Check rows and columns
        for (let i = 0; i < this.size; i++) {
            if (this.board[i].every(cell => cell === this.board[i][0] && cell !== '')) {
                return this.board[i][0];
            }
            if (this.board.map(row => row[i]).every(cell => cell === this.board[0][i] && cell !== '')) {
                return this.board[0][i];
            }
        }

        // Check diagonals
        if (this.board.map((row, index) => row[index]).every(cell => cell === this.board[0][0] && cell !== '')) {
            return this.board[0][0];
        }
        if (this.board.map((row, index) => row[this.size - 1 - index]).every(cell => cell === this.board[0][this.size - 1] && cell !== '')) {
            return this.board[0][this.size - 1];
        }

        return null;
    }

    getBoard(): string[][] {
        return this.board;
    }

    resetBoard(): void {
        this.board = this.initialize();
    }
}