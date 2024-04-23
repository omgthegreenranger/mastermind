// MASTERMIND backend score evaluation script

// set arrays for game.

// set constants

const choiceCount = 6; // this will be an adjustable option later
const roundCount = 12; // this will be an adjustable option later

export function codeMaker() {
  const code = ['', '', '', ''];
  // get the codemaker's secret code
  for (let i = 0; i < 4; i++) {
    let codeChoice = Math.floor(Math.random() * choiceCount); 
    code[i] = codeChoice;
  }
  console.log("Solution", code);
  return code;
}

export function codeBreaker(guessArray, codemaker) {
  // begin the game; allow the codebreaker to begin guessing

  console.log("Secret Code", codemaker);
  console.log("Guess Array", guessArray);

  // Set variables
  let codebreaker = JSON.parse(localStorage.getItem("CodeGame")); // the ongoing guess history in local storage. Get that.
  let winState; // did they win in this round?
  let round; // get the round array from the guessing history.
  // if there is no history, set base round to 1.
  if (!codebreaker) {
    codebreaker = [];
    round = 1;
    console.log(codebreaker);
  }
  // otherwise, the round is the length plus 1
  else {
    round = codebreaker.length + 1; // this might want to use the round option in the response, perhaps
  }
  
  // the following two variables create temp arrays of the secret and guessed code, so we can mess with them
  let secretArray = structuredClone(codemaker); 
  let roundGuess = JSON.parse(JSON.stringify(guessArray)); 

  // run scoring functions to determine... score...
  let score = codeExact(guessArray, secretArray);
  
  // set the winState field in the response - 2 for WIN, 1 for CONTINUE, 0 for LOST
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

  // push to the history array and return to localStorage
  codebreaker.push([roundGuess, score, winState, round]);
  console.log("Codebreaker", codebreaker);
  localStorage.setItem("CodeGame", JSON.stringify(codebreaker));
  return codebreaker;
}

// the following two chained functions get the score.
// we do this by elimination to avoid duplicates. This is because:
// - a choice/code match is 1:1, regardless of whether it is exact or inexact
// - both guess and code can have duplicate choices, they need to apply independently and without duplication

function codeExact(guessArray, secretArray) { 
  //We start by calculating all EXACT MATCHES (where guess is correct and in right position) and removing them from the arrays.

  let validatedScore = [0,0,0,0]; // temp array for score result. Note that it is _not_ positional to the code, just a list of scores.

  console.log("*** Begin exact validation ***", secretArray);
  
  // console.log("EXACT DATA SET: ", guessArray, secretArray, validatedScore);
  
  // compare code to guess at i position.
  for (let i = 0; i < secretArray.length; i++) {
    let code = secretArray[i];
    let guess = guessArray[i];
    console.log(code, guess);
    if (code === guess) {
      // if the choice and position match, clear value from array and push "2" to score
      secretArray[i] = "";
      guessArray[i] = "";
      validatedScore[i] = 2;
    } else {
      // console.log("XX Doesn't match");
    }
  }
  codeMissing(guessArray, secretArray, validatedScore); // with remaining choices, move to inexact match function
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

      if (code !== "" && guess !== "" && code === guess) { // only compare if there is a value in the array
        // if there is a match, remove from arrays and push "1" to score.
        secretArray[i] = "";
        guessArray[j] = "";
        validatedScore[i] = 1;
        break;
      } else {
        // console.log("XX Doesn't match");
      }
    }
  }
  return validatedScore;
}
