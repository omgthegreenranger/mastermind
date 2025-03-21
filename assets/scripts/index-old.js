// frontend game interactive board script.

import { codeMaker, codeBreaker } from "./logic.js";

const base_colours = [];


// create array for six colours taken from CSS sheet.
// we can change this as required to make it a matching game for anything you want.

for (let i = 0; i < 6; i++) {
  let colour = "--colour" + i + "";
  base_colours.push(
    getComputedStyle(document.documentElement).getPropertyValue(colour)
  );
}
console.log("BASE COLOURS", base_colours);


async function handleSubmit() { // script to handle submit of guess
  let codeGuess = [];
  let sel_Array = [];
  let pickID;
  sel_Array = document.getElementsByName("colour-select");


  for (let i = 0; i < sel_Array.length; i++) {   // quick validation that no options left blank
    if (!sel_Array[i].value) {
      // stop if no colour was chosen and set the pickID value
      pickID = "choice" + (i + 1);
      let square = document.getElementById(pickID);
      square.classList.add("not-picked"); // change style of box to whatever.
    } else {

      // or continue and push option to the codeGuess array.
      codeGuess.push(parseInt(sel_Array[i].value));
      continue;
    }
  }

  if (pickID) { // stop your submittin'!
    return;
  } else {
    // run codeBreaker function to evaluate score. That script will set localstorage, no need here.
    await codeBreaker(codeGuess);
    
    scoreBoard(false); // send note to scoreboard to generate round history, and prevent reset.
    boardReset(); // reset selection boxes to base for next round.
  }
}


function handleReset() { // function to handle clicking "Reset Game" button
  // clears history, resets scoreboard, and runs init again.
  localStorage.clear(); 
  scoreBoard(true);
  init();
}

function handlePick() { // change box of guess to selected value (colour, in this case)
  let boardBox = event.target.previousSibling.previousSibling;
  let pickStyle = "--colour" + event.target.value;
  boardBox.style.setProperty("background-color", `var(${pickStyle})`);
}

function boardCreate() { // starts board init creation
  // sets round to "1" and moves to full board reset.
  let roundCount = document.getElementById("round-counter");
  roundCount.innerHTML = `Round 1 of 12`;
  boardReset();
}

function boardReset() { // this fully rebuilds the selection board, both on init() AND submit.
  let codebreaker = JSON.parse(localStorage.getItem("CodeGame"));
  let choiceBox = document.getElementById("choiceBox");
  let button = document.getElementById("buttonField");
  if (codebreaker && codebreaker.length === 12) {
    choiceBox.innerHTML = `
    <div class="option-box" style="display:none"></div>`;
    button.innerHTML = `<button class="submit" name="reset" type="button" id="reset">Submit Round</button>`;
  } else {
    choiceBox.innerHTML = `
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
  document
    .getElementById("reset")
    .addEventListener("click", () => handleReset());
}

function scoreBoard(reset) { // builds the score history in 12 rounds. Also handles win and loss display when relevant.
  // get HTML elements for display
  let rounds = document.getElementById("rounds");
  let roundCount = document.getElementById("round-counter");
  let roundsBoard = document.getElementById("roundsBoard");
  let scoreBox = document.getElementById("score-box");
  let board = document.getElementById("board");

  let codebreaker = JSON.parse(localStorage.getItem("CodeGame"));
  if (reset === true) {
      rounds.innerHTML = "";
      roundCount.innerHTML = "Round 1 of 12";
      roundsBoard.innerHTML = "";
    } else if (reset === false) {
      let winCond = codebreaker[codebreaker.length - 1][2];
      console.log(winCond);
      if (winCond === 2) {
        board.innerHTML = `<div>WON THE GAME</div>
      <button class="submit" name="reset" type="button" id="start">Start Again</button>`;
      document
      .getElementById("start")
      .addEventListener("click", () => init());
      } else {
      console.log(codebreaker, codebreaker[codebreaker.length - 1]);
      roundCount.innerHTML = `${codebreaker.length + 1} of 12`;
      // console.log(codebreaker);
      if (codebreaker.length < 12) {
        // display round

        // scoreboard history
        roundsBoard.innerHTML = "";
        codebreaker.forEach((round, i) => {
          let scoreColours = round[0];
          let scoreTick = round[1];

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
  }
}

function init() {
  localStorage.clear();
  boardCreate();
  codeMaker();
}

init();
