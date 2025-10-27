const timeDisplay = document.querySelector("#timeDisplay");
const startStopTimer = document.querySelector("#startStopTimer");
const breakDropdown = document.querySelector("#breakDropdown");
const resetTimer = document.querySelector("#resetTimer");


let initialTime = 25 * 60; //10mins to seconds
let currentTime = initialTime;
let paused = true;
let interval;

breakDropdown.value = "pomodoro";

const breakDictionary = {
    "pomodoro" : 25,
    "shortBreak" : 5,
    "longBreak" : 15,
};

function pad (unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }

function updateDisplay() {
    let mins = Math.floor(currentTime / 60);
    let secs = currentTime % 60;
    timeDisplay.textContent = `${pad(mins)}:${pad(secs)}`;
}

function updateTime() {
   if (currentTime > 0) {
       currentTime--;
       updateDisplay();

   } else{
       paused=true;
       clearInterval(interval);
       timeDisplay.textContent = "00:00";
   }
}

function resetTimerFunc() {
    paused = true;
    clearInterval(interval);
    currentTime = initialTime;
    updateDisplay();
    startStopTimer.textContent = "Start";
}

startStopTimer.addEventListener("click", () => {
    if (paused){
        paused = false;
        interval = setInterval(updateTime, 1000);
        startStopTimer.textContent = "Paused";
    } else {
        paused = true;
        clearInterval(interval);
        startStopTimer.textContent = "Start";
    }
});

breakDropdown.addEventListener('change', (event)=> {
    const selectedBreak = event.target.value;
    console.log(selectedBreak);
    initialTime = breakDictionary[selectedBreak] * 60;
    resetTimerFunc();
    });


resetTimer.addEventListener("click",() => {
    resetTimerFunc();
});

