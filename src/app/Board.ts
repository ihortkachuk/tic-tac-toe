export default class Board {
    row: number;
    cell: number;
    table: HTMLTableElement;
    schema: number;

    constructor(schema) {
        this.schema = schema;
        this.row = 0;
        this.cell = 0;

        this.render();
        this.changeCell();
    }

    render() {
        const table = document.createElement('table');
        table.setAttribute('border', '1');
        table.setAttribute('cellspacing', '0');
        table.setAttribute('cellpadding', '0');

        for (let i = 0; i < this.schema; i++) {
            const row = document.createElement('tr');
            table.appendChild(row);

            for (let j = 0; j < this.schema; j++) {
                const cell = document.createElement('td');
                row.appendChild(cell);
            }
        }

        const target = document.querySelector('.square');
        target.appendChild(table);
        this.table = table;
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
