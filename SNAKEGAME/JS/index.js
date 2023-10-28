// Game constants and variables
let inputDirection = { x: 0, y: 0 }
const foodSound = new Audio('MUSIC/food.mp3');
const gameOverSound = new Audio('MUSIC/gameover.mp3');
const gameMusicSound = new Audio('MUSIC/music.mp3');
const moveSound = new Audio('MUSIC/move.mp3');
let lastPaintedTime = 0;
let speed = 5;
let score = 0;
let snakeArray = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };
//Game Functions

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintedTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintedTime = ctime;
    gameEngine();
}

function isCollide(snakeArray) {
    for (let i = 1; i < snakeArray.length; i++) {
        if (snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y) {
            return true;
        }
    }
    if (snakeArray[0].x >= 18 || snakeArray[0].y <= 0 || snakeArray[0].y >= 18 || snakeArray[0].x <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {

    if (isCollide(snakeArray)) {
        gameOverSound.play();
        gameMusicSound.pause();
        inputDirection = { x: 0, y: 0 };
        alert("Game Over. press any button to play again");
        snakeArray = [{ x: 13, y: 15 }];
        gameMusicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score:" + score;
    }

    // Generate food after snake eaten the food

    if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
        foodSound.play();
        score += 1;
        if (score > highScoreValue) {
            highScoreValue = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreValue));
            highScoreBox.innerHTML = "High Score:" + highScoreValue;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArray.unshift({ x: snakeArray[0].x + inputDirection.x, y: snakeArray[0].y + inputDirection.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };
    }
    snakeArray[0].x += inputDirection.x;
    snakeArray[0].y += inputDirection.y;
    //updating snake moves and food

    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else
            snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    })

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


    //Display snake and food
}



//Game starts from here
let highScoreValue = localStorage.getItem("highScore")
if (highScoreValue === null) {
    highScoreValue = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreValue))
}
else {
    highScoreValue = JSON.parse(highScoreValue)
    highScoreBox.innerHTML = "High Score:" + highScoreValue;
}
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDirection = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log('Arrow Up');
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;
        case 'ArrowDown':
            console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;
        case 'ArrowLeft':
            console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case 'ArrowRight':
            console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
        default:
            break;
    }
})