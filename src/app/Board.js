class Board {

    constructor() {
        this.row = 0;
        this.cell = 0;
        this.table = document.querySelector('.board');

        this.changeCell();
    }

    /**
     * Clear table contents and position of current cell.
     */
    clear() {
        this.row = 0;
        this.cell = 0;
        this.changeCell();

        for (let i = 0; i < this.table.rows.length; i++) {
            for (let j = 0; j < this.table.rows[i].cells.length; j++) {
                this.table.rows[i].cells[j].innerHTML = '';
            }
        }
    }

    /**
     * Removes class .focus from the active cell and set to the current.
     */
    changeCell() {
        const activeCell = this.table.querySelector('.focus');
        if (activeCell) {
            activeCell.classList.remove('focus');
        }

        const currentCell = this.getCurrentCell();
        currentCell.classList.add('focus');
    }

    /**
     * Get current cell.
     *
     * @returns { HTMLTableCellElement }
     */
    getCurrentCell() {
        const row = this.table.rows[this.row];
        return row.cells[this.cell];
    }

}