/**
  @author  Adrian Fleitas
  @author Aitor Hernández Sánchez
  @since  21.May.2021
  @desc Shake class that after the image is clicked it switched to another image and if
  that second image is clicked it pulsate 4 times
  @link https://github.com/PAI-ULL/2020-2021-pai-jquery-adrian-aitor.git
*/

'use strict';

export class Shake {

  /**
   * @property {Object} before the image shown before the shake effect
   * @property {Object} after the image shown after the shake effect
   * @property {Object} img the image that will be switched on mouse over
   */
  #before = $('#before');
  #after = $('#after');
  #img = $('#imag');
  /** Calls the method that listen to events and do the actions */
  constructor() {
    this.#shake();
    this.#over();
  }

  /** First shake the image then replace it with the after version
   * If the after is clicked apply a pulsate effect
   */
  #shake() {
    this.#before.on('click', () => {
     this.#before.effect('shake', 'left', () => {
        this.#before.hide();
        this.#after.show();
      });
    });
    this.#after.on('click', () => {
      this.#after.effect('pulsate');
    });
    $('#reset').on('mousedown', () => {
      this.#after.hide();
      this.#before.show();
    });
  }
  
  /** On mouseover an image it switch to another one  */
  #over() {
    let imageNumber = 3;
    this.#img.on('mouseover', () => {
      this.#img.toggle('drop');
      let imageString = '../img/japan' + imageNumber + '.jpg';
      imageNumber = imageNumber < 6 ? imageNumber : 2;
        imageNumber++;
        this.#img.attr('src', imageString).toggle('drop');
    });
  }
}

let shake = new Shake();