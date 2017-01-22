export default class Board {
    row: number;
    cell: number;
    table: HTMLTableElement;

    constructor() {
        this.row = 1;
        this.cell = 1;
        this.table = <HTMLTableElement>document.querySelector('.board');

        this.changeCell();
    }

    /**
     * Clear table contents and position of current cell.
     */
    clear() {
        this.row = 1;
        this.cell = 1;
        this.changeCell();

        for (let i = 0; i < this.table.rows.length; i++) {
            for (let j = 0; j < this.table.rows[i].cells.length; j++) {
                this.table.rows[i].cells[j].innerHTML = '';
                this.table.rows[i].cells[j].style.color = '';
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

        const currentCell: HTMLTableCellElement = this.getCurrentCell();
        currentCell.classList.add('focus');
    }

    /**
     * Get current cell.
     *
     * @returns { HTMLTableCellElement }
     */
    getCurrentCell(): HTMLTableCellElement {
        const row: HTMLTableRowElement = this.table.rows[this.row];
        return row.cells[this.cell];
    }

}
