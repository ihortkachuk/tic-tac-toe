/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Game_1 = __webpack_require__(1);
	document.addEventListener('DOMContentLoaded', function () {
	    var ticTacToe = new Game_1.default(3);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Player_1 = __webpack_require__(2);
	var Board_1 = __webpack_require__(3);
	var Game = (function () {
	    function Game(schema) {
	        this.schema = schema;
	        this.count = 1;
	        this.players = [];
	        this.players[0] = new Player_1.default({
	            name: 'Player 1',
	            controls: { up: 87, right: 68, down: 83, left: 65, choose: 90 }
	        });
	        this.players[1] = new Player_1.default({
	            name: 'Player 2',
	            controls: { up: 38, right: 39, down: 40, left: 37, choose: 57 }
	        });
	        this.board = new Board_1.default(this.schema);
	        this.start();
	        this.listeners();
	    }
	    /**
	     * Render all data of the game.
	     */
	    Game.prototype.render = function () {
	        var games = document.querySelector('.game h2');
	        games.innerHTML = "Game " + this.count;
	        this.players[0].render('.player--first');
	        this.players[1].render('.player--second');
	    };
	    /**
	     * Start game. Clear amount of turns and set symbol to players.
	     */
	    Game.prototype.start = function () {
	        this.turns = 0;
	        var rand = Math.floor(Math.random() * 2) + 1;
	        if (rand == 1) {
	            this.players[0].setSymbol('X');
	            this.players[1].setSymbol('O');
	        }
	        else {
	            this.players[0].setSymbol('O');
	            this.players[1].setSymbol('X');
	        }
	        this.render();
	    };
	    Game.prototype.getCurrentPlayer = function () {
	        if (this.players[0].symbol === 'X') {
	            return (this.turns % 2 == 0) ? this.players[0] : this.players[1];
	        }
	        else {
	            return (this.turns % 2 == 0) ? this.players[1] : this.players[0];
	        }
	    };
	    Game.prototype.listeners = function () {
	        document.addEventListener('keydown', this.move.bind(this));
	    };
	    Game.prototype.move = function (e) {
	        var player = this.getCurrentPlayer();
	        if (e.keyCode == player.controls.left && this.board.cell !== 0) {
	            this.board.cell -= 1;
	        }
	        else if (e.keyCode == player.controls.up && this.board.row !== 0) {
	            this.board.row -= 1;
	        }
	        else if (e.keyCode == player.controls.right && this.board.cell < this.schema - 1) {
	            this.board.cell += 1;
	        }
	        else if (e.keyCode == player.controls.down && this.board.row < this.schema - 1) {
	            this.board.row += 1;
	        }
	        else if (e.keyCode == player.controls.choose) {
	            this.choose();
	        }
	        this.board.changeCell();
	    };
	    /**
	     * Sets symbol of the current player to the selected cell.
	     */
	    Game.prototype.choose = function () {
	        var currentCell = this.board.getCurrentCell();
	        var player = this.getCurrentPlayer();
	        if (currentCell.innerHTML !== '') {
	            return;
	        }
	        currentCell.innerHTML = player.symbol;
	        this.turns += 1;
	        this.checkWin(this.board.row, this.board.cell, player);
	    };
	    /**
	     * Checks winning lines.
	     *
	     * @param x
	     * @param y
	     * @param { Object } player - Current player.
	     */
	    Game.prototype.checkWin = function (x, y, player) {
	        var table = this.board.table;
	        //check row
	        var row = [];
	        for (var i = 0; i < this.schema; i++) {
	            if (table.rows[x].cells[i].innerHTML !== player.symbol)
	                break;
	            row.push(table.rows[x].cells[i]);
	            if (i == this.schema - 1) {
	                this.showWin(player, row);
	                return;
	            }
	        }
	        //check column
	        var cell = [];
	        for (var i = 0; i < this.schema; i++) {
	            if (table.rows[i].cells[y].innerHTML !== player.symbol)
	                break;
	            cell.push(table.rows[i].cells[y]);
	            if (i == this.schema - 1) {
	                this.showWin(player, cell);
	                return;
	            }
	        }
	        //check diagonal
	        var diagonal = [];
	        if (x == y) {
	            for (var i = 0; i < this.schema; i++) {
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
	        var antiDiagonal = [];
	        for (var i = 0; i < this.schema; i++) {
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
	    };
	    /**
	     * Highlight winning line and start the new game.
	     *
	     * @param { Object } player - The player who won.
	     * @param line
	     */
	    Game.prototype.showWin = function (player, line) {
	        var _this = this;
	        console.dir(line);
	        for (var i = 0; i < line.length; i++) {
	            line[i].style.color = 'red';
	        }
	        player.score += 1;
	        this.count += 1;
	        setTimeout(function () { return _this.reset(); }, 1000);
	    };
	    /**
	     * Called if the players played in a draw.
	     */
	    Game.prototype.draw = function () {
	        alert('It\'s a draw!');
	        this.count += 1;
	        this.reset();
	    };
	    /**
	     * Reset game.
	     */
	    Game.prototype.reset = function () {
	        this.board.clear();
	        this.start();
	    };
	    return Game;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var Player = (function () {
	    function Player(config) {
	        this.name = config.name;
	        this.score = 0;
	        this.controls = config.controls;
	    }
	    /**
	     * Set player symbol for game.
	     *
	     * @param { String } symbol
	     */
	    Player.prototype.setSymbol = function (symbol) {
	        this.symbol = symbol;
	    };
	    /**
	     * Render data of the player on the page.
	     *
	     * @param { String } container - Css class of container where need to insert data.
	     */
	    Player.prototype.render = function (container) {
	        var wrap = document.querySelector(container);
	        wrap.querySelector('.player__name').innerHTML = this.name;
	        wrap.querySelector('.player__score').innerHTML = this.score + " won";
	        wrap.querySelector('.player__symbol').innerHTML = this.symbol;
	    };
	    return Player;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Player;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var Board = (function () {
	    function Board(schema) {
	        this.schema = schema;
	        this.row = 0;
	        this.cell = 0;
	        this.render();
	        this.changeCell();
	    }
	    Board.prototype.render = function () {
	        var table = document.createElement('table');
	        table.setAttribute('border', '1');
	        table.setAttribute('cellspacing', '0');
	        table.setAttribute('cellpadding', '0');
	        for (var i = 0; i < this.schema; i++) {
	            var row = document.createElement('tr');
	            table.appendChild(row);
	            for (var j = 0; j < this.schema; j++) {
	                var cell = document.createElement('td');
	                row.appendChild(cell);
	            }
	        }
	        var target = document.querySelector('.square');
	        target.appendChild(table);
	        this.table = table;
	    };
	    /**
	     * Clear table contents and position of current cell.
	     */
	    Board.prototype.clear = function () {
	        this.row = 1;
	        this.cell = 1;
	        this.changeCell();
	        for (var i = 0; i < this.table.rows.length; i++) {
	            for (var j = 0; j < this.table.rows[i].cells.length; j++) {
	                this.table.rows[i].cells[j].innerHTML = '';
	                this.table.rows[i].cells[j].style.color = '';
	            }
	        }
	    };
	    /**
	     * Removes class .focus from the active cell and set to the current.
	     */
	    Board.prototype.changeCell = function () {
	        var activeCell = this.table.querySelector('.focus');
	        if (activeCell) {
	            activeCell.classList.remove('focus');
	        }
	        var currentCell = this.getCurrentCell();
	        currentCell.classList.add('focus');
	    };
	    /**
	     * Get current cell.
	     *
	     * @returns { HTMLTableCellElement }
	     */
	    Board.prototype.getCurrentCell = function () {
	        var row = this.table.rows[this.row];
	        return row.cells[this.cell];
	    };
	    return Board;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Board;


/***/ }
/******/ ]);