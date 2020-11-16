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
      path: `img/prize1.svg`,
      timeDelay: 0,
      target: prizeJourneys,
    },
    {
      path: `img/prize2.svg`,
      timeDelay: 4000,
      target: prizeCases,
    },
    {
      path: `img/prize3.svg`,
      timeDelay: 7500,
      target: prizeCodes,
    },
  ];

  function addImagesSvg() {
    if (!prizeJourneys.hasAttribute(`src`)) {
      images.forEach(({path, timeDelay, target}, i) => {
        setTimeout(() => {
          target.setAttribute(`src`, `${path}?time=${Date.now()}`);

          prizesDesc[i].classList.add(`active`);

          if (target === prizeJourneys) {
            prizeScreen.querySelector(`.prizes__item--journeys`).classList.add(`active`);
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
