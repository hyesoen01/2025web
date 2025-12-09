var startButton = document.getElementById('start-button');
var restartButton = document.getElementById('restart-button'); // [NEW]
var startScreen = document.getElementById('start-screen');
var clearScreen = document.getElementById('clear-screen');     // [NEW]
var gameBoard = document.querySelector('.game-board');


var matchedPairs = 0; 

// 1. 게임 시작 버튼
startButton.addEventListener('click', function() {
    startScreen.style.display = 'none';
    gameBoard.style.display = 'grid';
});

// [NEW] 2. 다시 하기 버튼
restartButton.addEventListener('click', function() {
    location.reload(); 
});



var cards = document.querySelectorAll('.card');
var firstCard = null;
var secondCard = null;
var lockBoard = false;

for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var randomNum = Math.floor(Math.random() * 12);
    card.style.order = randomNum;
    card.addEventListener('click', onCardClick);
}

function onCardClick() {
    if (lockBoard == true) return;
    if (this == firstCard) return;

    this.classList.add('flipped');

    if (firstCard == null) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    var isMatch = firstCard.getAttribute('data-id') == secondCard.getAttribute('data-id');

    if (isMatch == true) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', onCardClick);
    secondCard.removeEventListener('click', onCardClick);

   
    matchedPairs++; 

    
    if (matchedPairs == 6) {
        
        setTimeout(function() {
            gameBoard.style.display = 'none';   
            clearScreen.style.display = 'block'; 
        }, 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(function() {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}