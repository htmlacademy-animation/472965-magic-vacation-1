export default class Timer {
  constructor(elementSelector, minute, fps) {
    this.elements = [...document.querySelectorAll(`${elementSelector} span`)];

    this.animationframeID = null;
    this.totalTime = null;

    this.then = Date.now();
    this.minute = minute * 60 * 1000;
    this.fpsInterval = 1000 / fps;

    this.startTimer = this.startTimer.bind(this);
  }

  convertMS(milliseconds) {
    let seconds = (Math.floor(milliseconds / 1000)) % 60;
    let minute = (Math.floor(milliseconds / 60000)) % 60;

    return {
      minute,
      seconds
    };
  }

  formattingTime(item) {
    return item < 10 ? `0${item}` : item;
  }

  drawTime() {
    let timeLeft = this.totalTime - Date.now();

    if (timeLeft <= 0 ) {
      this.elements[0].textContent = `00`;
      this.elements[1].textContent = `00`;

      this.cancelTimer();
      return;
    }
    let {minute, seconds} = this.convertMS(timeLeft);
    this.elements[0].textContent = this.formattingTime(minute);
    this.elements[1].textContent = this.formattingTime(seconds);
  }

  startTimer() {
    this.animationframeID = requestAnimationFrame(this.startTimer);

    let now = Date.now();
    let elapsed = now - this.then;

    if (elapsed > this.fpsInterval) {
      this.then = now - (elapsed % this.fpsInterval);
      this.drawTime();
    }
  }

  runTimer() {
    this.totalTime = Date.now() + this.minute;
    this.animationframeID = requestAnimationFrame(this.startTimer);
  }

  cancelTimer() {
    cancelAnimationFrame(this.animationframeID);
  }
}
