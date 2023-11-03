// set arrays for game.

const codemaker = [];
const codebreaker = [];
var code_colours = [];

// set 6 colours
let colour1 = getComputedStyle(document.documentElement).getPropertyValue(
  "--colour1"
);
let colour2 = getComputedStyle(document.documentElement).getPropertyValue(
  "--colour2"
);
let colour3 = getComputedStyle(document.documentElement).getPropertyValue(
  "--colour3"
);
let colour4 = getComputedStyle(document.documentElement).getPropertyValue(
  "--colour4"
);
let colour5 = getComputedStyle(document.documentElement).getPropertyValue(
  "--colour5"
);
let colour6 = getComputedStyle(document.documentElement).getPropertyValue(
  "--colour6"
);

let base_colours = [colour1, colour2, colour3, colour4, colour5, colour6];

// code has 4 pegs

let choice1 = getComputedStyle(document.documentElement).getPropertyValue(
  "--choice1"
);
let choice2 = getComputedStyle(document.documentElement).getPropertyValue(
  "--choice2"
);
let choice3 = getComputedStyle(document.documentElement).getPropertyValue(
  "--choice3"
);
let choice4 = getComputedStyle(document.documentElement).getPropertyValue(
  "--choice4"
);

let submitRow = [choice1, choice2, choice3, choice4];

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
    let codeChoice = "--colour" + (Math.floor(Math.random() * 6) + 1);
    getComputedStyle(document.documentElement).getPropertyValue(codeChoice);
    codemaker.push(codeChoice);
  }
  console.log("Solution", codemaker);
}

function handlePick() {
  // console.log(event.target.previousSibling.previousSibling.style);
  let boardBox = event.target.previousSibling.previousSibling;
  boardBox.style.setProperty("background-color", `var(${event.target.value})`);
}

export function codeBreaker() {
  let roundChoice = [];
  let choiceBoxes = document.getElementById("choiceBox");
  choiceBoxes.addEventListener("input", handlePick);
  document
    .getElementById("submit")
    .addEventListener("click", () => handleSubmit());
}

function handleSubmit() {
  code_colours = [];
  let scoreArray = [];
  let sel_Array = [];
  sel_Array = document.getElementsByName("colour-select");
  for (let i = 0; i < sel_Array.length; i++) {
    code_colours.push(sel_Array[i].value);
    scoreArray.push(sel_Array[i].value)
  }
  let secretArray = codemaker;
  // let score = [];
  let score = codeExact(scoreArray, secretArray)
  let roundScore = [code_colours, score];
  codebreaker.push(roundScore)
  console.log(codebreaker);
  scoreBoard(codebreaker);
  boardCreate();
}

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

function scoreBoard(codebreaker) {
  let rounds = document.getElementById("rounds");
  rounds.innerHTML = "";
  codebreaker.forEach((round, i) => {
  let scoreRound = i+1;
  let scoreColours = round[0];
  let scoreTick = round[1];
  console.log(codebreaker);
  console.log(scoreColours);
  console.log(scoreTick);
  function scoreTicker(tick) {
    if (tick === 2) {
      return "background-color: white";
    } else if (tick === 1) {
      return "background-color: red";
    } else {
      return "display: none";
    }
  }
  rounds.innerHTML += `<div class="colour-options">
    <div>Round ${scoreRound}</div>
    <div class="colour choice" style="background-color: var(${
      scoreColours[0]
    })">Hello</div>
    <div class="colour choice" style="background-color: var(${
      scoreColours[1]
    })">Hello</div>
    <div class="colour choice" style="background-color: var(${
      scoreColours[2]
    })">Hello</div>
    <div class="colour choice" style="background-color: var(${
      scoreColours[3]
    })">Hello</div>
    </div>
    <div class="scoreTick">
    <div class="tick" style="${scoreTicker(scoreTick[0])}">${scoreTick[0]}</div>
    <div class="tick" style="${scoreTicker(scoreTick[1])}">${scoreTick[1]}</div>
    <div class="tick" style="${scoreTicker(scoreTick[2])}">${scoreTick[2]}</div>
    <div class="tick" style="${scoreTicker(scoreTick[3])}">${scoreTick[3]}</div>
    <div
    </div>
    `;
})}

export function boardCreate() {
  let board = document.getElementById("choiceBox");

  
  board.innerHTML = `
  <div class="option-box">
  <div class="colour choice" id="choice1">&nbsp;</div>
  <select name="colour-select" id="selector1">
    <option value="" defaultSelected>Pick Colour</option>
    <option value="--colour1" id="colour1">Red</option>
    <option value="--colour2" id="colour2">Orange</option>
    <option value="--colour3" id="colour3">Yellow</option>
    <option value="--colour4" id="colour4">Green</option>
    <option value="--colour5" id="colour5">Blue</option>
    <option value="--colour6" id="colour6">Violet</option>
  </select>
</div>
<div class="option-box">
              <div class="colour choice" id="choice2">&nbsp;</div>
              <select name="colour-select" id="selector2">
                <option value="" deaultSelected>Pick Colour</option>
                <option value="--colour1" id="colour1">Red</option>
                <option value="--colour2" id="colour2">Orange</option>
                <option value="--colour3" id="colour3">Yellow</option>
                <option value="--colour4" id="colour4">Green</option>
                <option value="--colour5" id="colour5">Blue</option>
                <option value="--colour6" id="colour6">Violet</option>
              </select>
            </div>
            <div class="option-box">
              <div class="colour choice" id="choice3">&nbsp;</div>
              <select name="colour-select" id="selector3">
                <option value="" defaultSelected>Pick Colour</option>
                <option value="--colour1" id="colour1">Red</option>
                <option value="--colour2" id="colour2">Orange</option>
                <option value="--colour3" id="colour3">Yellow</option>
                <option value="--colour4" id="colour4">Green</option>
                <option value="--colour5" id="colour5">Blue</option>
                <option value="--colour6" id="colour6">Violet</option>
              </select>
            </div>
            <div class="option-box">
              <div class="colour choice" id="choice4">&nbsp;</div>
              <select name="colour-select" id="selector4">
                <option value="" defaultSelected>Pick Colour</option>
                <option value="--colour1" id="colour1">Red</option>
                <option value="--colour2" id="colour2">Orange</option>
                <option value="--colour3" id="colour3">Yellow</option>
                <option value="--colour4" id="colour4">Green</option>
                <option value="--colour5" id="colour5">Blue</option>
                <option value="--colour6" id="colour6">Violet</option>
              </select>
            </div>`
}


function boardReset() {

}

// generate next board

// repeat 12 times.
