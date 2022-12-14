let M = [
    [0,  1,  2,  3,  4,  5],
    [6,  7,  8,  9,  10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35]
]

const main = document.createElement("main")

const gameOver = document.getElementById("game-over")
const tryAgain = document.createElement("button")
tryAgain.className = "try-again"
tryAgain.innerText = "Try Again"
gameOver.appendChild(tryAgain)

const tryAgainShowBtn = document.getElementById("game-over")

let snakeValuesToColor

let elToColorRight = []

let score = 0

let snakeLength = 0

let previousRightCell

let snakeValues = []

let rangeOfApple = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]

let idsOfAllFields = []

let idxOfElIncurrentForRightUp

M.map((cellArr) => {
    let div = document.createElement("div")
    div.className = 'snake-cell';
    cellArr.map((_) => {
        let div = document.createElement("div")
        div.setAttribute("class", "snake-cell");
        main.appendChild(div)
    })
    document.body.appendChild(main);
})

let divs = document.getElementsByClassName("snake-cell")

for (let i = 0; i < divs.length; i++) {
    divs[i].setAttribute("id", i)
}

let MLastRowIndex = 0
let MLastCellIndex = 0

let availableCells = []
let snakeFillCells = []

let generate
let currentRandomAppleCell = 5

let scoreTag = document.querySelector(".score")

function generateApple() {
    let R = rangeOfApple.filter(availableCell => availableCell !== snakeFillCells[0])
    let currentRandomAppleCell = R[Math.floor(R.length * Math.random())];
    generate = currentRandomAppleCell
    document.getElementById(currentRandomAppleCell).setAttribute("class", "apple")
    return currentRandomAppleCell
}

function increaseScore() {
    score += 1
    scoreTag.innerText = score
    document.body.append(scoreTag);
    document.getElementById(currentRandomAppleCell).setAttribute("class", "snake-red")
    generateApple()
    currentRandomAppleCell = generate
}

function coloCurrentAndPreviousCell(curr, prev) {
    document.getElementById(curr).setAttribute("class", "snake-red")
    document.getElementById(prev).setAttribute("class", "apple-done")
}

function hideGamaOverModal() {
    tryAgainShowBtn.addEventListener("click", () => {
        gameOver.setAttribute("class", "try-again")
        location.reload(true)
    })
}

function UP() {
    snakeFillCells = []
    MLastRowIndex -= 1
    if(MLastRowIndex < -6) {
        gameOver.setAttribute("class", "game-over-show")
        tryAgain.setAttribute("class", "show-button")
        hideGamaOverModal()
    }
    let CurrentRow = M.at(MLastRowIndex)
    let previousRow = M.at(MLastRowIndex + 1)
    let currentCell = CurrentRow.at(MLastCellIndex - 1)
    let currentIndexOfCellInTheRow = CurrentRow.indexOf(currentCell)

    coloCurrentAndPreviousCell(currentCell, previousRow[currentIndexOfCellInTheRow])

    if (score > 1) {
        let previous = previousRow[currentIndexOfCellInTheRow]
        snakeValues.push(previous)
        let snakeValuesToColor = snakeValues.slice(-score)

        if (snakeValuesToColor.length === snakeValues.length) {
            snakeValuesToColor.map(snake => {
                let currentPreviousRow = M.at(MLastRowIndex + score)
                let currentPreviousCell = currentPreviousRow[currentIndexOfCellInTheRow]
                document.getElementById(snake).setAttribute("class", "snake-red")
                snakeValues.length === 1 && document.getElementById(currentPreviousCell).setAttribute("class", "apple-done")
                snake - 3 === 0 && document.getElementById(0).setAttribute("class", "apple-done")
            })
        }
        snakeValues = []  
    }
    if (currentCell == currentRandomAppleCell && currentRandomAppleCell !== null) increaseScore()
}

function DOWN() {
    snakeFillCells = []
    MLastRowIndex += 1
    let CurrentRow = M.at(MLastRowIndex)
    let previousDownRow = M.at(MLastRowIndex - 1)
    let currentCell = CurrentRow.at(MLastCellIndex - 1)
    if(MLastRowIndex > -1) {
        gameOver.setAttribute("class", "game-over-show")
        tryAgain.setAttribute("class", "show-button")
        hideGamaOverModal()
    }
    let currentIndexOfCellInTheRow = CurrentRow.indexOf(currentCell)

    document.getElementById(currentCell).setAttribute("class", "snake-red")
    
    score > 1 
    ? document.getElementById(previousDownRow[currentIndexOfCellInTheRow] - 1).setAttribute("class", "apple-done")
    : document.getElementById(previousDownRow[currentIndexOfCellInTheRow]).setAttribute("class", "apple-done")

    if (score > 1) {
        let previous = previousDownRow[currentIndexOfCellInTheRow]
        snakeValues.push(previous)
        let snakeValuesToColor = snakeValues.slice(-score)
        try {
            let currentPreviousRow = M.at(MLastRowIndex - score)
            let currentPreviousCell = currentPreviousRow[currentIndexOfCellInTheRow] + 1
            if (snakeValuesToColor.length === snakeValues.length) {
                snakeValuesToColor.map(snake => {
                    coloCurrentAndPreviousCell(snake, currentPreviousCell)
                    snakeValues.length === 1 && document.getElementById(currentPreviousCell - 1).setAttribute("class", "apple-done")
                })
            }
        } catch (error) {
            console.log(error);
        }
        snakeValues = []  
    }

    if (currentCell === currentRandomAppleCell && currentRandomAppleCell !== null) increaseScore()
}

function LEFT() {
    snakeFillCells = []
    MLastCellIndex -= 1
    let currentLeftRow = M.at(MLastRowIndex)
    let currentLeftCell = currentLeftRow.at(MLastCellIndex - 1)
    snakeFillCells.push(currentLeftCell)

    coloCurrentAndPreviousCell(currentLeftCell, currentLeftCell + 1)

    if (score > 1) {
        let previous = currentLeftRow.indexOf(currentLeftCell)
        snakeValues.push(previous + 1)
        let snakeValuesToColor = snakeValues.slice(-score)

        if (snakeValuesToColor.length === snakeValues.length) {
            snakeValuesToColor.map(snake => {
                let elInRow = currentLeftRow.at(snake)
                document.getElementById(elInRow).setAttribute("class", "snake-red")
                snakeValues.length === 1 && document.getElementById(elInRow + (score - 1)).setAttribute("class", "apple-done")
                elInRow - 3 === 0 && document.getElementById(0).setAttribute("class", "apple-done")
                score === 2 && document.getElementById(35).setAttribute("class", "apple-done")
            })
        }
        snakeValues = []  
    }
    
    if (currentLeftCell == currentRandomAppleCell && currentRandomAppleCell !== null) increaseScore()
}

function RIGHT() {
    snakeFillCells = []
    MLastCellIndex += 1
    let currentRightRow = M.at(MLastRowIndex)
    let currentRightCell = currentRightRow.at(MLastCellIndex - 1)
    snakeFillCells.push(currentRightCell)

    coloCurrentAndPreviousCell(currentRightCell, currentRightCell - 1)

    if (score > 1) {
        let previous = currentRightRow.indexOf(currentRightCell)
        snakeValues.push(previous - 1)
        snakeValuesToColor = snakeValues.slice(-score)
            
        if (snakeValuesToColor.length === snakeValues.length) {
            snakeValuesToColor.map(snake => {
                let elInRow = currentRightRow.at(snake)
                elToColorRight.push(elInRow)
                document.getElementById(elInRow).setAttribute("class", "snake-red")
                snakeValues.length === 1 && document.getElementById(elInRow - (score - 1)).setAttribute("class", "apple-done")
                if(elInRow - 1 === 0 && score <= 2) {
                    document.getElementById(0).setAttribute("class", "apple-done")
                    if(snakeValues.length == 2 && score <= 2) {
                        document.getElementById(0).setAttribute("class", "apple-done") 
                    }
                }
                elInRow - 3 === 0 && document.getElementById(0).setAttribute("class", "apple-done")
               })
        }
        snakeValues = []
    } 

    if (currentRightCell === currentRandomAppleCell && currentRandomAppleCell !== null) increaseScore()
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            LEFT()
            break;
        case 38:
            UP()
            break;
        case 39:
            RIGHT()
            break;
        case 40:
            DOWN()
            break;
    }
};
