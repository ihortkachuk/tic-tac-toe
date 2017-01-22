export default class Player {
    name: string;
    score: number;
    symbol: string;
    controls: {
        up: number,
        right: number,
        down: number,
        left: number,
        choose: number,
    };

    constructor(config) {
        this.name = config.name;
        this.score = 0;
        this.controls = config.controls;
    }

    /**
     * Set player symbol for game.
     *
     * @param { String } symbol
     */
    setSymbol(symbol) {
        this.symbol = symbol;
    }

    /**
     * Render data of the player on the page.
     *
     * @param { String } container - Css class of container where need to insert data.
     */
    render(container: string) {
        const wrap = document.querySelector(container);

        wrap.querySelector('.player__name').innerHTML = this.name;
        wrap.querySelector('.player__score').innerHTML = `${this.score} won`;
        wrap.querySelector('.player__symbol').innerHTML = this.symbol;
    }

}
