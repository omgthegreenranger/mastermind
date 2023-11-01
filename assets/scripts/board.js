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

export function codeMaker() {
  for (let i = 0; i < 4; i++) {
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

export function codeBreaker() {
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
  for (let i = 0; i < sel_Array.length; i++) {
    sel_Colours.push(sel_Array[i].value);
  }
  console.log(sel_Colours)
  let scorelist = codeScorer(sel_Colours);
  codebreaker.push([sel_Colours, scorelist]);
  console.log(scorelist);
  // scoreBoard(codebreaker);
}

// Codemaker scores board:
// - for each correct colour in correct place - white dot.
// - for each correct colour in incorrect place - red dot.

function codeScorer(code_colours) {
  let score = [];
  for (let i = 0; i < code_colours.length; i++) {
    let colour = code_colours[i]
    let scoreCheck = codeChecker(colour, i);
    console.log(scoreCheck)
    score.push(scoreCheck);
    console.log(score)
  };
  // console.log(match);
  console.log(score);
}

function codeMatcher(colour, code_colours, i) {
  var matched = [];
  // if position > 0, then compare to previous positions
  // if matches a previous position, skip first result; otherwise calculate correctly
  for (let k = -1; k < i; k++) {
    // if (i === 0) {
    //   matched.push(0)
    //   return
    // }
    if (colour === code_colours[k]) {
      // console.log("Yes!", code_colours[k], colour, k, "pushing " + k
      // )
      matched.push(k+1);
    }
    if (colour != code_colours[k]) {
      matched.push(0)
      // console.log("No~!", code_colours[k], colour, k)
      continue;
    }
  }
  return matched;
}

function codeChecker(colour, i) {
  console.log(i, colour);

  var pin_score;
  codemaker.forEach((code, j) => {
    console.log(colour, code, i, j)
      if (colour === code && i === j) {
        pin_score = 2;
        console.log(
          colour + " matched with " +
            code +
            " in guess position " +
            i
        );
        
        // console.log("Pushing 2 for " + colour, code);
      } else if (colour === code && i != j) {
        pin_score = 1;
        console.log(
          colour +
            " is in position " +
            i +
            ", but " +
            code +
            "is in position " +
            j
        );
        // console.log("Pushing 1 for " + colour, code, " in position " + j);
      } else {
        pin_score = 0;
      }
    })
    
    // );
  // });
  console.log(pin_score);
  return pin_score;
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

// function init() {
//   codeMaker();
//   codeBreaker();
// }

// init();

console.log(codemaker);

// export { codeMaker, codeBreaker };
