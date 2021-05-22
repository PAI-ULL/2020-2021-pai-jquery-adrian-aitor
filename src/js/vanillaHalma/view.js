/**
  @author  Adrian Fleitas
  @since  17.May.2021
  @desc The view of the halma game that draw the board in its current status or initial status 
  if it's a new game.
  @link https://github.com/PAI-ULL/pai-practica13-halma-mvc-Adrian-alu0101024363.git
  Made as an excercise for the class Programación de aplicaciones
  interactivas de la Universidad de la Laguna
*/

'use strict';


/** An ES6 view class that draw the halma game in a canvas 
 * @class
 */

export class View {
  /** @private */
  /** 
   * @property {Object} canvas , the canvas in which the game will be draw 
   * @property {Object} ctx , the context of the canvas (2d)
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
   * @property {Object} model , the model object of the halma game use only to get info to draw
   */
  #canvas = document.createElement('CANVAS');
  #ctx = this.#canvas.getContext('2d');
  #gMoveElement = document.createElement('div');
  #progress = document.createElement('div');
  #container = document.getElementById('container');
  #WIDTH = 9;
  #HEIGHT = 9;
  #PIECEWIDTH = 50; 
  #PIECEHEIGHT = 50;
  #PIXELWIDTH;
  #PIXELHEIGHT;
  #selected = undefined;
  #gameInProgress;
  #gMoveCount = 0;
  #gPieces = [];
  #model;
  /** @constructor
   * @param {Object} containerElement , the html element in which the canvas will be append
   * @param {Number} size , the number of squares x squares the board will have, 9 given then 9 x 9
   * @param {Object} data , the data with the pieces initial position to then draw them 
   */
  constructor(containerElement, size, data) {
    containerElement.appendChild(this.#canvas);
    this.#container.appendChild(this.#gMoveElement);
    this.#container.appendChild(this.#progress);
    this.#HEIGHT = size;
    this.#WIDTH = size;
    this.#ctx.canvas.width = window.innerHeight * 0.865;
    this.#ctx.canvas.height = window.innerHeight * 0.87;
    this.#PIECEWIDTH = Math.trunc(this.#ctx.canvas.height/ size);
    this.#PIECEHEIGHT = Math.trunc(this.#ctx.canvas.height/ size);
    this.#PIXELWIDTH = this.#WIDTH * this.#PIECEWIDTH;
    this.#PIXELHEIGHT = this.#HEIGHT * this.#PIECEHEIGHT;
    this.#gPieces = data.getgPieces();
    this.#model = data;
    this.#newGame();
  }

  /** Get the halma canvas
   * @returns {Object} canvas with the halma game
   */
  getcanvas() {
    return this.#canvas;
  }

  /** Get the width of the board
   * @returns {Number} width
   */
  getWIDTH() {
    return this.#WIDTH;
  }

  /** Get the height of the board 
   * @returns {Number} height
  */
  getHEIGHT() {
    return this.#HEIGHT;
  }

  /** Get the widht of the pieces
   * @returns {Number} pieceWidth
   */
  getPIECEWIDTH() {
    return this.#PIECEWIDTH;
  }

  /** Get the height of the pieces
   * @returns {Number} pieceHeight
   */
  getPIECEHEIGHT() {
    return this.#PIECEHEIGHT;
  }

  /** Get the selected index
   * @returns {Number} -1 if none, piece index if there is one selected
  */
  getselected() {
    return this.#selected;
  }

  /** Given a select status set the index of the selected piece*/
  setselected(select) {
    this.#selected = select;
  }

  /** Get the number of moves the user has done
   * @returns {Number} gMoveCount 
   */
  getgMoveCount() {
    return this.#gMoveCount;
  }

  /** Given a number of moves, set the number of moves to be drawn
   * @param {Number} count , moves number
   */
  setgMoveCount(count) {
    this.#gMoveCount = count;
  } 

  /** Draw the game board and the move count and game status */
  drawBoard() {
    let game = 'Game in progress';
    if (this.#model.isGameOver() && this.#gameInProgress) {
      this.#selected = -1;
      this.#gameInProgress = false;
      game = 'Game over';
    } else {
      this.#gameInProgress = true;
    }
    this.#ctx.clearRect(0, 0, this.#PIXELWIDTH, this.#PIXELHEIGHT);
    this.#ctx.beginPath();
    for (let x = 0; x <= this.#PIXELWIDTH; x += this.#PIECEWIDTH) {
        this.#ctx.moveTo(0.5 + x, 0);
        this.#ctx.lineTo(0.5 + x, this.#PIXELHEIGHT);
    }
    for (let y = 0; y <= this.#PIXELHEIGHT; y += this.#PIECEHEIGHT) {
        this.#ctx.moveTo(0, 0.5 + y);
        this.#ctx.lineTo(this.#PIXELWIDTH, 0.5 +  y);
    }

    this.#ctx.strokeStyle = 'black';
    this.#ctx.stroke();
    for (let i = 0; i < this.#gPieces.length; i++) {
      this.#drawPiece(this.#gPieces[i], i == this.#selected);
    }
    let moves = 'Number of moves: ' + this.#gMoveCount;
    this.#gMoveElement.textContent = moves;
    this.#progress.textContent = game;
  }

  /** Given a piece and the selected status draw the piece on the board 
   * @param {Object} piece that will be draw
   * @param {Number} selected the status of the given piece
  */
  #drawPiece(piece, selected) {
    let column = piece.getcolumn();
    let row = piece.getrow();
    let coorX = (column * this.#PIECEWIDTH) + (this.#PIECEWIDTH/2);
    let coorY = (row * this.#PIECEHEIGHT) + (this.#PIECEHEIGHT/2);
    let radius = (this.#PIECEWIDTH/2) - (this.#PIECEWIDTH/10);
    this.#ctx.beginPath();
    this.#ctx.arc(coorX, coorY, radius, 0, Math.PI * 2, false);
    this.#ctx.closePath();
    this.#ctx.strokeStyle = '#000';
    this.#ctx.stroke();
    if (selected) {
        this.#ctx.fillStyle = '#000';
        this.#ctx.fill();
    }
  }

  /** Set the initial values none is selected and the
   * game is in progress and draw the game board
  */
  #newGame() {
    this.#selected = -1;
    this.#gameInProgress = true;
    this.drawBoard();
  }
}