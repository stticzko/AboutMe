const main = document.getElementById('game');
const kot = document.getElementById('kot');
const kaktus = document.getElementById('kaktus');
const scoreDisplay = document.getElementById('score');
let score = 0;
let jumping = false;
let ducking = false;
let gameStarted = false;
let kaktusSpeed = 8;
const accelerationRate = 0.05;
let gameInterval;


document.addEventListener('keydown', function(event) {
    if (!gameStarted && event.code === 'Space') {
        startGame();
    } else if (!jumping && !ducking && gameStarted) {
        if (event.code === 'Space') {
            jump();
        } else if (event.code === 'ArrowDown') {
            duck();
        }
    }
});

function startGame() {
    gameStarted = true;
    gameInterval = setInterval(function() {
        moveKaktus();
        checkCollision();
    }, 20);
}

function jump() {
    jumping = true;
    let jumpHeight = 150;
    let jumpSpeed = 5;
    let jumpInterval = setInterval(function() {
        let kotBottom = parseInt(window.getComputedStyle(kot).getPropertyValue('bottom'));
        if (kotBottom < jumpHeight) {
            kot.style.bottom = (kotBottom + jumpSpeed) + 'px';
        } else {
            clearInterval(jumpInterval);
            let fallInterval = setInterval(function() {
                let kotBottom = parseInt(window.getComputedStyle(kot).getPropertyValue('bottom'));
                if (kotBottom > 0) {
                    kot.style.bottom = (kotBottom - jumpSpeed) + 'px';
                } else {
                    clearInterval(fallInterval);
                    jumping = false;
                }
            }, 10);
        }
    }, 10);
}

function duck() {
    ducking = true;
    kot.style.height = '25px';
    setTimeout(function() {
        kot.style.height = '50px';
        ducking = false;
    }, 500);
}

function moveKaktus() {
    let kaktusLeft = parseInt(window.getComputedStyle(kaktus).getPropertyValue('left'));
    if (kaktusLeft <= -20) {
        kaktus.style.left = '600px';
        score++;
        scoreDisplay.innerText = '' + score;
        kaktusSpeed += accelerationRate;
    } else {
        kaktus.style.left = (kaktusLeft - kaktusSpeed) + 'px';
    }
}

function checkCollision() {
    let kotBottom = parseInt(window.getComputedStyle(kot).getPropertyValue('bottom'));
    let kotLeft = parseInt(window.getComputedStyle(kot).getPropertyValue('left'));
    let kaktusLeft = parseInt(window.getComputedStyle(kaktus).getPropertyValue('left'));
    if (kaktusLeft < kotLeft + 45 && kaktusLeft > kotLeft - 20 && kotBottom <= 60) {
        clearInterval(gameInterval);
        alert('Game Over! Your Score: ' + score); 
        location.reload();
    }
}