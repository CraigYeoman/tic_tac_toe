const gameBoardElements = document.querySelectorAll('[data-cell]');

const playerArray = [];
const computerArray = [];
const gameBoardArray = [0,1,2,3,4,5,6,7,8];


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

function playerTurn(e) {
    console.log(e.target.id);
    console.log(e.target);
    e.target.textContent = "X"
    let i = Number(e.target.id);
    playerArray.push(i);
    boardEvaluation();
    computerTurn();
}

function computerTurn(){
    let pickedCells = playerArray.concat(computerArray);
    let computerPossibleChoices = [];
    gameBoardArray.forEach(option => {
        for (let i = 0; i < pickedCells.length; i++) {
            if (!(option == pickedCells[i])) {
                computerPossibleChoices.push(option)
            }
        }   
    })
    let computerChoice = computerPossibleChoices[Math.floor(Math.random() * computerPossibleChoices.length)];
    computerArray.push(computerChoice);
    let gameBoardQuery = document.getElementById(computerChoice);
    gameBoardQuery.textContent = "O";

}

function boardEvaluation() {
    let playerString =  playerArray.toString();

    winingCombination.forEach(element => {
    
    let winingCombinationString = element.toString();
    if (playerString == winingCombinationString) {
        console.log('Player wins')
    }
  })
}


// Have an Array
// Add to that Array
//  Take turns
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