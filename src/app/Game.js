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

    render() {
        const games = document.querySelector('.game-count');
        games.innerHTML = this.count;

        this.players[0].render('.player--first');
        this.players[1].render('.player--second');
    }

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

    reset() {
        this.board.clear();
        this.start();
    }

    getCurrentPlayer() {
        return (this.turns % 2 == 0) ? this.players[0] : this.players[1];
    }

    listeners() {
        document.addEventListener('keydown', this.move.bind(this));
    }

    move(e) {
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

    showWin(player, a, b, c) {
        a.style.color = 'red';
        b.style.color = 'red';
        c.style.color = 'red';
        player.score += 1;
        this.count += 1;
        setTimeout(() => {
            a.style.color = '';
            b.style.color = '';
            c.style.color = '';
            this.reset()
        }, 1000);
    }

    draw() {
        alert('It\'s a draw!');
        this.count += 1;
        this.reset();
    }

}
