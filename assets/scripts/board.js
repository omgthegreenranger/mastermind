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

const codemaker = [];

function codeMaker() {
  for (i = 0; i < 4; i++) {
    let codeChoice = "--colour" + (Math.floor(Math.random() * 4) + 1);
    getComputedStyle(document.documentElement).getPropertyValue(codeChoice);
    codemaker.push(codeChoice);
  }
}

// create Codebreaker board for round.
//  - click on square, choose colour options.
//  - button to submit.

const codebreaker = [];

function handlePick() {    
    console.log(event.target.previousSibling.previousSibling.style)
    let boardBox = event.target.previousSibling.previousSibling;
    boardBox.style.setProperty("background-color", `var(${event.target.value})`)
}

function codeBreaker() {
  let roundChoice = [];
  let choiceBoxes = document.getElementById("choiceBox")
  console.log(choiceBoxes)
  choiceBoxes.addEventListener("input", handlePick)
  document.getElementById("submit").addEventListener("click", () => handleSubmit())
}

function handleSubmit() {
  console.log("Hello!")
  console.log(event.target.previousSibling)
  let sel_Array = document.getElementsByName("colour-select")
  let sel_Colours = []
  for (i = 0; i < sel_Array.length; i++) {
    sel_Colours.push(sel_Array[i].value)
  }
  codebreaker.push(sel_Colours)
  console.log(sel_Colours)

  console.log(codebreaker)

  // codebreaker.push({})
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

// generate next board

// repeat 12 times.

function init() {
    codeMaker();
    codeBreaker();
};

init();

console.log(codemaker)
