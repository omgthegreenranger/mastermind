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

async function codeScorer() {
  // const code_colours = sel_Colours
  console.log("Scoring colours", code_colours)
  let score = [];
  let scoreCheck = codeValidate();
  score.push(scoreCheck)
  // console.log("Score", score);
}



function codeValidate() {
  console.log("***Begin code validation***")
  let colours = code_colours
  let validatedScore = [];
  console.log("Solution: ", codemaker)
  console.log("Guess: ", colours)
  // run loop for each pin in the solution
  for (let i = 0; i < codemaker.length; i++) {
    let code = codemaker[i];
    console.log("*** Pass", i, "Colour: ", codemaker[i])
    for (let j = 0; j < colours.length; j++) {
      let colour = colours[j]
      console.log("++ Colour pass ", j, colour)
      if(code === colour && i === j) {
        console.log("^^ Match position: Code - " + code + " Colour - " + colour )
        colours[j] = "";
        validatedScore[i] = 2;
        break;
      } else if (code === colour && i != j) {
        console.log("-- Match colour: Code - " + code + " Colour - " + colour )
        colours[j] = "";
        validatedScore[i] = 1;
        break;
      } else {
        console.log (">> No match:  Code - " + code + " Colour - " + colour )
        validatedScore[i] = 0;
        continue;
      }      
    }
  }
  console.log("SCORES: ", validatedScore)
  console.log(colours)
  console.log("*** Final score", colours)
}


function codeMatcher(colour, i) {
  code_colours.forEach((code, j) => {
    console.log(i, j)
    if( i === j) { console.log("Ignore this one")
   }
    else if (code === colour) {
      console.log("colours match!")
    } else {console.log("Colours do not match!")}
  })
  var matched;
  for (let k = 0; k < i; k++) {
    console.log("^^^^^^ Check position " + k + ": " + code_colours[k])
    if (colour === code_colours[k]) {
      console.log("Colour matches position " + k + ", pushing " + (k+1)
      )
      console.log("Colour: " + colour, "Position: " + code_colours[k])
      matched = 1;
    }
    else if (colour != code_colours[k]) {
      matched = 0;
      continue;
      console.log("Colour does not match position " + k + ", pushing 0")
      console.log("Colour: " + colour, "Position: " + code_colours[k])
    }
  }
  return matched;
}

function codeChecker(colour, i) {

// if score 2 && match false = pin_score 2
// if score 2 && match true = 

  console.log("Solution: " + codemaker)
  var pin_score;
  for (let j = 0; j < codemaker.length; j++) {
    console.log("^^^^^^ Check score " + j + ": " + codemaker[j] + ", " + colour)
    // console.log(matches[j])
      if (colour === codemaker[j] && i === j) {
        // let matchedScore = codeMatcher(colour, i)
        // console.log("MatchedScore: " + matchedScore)
        console.log(">> Score: " + "2")
        pin_score = 2;
        break;
      } else if (colour === codemaker[j] && i != j) {
        // let matchedScore = codeMatcher(colour, i)
        // console.log("MatchedScore: " + matchedScore)
        console.log(">> Score: " + "1")
        // if(matchedScore === 1) {
        pin_score = 1;
        // } else {
          // pin_score = 0;
        // }
        // break;
      } else {
        console.log(">> Score: " + "0")
        pin_score = 0;
      }
    }
    
    // );
  // });
  console.log("Pin Score:" + pin_score);
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