/**
  @author  Adrian Fleitas
  @author Aitor Hernández Sánchez
  @since  19.May.2021
  @desc Pieces class that initialize the position of the pieces and manage its data
  @link https://github.com/PAI-ULL/2020-2021-pai-jquery-adrian-aitor.git
  Made as an excercise for the class Programación de aplicaciones
  interactivas de la Universidad de la Laguna
*/

'use strict';

import {Cell} from './cell.js';

/** An ES6 model class that contain the data of the halma game
 * @class
 */

export class Pieces {
  /** @private */
  /**
   * @property {Array} gPieces an array that contain the game pieces
  */
  #gPieces = [];
  constructor() {
    //this.#initialPosition();
    this.#oneToWin();
  }

  /** Set the pieces in its initial positions on the array */
  #initialPosition() {
    this.#gPieces = [new Cell(6, 0),
      new Cell(7, 0),
      new Cell(8, 0),
      new Cell(6, 1),
      new Cell(7, 1),
      new Cell(8, 1),
      new Cell(6, 2),
      new Cell(7, 2),
      new Cell(8, 2)];
  }

  /** Set the pieces just one move away to win the game (9x9) */
  #oneToWin() { 
    this.#gPieces = [new Cell(0, 8),
      new Cell(0, 7),
      new Cell(0, 6),
      new Cell(1, 8),
      new Cell(1, 7),
      new Cell(1, 6),
      new Cell(2, 8),
      new Cell(2, 7),
      new Cell(2, 5)];
  }

  /** Check if there is a piece between the selected one and the other one
   * @param {Object} cell1 the first cell to check
   * @param {Object} cell2 the second cell to check
   * @returns {Bool} true if there is false if not
   */
  isThereAPieceBetween(cell1, cell2) {
    let rowBetween = (cell1.getrow() + cell2.getrow()) / 2;
    let columnBetween = (cell1.getcolumn() + cell2.getcolumn()) / 2;
    for (let i = 0; i < this.#gPieces.length; i++) {
        if ((this.#gPieces[i].getrow() == rowBetween) &&
            (this.#gPieces[i].getcolumn() == columnBetween)) {
            return true;
        }
    }
    return false;
  }

 /** Get the array of pieces
  * @returns {Array} the game pieces 
  */
  getPieces() {
    return this.#gPieces;
  }
  
  /** Check if it's game over or not aka check the pieces position
   * @returns {Bool} true if its game over false if not (selfexplanatory)
   */
   isGameOver() {
    for (let i = 0; i < this.#gPieces.length; i++) {
      if (this.#gPieces[i].getrow() > 2) {
          return false;
      }
      if (this.#gPieces[i].getcolumn() < 6) {
          return false;
      }
    }
    return true;
  }
}