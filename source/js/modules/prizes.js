import CounterNumbers from './counter-numbers'

export default () => {
  const prizeScreen = document.querySelector(`.screen--prizes`);
  const prizeJourneys = prizeScreen.querySelector(
      `.prizes__item--journeys img`
  );
  const prizeCases = prizeScreen.querySelector(`.prizes__item--cases img`);
  const prizeCodes = prizeScreen.querySelector(`.prizes__item--codes img`);

  const prizesDesc = [...prizeScreen.querySelectorAll(`.prizes__desc`)];

  const images = [
    {
      name: 'prize-journeys',
      path: `img/prize1.svg`,
      timeDelay: 500,
      target: prizeJourneys,
    },
    {
      name: 'prize-cases',
      path: `img/prize2.svg`,
      timeDelay: 4500,
      target: prizeCases,
    },
    {
      name: 'prize-codes',
      path: `img/prize3.svg`,
      timeDelay: 8000,
      target: prizeCodes,
    },
  ];

  const animationNumbers = {
    'prize-cases': {
      numbers: [1, 2, 3, 4, 5, 6, 7],
      fps: 12
    },
    'prize-codes': {
      numbers: [11, 121, 216, 324, 419, 513, 628, 734, 826, 875, 900],
      fps: 12
    },
  };

  function addImagesSvg() {
    if (!prizeJourneys.hasAttribute(`src`)) {
      images.forEach(({path, timeDelay, target, name}, i) => {
        setTimeout(() => {
          target.setAttribute(`src`, `${path}?time=${Date.now()}`);

          prizesDesc[i].classList.add(`active`);
          //анимация цифр
          prizesDesc[i].addEventListener(`animationstart`, () => {
            if (animationNumbers[name]) {
              const {numbers, fps} = animationNumbers[name];
              const settingNumbers = new CounterNumbers(
                  prizesDesc[i].querySelector(`b`),
                  numbers, fps
              );
              settingNumbers.runCounter();
            }
          });

          if (target === prizeJourneys) {
            prizeScreen
              .querySelector(`.prizes__item--journeys`)
              .classList.add(`active`);
          }
        }, timeDelay);
      });
    }
    return;
  }

  if (prizeScreen.classList.contains(`active`)) {
    addImagesSvg();
  }

  document.body.addEventListener(`screenChanged`, (event) => {
    if (event.detail.screenName === `prizes`) {
      addImagesSvg();
    }
  });
};
