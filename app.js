let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;

let level = 0;

document.addEventListener("keypress", function () {
    if (started == true) {
        return;
    }
    if (started == false) {
        started = true;
    }

    levelUp(); 
})

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() { 
        btn.classList.remove("flash");
    }, 250); 
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() { 
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];

    level++; 
    document.querySelector("h2").innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randCol = btns[randIdx];
    let randbtn = document.querySelector(`.${randCol}`);
    gameSeq.push(randCol);
    btnFlash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(() => {
                levelUp();
            }, 1000);
        }
    } else {
        document.querySelector("h2").innerHTML = `Game over! Your score was <b>${level}</b> <br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() { 
    let btn = this;
    userFlash(btn);

    let userCol = btn.getAttribute("id");
    userSeq.push(userCol);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}