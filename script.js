const gameBoardElements = document.querySelectorAll('[data-cell]');

let playerArray = [];
let computerArray = [];
let gameBoardArray = [0,1,2,3,4,5,6,7,8];


gameBoardElements.forEach(cell => {
    cell.addEventListener('click', playerTurn, { once: true});
})

const winingCombination = [
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function game() {
    if (boardEvaluation(playerArray)) {
        console.log('Player win');
    } else if (draw()) {
        console.log('Draw')
    } else if (computerTurn()) {
        console.log('Computer wins')
    }
}

function playerTurn(e) {
    e.target.textContent = "X"
    let i = Number(e.target.id);
    playerArray.push(i);
    game();
}

function computerTurn(){
    let pickedCells = playerArray.concat(computerArray);
    let computerPossibleChoices = [0,1,2,3,4,5,6,7,8];
    pickedCells.sort(function(a, b){return a - b});
    gameBoardArray.forEach(option => {
        let i = 0;    
        while (i < pickedCells.length) {
            if (pickedCells[i] === option) {
                let index = computerPossibleChoices.indexOf(option);
                computerPossibleChoices.splice(index, 1)
                i++
            } else {
                i++
            }
        }
        return computerPossibleChoices; 
    })
    let computerChoice = computerPossibleChoices[Math.floor(Math.random() * computerPossibleChoices.length)];
    computerArray.push(computerChoice);
    let gameBoardQuery = document.getElementById(computerChoice);
    gameBoardQuery.textContent = "O";
    return boardEvaluation(computerArray)
}

function draw() {
    let pickedCells = playerArray.concat(computerArray);
    pickedCells.sort(function(a, b){return a - b});
    pickedCellsString = pickedCells.toString();
    gameBoardArrayString = gameBoardArray.toString();
    return pickedCellsString == gameBoardArrayString;
        
}

function boardEvaluation(array) {
    return winingCombination.some(combination => {
        return combination.every(element => array.includes(element))       
        })
}

function endGameMessage(info) {
    // endGameModal.classList.add('activate');
    // endGameBackGround.classList.add('activate');
    playerArray = []
    computerArray = []
    gameBoardElements.forEach(cell => cell.textContent = '')
}

// Have an Array
// Add to that Array
// Take turns
// Evalaute Array

// const game = {
//     gameboard: [],
//     init: function() {
//         this.cacheDom();
//         this.bindEvents();
//         this.render();
//     },
//     cacheDom: function() {
//         this.$el = $('#game-board');
//         this.$cell = this.$el.find('cell');
//     },
//     bindEvents: function() {
//         this.$cell.on('click', this.addX.bind(this));
//     },
//     render: function() {

//     },
//     addX: function(){
//         console.log('meow');
//     }
// }

// game.init();