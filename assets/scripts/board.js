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
    <div class="colour choice" style="background-color: var(${
      codemaker[0]
    })">Hello</div>
    <div class="colour choice" style="background-color: var(${
      codemaker[1]
    })">Hello</div>
    <div class="colour choice" style="background-color: var(${
      codemaker[2]
    })">Hello</div>
    <div class="colour choice" style="background-color: var(${
      codemaker[3]
    })">Hello</div>
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

async function handleSubmit() {
  code_colours = [];
  let sel_Array = [];
  sel_Array = document.getElementsByName("colour-select");
  // let sel_Colours = [];
  for (let i = 0; i < sel_Array.length; i++) {
    code_colours.push(sel_Array[i].value);
  }
  let scorelist = await codeScorer()
  codebreaker.push([code_colours, scorelist]);
  let boardBox = event.target.previousSibling.previousSibling;
  boardBox.style.setProperty("background-color", `var(${event.target.value})`);
}

// Codemaker scores board:
// - for each correct colour in correct place - white dot.
// - for each correct colour in incorrect place - red dot.

function codeScorer() {
  // const code_colours = sel_Colours
  // console.log("Scoring colours", code_colours)
  let scoreArray = code_colours
  let secretArray = codemaker;
  let score = []
  let scorecard = new Promise(() => codeExact(scoreArray, secretArray, score))
  .then(codeMissing(scoreArray, secretArray, score))
  console.log("Score", score);
  // scoreBoard(score);
}

function codeExact(colours, secret, validatedScore) {
  // console.log("***Begin exact validation***")
  // console.log("Solution: ", secret)
  // console.log("Guess: ", colours)
  // run loop for each pin in the solution
  for (let i = 0; i < secret.length; i++) {
    let code = secret[i];
    let colour = code_colours[i];
    if (code === colour) {
      // console.log("^^ Matches")
      secret[i] = "";
      code_colours[i] = "";
      validatedScore.push(2);
    } else {
      console.log("XX Doesn't match")
    }
  }
  // console.log("SCORES: ", validatedScore)
  // console.log(colours)
  // console.log("*** Final score", colours)
  return
}

function codeMissing(colours, secret, validatedScore) {
  // console.log("***Begin inexact validation***")
  // console.log("Solution: ", secret)
  // console.log("Guess: ", colours)
  // run loop for each pin in the solution
  for (let i = 0; i < secret.length; i++) {
    let code = secret[i];
    for(let j = 0; j < colours.length; j++) {
    let colour = code_colours[j];
    if (code != '' && colour != '' && code === colour) {
      // console.log("^^ Matches")
      secret[i] = "";
      code_colours[j] = "";
      validatedScore.push(1);
      break;
    } else {
      console.log("XX Doesn't match")
    }
  }
}
  // console.log("SCORES: ", validatedScore)
  // console.log(colours)
  // console.log("*** Final score", colours)
  return
}


function scoreBoard(codebreaker) {
  let rounds = document.getElementById("rounds");
  let scoreRound = codebreaker.length;
  let scoredraft = codebreaker[scoreRound - 1];
  let scoreColours = scoredraft[0];
  let scoreTick = scoredraft[1];
  // console.log(codebreaker);
  // console.log(scoredraft);
  // console.log(scoreColours);
  // console.log(scoreTick);
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
}

// generate next board

// repeat 12 times.