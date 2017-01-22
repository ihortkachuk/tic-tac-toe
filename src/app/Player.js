class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }

    setSymbol(symbol) {
        this.symbol = symbol;
    }

    render(container) {
        const wrap = document.querySelector(container);

        wrap.querySelector('.player__name').innerHTML = this.name;
        wrap.querySelector('.player__score').innerHTML = `${this.score} won`;
        wrap.querySelector('.player__symbol').innerHTML = this.symbol;
    }
}