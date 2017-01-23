import Player from './Player';
import Board from './Board';

export default class Game {
    count: number;
    players: Player[];
    board: Board;
    turns: number;
    schema: number;

    constructor(schema) {
        this.schema = schema;
        this.count = 1;
        this.players = [];
        this.players[0] = new Player({
            name: 'Player 1',
            controls: {up: 87, right: 68, down: 83, left: 65, choose: 90}
        });
        this.players[1] = new Player({
            name: 'Player 2',
            controls: {up: 38, right: 39, down: 40, left: 37, choose: 57}
        });
        this.board = new Board(this.schema);

        this.start();
        this.listeners();
    }

    /**
     * Render all data of the game.
     */
    render() {
        const games = document.querySelector('.game h2');
        games.innerHTML = `Game ${this.count}`;

        this.players[0].render('.player--first');
        this.players[1].render('.player--second');
    }

    /**
     * Start game. Clear amount of turns and set symbol to players.
     */
    start() {
        this.turns = 0;
        const rand: number = Math.floor(Math.random() * 2) + 1;

        if (rand == 1) {
            this.players[0].setSymbol('X');
            this.players[1].setSymbol('O');
        } else {
            this.players[0].setSymbol('O');
            this.players[1].setSymbol('X');
        }

        this.render();
    }

    getCurrentPlayer(): Player {
        if (this.players[0].symbol === 'X') {
            return (this.turns % 2 == 0) ? this.players[0] : this.players[1];
        } else {
            return (this.turns % 2 == 0) ? this.players[1] : this.players[0];
        }
    }

    listeners() {
        document.addEventListener('keydown', this.move.bind(this));
    }

    move(e) {
        const player = this.getCurrentPlayer();
        if (e.keyCode == player.controls.left && this.board.cell !== 0) {
            this.board.cell -= 1;
        } else if (e.keyCode == player.controls.up && this.board.row !== 0) {
            this.board.row -= 1;
        } else if (e.keyCode == player.controls.right && this.board.cell < this.schema - 1) {
            this.board.cell += 1;
        } else if (e.keyCode == player.controls.down && this.board.row < this.schema - 1) {
            this.board.row += 1;
        } else if (e.keyCode == player.controls.choose) {
            this.choose();
        }

        this.board.changeCell();
    }

    /**
     * Sets symbol of the current player to the selected cell.
     */
    choose() {
        const currentCell: HTMLTableCellElement = this.board.getCurrentCell();
        const player: Player = this.getCurrentPlayer();

        if (currentCell.innerHTML !== '') {
            return;
        }
        currentCell.innerHTML = player.symbol;

        this.turns += 1;
        this.checkWin(this.board.row, this.board.cell, player);
    }

    /**
     * Checks winning lines.
     *
     * @param x
     * @param y
     * @param { Object } player - Current player.
     */
    checkWin(x, y, player: Player) {
        const table: HTMLTableElement = this.board.table;

        //check row
        const row = [];
        for (let i = 0; i < this.schema; i++) {
            if (table.rows[x].cells[i].innerHTML !== player.symbol)
                break;
                row.push(table.rows[x].cells[i]);
            if (i == this.schema - 1) {
                this.showWin(player, row);
                return;
            }
        }

        //check column
        const cell = [];
        for (let i = 0; i < this.schema; i++) {
            if (table.rows[i].cells[y].innerHTML !== player.symbol)
                break;
                cell.push(table.rows[i].cells[y]);
            if (i == this.schema - 1) {
                this.showWin(player, cell);
                return;
            }
        }

        //check diagonal
        const diagonal = [];
        if (x == y) {
            for (let i = 0; i < this.schema; i++) {
                if (table.rows[i].cells[i].innerHTML !== player.symbol)
                    break;
                    diagonal.push(table.rows[i].cells[i]);
                if (i == this.schema - 1) {
                    this.showWin(player, diagonal);
                    return;
                }
            }
        }

        //check anti diagonal
        const antiDiagonal = [];
        for (let i = 0; i < this.schema; i++) {
            if (table.rows[i].cells[(this.schema - 1) - i].innerHTML !== player.symbol)
                break;
                antiDiagonal.push(table.rows[i].cells[(this.schema - 1) - i]);
            if (i == this.schema - 1) {
                this.showWin(player, antiDiagonal);
                return;
            }
        }

        //check draw
        if (this.turns === 9) {
            this.draw();
        }
    }

    /**
     * Highlight winning line and start the new game.
     *
     * @param { Object } player - The player who won.
     * @param line
     */
    showWin(player: Player, line) {
        console.dir(line);
        for(let i = 0; i < line.length; i++) {
            line[i].style.color = 'red';
        }

        player.score += 1;
        this.count += 1;

        setTimeout(() => this.reset(), 1000);
    }

    /**
     * Called if the players played in a draw.
     */
    draw() {
        alert('It\'s a draw!');
        this.count += 1;
        this.reset();
    }

    /**
     * Reset game.
     */
    reset() {
        this.board.clear();
        this.start();
    }

}
