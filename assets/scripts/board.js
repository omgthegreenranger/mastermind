export function boardTemplate(args) {
    const [game, board, statusInfo, gameHistory, base_colours, choiceCount, roundCount, roundLimit] = args

    return (`
            <div class="round-column"></div>
            <div class="options-column colour-options" id="choice-box">${codeSelector(choiceCount, base_colours)}</div>
            <div class="score-column">&nbsp;</div>`
    )
}

export function settingsPanel() {
    return (
        `<label>Size of Puzzle:</label>
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
        <input type="button" id="startGame" value="Start Game!"> `
    )

}

export function statusBar(roundCount, roundLimit) {
    console.log(roundCount, roundLimit)
    return (
        `<div>Round ${roundCount} of ${roundLimit}</div><div>${controlButtons()}</div>`
    )
}

export function codeSelector(choiceCount, base_colours) {
    var choiceBoxes = '';
    for (let i = 0; i < choiceCount; i++) {
        choiceBoxes +=
            `<div class="option-box">
            <div class="colour choice" id="choice${i}">&nbsp;</div>
            <select name="colour-select" id="selector${i}">
                <option value="" defaultSelected>Pick Colour</option>
                <option value=0 id="1">${base_colours[0]}</option>
                <option value=1 id="2">${base_colours[1]}</option>
                <option value=2 id="3">${base_colours[2]}</option>
                <option value=3 id="4">${base_colours[3]}</option>
                <option value=4 id="5">${base_colours[4]}</option>
                <option value=5 id="6">${base_colours[5]}</option>
            </select>
        </div>`
    }

    return choiceBoxes
}

export function controlButtons() {
    return (
        `<button class="submit" name="submit" type="button" id="submit">Submit Round</button>`
    )
}

export function historyBoard(gameHistory) {
    var historyGrid = '';
    if (gameHistory === "null") {
        console.log("Nothing!")
        historyGrid = `<div>NO HISTORY YET</div>`
    } else {
    console.log(JSON.parse(gameHistory).reverse() )
    let historyList = JSON.parse(gameHistory).reverse();
    console.log(historyList)
    let historyRow = "";
    for (let i = 0; i < historyList.length; i++) {
        console.log(i)
        let scoreRow = "";
        let roundRow = "";

        for (let j = 0; j < historyList[i][1].length; j++) {
            roundRow += //`<div>${historyList[i][1][j]}</div>`
            `<div class="colour history" id="colour${historyList[i][1][j]}">&nbsp;</div>`
        }
        for (let k = 0; k < historyList[0][1].length; k++) {
            let scoreTick = ''
            if (!historyList[i][2][k]) {
                scoreTick = `score0`;
            } else {
                scoreTick = `score` + historyList[i][2][k]
            }
            scoreRow += `<div class="${scoreTick}">&nbsp;</div>`
        }
        historyRow += `
        <div class="history-round">
            <div class="round-ident round-column">Round ${historyList[i][0]}</div>` + `<div class="round-row options-column">${roundRow}</div>` + `<div class="score-round score-column">${scoreRow}</div></div>`
    }
    historyGrid = historyRow;
}
console.log(historyGrid)
return historyGrid;
}
