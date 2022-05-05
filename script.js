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
        this.endGameMessage = document.querySelector('[data-end-game-message]')
        this.endGameBackGround = document.querySelector('[data-background-end-game]');
        this.restartButton = document.querySelector('[restart-button]');  
    },
    bindEvents: function() {
        this.endGame.addEventListener('click', this.boardReset);
        this.gameBoardElements.forEach(cell => {cell.addEventListener('click', this.playerTurn.bind(this), { once: true});})
    },
    playerTurn: function(e) {
        e.target.textContent = "X"
        let i = Number(this.e.target.id);
        this.playerArray.push(i);
        game();
    },
    game: function() {
        if (boardEvaluation(playerArray)) {
            console.log('Player win');
            endModal('Player');
        } else if (draw()) {
            console.log('Draw');
            endModal('Draw');
        } else if (computerTurn()) {
            console.log('Computer wins');
            endModal('Computer');
        }
    },
    computerTurn: function() {
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
        gameBoardQuery.removeEventListener('click',playerTurn);
        return boardEvaluation(computerArray)
    },
    draw: function () {
        let pickedCells = playerArray.concat(computerArray);
        pickedCells.sort(function(a, b){return a - b});
        pickedCellsString = pickedCells.toString();
        gameBoardArrayString = gameBoardArray.toString();
        return pickedCellsString == gameBoardArrayString;     
    },
    boardEvaluation: function (array) {
        return winingCombination.some(combination => {
            return combination.every(element => array.includes(element))       
            })
    },
    endModal: function (info) {
        endGame.classList.add('activate');
        endGameBackGround.classList.add('activate');
        if (info ===  'Draw') {
            endGameMessage.textContent = info
        } else {
            endGameMessage.textContent = info+' '+'Wins';
        }
    },
    boardReset: function () {
        playerArray = []
        computerArray = []
        gameBoardElements.forEach(cell => cell.textContent = '')
        endGame.classList.remove('activate');
        endGameBackGround.classList.remove('activate');
        gameBoardElements.forEach(cell => {
            cell.addEventListener('click', playerTurn, { once: true});
        })
    }
};

ticTacToe.init();