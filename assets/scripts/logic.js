// MASTERMIND backend score evaluation script
// NONE OF THIS SCRIPT ACCESSES FRONT-END INFORMATION - ALL IS PASSED VIA VARIABLE
// All we are doing with these scripts is the logic, scoring, and win check.

const choiceCount = 6; // this will be an adjustable option later

export function codeMaker() {
  const codemaker = ["", "", "", ""];
  // get the codemaker's secret code
  for (let i = 0; i < 4; i++) {
    let codeChoice = Math.floor(Math.random() * choiceCount);
    codemaker[i] = codeChoice;
  }
  console.log("Solution", codemaker);
  return codemaker
}

export function codeBreaker(gameArray) {
  // begin the game; allow the codebreaker to begin guessing
  // let's set the array for what we receive and return:

  // gameHistory = [[gameRound, [roundGuess], [gameScore]]]
  // gameArray = {[gameHistory], [currentGuess], [gameSolution], winState}
  console.log(gameArray)

  let gameHistory = JSON.parse(gameArray[0]); // the ongoing guess history in local storage. Get that.
  let winState; // did they win in this round?
  let round = []; // get the round array from the guessing history.

  if (gameHistory == null) {  // if there is no history, set base round to 1.
    gameHistory = [];
    round[0] = 1;
    // console.log(gameHistory);
  }
  // otherwise, the round is the length plus 1
  else {
    round[0] = gameHistory.length + 1; // this might want to use the round option in the response, perhaps
  }
  // the following two variables create temp arrays of the secret and guessed code, so we can mess with them
  let solveArray = JSON.parse(JSON.stringify(gameArray[2])); 
  let guessArray = JSON.parse(JSON.stringify(gameArray[1])); 
  
  round[1] = Object.assign([],guessArray);
  // run scoring functions to determine... score...
  let score = codeExact(guessArray, solveArray);
  round[2] = score;
  // set the winState field in the response: 0 for Continue, 1 for Win.
  // Note - we previously have a round counter to set the lost, BUT we should let the front end handle that for game settings.

  for (let i = 0; i < 4; i++) {
    if (score[i] === 2) {
      winState = 1;
      continue;
    } else if (score[i] != 2) {
      winState = 0;
      break;
    }
  }
  round[3] = winState;
  // push to the history array and return to localStorage
  gameHistory.push(round);

  const gameReturn = [gameHistory, winState]

  return gameReturn;
}

// the following two chained functions get the score.
// we do this by elimination to avoid duplicates. This is because:
// - a choice/code match is 1:1, regardless of whether it is exact or inexact
// - both guess and code can have duplicate choices, they need to apply independently and without duplication

function codeExact(roundArray, secretArray) { 
  //We start by calculating all EXACT MATCHES (where guess is correct and in right position) and removing them from the arrays.

  let validatedScore = []; // temp array for score result. Note that it is _not_ positional to the code, just a list of scores.

  console.log("*** Begin exact validation ***");
  
  // console.log("EXACT DATA SET: ", guessArray, secretArray, validatedScore);
  
  // compare code to guess at i position.
  for (let i = 0; i < secretArray.length; i++) {
    let code = secretArray[i];
    let guess = roundArray[i];
    console.log(code, guess);
    if (code === guess) {
      // if the choice and position match, clear value from array and push "2" to score
      secretArray[i] = "";
      roundArray[i] = "";
      validatedScore.push(2);
    } else {
      // console.log("XX Doesn't match");
    }
  }
  codeMissing(roundArray, secretArray, validatedScore); // with remaining choices, move to inexact match function
  return validatedScore;
}

function codeMissing(guessArray, secretArray, validatedScore) {
  // this takes the remaining arrays, and compares each code to each guess to find any inexact matches (correct choice, wrong position)
  console.log("***Begin inexact validation***");
  
  // console.log("INEXACT DATA SET: ", guessArray, secretArray, validatedScore);

  for (let i = 0; i < secretArray.length; i++) { // loop for each code
    let code = secretArray[i];
    for (let j = 0; j < guessArray.length; j++) { // loop for each guess
      let guess = guessArray[j];

      if (code != "" && guess != "" && code === guess) { // only compare if there is a value in the array
        // if there is a match, remove from arrays and push "1" to score.
        secretArray[i] = "";
        guessArray[j] = "";
        validatedScore.push(1);
        break;
      } else {
        // console.log("XX Doesn't match");
      }
    }
  }
  return validatedScore;
}
