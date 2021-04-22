const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.start_button');
const highScoreBoard = document.querySelector('.high_score');

let lastHole;
let timeUp = false;
let timeLimt = 20000;
let score = 0;
let countdown;
let highScore = localStorage.getItem('game1HighScore') || 0;
highScoreBoard.textContent = `HIGH SCORE: ${highScore}`;

function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if (hole === lastHole) {
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}
function popOut() {
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function () {
        hole.classList.remove('up');
        if (!timeUp) popOut();
    }, time);
}


function startGame() {
    countdown = timeLimt / 1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function () {
        timeUp = true;
    }, timeLimt);

    let startCountdown = setInterval(function () {
        countdown -= 1;
        countdownBoard.textContent = countdown;
        if (countdown < 0) {
            countdown = 0;
            clearInterval(startCountdown);
            checkHighScore()
            countdownBoard.textContent = 'TIMES UP!! Thank you for protecting our planet!';
        }
    }, 1000);
}
startButton.addEventListener('click', startGame);

function whack(e) {
    score++;
    this.style.backgroundImage = 'url("yoda2.png")';
    this.style.pointerEvents = "none";
    setTimeout(() => {
        this.style.backgroundImage = 'url("yoda1.png")';
        this.style.pointerEvents = 'all';
    }, 1000)
    scoreBoard.textContent = score;
}
moles.forEach(mole => mole.addEventListener('click', whack));

// High score addon

function checkHighScore(){
    if (score > localStorage.getItem('game1HighScore')){
        localStorage.setItem('game1HighScore', score);
        highScore = score;
        highScoreBoard.textContent = `HIGH SCORE: ${highScore}`;
    }
}



