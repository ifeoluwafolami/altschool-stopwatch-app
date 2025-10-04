const aboutButton = document.getElementById("aboutBtn");
const aboutModal = document.getElementById("aboutModal");
const resetButton = document.getElementById("resetBtn");
const closeButton = document.getElementById("closeBtn");
const startButton = document.getElementById("startBtn");
const stopButton = document.getElementById("stopBtn");

const body = document.querySelector('body');
const headerBtns = document.querySelectorAll('header button');

const darkModeBtn = document.getElementById("darkModeBtn");

const mainBtns = document.querySelectorAll('main button');

const timeArray = document.querySelectorAll("h1 span");
const hoursDisplay = timeArray[0];
const minutesDisplay = timeArray[1];
const secondsDisplay = timeArray[2];
const millisecondsDisplay = timeArray[3];

let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let timerInterval = null;
let isRunning = false;

// Open About Modal
aboutButton.addEventListener("click", () => {
    aboutModal.classList.add("active");
});

// Close About Modal
closeButton.addEventListener("click", () => {
    aboutModal.classList.remove("active");
});

// Dark Mode
darkModeBtn.addEventListener("click", () => {
    body.classList.toggle("body-dark");
    headerBtns.forEach((btn) => {
        btn.classList.toggle("header-btn-dark");
    });
    mainBtns.forEach((btn) => {
        btn.classList.toggle("main-btn-dark");
    });
});

window.addEventListener("click", (e) => {
    if (e.target === aboutModal) {
        aboutModal.classList.remove("active");
    }
});

// Time Formatter (2 digits even for single numbers)
function formatTime(value) {
    return value < 10 ? ("0" + value) : value;
}

function updateTimerDisplay() {
    hoursDisplay.textContent = formatTime(hours);
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

function timerFunction() {
    milliseconds++;

    // 100 milliseconds = 1 second
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
    }

    // 60 seconds = 1min
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    // 60 minutes = 1 hour
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    updateTimerDisplay();
}

startButton.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(timerFunction, 10);
    }
});

stopButton.addEventListener("click", () => {
    if (isRunning) {
        isRunning = false;

        clearInterval(timerInterval);
    }
});

resetButton.addEventListener("click", () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
    }

    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;

    updateTimerDisplay();
})