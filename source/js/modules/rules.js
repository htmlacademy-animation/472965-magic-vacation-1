export default () => {
  const screenRules = document.querySelector('.screen--rules');
  const lastItemRules = screenRules.querySelector(".rules__list li:last-child");
  const rulesBtn = screenRules.querySelector(".rules__link");

  const listenerClassChange = mutationsList => {
    if (mutationsList[0].type === 'attributes') {
      rulesBtn.classList.remove('active')
      mutationObserver.disconnect()
    }
  }

  const mutationObserver = new MutationObserver(listenerClassChange)

  lastItemRules.addEventListener("animationend", () => {
    rulesBtn.classList.add('active')
    // удаляем класс анимации когда на секции нет класса active (чтобы проигрывалась повторно)
    mutationObserver.observe(screenRules, { attributes: true })
  });

};
