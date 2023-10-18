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
  let scorelist = codeScorer(sel_Colours);
  codebreaker.push([sel_Colours, scorelist]);
  console.log(scorelist);
  scoreBoard(codebreaker);
}

// Codemaker scores board:
// - for each correct colour in correct place - white dot.
// - for each correct colour in incorrect place - red dot.

function codeScorer(code_colours) {
  let score = [];
  let match = [];
  code_colours.forEach((colour, i) => {
    console.log(colour, i, "Scorer")
    let scoreMatch = codeMatcher(colour, code_colours, i);
    console.log(scoreMatch)
    match.push({colour, scoreMatch})
    return;
  });
  console.log(match)
}
function codeMatcher(colour, code_colours, i) {
  console.log(colour, code_colours, i);
  var matched = [];
  // if position > 0, then compare to previous positions
  // if matches a previous position, skip first result; otherwise calculate correctly
  if(i === 0) { console.log("We skip this one"); return }
  for (let k = 0; k < i; k++) {
    if (colour === code_colours[k]) {
      // console.log("Yes!", code_colours[k], colour, k, "pushing " + k
      // )
      matched.push(k)
    }
    if (colour != code_colours[k]) {
      console.log("No~!", code_colours[k], colour, k)
      continue
    }
  }
  console.log(colour, matched)
  return matched
  }


function codeChecker(matched, colour, i) {
  console.log(matched, i);
  console.log(colour);
  const score = "";
  for (j = 0; j > codemaker.length; j++) {
    if (colour === codemaker[j] && i === j) {
      score = 2;
      console.log(
        colour +
          " and " +
          code +
          "match in place" +
          "Guess position " +
          i +
          ", maker position " +
          j
      );
      console.log("Pushing 2 for " + colour, code);
    } else if (colour === code && i != j) {
      score = 1;
      console.log(
        colour +
          " is in position " +
          i +
          ", but " +
          code +
          "is in position " +
          j
      );
      console.log("Pushing 1 for " + colour, code);
    } else {
      score = 0;
    }
  }

  // codemaker.every((code, j) => {
  // if (colour === code && i != j) {
  //   score.push(1)
  //   console.log(
  //     colour +
  //       " is in position " +
  //       i +
  //       ", but " +
  //       code +
  //       "is in position " +
  //       j
  //   );
  //   } else {
  //     score.push(0);
  //     console.log("this does not match")

  // codemaker.every((code, j) => {
  //   console.log(code)
  //   if (colour === code && i === j) {
  //     score.push(2)
  //     console.log(colour +
  //       " and " +
  //       code +
  //       "match in place" +
  //       "Guess position " +
  //       i +
  //       ", maker position " +
  //       j)

  //   } else if (colour === code && i != j) {
  //     score.push(1)
  //     console.log(
  //       colour +
  //         " is in position " +
  //         i +
  //         ", but " +
  //         code +
  //         "is in position " +
  //         j
  //     );
  //   } else {
  //     score.push(0);
  //     console.log("this does not match")
  //   }
  // });

  console.log(score);
  return score;
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

function init() {
  codeMaker();
  codeBreaker();
}

init();

console.log(codemaker);
