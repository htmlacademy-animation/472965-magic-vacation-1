export default () => {
  const gameCounter = document.querySelector(`#game .game__counter`);
  const minutesGameCounter = gameCounter.querySelector(`span:first-child`);
  const secondsGameCounter = gameCounter.querySelector(`span:last-child`);

  const timer = 5;
  const timeInterval = 1000;

  const timeTotal = new Date().getTime() + (timer * 60 * 1000);

  function convertMS(milliseconds) {
    let seconds = (Math.floor(milliseconds / 1000)) % 60;
    let minute = (Math.floor(milliseconds / 60000)) % 60;

    return {
      minute,
      seconds
    };
  }

  function formattingTime(item) {
    return String(item).length < 2 ? `0${item}` : item;
  }

  function startTimer() {
    let timeLeft = timeTotal - (new Date().getTime());
    let {minute, seconds} = convertMS(timeLeft);

    minutesGameCounter.textContent = formattingTime(minute);
    secondsGameCounter.textContent = formattingTime(seconds);

    if (timeLeft >= timeInterval) {
      requestAnimationFrame(startTimer);
    }

  }

  requestAnimationFrame(startTimer);

};
