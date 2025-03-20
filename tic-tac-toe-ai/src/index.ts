import { Game } from './game/game';
import * as readline from 'readline';

const ticTacToeGame = new Game();
ticTacToeGame.startGame();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askMove() {
    rl.question(`Player ${ticTacToeGame['currentPlayer']}, enter your move (row,col): `, (answer) => {
        const [row, col] = answer.split(',').map(Number);
        if (ticTacToeGame.playMove(row, col)) {
            rl.close();
        } else {
            if (ticTacToeGame['currentPlayer'] === 'O') {
                const { row, col } = ticTacToeGame['minimax'].calculateBestMove(ticTacToeGame['board'], 'O');
                ticTacToeGame.playMove(row, col);
                if (!ticTacToeGame.checkWinner()) {
                    askMove();
                } else {
                    rl.close();
                }
            } else {
                askMove();
            }
        }
    });
}

askMove();