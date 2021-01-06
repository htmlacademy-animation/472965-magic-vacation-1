const gameCounter = document.querySelector(`#game .game__counter`);
const minutesGameCounter = gameCounter.querySelector(`span:first-child`);
const secondsGameCounter = gameCounter.querySelector(`span:last-child`);

const timer = 5;
const fpsInterval = 1000;

let timeTotal;
let then;
let animationframeID;


function convertMS(milliseconds) {
  let seconds = (Math.floor(milliseconds / 1000)) % 60;
  let minute = (Math.floor(milliseconds / 60000)) % 60;

  return {
    minute,
    seconds
  };
}


function formattingTime(item) {
  return item < 10 ? `0${item}` : item;
}


function drawTime() {
  let timeLeft = timeTotal - Date.now();
  let {minute, seconds} = convertMS(timeLeft);

  minutesGameCounter.textContent = formattingTime(minute);
  secondsGameCounter.textContent = formattingTime(seconds);

  if (minute === 0 && seconds === 0) {
    cancelTimer();
    return;
  }
}


function startTimer() {

  animationframeID = requestAnimationFrame(startTimer);

  let now = Date.now();
  let elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    drawTime();
  }
}

export function runTimer() {
  then = Date.now();
  timeTotal = then + (timer * 60 * 1000);

  animationframeID = requestAnimationFrame(startTimer);
}

export function cancelTimer() {
  cancelAnimationFrame(animationframeID);

  minutesGameCounter.textContent = `00`;
  secondsGameCounter.textContent = `00`;
}
