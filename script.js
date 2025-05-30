var timer = 60;
var score = 0;
var hitrn = 0;

function getNewHit() {
    hitrn = Math.floor(Math.random() * 10);
    document.getElementById("hitVal").textContent = hitrn;
}

function makeBubble() {
    var clutter = "";

    for (var i = 1; i <= 102; i++) {
        var rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${rn}</div>`;
    }

    document.getElementById("pbtm").innerHTML = clutter;
}

function setTimer() {
    document.getElementById("timerVal").textContent = timer;
    var timerInt = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.getElementById("timerVal").textContent = timer;
        }
        else {
            clearInterval(timerInt);
            document.querySelector("#pbtm").innerHTML = `<h1>Game is over</h1>`;
        }
    }, 1000);
}

function increaseScore() {
    score += 10;
    document.getElementById("scoreVal").textContent = score;
}

document.getElementById("pbtm").addEventListener('click', function (details) {
    var clickeNum = Number(details.target.textContent);
    if (clickeNum === hitrn) {
        increaseScore();
        makeBubble();
        getNewHit();
    }
})

makeBubble()
setTimer()
getNewHit()
