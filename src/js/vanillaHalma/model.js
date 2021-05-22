/**
  @author  Adrian Fleitas
  @since  17.May.2021
  @desc The model of the halma game, completly idependent of the view and use it by controller
  @link https://github.com/PAI-ULL/pai-practica13-halma-mvc-Adrian-alu0101024363.git
  Made as an excercise for the class Programación de aplicaciones
  interactivas de la Universidad de la Laguna
*/

'use strict';

import {Cell} from '../cell.js';

/** An ES6 model class that manage the data of the halma game
 * @class
 */

export class Model {
  /** @private */
  /**
   * @property {Array} gPieces an array that contain the game pieces
   * @property {Number} gNumPieces the total number of pieces in the array
   * @property {SIZE} SIZE the number of pieces given
   */
  #gPieces = [];
  #gNumPieces;
  #SIZE = 9;
  /** @constructor
   * @param {Number} size the number of pieces given
   */
  constructor(size) {
    this.#SIZE = size;
    this.#gPieces = this.#initialPosition();
    //this.#gPieces = this.#oneToWin();
    this.#gNumPieces = this.#gPieces.length;
  }

  /** Check if there is a piece between the selected one and the other one
   * @param {Object} cell1 the first cell to check
   * @param {Object} cell2 the second cell to check
   * @returns {Bool} true if there is false if not
   */
  isThereAPieceBetween(cell1, cell2) {
    let rowBetween = (cell1.getrow() + cell2.getrow()) / 2;
    let columnBetween = (cell1.getcolumn() + cell2.getcolumn()) / 2;
    for (let i = 0; i < this.#gNumPieces; i++) {
        if ((this.#gPieces[i].getrow() == rowBetween) &&
            (this.#gPieces[i].getcolumn() == columnBetween)) {
            return true;
        }
    }
    return false;
  }

  /** Get the array of pieces */
  getgPieces() {
    return this.#gPieces;
  }

  /** get the length of the array aka the number of pieces */
  getgNumPieces() {
    return this.#gNumPieces;
  }

  /** Set the pieces in its initial positions on the array 
   * @returns {Array} pieces, the pieces in an array
  */
  #initialPosition() {
    let pieces = [];
    for(let i = 0; i < this.#SIZE /3; i++) {
      for(let j = 0; j < this.#SIZE /3; j++) {
        let cell = new Cell(this.#SIZE - i - 1, j);
        pieces.push(cell);
      }
    }
    return pieces;
  }

  /** 
   * Set the pieces just one move away to win the game (9x9)
   * @returns {Array} pieces, the pieces in onetowin position
   */
  #oneToWin() { 
    let pieces = [new Cell(0, 8),
      new Cell(0, 7),
      new Cell(0, 6),
      new Cell(1, 8),
      new Cell(1, 7),
      new Cell(1, 6),
      new Cell(2, 8),
      new Cell(2, 7),
      new Cell(2, 5)];
    return pieces;
  }

  /** Set the pieces in the initial position of a 9 x 9
   * please use initialPosition method since it takes any size
   */
  #initialninexnine() {
      this.#gPieces = [new Cell(SIZE - 3, 0),
      new Cell(SIZE - 2, 0),
      new Cell(SIZE - 1, 0),
      new Cell(SIZE - 3, 1),
      new Cell(SIZE - 2, 1),
      new Cell(SIZE - 1, 1),
      new Cell(SIZE - 3, 2),
      new Cell(SIZE - 2, 2),
      new Cell(SIZE - 1, 2)];
  }

  /** Check if it's game over or not aka check the pieces position
   * @returns {Bool} true if its game over false if not (selfexplanatory)
   */
  isGameOver() {
    for (let i = 0; i < this.#gPieces.length; i++) {
      if (this.#gPieces[i].getrow() > 2) {
          return false;
      }
      if (this.#gPieces[i].getcolumn() < (this.#SIZE- 3)) {
          return false;
      }
    }
    return true;
  }
}