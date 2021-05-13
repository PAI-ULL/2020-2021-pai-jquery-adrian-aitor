/**
  @author  Adrian Fleitas
  @author Aitor Hernández Sánchez
  @since  28.April.2021
  @desc Toggle class that show the vanilla and jquery way to toggle between html divs
  @link https://github.com/PAI-ULL/2020-2021-pai-jquery-adrian-aitor.git
*/


'use strict';

export class Toggle {

  /** Calls the listen method to start listening to events */
  constructor() {
    this.#listen();
  }

  /** Jquery way to toggle between divs */
  #jqueryToggleDiv() {
    $("#jquery").on("click", function() {
      $("#content").toggle();
      $("#alternative").toggle();
    });
  }

  /** Vanilla javascript way to toggle between divs */
  #toggleDiv() {
    if(document.getElementById('content').style.display === 'block') {
    document.getElementById('content').style.display = 'none';
    document.getElementById('alternative').style.display = 'block';
    } else {  
    document.getElementById('alternative').style.display = 'none';
    document.getElementById('content').style.display = 'block'
    }
  } 

  /** Function that initialize the listener and functions */
  #listen() {
    document.getElementById('vanilla').addEventListener('click', this.#toggleDiv);
    this.#jqueryToggleDiv();
  }
}

let toggle = new Toggle();
