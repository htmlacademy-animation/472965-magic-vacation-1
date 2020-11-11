export default () => {
  const prizeScreen = document.querySelector(`.screen--prizes`);
  const prizeJourneys = prizeScreen.querySelector(
      `.prizes__item--journeys img`
  );
  const prizeCases = prizeScreen.querySelector(`.prizes__item--cases img`);

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
  ];

  function addImagesSvg() {
    if (!prizeJourneys.hasAttribute(`src`)) {
      images.forEach(({path, timeDelay, target}) => {
        setTimeout(() => {
          target.setAttribute(`src`, `${path}?time=${Date.now()}`);
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
