// frontend game interactive board script.

import { codeMaker, codeBreaker } from "./logic.js";
import { settingsPanel, boardTemplate, historyBoard, statusBar} from "./board.js";

const base_colours = [];

const game = document.getElementById('game');
const settings = document.getElementById('settings');
const board = document.getElementById('board');
const statusInfo = document.getElementById('status');
const history = document.getElementById('history')

var roundCount;
var roundLimit;
var choiceCount;

for (let i = 0; i < 6; i++) { // define the colours array
  let colour = "--colour" + i + "";
  base_colours.push(
    getComputedStyle(document.documentElement).getPropertyValue(colour)
  );
}

function addListeners() {
  // const choiceBox = document.getElementById('choice-box');
  document.getElementById('choice-box').addEventListener("input", handlePick);
  document.getElementById('startGame').addEventListener("click",() => handleReset()); // create array for six colours taken from CSS sheet.
  // document
  //   .getElementById("submit")
  //   .addEventListener("click", () => handleSubmit(choiceCount, roundCount));
  document.getElementById('startGame').addEventListener("click",() => handleReset()); // create array for six colours taken from CSS sheet.

}

async function handleSubmit(choiceCount, roundCount, roundLimit) { // script to handle submit of guess
  let codeGuess = [];
  let pickID;
  let sel_Array = document.getElementsByName("colour-select");
  let gameSolution = JSON.parse(localStorage.getItem("gameSolution"))
  let gameHistory = localStorage.getItem("gameHistory")

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
    let gameArray = [gameHistory, codeGuess, gameSolution]
    let gameRound = await codeBreaker(gameArray);
    localStorage.setItem("gameHistory", JSON.stringify(gameRound[0]))
    boardReset(choiceCount, roundCount, roundLimit); // reset selection boxes to base for next round.
  }
}

function handlePick() { // change box of guess to selected value (colour, in this case)
  let boardBox = event.target.previousSibling.previousSibling;
  let pickStyle = "--colour" + event.target.value;
  boardBox.style.setProperty("background-color", `var(${pickStyle})`);
}

function handleReset() { // function to handle clicking "Reset Game" button
  // clears history, resets scoreboard, and runs init again.
  localStorage.clear();
  scoreBoard(true);
  // document.getElementById('startGame').addEventListener("click",() => handleReset()); // create array for six colours taken from CSS sheet.
  gameStart();
}

function boardReset(choiceCount, roundCount) { // this fully rebuilds the selection board, both on init() AND submit.
  console.log(choiceCount, roundCount, roundLimit)
  const args = [game, board, statusInfo, localStorage.getItem("gameHistory"), base_colours, choiceCount, roundCount, roundLimit];
  settings.innerHTML = settingsPanel();
  statusInfo.innerHTML = statusBar(args[6], args[7])
  game.innerHTML = boardTemplate(args);
  history.innerHTML = historyBoard(args[3])
  addListeners();
    document
    .getElementById("submit")
    .addEventListener("click", () => handleSubmit(choiceCount, roundCount));
}

function scoreBoard(reset, roundCount, roundLimit) { // builds the score history in 12 rounds. Also handles win and loss display when relevant.
  // get HTML elements for display
  console.log(roundCount, roundLimit)
  let rounds = document.getElementById("rounds");
  let roundsBoard = document.getElementById("roundsBoard");
  let scoreBox = document.getElementById("score-box");
  let board = document.getElementById("board");

  let codebreaker = JSON.parse(localStorage.getItem("gameHistory"));
  if (reset === true) {

  } else if (reset === false) {
    console.log(codebreaker.reverse())
    let winCond = codebreaker[codebreaker.length - 1][2];
    console.log(winCond);
    if (winCond === 2) {
      board.innerHTML = `<div>WON THE GAME</div>
      <button class="submit" name="reset" type="button" id="start">Start Again</button>`;
      document
        .getElementById("start")
        .addEventListener("click", () => init());
    } else {
      // console.log(codebreaker, codebreaker[codebreaker.length - 1]);

      // console.log(codebreaker);
      if (codebreaker.length < roundLimit) {

        roundCount += 1
        console.log(roundCount)
        // scoreboard history
        codebreaker.reverse().forEach((round, i) => {
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
        })
      }
    }
  }
}

function gameStart() {

  // clear storage and start the game again.
  localStorage.clear();
  roundCount = 1;
  roundLimit = parseInt(document.getElementById("round-num").value.split("-")[1]);
  choiceCount = parseInt(document.getElementById("choice-count").value)
  let solution = codeMaker(choiceCount, roundLimit);
  localStorage.setItem("gameSolution", JSON.stringify(solution))
  localStorage.setItem("gameHistory", null)
  localStorage.setItem("round_limit", roundLimit);
  
  // create the game board.
  boardReset(choiceCount, roundCount, roundLimit);
  addListeners();
  document
    .getElementById("submit")
    .addEventListener("click", () => handleSubmit(choiceCount, roundCount));
  // document
  //   .getElementById("startGame")
  //   .addEventListener("click", () => handleReset());
  console.log(choiceCount, roundLimit)
}

function init() {
  settings.innerHTML = settingsPanel();
  // addListeners();
  document.getElementById('startGame').addEventListener("click",() => handleReset()); // create array for six colours taken from CSS sheet.
}

init();