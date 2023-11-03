import { codeMaker, codeBreaker, devSolve, boardCreate } from './board.js';


function init() {
  boardCreate();
    codeMaker();
    // devSolve(); this is the dev to display solution on the board - keep off in prod
    codeBreaker();
  }
  
  init();
  