/**
  @author  Adrian Fleitas
  @author Aitor Hernández Sánchez
  @since  28.April.2021
  @desc Fade class that show the vanilla and jquery way to fade toggle an element
  @link https://github.com/PAI-ULL/2020-2021-pai-jquery-adrian-aitor.git
*/

'use strict';

export class Shake {

  /** Calls the method that listen to events and do the actions */
  constructor() {
    this.#shake();
    this.#over();
  }
  /** First shake the image then replace it with the after version
   * If the after is clicked apply a pulsate effect
   */
  #shake() {
    $('#before').on('click', () => {
      $('#before').effect('shake', 'left', () => {
        $('#before').hide();
        $('#after').show();
      });
    });
    $('#after').on('click', () => {
      $('#after').effect('pulsate', 4);
    });
    $('#reset').on('mousedown', () => {
      $('#after').hide();
      $('#before').show();
    });
  }
  
  /** On mouseover an image it switch to another one  */
  #over() {
    let imageNumber = 3;
    $('#imag').on('mouseover', () => {
      $('#imag').toggle('drop');
      let imageString = '../img/japan' + imageNumber + '.jpg';
      imageNumber = imageNumber < 6 ? imageNumber : 2;
        imageNumber++;
        $('#imag').attr('src', imageString).toggle('drop');
    });
  }
}
let shake = new Shake();


