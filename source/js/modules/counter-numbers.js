export default class CounterNumbers {
  constructor(container, numbers, fps) {
    this.container = container;
    this.numbers = numbers;

    this.then = Date.now();
    this.fpsInterval = 1000 / fps;
    this.startCounter = this.startCounter.bind(this);
  }

  drawCounter() {
    let numb = this.numbers.shift();
    this.container.textContent = numb;
  }

  startCounter() {
    requestAnimationFrame(this.startCounter);

    let now = Date.now();
    let elapsed = now - this.then;

    if (elapsed > this.fpsInterval && this.numbers.length > 0) {
      this.then = now - (elapsed % this.fpsInterval);
      this.drawCounter();
    }
  }

  runCounter() {
    requestAnimationFrame(this.startCounter);
  }
}
