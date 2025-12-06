// --- [변경] 화면 요소들 가져오기 ---
var startButton = document.getElementById('start-button');
var restartButton = document.getElementById('restart-button'); // [NEW]
var startScreen = document.getElementById('start-screen');
var clearScreen = document.getElementById('clear-screen');     // [NEW]
var gameBoard = document.querySelector('.game-board');

// --- [변경] 변수 추가 ---
var matchedPairs = 0; // 현재 몇 쌍을 맞췄는지 세는 변수

// 1. 게임 시작 버튼
startButton.addEventListener('click', function() {
    startScreen.style.display = 'none';
    gameBoard.style.display = 'grid';
});

// [NEW] 2. 다시 하기 버튼 (누르면 페이지 새로고침)
restartButton.addEventListener('click', function() {
    location.reload(); 
});


// ... 기존 게임 로직 ...
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

    // [NEW] 짝을 맞췄으니 1점 추가
    matchedPairs++; 

    // [NEW] 6쌍을 모두 다 찾았는지 확인
    if (matchedPairs == 6) {
        // 0.5초 뒤에 축하 화면 표시
        setTimeout(function() {
            gameBoard.style.display = 'none';   // 게임판 숨기기
            clearScreen.style.display = 'block'; // 축하 화면 보여주기
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