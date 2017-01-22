class Game {

    constructor() {
        this.count = 1;
        this.players = [];
        this.players[0] = new Player('Player 1');
        this.players[1] = new Player('Player 2');
        this.board = new Board();

        this.start();
        this.listeners();
    }

    /**
     * Render all data of the game.
     */
    render() {
        const games = document.querySelector('.game-count');
        games.innerHTML = this.count;

        this.players[0].render('.player--first');
        this.players[1].render('.player--second');
    }

    /**
     * Start game. Clear amount of turns and set symbol to players.
     */
    start() {
        this.turns = 0;
        const rand = Math.floor(Math.random() * 2) + 1;

        if (rand == 1) {
            this.players[0].setSymbol('X');
            this.players[1].setSymbol('O');
        } else {
            this.players[0].setSymbol('O');
            this.players[1].setSymbol('X');
        }

        this.render();
    }

    getCurrentPlayer() {
        // TODO: Make player X start first
        return (this.turns % 2 == 0) ? this.players[0] : this.players[1];
    }

    listeners() {
        document.addEventListener('keydown', this.move.bind(this));
    }

    move(e) {
        // TODO: Add different key for player 2
        if (e.keyCode == 37 && this.board.cell !== 0) {
            this.board.cell -= 1;
        } else if (e.keyCode == 38 && this.board.row !== 0) {
            this.board.row -= 1;
        } else if (e.keyCode == 39 && this.board.cell < 2) {
            this.board.cell += 1;
        } else if (e.keyCode == 40 && this.board.row < 2) {
            this.board.row += 1;
        } else if (e.keyCode == 57) {
            this.choose();
        }

        this.board.changeCell();
    }

    /**
     * Sets symbol of the current player to the selected cell.
     */
    choose() {
        const currentCell = this.board.getCurrentCell();
        const player = this.getCurrentPlayer();

        if (currentCell.innerHTML !== '') {
            return;
        }
        currentCell.innerHTML = player.symbol;

        this.turns += 1;
        this.checkWin(player);
    }

    /**
     * Checks winning lines.
     *
     * @param { Object } player - Current player.
     */
    checkWin(player) {
        const table = document.querySelector('.board');

        if (table.rows[0].cells[0].innerHTML === player.symbol &&
            table.rows[0].cells[1].innerHTML === player.symbol &&
            table.rows[0].cells[2].innerHTML === player.symbol) {
            this.showWin(player, table.rows[0].cells[0], table.rows[0].cells[1], table.rows[0].cells[2]);
        } else if (table.rows[1].cells[0].innerHTML === player.symbol &&
            table.rows[1].cells[1].innerHTML === player.symbol &&
            table.rows[1].cells[2].innerHTML === player.symbol) {
            this.showWin(player, table.rows[1].cells[0], table.rows[1].cells[1], table.rows[1].cells[2]);
        } else if (table.rows[2].cells[0].innerHTML === player.symbol &&
            table.rows[2].cells[1].innerHTML === player.symbol &&
            table.rows[2].cells[2].innerHTML === player.symbol) {
            this.showWin(player, table.rows[2].cells[0], table.rows[2].cells[1], table.rows[2].cells[2]);
        } else if (table.rows[0].cells[0].innerHTML === player.symbol &&
            table.rows[1].cells[0].innerHTML === player.symbol &&
            table.rows[2].cells[0].innerHTML === player.symbol) {
            this.showWin(player, table.rows[0].cells[0], table.rows[1].cells[0], table.rows[2].cells[0]);
        } else if (table.rows[0].cells[1].innerHTML === player.symbol &&
            table.rows[1].cells[1].innerHTML === player.symbol &&
            table.rows[2].cells[1].innerHTML === player.symbol) {
            this.showWin(player, table.rows[0].cells[1], table.rows[1].cells[1], table.rows[2].cells[1]);
        } else if (table.rows[0].cells[2].innerHTML === player.symbol &&
            table.rows[1].cells[2].innerHTML === player.symbol &&
            table.rows[2].cells[2].innerHTML === player.symbol) {
            this.showWin(player, table.rows[0].cells[2], table.rows[1].cells[2], table.rows[2].cells[2]);
        } else if (table.rows[0].cells[0].innerHTML === player.symbol &&
            table.rows[1].cells[1].innerHTML === player.symbol &&
            table.rows[2].cells[2].innerHTML === player.symbol) {
            this.showWin(player, table.rows[0].cells[0], table.rows[1].cells[1], table.rows[2].cells[2]);
        } else if (table.rows[0].cells[2].innerHTML === player.symbol &&
            table.rows[1].cells[1].innerHTML === player.symbol &&
            table.rows[2].cells[0].innerHTML === player.symbol) {
            this.showWin(player, table.rows[0].cells[2], table.rows[1].cells[1], table.rows[2].cells[0]);
        } else {
            if (this.turns === 9) {
                this.draw();
            }
        }
    }

    /**
     * Highlight winning line and start the new game.
     *
     * @param { Object } player - The player who won.
     * @param { HTMLTableCellElement } firstCell
     * @param { HTMLTableCellElement } secondCell
     * @param { HTMLTableCellElement } thirdCell
     */
    showWin(player, firstCell, secondCell, thirdCell) {
        firstCell.style.color = 'red';
        secondCell.style.color = 'red';
        thirdCell.style.color = 'red';

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
