let gameSeq = [];
let userSeq = [];
let level = 0;
let highScore = 0;

let highScoreElement = document.querySelector(".high-score");
let h2 = document.querySelector("h2");
let btns = ["red", "blue", "green", "yellow"];
let started = false;

// Show initial high score
highScoreElement.innerText = `High Score: ${highScore}`;

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        console.log("Game Started");
        levelUp();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

function userbtnflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 100);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIndx = Math.floor(Math.random() * 4); 
    let randomBtn = btns[randIndx];
    let randomBtnElement = document.querySelector(`.${randomBtn}`);
    gameSeq.push(randomBtn);
    console.log(gameSeq);
    gameflash(randomBtnElement);
}

function check(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // Update high score if the player beat the previous one
        if (level - 1 > highScore) {
            highScore = level - 1;
        }

        highScoreElement.innerText = `High Score: ${highScore}`;

        h2.innerHTML = `Game Over !!! Your Score is <b>${level - 1}</b> <br> Press Any Key to Restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userbtnflash(btn);

    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    check(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}
