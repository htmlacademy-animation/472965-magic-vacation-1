import AccentTypographyBuild from "./typography-animation";

export default () => {
  const pageHeaderNav = document.querySelector(`.page-header__nav`);
  const title = document.querySelector(`.intro__title`);
  const dateLabel = document.querySelector(`.intro__label`);
  const message = document.querySelector(`.intro__message`);

  const introTitle = new AccentTypographyBuild(
    `.intro__title`,
    1000,
    `text-animation`,
    `transform`,
    true
  );

  const introDate = new AccentTypographyBuild(
    `.intro__date`,
    1000,
    `text-animation`,
    `transform`
  );

  pageHeaderNav.addEventListener(
    `transitionend`,
    () => {
      introTitle.runAnimation();
    },
    { once: true }
  );

  title.addEventListener(
    `transitionend`,
    () => {
      message.classList.add(`active`);
    },
    { once: true }
  );

  message.addEventListener(
    `transitionend`,
    () => {
      setTimeout(() => {
        introDate.runAnimation();
        dateLabel.classList.add(`active`);
      }, 300);
    },
    { once: true }
  );
};
