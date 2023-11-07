// set arrays for game.

const codemaker = [];
const codebreaker = [];
var code_colours = [];

// set Codemaker code from 6 colours:

export function devSolve() {
  let solve = document.getElementById("dev-solve");
  solve.innerHTML += `<div class="colour-options">
    <div class="colour choice" style="background-color: var(${codemaker[0]})">Hello</div>
    <div class="colour choice" style="background-color: var(${codemaker[1]})">Hello</div>
    <div class="colour choice" style="background-color: var(${codemaker[2]})">Hello</div>
    <div class="colour choice" style="background-color: var(${codemaker[3]})">Hello</div>
    </div>
    `;
}

export function codeMaker() {
  for (let i = 0; i < 4; i++) {
    let codeChoice = /* "colour" + */ (Math.floor(Math.random() * 6) + 1);
    // getComputedStyle(document.documentElement).getPropertyValue(codeChoice);
    codemaker.push(codeChoice);
  }
  // console.log("Solution", codemaker);
  // return codemaker
}

export function codeBreaker(codeGuess, roundGuess) {
  console.log("CodeBreaker function ", codemaker)
  let scoreArray = codeGuess;
  let secretArray = codemaker;
  let score = codeExact(scoreArray, secretArray)
  let roundScore = [roundGuess, score];
  codebreaker.push(roundScore)
  console.log("Codebreaker", secretArray);
  // scoreBoard(codebreaker);
  // boardReset(codebreaker);
  return codebreaker

}

// function handleSubmit() {
//   code_colours = [];
//   let scoreArray = [];
//   let sel_Array = [];
//   sel_Array = document.getElementsByName("colour-select");
//   for (let i = 0; i < sel_Array.length; i++) {
//     code_colours.push(sel_Array[i].value);
//     scoreArray.push(sel_Array[i].value)
//   }
//   let secretArray = codemaker;
//   // let score = [];
//   let score = codeExact(scoreArray, secretArray)
//   let roundScore = [code_colours, score];
//   codebreaker.push(roundScore)
//   console.log(codebreaker);
//   scoreBoard(codebreaker);
//   boardReset(codebreaker);
// }

function codeExact(scoreArray, secretArray) {
  let validatedScore = []
  console.log("*** Begin exact validation ***")
  console.log("EXACT DATA SET: ", scoreArray, secretArray, validatedScore)
  for (let i = 0; i < secretArray.length; i++) {
    let code = secretArray[i];
    let colour = scoreArray[i];
    if (code === colour) {
      // console.log("^^ Matches")
      secretArray[i] = "";
      scoreArray[i] = "";
      validatedScore.push(2);
    } else {
      console.log("XX Doesn't match");
    }
  }
  codeMissing(scoreArray, secretArray, validatedScore)
  console.log("SCORES: ", validatedScore)
  console.log("Exact Solution: ", secretArray)
  console.log("Remaining guesses: ",scoreArray)
  return validatedScore;
}

function codeMissing(scoreArray, secretArray, validatedScore) {
  console.log("***Begin inexact validation***")
  console.log("INEXACT DATA SET: ", scoreArray, secretArray, validatedScore)
  // console.log("Solution: ", secret)
  // console.log("Guess: ", colours)
  // run loop for each pin in the solution
  for (let i = 0; i < secretArray.length; i++) {
    let code = secretArray[i];
    for (let j = 0; j < scoreArray.length; j++) {
      let colour = scoreArray[j];
      if (code != "" && colour != "" && code === colour) {
        // console.log("^^ Matches")
        secretArray[i] = "";
        scoreArray[j] = "";
        validatedScore.push(1);
        break;
      } else {
        console.log("XX Doesn't match");
      }
    }
  }
  console.log("Remaining Score: ", validatedScore)
  console.log("Remaining Solution: ", secretArray)
  console.log("Remaining guesses: ", scoreArray)
  return validatedScore;
}


// generate next board

// repeat 12 times.
