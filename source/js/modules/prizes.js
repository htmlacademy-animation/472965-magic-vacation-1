export default () => {
  const prizeJourneys = document.querySelector(`.prizes__item--journeys img`);
  const prizeCases = document.querySelector(`.prizes__item--cases img`);

  document.body.addEventListener(`screenChanged`, (event) => {
    if (event.detail.screenName === `prizes`) {

      // если нет картинки, то добавляем
      if (!prizeJourneys.hasAttribute(`src`)) {
        prizeJourneys.setAttribute(`src`, `img/prize1.svg`);

        setTimeout(() => {
          prizeCases.setAttribute(`src`, `img/prize2.svg`);
        }, 4000);
      }
    }
  });
};
