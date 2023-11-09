// set arrays for game.

const codemaker = ['','','',''];
// const codebreaker = [];
const choiceCount = 6;

export function codeMaker() {
  for (let i = 0; i < 4; i++) {
    let codeChoice = Math.floor(Math.random() * choiceCount);
    codemaker[i] = codeChoice;
  }
  console.log("Solution", codemaker);
}

export function codeBreaker(guessArray) {
  console.log("CodeBreaker function ", codemaker);
  let codebreaker = JSON.parse(localStorage.getItem("CodeGame"));
  console.log(codebreaker);
  let winState;
  let round = codebreaker.length + 1;
  // let guessArray = codeGuess;
  let secretArray = JSON.parse(JSON.stringify(codemaker));
  let roundGuess = JSON.parse(JSON.stringify(guessArray))
  let score = codeExact(guessArray, secretArray);
  for (let i = 0; i < 4; i++) {
    if (score[i] === 2) {
      winState = 2;
      continue;
    } else if (score[i] != 2) {
      winState = 1;
      break;
    } else if (round === 12) {
      winState = 0;
      break;
    }
  }
  codebreaker.push([roundGuess, score, winState, round]);
  console.log("Codebreaker", codebreaker);
  return codebreaker;
}

function codeExact(guessArray, secretArray) {
  let validatedScore = [];
  console.log("*** Begin exact validation ***");
  console.log("EXACT DATA SET: ", guessArray, secretArray, validatedScore);
  for (let i = 0; i < secretArray.length; i++) {
    let code = secretArray[i];
    let guess = guessArray[i];
    console.log(code, guess);
    if (code === guess) {
      secretArray[i] = "";
      guessArray[i] = "";
      validatedScore.push(2);
    } else {
      // console.log("XX Doesn't match");
    }
  }
  codeMissing(guessArray, secretArray, validatedScore);
  // console.log("SCORES: ", validatedScore);
  // console.log("Exact Solution: ", secretArray);
  // console.log("Remaining guesses: ", guessArray);
  return validatedScore;
}

function codeMissing(guessArray, secretArray, validatedScore) {
  console.log("***Begin inexact validation***");
  console.log("INEXACT DATA SET: ", guessArray, secretArray, validatedScore);
  for (let i = 0; i < secretArray.length; i++) {
    let code = secretArray[i];
    for (let j = 0; j < guessArray.length; j++) {
      let guess = guessArray[j];
      if (code != "" && guess != "" && code === guess) {
        // console.log("^^ Matches")
        secretArray[i] = "";
        guessArray[j] = "";
        validatedScore.push(1);
        break;
      } else {
        console.log("XX Doesn't match");
      }
    }
  }
  return validatedScore;
}
