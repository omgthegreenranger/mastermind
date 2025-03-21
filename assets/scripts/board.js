

export function introBoard() {
    const boardTemplate = 
    `<section class="options">
    <label>Size of Puzzle:</label>
    <select name="choices" id="choice-count">
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
    </select>
    <label>No. of Rounds:</label>
    <select name="round-num" id="round-num">
      <option value="r-12">12</option>
      <option value="r-15">15</option>
      <option value="r-18">18</option>
      <option value="r-24">24</option>
    </select>
    </select>
    <input type="button" id="startGame" value="Start Game!">
  </section>`
}


export function gameBoard() {
  const boardConstructed= `<section class="status">
    <div class="round-counter" id="round-counter"></div>
  </section>
  <section class="board" id="board">
    <!-- <div id="dev-solve"></div> -->
    <div class="rounds-board" id="roundsBoard">
      <div class="rounds-round" id="rounds"></div>
      <div class="rounds-score" id="score-box"></div>
    </div>
    <div class="colour-options" id="choiceBox"></div>
    <div class="button-field" id="buttonField"></div>
  </section>`
}