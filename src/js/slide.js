/**
  @author  Adrian Fleitas
  @author Aitor Hernández Sánchez
  @since  21.May.2021
  @desc Slide example that show the vanilla and jquery way to slide an element
  @link https://github.com/PAI-ULL/2020-2021-pai-jquery-adrian-aitor.git
*/ 

'use strict';

/**
 * class Slide
 * @description implements the vanilla and jquery ways to do an slide as functions  
 */
export class Slide {

  constructor() {
    this.#listen();
  }

  /** Jquery way to slide an element */
  #jquerySlideDiv() {
    $('#jquery').on('click', function() {
      $('#content').slideToggle('slow');
    });
  }

  /** Vanilla javascript way to slide an element */
  #slideDiv() {
    const slided = document.getElementById('alternative').offsetHeight;
    if(slided === 0) {
      document.getElementById('alternative').style.height = '400px';
    } else {  
      document.getElementById('alternative').style.height = '0px';
    }
  } 

  /** Function that initialize the listener and functions */
  #listen() {
    document.getElementById('vanilla').addEventListener('click', this.#slideDiv);
    this.#jquerySlideDiv();
  }
}

const slide = new Slide();
