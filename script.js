// ======================
// COUNT SAQLASH (LOCAL)
// ======================

let count = localStorage.getItem("tasbehCount")
    ? parseInt(localStorage.getItem("tasbehCount"))
    : 0;

let goal = 100;
let autoInterval = null;
let soundOn = true;


// ======================
// ELEMENTLAR
// ======================

const countEl = document.getElementById("count");
const percentText = document.getElementById("percentText");
const circleProgress = document.getElementById("circleProgress");
const speedRange = document.getElementById("speedRange");
const speedValue = document.getElementById("speedValue");

const startBtn = document.querySelector(".auto-wrapper button:nth-child(2)");
const stopBtn = document.querySelector(".auto-wrapper button:nth-child(3)");
const soundBtn = document.getElementById("soundBtn");


// ======================
// SAHIFA YUKLANGANDA
// ======================

countEl.innerText = count;


// ======================
// COUNT
// ======================

function increment() {
    if (count >= goal) count = 0;

    count++;
    countEl.innerText = count;

    // 👇 SHU QO‘SHILDI (SAQLASH)
    localStorage.setItem("tasbehCount", count);

    updateProgress();

    if (soundOn) {
        let audio = new Audio("./audio/clikc.mp3");
        audio.play();
    }
}


// ======================
// PROGRESS
// ======================

function updateProgress() {
    let percent = (count / goal) * 100;
    if (percent > 100) percent = 100;

    percentText.innerText = Math.floor(percent) + "%";

    circleProgress.style.background =
        `conic-gradient(limegreen ${percent}%, rgba(255,255,255,0.1) ${percent}%)`;
}


// ======================
// RESET
// ======================

function resetCounter() {
    count = 0;
    countEl.innerText = 0;

    // 👇 SHU QO‘SHILDI (SAQLASH)
    localStorage.setItem("tasbehCount", count);

    updateProgress();
    stopAuto();
}


// ======================
// GOAL
// ======================

function setGoal() {
    let input = document.getElementById("goalInput").value;

    if (!input || input <= 0) {
        goal = 100;
        document.getElementById("goalInput").value = goal;
    } else {
        goal = parseInt(input);
    }

    updateProgress();
}


// ======================
// SOUND
// ======================

function toggleSound() {
    soundOn = !soundOn;

    if (soundOn) {
        soundBtn.innerText = "🔊 ON";
        soundBtn.classList.remove("off");
    } else {
        soundBtn.innerText = "🔇 OFF";
        soundBtn.classList.add("off");
    }
}


// ======================
// START
// ======================

function startAuto() {
    if (autoInterval) return;

    let speed = parseInt(speedRange.value);

    autoInterval = setInterval(() => {
        increment();
    }, speed);

    startBtn.classList.add("active-btn");
    stopBtn.classList.remove("active-btn");
}


// ======================
// STOP
// ======================

function stopAuto() {
    clearInterval(autoInterval);
    autoInterval = null;

    stopBtn.classList.add("active-btn");
    startBtn.classList.remove("active-btn");
}


// ======================
// SPEED SLIDER
// ======================

speedRange.addEventListener("input", function () {
    let speed = parseInt(speedRange.value);
    updateSpeedDisplay(speed);

    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = setInterval(() => {
            increment();
        }, speed);
    }
});


// ======================
// SPEED DISPLAY
// ======================

function updateSpeedDisplay(ms) {
    let seconds = (ms / 1000).toFixed(1);
    speedValue.innerText = seconds + " s";
}


// ======================
// INITIAL
// ======================

updateProgress();
updateSpeedDisplay(speedRange.value);
stopBtn.classList.add("active-btn");
