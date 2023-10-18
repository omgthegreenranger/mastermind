// set arrays for game.

const codemaker = [];
const codebreaker = [];

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

let colours = [colour1, colour2, colour3, colour4, colour5, colour6];

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

function codeMaker() {
  for (i = 0; i < 4; i++) {
    let codeChoice = "--colour" + (Math.floor(Math.random() * 6) + 1);
    getComputedStyle(document.documentElement).getPropertyValue(codeChoice);
    codemaker.push(codeChoice);
  }
}

function handlePick() {
  // console.log(event.target.previousSibling.previousSibling.style);
  let boardBox = event.target.previousSibling.previousSibling;
  boardBox.style.setProperty("background-color", `var(${event.target.value})`);
}

function codeBreaker() {
  let roundChoice = [];
  let choiceBoxes = document.getElementById("choiceBox");
  // console.log(choiceBoxes);
  choiceBoxes.addEventListener("input", handlePick);
  document
    .getElementById("submit")
    .addEventListener("click", () => handleSubmit());
}

function handleSubmit() {
  // console.log("Hello!");
  // console.log(event.target.previousSibling);
  let sel_Array = document.getElementsByName("colour-select");
  let sel_Colours = [];
  for (i = 0; i < sel_Array.length; i++) {
    sel_Colours.push(sel_Array[i].value);
  }
  let scorelist = codeChecker(sel_Colours);
  codebreaker.push([sel_Colours, scorelist]);
  // console.log(codebreaker);
  scoreBoard(codebreaker);
}

// this script opens the colour-selection modal, which is aesthetic we are going to put on hold until the rest functions

// function selectBox(event, choice, selector) {
//     console.log(event.target.id);
//     console.log(selector)
//     console.log(choice)
//     document.getElementById("selector-modal").style.setProperty("display", "none");
//     document.getElementById(choice).style.setProperty("background-color", `var(--${event.target.id})`);
//     selector.removeEventListener("click", () => {selectBox(event, choiceBox.id, selector);
//         console.log("Clicked!")});
// }

// Codemaker scores board:
// - for each correct colour in correct place - white dot.
// - for each correct colour in incorrect place - red dot.

function codeChecker(colours) {
  const score = [];
  colours.foreach(
    codemaker.foreach(
      if 
    )
  )
  for (let i = 0; i < colours.length; i++) {
    for (let j = 0; j < codemaker.length; j++) {
      if (colours[i] === codemaker[j]) {
        if (i === j) {
          console.log(
            colours[i] +
              " and " +
              codemaker[j] +
              "match in place" +
              "Guess position " +
              i +
              ", maker position " +
              j
          );
          score.push(2);
          console.log(score);
          break;
        } else {
          console.log(
            colours[i] +
              " is in position " +
              i +
              ", but " +
              codemaker[j] +
              "is in position " +
              j
          );
          score.push(1);
          break;
        }
      } else {
        console.log(colours[i], "Cannot find this one!", i, j);
        score.push(0);
        return;
      }
    }
    // return
  }

  return score;
}

function scoreBoard(codebreaker) {
  let rounds = document.getElementById('rounds')
  let scoreRound = codebreaker.length;
  let scoredraft = codebreaker[(scoreRound-1)]
  let scoreColours = scoredraft[0];
  let scoreTick = scoredraft[1];
  console.log(codebreaker)
  console.log(scoredraft)
  console.log(scoreColours)
  console.log(scoreTick)
  function scoreTicker(tick) {
    if (tick === 2) {
      return "background-color: white"
    } else if (tick === 1) {
      return "background-color: red"
    } else {
      return "display: none"
    }
    
  }
  rounds.innerHTML += `<div class="colour-options">
    <div>Round ${scoreRound}</div>
    <div class="colour choice" style="background-color: var(${scoreColours[0]})">Hello</div>
    <div class="colour choice" style="background-color: var(${scoreColours[1]})">Hello</div>
    <div class="colour choice" style="background-color: var(${scoreColours[2]})">Hello</div>
    <div class="colour choice" style="background-color: var(${scoreColours[3]})">Hello</div>
    </div>
    <div class="scoreTick">
    <div class="tick" style="${scoreTicker(scoreTick[0])}">${scoreTick[0]}</div>
    <div class="tick" style="${scoreTicker(scoreTick[1])}">${scoreTick[1]}</div>
    <div class="tick" style="${scoreTicker(scoreTick[2])}">${scoreTick[2]}</div>
    <div class="tick" style="${scoreTicker(scoreTick[3])}">${scoreTick[3]}</div>
    <div
    </div>
    `
}


// generate next board

// repeat 12 times.

function init() {
  codeMaker();
  codeBreaker();
}

init();

console.log(codemaker);
