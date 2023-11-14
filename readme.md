# Mastermind

This is a basic script intended to drive and evaluate the secret code and score for a web-based version of [Mastermind](url=https://en.wikipedia.org/wiki/Mastermind_(board_game)).

### How to play Mastermind

Based on the original game designed in 1970, the rules are simple.

> - There are two players - the Mastermind (the computer) and the Codebreaker (the player)
> - The Mastermind begins the game by deciding on a code of four objects - they can be any order, duplicated, etc. This is kept secret from the Codebreaker
> - The Codebreaker then guesses a four-item code.
> - The Mastermind scores the accuracy of the guess with two possible results (These scores are _not_ in order):
>   - For any item that has a corresponding secret item *in the same position*, the score of a black tick is given
>   - For any item that has a corresponding secret item *in a different position*, the score of a white tick is given. 
> - This continues for 12 rounds. At the end of 12 rounds, if no code is guessed, the game is lost and the Mastermind has won.

### Using this code

The actual evaluation and generative code is *assets/scripts/board.js**. This includes two exported functions:
- **codeMaker()** - call this function to generate the secret code.
- **codeBreaker(guessArray)** - this function requires the selected guess array.

The evaluated score for each round will be appended to LocalStorage as "CodeGame" as an array with the following elements:
- *roundGuess* - the original guessArray
- *score* - an array of 0 - 4 integers, either 2 (exact match) or 1 (inexact match)
- *winState* - does this round result in a full match (with a score of [2,2,2,2])
- *round* - this is the number from 1-12, iterating up for each round.

You can also find **assets/scripts/index.js** as the front-end, which has the board creation scripts, the score formatting, win condition display, start and reset buttons, etc. You can adjust this as needed for your page.

All styles are in /assets/css/styles.css.

## Contributions

Please feel free to contribute! The code is simple, but I wanted to try my hand at some scoring logic so their may be bugs. Create an issue, or email me:

omgthegreenranger
das.shaggy@gmail.com
stegra.ca