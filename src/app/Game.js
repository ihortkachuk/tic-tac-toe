class Game {

    constructor() {
        this.count = 1;
        this.players = [];
        this.players[0] = new Player('Player 1');
        this.players[1] = new Player('Player 2');

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
        this.row = 0;
        this.cell = 0;
        this.turns = 0;

        const rand = Math.floor(Math.random() * 2) + 1;

        if (rand == 1) {
            this.players[0].setSymbol('X');
            this.players[1].setSymbol('O');
        } else {
            this.players[0].setSymbol('O');
            this.players[1].setSymbol('X');
        }

        this.changeCell();
        this.render();
    }

    reset() {
        this.clearBoard();
        this.start();
    }

    clearBoard() {
        const board = document.querySelector('.board');

        for (let i = 0; i < board.rows.length; i++) {
            for (let j = 0; j < board.rows[i].cells.length; j++) {
                board.rows[i].cells[j].innerHTML = '';
            }
        }
    }

    getCurrentPlayer() {
        return (this.turns % 2 == 0) ? this.players[0] : this.players[1];
    }

    listeners() {
        document.addEventListener('keydown', this.move.bind(this));
    }

    move(e) {
        if (e.keyCode == 37 && this.cell !== 0) {
            this.cell -= 1;
        } else if (e.keyCode == 38 && this.row !== 0) {
            this.row -= 1;
        } else if (e.keyCode == 39 && this.cell < 2) {
            this.cell += 1;
        } else if (e.keyCode == 40 && this.row < 2) {
            this.row += 1;
        } else if (e.keyCode == 57) {
            this.choose();
        }
        this.changeCell();
    }

    choose() {
        const currentRow = document.getElementsByTagName('tr')[this.row];
        const currentCell = currentRow.children[this.cell];
        const player = this.getCurrentPlayer();

        if (currentCell.innerHTML !== '') {
            return;
        }

        currentCell.innerHTML = player.symbol;

        this.turns += 1;
        this.checkWin(player);
    }

    changeCell() {
        const active = document.querySelector('.focus');
        if (active) {
            active.classList.remove('focus');
        }
        const currentRow = document.getElementsByTagName('tr')[this.row];
        const currentCell = currentRow.children[this.cell];
        currentCell.classList.add('focus');
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