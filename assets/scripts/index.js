import { codeMaker, codeBreaker, devSolve, boardCreate } from './board.js';
// import {devSolve} from './dev.js';

function init() {
  boardCreate();
    codeMaker();
    // devSolve();
    codeBreaker();
  }
  
  init();
  