/**
  @author  Adrian Fleitas
  @author Aitor Hernández Sánchez
  @since  21.May.2021
  @desc Fade class that show the vanilla and jquery way to fade toggle an element
  @link https://github.com/PAI-ULL/2020-2021-pai-jquery-adrian-aitor.git
*/

'use strict';

export class Fade {

  /** 
   * @property {Object} jquery an html button element with the jquery id 
   * */
  #jquery = $('#jquery')

  /** Calls the listen method to start listening to events */
  constructor() {
    this.#listen();
  }

  /** Jquery way to fade toggle an image and change button text */
  #jqueryFade() {
    this.#jquery.on('click', () => {
      $('#alternative').fadeToggle(600);
    });
  }

  /** Vanilla way that using css fade in an element
   * @param {Object} element
   */
  #fadeIn(element){
    element.classList.add('show');
    element.classList.remove('hide');  
  }

  /** Vanilla way that using css fade out an element
   * @param {Object} element
   */
  #fadeOut(element){
    element.classList.add('hide');
    element.classList.remove('show');
  }

  /** Vanilla way to fade toggle an image and change button text */
  #vanillaFade() {
    let img = document.getElementById('alternative');
    let btn = document.getElementById('vanilla');
    btn.addEventListener('click', () => {
      if (img.className.indexOf('hide') !== -1) {
        this.#fadeIn(img);
      } else {
        this.#fadeOut(img);
      }
    });
  }

  /** Method that just call the two method that listen to the buttons */
  #listen() {
    this.#vanillaFade();
    this.#jqueryFade();
  }
}

let fade = new Fade();

