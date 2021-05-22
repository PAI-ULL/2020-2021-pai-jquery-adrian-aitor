/**
  @author  Adrian Fleitas
  @since  17.May.2021
  @desc The controller of the halma game that listen to the click events and using the 
  #view and #model change the elements that must be changed
  @link https://github.com/PAI-ULL/pai-practica13-halma-mvc-Adrian-alu0101024363.git
  Made as an excercise for the class Programación de aplicaciones
  interactivas de la Universidad de la Laguna
*/

'use strict';

import {Cell} from '../cell.js';

/** An ES6 Controller class that listen to events of the halma game
 * @class
 */

export class Controller {
  /** @private */
  /**
   * @property {Object} view the halma view object
   * @property {Object} model the halma model object
   * @property {Array} gPieces the array with the pieces and its position
   */
  #view;
  #model;
  #gPieces;
  #gSelectedPieceHasMoved;
  /** @constructor
   * @param {Object} model the halma model object
   * @param {Object} view the view model object
   */
  constructor(model, view) {
    this.#model = model;
    this.#view = view;
    this.#gSelectedPieceHasMoved = false;
    this.#gPieces = this.#model.getgPieces();
    this.halmaOnClick = this.halmaOnClick.bind(this);
    this.#view.getcanvas().addEventListener('click', this.halmaOnClick, false);
  }

  /** Return the clicked by the user position on the canvas 
   * @param {Object} element the clicked element
   * @returns {Object} cell, the clicked cell equivalent
  */
  #getCursorPosition (element) {
    let coorX;
    let coorY;
    if (element.pageX != undefined && element.pageY != undefined) {
        coorX = element.pageX;
        coorY = element.pageY;
    }
    else {
        coorX = element.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        coorY = element.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    coorX -= this.#view.getcanvas().offsetLeft;
    coorY -= this.#view.getcanvas().offsetTop;
    coorX = Math.min(coorX, this.#view.getWIDTH() * this.#view.getPIECEWIDTH());
    coorY = Math.min(coorY, this.#view.getHEIGHT() * this.#view.getPIECEHEIGHT());
    let cell = new Cell(Math.floor(coorY/this.#view.getPIECEHEIGHT()), Math.floor(coorX/this.#view.getPIECEWIDTH()));
    return cell;
  }

  /** If a piece is clicked change the piece that is selected to then redraw
   * the board with the clicked piece in black
   * @param {Number} pieceIndex , the index of the clicked piece
   */
  #clickOnPiece(pieceIndex) {
    if (this.#view.getselected() === pieceIndex) { return; }
    this.#view.setselected(pieceIndex);
    this.setgSelectedPieceHasMoved = false;
    this.#view.drawBoard();
  }

  /** Check if the empty cell clicked is a valid cell to move the piece into
   * it also add to the move counter if the piece move
   * @param {Object} cell , the empty square (cell) clicked
   */
  #clickOnEmptyCell(cell) {
    if (this.#view.selected === -1) { return; }
    let rowDiff = Math.abs(cell.getrow() - this.#gPieces[this.#view.getselected()].getrow());
    let columnDiff = Math.abs(cell.getcolumn() - this.#gPieces[this.#view.getselected()].getcolumn());
    if ((rowDiff <= 1) && (columnDiff <= 1)) {
        this.#gPieces[this.#view.getselected()].setrow(cell.getrow());
        this.#gPieces[this.#view.getselected()].setcolumn(cell.getcolumn());
        this.#view.setgMoveCount(this.#view.getgMoveCount() + 1);
        this.#view.setselected(-1);
        this.#gSelectedPieceHasMoved = false;
        this.#view.drawBoard();
        return;
    }
    if ((((rowDiff === 2) && (columnDiff === 0)) ||
         ((rowDiff === 0) && (columnDiff === 2)) ||
         ((rowDiff === 2) && (columnDiff === 2))) &&
        this.#model.isThereAPieceBetween(this.#gPieces[this.#view.getselected()], cell)) {
        if (!this.#gSelectedPieceHasMoved) {
            this.#view.setgMoveCount(this.#view.getgMoveCount() + 1);
        }
        this.#gSelectedPieceHasMoved = true;
        this.#gPieces[this.#view.getselected()].setrow(cell.getrow());
        this.#gPieces[this.#view.getselected()].setcolumn(cell.getcolumn());
        this.#view.drawBoard();
        return;
    }
    this.#view.setselected(-1);
    this.#gSelectedPieceHasMoved = false;
    this.#view.drawBoard();
  }

  /** Method that listen to clicks on the halma game, check if
   * a piece was clicked or an empty cell was clicked using other methods
   * @param {Object} element the clicked element
   */
  halmaOnClick(element) {
    let cell = this.#getCursorPosition(element);
    for (let i = 0; i < this.#model.getgNumPieces(); i++) {
        if ((this.#gPieces[i].getrow() === cell.getrow()) &&
            (this.#gPieces[i].getcolumn() === cell.getcolumn())) {
            this.#clickOnPiece(i);
            return;
        }
    }
    this.#clickOnEmptyCell(cell);
  }
}
