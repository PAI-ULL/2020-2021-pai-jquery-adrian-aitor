/**
  @author  Adrian Fleitas
  @author Aitor Hernández Sánchez
  @since  19.May.2021
  @desc Halma class that using that represent a halma game on a canvas 
  @link https://github.com/PAI-ULL/pai-practica13-halma-mvc-Adrian-alu0101024363.git
  Made as an excercise for the class Programación de aplicaciones
  interactivas de la Universidad de la Laguna
*/

'use strict';

import {Cell} from './cell.js';

import {Pieces} from './data.js';

export class Halma {
  /** @private */
  /** 
   * @property {Object} canvas , the canvas in which the game will be draw 
   * @property {Object} ctx , the context of the canvas (2d)
   * @property {Object} container a div element where the counter and progress div will be
   * @property {Object} gMoveElement , the div that show the number of moves
   * @property {Object} progress , the div that show the game progress (game over or not)
   * @property {Number} WIDHT , the widht of the board (number of columns)
   * @property {Number} HEIGHT , the height of the board (number of rows)
   * @property {Number} PIECEWIDTH , the width of the pieces
   * @property {Number} PIECEHEIGHT , the height of the pieces
   * @property {Number} PIXELWIDTH , the size of the square depending on a given size
   * @property {Number} PIXELHEIGHT , the size of the square depending on a given size
   * @property {Number} selected , the index of the selected piece
   * @property {Number} gMoveCount , the number of moves made by the user
   * @property {Bool} gameInProgress , if the pieces are not in the right top corner then true else false 
   * @property {Array} gPieces , the array of pieces to draw
   * @property {Number} gNumPieces the total number of pieces of the game
   * @property {Bool} gSelectedPieceHasMoved true if the piece has moved, false in other case
   * @property {Object} data , the data object of the halma game use only to get info to draw
   */
  #$canvas = $('<canvas />');
  #$container = $('#container');
  #$gMoveElement = $('<div />');
  #$progress = $('<div />');
  #$ctx = this.#$canvas[0].getContext('2d');
  #WIDTH = 9;
  #HEIGHT = 9;
  #PIECEWIDTH = 50; 
  #PIECEHEIGHT = 50;
  #PIXELWIDTH;
  #PIXELHEIGHT;
  #selected = undefined;
  #gPieces = [];
  #gNumPieces;
  #gSelectedPieceHasMoved;
  #data;
  #gameInProgress;
  #gMoveCount = 0;
  /** @constructor
   * @param {Number} size , the number of squares x squares the board will have, 9 given then 9 x 9
   */
  constructor(size) {
    $('body').append(this.#$canvas);
    this.#$container.append(this.#$gMoveElement);
    this.#$container.append(this.#$progress);
    this.#HEIGHT = size;
    this.#WIDTH = size;
    this.#data = new Pieces();
    this.#gPieces = this.#data.getPieces();
    this.#gNumPieces = this.#gPieces.length;
    this.#$ctx.canvas.width = window.innerHeight * 0.865;
    this.#$ctx.canvas.height = window.innerHeight * 0.87;
    this.#PIECEWIDTH = Math.trunc(this.#$ctx.canvas.height/ size);
    this.#PIECEHEIGHT = Math.trunc(this.#$ctx.canvas.height/ size);
    this.#PIXELWIDTH = this.#WIDTH * this.#PIECEWIDTH;
    this.#PIXELHEIGHT = this.#HEIGHT * this.#PIECEHEIGHT;
    this.#render();
  }

  /** Set the initial values: none is selected and the
   * game is in progress and draw the game board
  */
  #newGame() {
    this.#gSelectedPieceHasMoved = false;
    this.#selected = -1;
    this.#gameInProgress = true;
    this.#drawBoard();
  }

  /** Return the clicked by the user position on the canvas 
   * @param {Object} element the clicked element
   * @returns {Object} cell, the clicked cell equivalent
  */
  #getCursorPosition(element) {
    let row = Math.floor(element.pageY/this.#PIECEHEIGHT) - 1;
    let column = Math.floor(element.pageX /this.#PIECEWIDTH)
    let cell = new Cell(row, column);
    return cell;
  }

  /** Given a piece and the selected status draw the piece on the board 
   * @param {Object} piece that will be draw
   * @param {Number} selected the status of the given piece
  */
  #drawPiece(piece, selected) {
    let column = piece.getcolumn();
    let row = piece.getrow();
    let x = (column * this.#PIECEWIDTH) + (this.#PIECEWIDTH/2);
    let y = (row * this.#PIECEHEIGHT) + (this.#PIECEHEIGHT/2);
    let radius = (this.#PIECEWIDTH/2) - (this.#PIECEWIDTH/10);
    this.#$ctx.beginPath();
    this.#$ctx.arc(x, y, radius, 0, Math.PI*2, false);
    this.#$ctx.closePath();
    this.#$ctx.strokeStyle = '#000';
    this.#$ctx.stroke();
    if (selected) {
        this.#$ctx.fillStyle = '#000';
        this.#$ctx.fill();
    }
  }
  winEvent() {
    let game = 'You win!';
    this.#$progress.css('color', 'red');
    this.#$progress.css('font-size', 40);
    this.#$progress.text(game);
    for (let i = 0; i < 6; i++) {
      this.#$progress.fadeOut(200).fadeIn(200);
    }
  }
  /** Draw the game board and the move count and game status */
  #drawBoard() {
    let game = 'Game in progress';
    if (this.#data.isGameOver() && this.#gameInProgress) {
      this.#selected = -1;
      this.#gameInProgress = false;
      this.#$progress.effect('shake', this.winEvent);
    } else {
      this.#gameInProgress = true;
    }
    this.#$ctx.clearRect(0, 0, this.#PIXELWIDTH, this.#PIXELHEIGHT);
    this.#$ctx.beginPath();
    for (let x = 0; x <= this.#PIXELWIDTH; x += this.#PIECEWIDTH) {
        this.#$ctx.moveTo(0.5 + x, 0);
        this.#$ctx.lineTo(0.5 + x, this.#PIXELHEIGHT);
    }
    for (let y = 0; y <= this.#PIXELHEIGHT; y += this.#PIECEHEIGHT) {
        this.#$ctx.moveTo(0, 0.5 + y);
        this.#$ctx.lineTo(this.#PIXELWIDTH, 0.5 +  y);
    }

    this.#$ctx.strokeStyle = 'black';
    this.#$ctx.stroke();
    for (let i = 0; i < this.#gNumPieces; i++) {
      this.#drawPiece(this.#gPieces[i], i == this.#selected);
    }
    this.#$progress.css('color', 'black');
    this.#$progress.css('font-size', 20);
    this.#$progress.text(game);
    let moves = 'Number of moves: ' + this.#gMoveCount;
    this.#$gMoveElement.text(moves);
  }

  /** If a piece is clicked change the piece that is selected to then redraw
   * the board with the clicked piece in black
   * @param {Number} pieceIndex  the index of the clicked piece
   */
  #clickOnPiece(pieceIndex) {
    if (this.#selected === pieceIndex) { return; }
    this.#selected = pieceIndex;
    this.#gSelectedPieceHasMoved = false;
    this.#drawBoard();
  }

  /** Check if the empty cell clicked is a valid cell to move the piece into
   * it also add to the move counter if the piece move
   * @param {Object} cell , the empty square (cell) clicked
  */ 
  #clickOnEmptyCell(cell) {
    if (this.#selected == -1) { return; }
    let rowDiff = Math.abs(cell.getrow() - this.#gPieces[this.#selected].getrow());
    let columnDiff = Math.abs(cell.getcolumn() - this.#gPieces[this.#selected].getcolumn());
    if ((rowDiff <= 1) && (columnDiff <= 1)) {
        this.#gPieces[this.#selected].setrow(cell.getrow());
        this.#gPieces[this.#selected].setcolumn(cell.getcolumn());
        this.#gMoveCount += 1;
        this.#selected = -1;
        this.#gSelectedPieceHasMoved = false;
        this.#drawBoard();
        return;
    }
    if ((((rowDiff == 2) && (columnDiff == 0)) ||
         ((rowDiff == 0) && (columnDiff == 2)) ||
         ((rowDiff == 2) && (columnDiff == 2))) &&
        this.#data.isThereAPieceBetween(this.#gPieces[this.#selected], cell)) {
        if (!this.#gSelectedPieceHasMoved) {
            this.#gMoveCount += 1;
        }
        this.#gSelectedPieceHasMoved = true;
        this.#gPieces[this.#selected].setrow(cell.getrow());
        this.#gPieces[this.#selected].setcolumn(cell.getcolumn());
        this.#drawBoard();
        return;
    }
    this.#selected = -1;
    this.#gSelectedPieceHasMoved = false;
    this.#drawBoard();
  }

  /** Method that listen to clicks on the halma game, check if
   * a piece was clicked or an empty cell was clicked using other methods
   * @param {Object} element the clicked element
   */
  halmaOnClick(event) {
    let cell = this.#getCursorPosition(event);
    for (let i = 0; i < this.#gNumPieces; i++) {
        if ((this.#gPieces[i].getrow() == cell.getrow()) &&
            (this.#gPieces[i].getcolumn() == cell.getcolumn())) {
            this.#clickOnPiece(i);
            return;
        }
    }
    this.#clickOnEmptyCell(cell);
  }

  /** Listen to click events on the canvas and start a new game */
  #render() {
    this.halmaOnClick = this.halmaOnClick.bind(this);
    this.winEvent = this.winEvent.bind(this);
    this.#$canvas.on('click', this.halmaOnClick);
    this.#newGame();
  }
}

let halma = new Halma(9);