class AccentTypographyBuild {
  constructor(elementSelector, timer, classForActivate, property) {
    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);
    this._timeOffset = 50;
    this._countWord = 0;

    this.prePareText();
  }

  createElement(letter, index) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    let delay = this._countWord > 0 ? this._timeOffset * (index + 1) : this._timeOffset;

    if ((index + 1) % 3 === 0) {
      delay += this._timeOffset / 2 + index * 3;
    } else if ((index - 1) % 3 === 0) {
      delay += this._timeOffset * 2 + index * 2;
    }

    span.style.transition = `${this._property} ${this._timer}ms ease ${delay}ms`;
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

    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce((fragment, letter, index) => {
        fragment.appendChild(this.createElement(letter, index));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`text-animation`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      this._countWord++;
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }

    setTimeout(() => {
      this._element.classList.add(this._classForActivate);
    });
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}

const mainTitle = new AccentTypographyBuild(
    `.intro__title`,
    700,
    `active`,
    `transform`
);

const mainTitleDate = new AccentTypographyBuild(
    `.intro__date`,
    700,
    `active`,
    `transform`
);

export default () => {
  mainTitle.runAnimation();
  mainTitleDate.runAnimation();
};
