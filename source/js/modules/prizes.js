export default () => {
  const prizeJourneys = document.querySelector(`.prizes__item--journeys img`);

  document.body.addEventListener(`screenChanged`, (event) => {
    if (event.detail.screenName === `prizes`) {

      // если нет картинки, то добавляем
      if (!prizeJourneys.hasAttribute(`src`)) {
        prizeJourneys.setAttribute(`src`, `img/prize1.svg`);
      }
    }
  });
};
