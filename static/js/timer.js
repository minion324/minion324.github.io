const timeDisplay = document.querySelector("#timeDisplay")
const startTimer = document.querySelector("#startTimer")
const stopTimer = document.querySelector("#stopTimer")
const resetTimer = document.querySelector("#resetTimer")


let initialTime = 0.2 * 60; //10mins to seconds
let currentTime = initialTime;
let paused = true;
let interval;

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

startTimer.addEventListener("click", () => {
    if (paused){
        paused = false;
        interval = setInterval(updateTime, 1000);

        console.log("work")
    }
});

stopTimer.addEventListener("click", () => {
   if (!paused){
       paused = true;
       clearInterval(interval);
   }
});

resetTimer.addEventListener("click",() => {
    paused = true;
    clearInterval(interval);
    currentTime = initialTime;
    updateDisplay();
});

