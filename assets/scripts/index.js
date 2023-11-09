import { codeMaker, codeBreaker } from "./board.js";

// set 6 colours
const base_colours = [];

for (let i = 0; i < 6; i++) {
  let colour = "--colour" + i + "";
  base_colours.push(
    getComputedStyle(document.documentElement).getPropertyValue(colour)
  );
}
console.log("BASE COLOURS", base_colours);

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

async function handleSubmit() {
  let codeGuess = [];
  let sel_Array = [];
  let staticGuess = [];
  let pickID;
  sel_Array = document.getElementsByName("colour-select");
  for (let i = 0; i < sel_Array.length; i++) {
    if (!sel_Array[i].value) {
      // stop if no colour was chosen
      console.log("Waaaaitaminute!");
      pickID = "choice" + (i + 1);
      console.log(pickID);
      let square = document.getElementById(pickID);
      square.innerHTML = `<span>PICK PLEASE<span>`;
    } else {
      // or continue
      codeGuess.push(parseInt(sel_Array[i].value));
      staticGuess.push(parseInt(sel_Array[i].value));
      continue;
    }
  }
  console.log(codeGuess);
  if (pickID) {
    return;
  } else {
    let response = await codeBreaker(codeGuess);
    scoreBoard(response);
    boardReset(response);
  }
}

function handlePick() {
  // console.log(event.target.previousSibling.previousSibling.style);
  let boardBox = event.target.previousSibling.previousSibling;
  let pickStyle = "--colour" + event.target.value;
  boardBox.style.setProperty("background-color", `var(${pickStyle})`);
}

function boardCreate() {
  // get elements for creation
  let roundCount = document.getElementById("round-counter");
  roundCount.innerHTML = `Round 1 of 12`;
  boardReset();
}

function boardReset(codebreaker) {
  let board = document.getElementById("choiceBox");
  let button = document.getElementById("buttonField");
  if (codebreaker && codebreaker.length === 12) {
    board.innerHTML = `
    <div class="option-box" style="display:none"></div>`;
    button.innerHTML = `<button class="submit" name="reset" type="button" id="reset">Submit Round</button>`;
  } else {
    board.innerHTML = `
  <div class="option-box">
  <div class="colour choice" id="choice1">&nbsp;</div>
    <select name="colour-select" id="selector1">
      <option value="" defaultSelected>Pick Colour</option>
      <option value=0 id="1">${base_colours[0]}</option>
      <option value=1 id="2">${base_colours[1]}</option>
      <option value=2 id="3">${base_colours[2]}</option>
      <option value=3 id="4">${base_colours[3]}</option>
      <option value=4 id="5">${base_colours[4]}</option>
      <option value=5 id="6">${base_colours[5]}</option>
    </select>
  </div>
  <div class="option-box">
    <div class="colour choice" id="choice2">&nbsp;</div>
    <select name="colour-select" id="selector2">
      <option value="" defaultSelected>Pick Colour</option>
      <option value=0 id="1">${base_colours[0]}</option>
      <option value=1 id="2">${base_colours[1]}</option>
      <option value=2 id="3">${base_colours[2]}</option>
      <option value=3 id="4">${base_colours[3]}</option>
      <option value=4 id="5">${base_colours[4]}</option>
      <option value=5 id="6">${base_colours[5]}</option>
    </select>
  </div>
  <div class="option-box">
    <div class="colour choice" id="choice3">&nbsp;</div>
    <select name="colour-select" id="selector3">
    <option value="" defaultSelected>Pick Colour</option>
    <option value=0 id="1">${base_colours[0]}</option>
    <option value=1 id="2">${base_colours[1]}</option>
    <option value=2 id="3">${base_colours[2]}</option>
    <option value=3 id="4">${base_colours[3]}</option>
    <option value=4 id="5">${base_colours[4]}</option>
    <option value=5 id="6">${base_colours[5]}</option>
    </select>
  </div>
  <div class="option-box">
    <div class="colour choice" id="choice4">&nbsp;</div>
    <select name="colour-select" id="selector4">
    <option value="" defaultSelected>Pick Colour</option>
    <option value=0 id="1">${base_colours[0]}</option>
    <option value=1 id="2">${base_colours[1]}</option>
    <option value=2 id="3">${base_colours[2]}</option>
    <option value=3 id="4">${base_colours[3]}</option>
    <option value=4 id="5">${base_colours[4]}</option>
    <option value=5 id="6">${base_colours[5]}</option>
    </select>
  </div>`;
    button.innerHTML = `<button class="submit" name="submit" type="button" id="submit">Submit Round</button>
  <button class="submit" name="reset" type="button" id="reset">Reset Game</button>`;
  }

  let choiceBoxes = document.getElementById("choiceBox");
  choiceBoxes.addEventListener("input", handlePick);
  document
    .getElementById("submit")
    .addEventListener("click", () => handleSubmit());
}

function scoreBoard(codebreaker) {
  // console.log(codebreaker);
  // get HTML elements for display
  let rounds = document.getElementById("rounds");
  let roundCount = document.getElementById("round-counter");
  let roundsBoard = document.getElementById("roundsBoard");
  let scoreBox = document.getElementById("score-box");
  roundCount.innerHTML = `${codebreaker.length + 1} of 12`;
  // console.log(codebreaker);
  if (codebreaker.length < 12) {
    // display round

    // scoreboard history
    roundsBoard.innerHTML = "";
    codebreaker.forEach((round, i) => {
      // let scoreRound = i;
      // console.log(round);
      let scoreColours = round[0];
      let scoreTick = round[1];
      // console.log(codebreaker);
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
      roundsBoard.innerHTML += `<div class="rounds-round" id="rounds"><div class="colour-options">
    <div class="colour choice" style="background-color: var(--colour${
      scoreColours[0]
    })">Hello</div>
    <div class="colour choice" style="background-color: var(--colour${
      scoreColours[1]
    })">Hello</div>
    <div class="colour choice" style="background-color: var(--colour${
      scoreColours[2]
    })">Hello</div>
    <div class="colour choice" style="background-color: var(--colour${
      scoreColours[3]
    })">Hello</div>
    </div>
    <div class="rounds-score" id="score-box"><div class="scoreTick">
    <div class="tick" style="${scoreTicker(scoreTick[0])}">${scoreTick[0]}</div>
    <div class="tick" style="${scoreTicker(scoreTick[1])}">${scoreTick[1]}</div>
    <div class="tick" style="${scoreTicker(scoreTick[2])}">${scoreTick[2]}</div>
    <div class="tick" style="${scoreTicker(scoreTick[3])}">${scoreTick[3]}</div>
    </div></div>
    `;
    });
  } else {
    rounds.innerHTML = "GAME OVER";
  }
}

function init() {
  boardCreate();
  codeMaker();
  // devSolve(); this is the dev to display solution on the board - keep off in prod
  // codeBreaker();
}

init();
