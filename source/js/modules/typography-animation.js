export default class AccentTypographyBuild {
  constructor(elementSelector, timer, classForActivate, property, twoWords = false) {
    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);
    this._timeOffset = 100;
    this._twoWords = twoWords;
    this._maxDelay = 0;
    this.prePareText();
  }

  createElement(letter, index, wordIndex) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    let delay;

    if ((index + 1) % 3 === 0) {
      delay = this._timeOffset * 2;
    } else if ((index - 1) % 3 === 0) {
      delay = this._timeOffset * 3;
    } else {
      delay = this._timeOffset;
    }

    if (this._maxDelay < delay) {
      this._maxDelay = delay;
    }

    if (this._twoWords && wordIndex > 0) {
      delay = delay + this._maxDelay + this._timeOffset;
    }

    span.style.transition = `${this._property} ${
      this._timer
    }ms cubic-bezier(0.65, 0.05, 0.36, 1) ${Math.abs(delay)}ms`;
    return span;
  }

  prePareText() {
    if (!this._element) {
      return;
    }
    const text = this._element.textContent
      .trim()
      .split(` `)
      .filter((letter) => letter !== ``);

    const content = text.reduce((fragmentParent, word, wordIndex) => {
      const wordElement = Array.from(word).reduce((fragment, letter, index) => {
        fragment.appendChild(this.createElement(letter, index, wordIndex));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`text-animation`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      this._countWord++;
      return fragmentParent;
    }, document.createDocumentFragment());
    this._element.textContent = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }

    setTimeout(() => {
      this._element.classList.add(`active-text`);
    });
  }

  destroyAnimation() {
    this._element.classList.remove(`active-text`);
  }
}
