const gameBoardElements = document.querySelectorAll('[data-cell]');

gameBoardElements.forEach(cell => {
    cell.addEventListener('click', addX, { once: true});
})

const playerWin = [[0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]];

function addX(e) {
    console.log(e.target.id);
    console.log(e.target);
    e.target.textContent = "X"
    let i = e.target.id;
    gameBoard[i] = i;
    comparatoring();
}

function comparator() {

    let comparison = [];
    let x = 0;
    while (x < 9) {
        if (gameBoard[x] === 'x') {
            comparison.push(x-1);
        }
        x++;
    }
    return comparison
}

const gameBoard = new Array(9);


function comparatoring() {
    const w = [];
    gameBoard.forEach(e => {
        if (e === ',') {

        }
        else {
            w.push(e);
        }
    })
    let l = w.toString();

    playerWin.forEach(element => {
    
    let c = element.toString();
    if (l == c) {
        console.log('hurray')
    }
  })
}

const game = (() => {
    const gameBoard = new Array(9)

    return {gameBoard};

})();

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