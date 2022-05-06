const ticTacToe = {
    playerArray: [],
    computerArray: [],
    gameBoardArray: [0,1,2,3,4,5,6,7,8],
    winingCombination: [
        [0,1,2], 
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],
    init: function() {
        this.cacheDom();
        this.bindEvents();
        //this.playerTurn();
    },
    cacheDom: function() {
        this.gameBoardElements = document.querySelectorAll('[data-cell]');
        this.endGame = document.querySelector('[data-end-game]');
        this.endGameMessage = document.querySelector('[data-end-game-message]');
        this.endGameBackGround = document.querySelector('[data-background-end-game]');
        this.restartButton = document.querySelector('[restart-button]');  
    },
    bindEvents: function() {
        this.endGame.addEventListener('click', this.boardReset);
        this.gameBoardElements.forEach(cell => {cell.addEventListener('click', this.playerTurn.bind(this), { once: true});})
    },
    playerTurn: function(e) {
        e.target.textContent = "X"
        let i = Number(e.target.id);
        this.playerArray.push(i);
        this.game();
    },
    game: function() {
        if (this.boardEvaluation(this.playerArray)) {
            console.log('Player win');
            this.endModal('Player');
        } else if (this.draw()) {
            console.log('Draw');
            this.endModal('Draw');
        } else if (this.computerTurn()) {
            console.log('Computer wins');
            this.endModal('Computer');
        }
    },
    computerTurn: function() {
        let pickedCells = this.playerArray.concat(this.computerArray);
        let computerPossibleChoices = [0,1,2,3,4,5,6,7,8];
        pickedCells.sort(function(a, b){return a - b});
        this.gameBoardArray.forEach(option => {
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
        this.computerArray.push(computerChoice);
        let gameBoardQuery = document.getElementById(computerChoice);
        gameBoardQuery.textContent = "O";
        gameBoardQuery.removeEventListener('click', this.playerTurn, true);
        return this.boardEvaluation(this.computerArray)
    },
    draw: function () {
        let pickedCells = this.playerArray.concat(this.computerArray);
        pickedCells.sort(function(a, b){return a - b});
        pickedCellsString = pickedCells.toString();
        gameBoardArrayString = this.gameBoardArray.toString();
        return pickedCellsString == gameBoardArrayString;     
    },
    boardEvaluation: function (array) {
        return this.winingCombination.some(combination => {
            return combination.every(element => array.includes(element))       
            })
    },
    endModal: function (info) {
        this.endGame.classList.add('activate');
        this.endGameBackGround.classList.add('activate');
        if (info ===  'Draw') {
            this.endGameMessage.textContent = info
        } else {
            this.endGameMessage.textContent = info+' '+'Wins';
        }
    },
    boardReset: function () {
        ticTacToe.playerArray = [];
        ticTacToe.computerArray = [];
        ticTacToe.gameBoardElements.forEach(cell => cell.textContent = '');
        ticTacToe.endGame.classList.remove('activate');
        ticTacToe.endGameBackGround.classList.remove('activate');
        ticTacToe.bindEvents();
    },
};

ticTacToe.init();