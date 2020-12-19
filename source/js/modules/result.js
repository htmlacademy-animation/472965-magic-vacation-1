export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);

  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);

        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);

        let titleSvg = targetEl[0].querySelector(`.result__title svg`);
        let isTitleLost = titleSvg.classList.contains(`result__title_lost`);

        createAnimateSvgTitle(titleSvg, isTitleLost);
      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }

  function createAnimateSvgTitle(title, fall) {
    const paths = [...title.querySelectorAll(`path`)];
    let delay = 0.4;
    let delayTrancform = 0.3;
    let speedTransform = 1.3;

    paths.forEach((item, i) => {
      const pathLength = item.getTotalLength();
      const itemAnimate = item.querySelector(`animate`);

      item.setAttribute(`stroke-dashoffset`, `0`);
      item.setAttribute(`stroke-dasharray`, `0 ${pathLength / 2}`);

      itemAnimate.setAttribute(`dur`, `0.4s`);
      itemAnimate.setAttribute(`to`, `${pathLength / 3} 0`);

      // animateTransform for fall animate
      if (fall) {
        const transformList = [
          `0 0; 0 150; 0 130; 0 150`,
          `0 0; 0 150; 0 134; 0 150`,
          `0 0; 0 150; 0 138; 0 150`,
          `0 0; 0 150; 0 141; 0 150`,
          `0 0; 0 150; 0 144; 0 150`,
          `0 0; 0 150; 0 146; 0 150`,
          `0 0; 0 150; 0 148; 0 150`,
          `0 0; 0 150; 0 149; 0 150`,
          `0 0; 0 150; 0 150; 0 150`,
        ];

        const svgAnimateTransform = document.createElementNS(
            `http://www.w3.org/2000/svg`,
            `animateTransform`
        );
        svgAnimateTransform.setAttribute(`attributeName`, `transform`);
        svgAnimateTransform.setAttribute(`type`, `translate`);
        svgAnimateTransform.setAttribute(
            `begin`,
            `animateLetter.begin + ${delayTrancform}s`
        );
        svgAnimateTransform.setAttribute(`dur`, `${speedTransform}s`);
        svgAnimateTransform.setAttribute(`values`, `${transformList[i]}`);
        svgAnimateTransform.setAttribute(
            `keySplines`,
            `0 0.6 0.8 1; 0 0.3 0.6 1; 0.3 0 0.6 1`
        );
        svgAnimateTransform.setAttribute(`calcMode`, `spline`);
        svgAnimateTransform.setAttribute(`fill`, `freeze`);

        speedTransform -= 0.1;

        itemAnimate.setAttribute(`begin`, `${delay}`);
        delay += 0.2;

        delayTrancform += 0.15;

        itemAnimate.after(svgAnimateTransform);

        return;
      }

      itemAnimate.beginElement();
    });
  }
};
