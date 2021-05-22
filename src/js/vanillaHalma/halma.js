/**
  @author  Adrian Fleitas
  @since  17.May.2021
  @desc halma client that using the model, view and controller class implement the game
  @link https://github.com/PAI-ULL/pai-practica13-halma-mvc-Adrian-alu0101024363.git
  Made as an excercise for the class Programación de aplicaciones
  interactivas de la Universidad de la Laguna
*/

'use strict';

import {Model} from './model.js';
import {View} from './view.js';
import { Controller } from './controller.js';

let model = new Model(9);
const app = new Controller(model, new View(document.body, 9, model));