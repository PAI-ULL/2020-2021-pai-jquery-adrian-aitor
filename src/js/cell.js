/**
  @author  Adrian Fleitas
  @since  17.May.2021
  @desc  Class that represent a cell or square of the halma board game. It has only 
  a row and a column and its used by the model to generate an array of cells
  @link https://github.com/PAI-ULL/pai-practica13-halma-mvc-Adrian-alu0101024363.git
  Made as an excercise for the class Programación de aplicaciones
  interactivas de la Universidad de la Laguna
*/

'use strict';

/** An ES6 Cell class that represent a piece position
 * @class
 */

export class Cell {
  /** @private */
  /** 
   * @property {Number} row the row of the cell/ piece 
   * @property {Number} column the column of the cell / piece 
   */
  #row;
  #column;
  constructor(row, column) {
    this.#column = column;
    this.#row = row;
  }

  /** Get the row of the cell or piece
   * @returns {Number} row
   */
  getrow() {
    return this.#row;
  }

  /** Get the column of the cell or piece
   * @returns {Number} column
   */
  getcolumn() {
    return this.#column
  }

  /** Set the row of the cell or piece
   * @returns {Number} row
   */
  setrow(row) {
    this.#row = row;
  }

  /** Set the column of the cell or piece
   * @returns {Number} column
   */
  setcolumn(column) {
    this.#column = column;
  }
}