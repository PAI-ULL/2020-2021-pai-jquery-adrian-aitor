/**
  @author  Adrian Fleitas
  @author Aitor Hernández Sánchez
  @since  28.April.2021
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

  /**
   * jquerySlide
   * @description 
   */
  #jquerySlideDiv() {
    $('#jquery').on('click', function() {
      $('#content').slideToggle('slow');
    });
  }

  /** Vanilla javascript way to toggle between divs */
  #slideDiv() {
    const slided = document.getElementById('alternative').offsetHeight;
    if(slided === 0) {
      document.getElementById('alternative').style.height = '60px';
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
