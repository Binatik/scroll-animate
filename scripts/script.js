const settings = {
  animateSelector: ".animate", //Класс, который дает команду на активацию анимации.
  activeAnimate: "anim", //Класс, который отвечает за вашу анимацию.
  part: 3, //Часть страницы, показанная на экране.
  isRemoveActive: true, //Если необходимо на сайте удалять анимацию после.
  scrollDelay: 150, //Задержка в ms  для оптимизации.
};

const { animateSelector, activeAnimate, part, isRemoveActive, scrollDelay } = settings;

const nodeAnimate = document.querySelectorAll(animateSelector);

function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall < delay) {
      return;
    }

    lastCall = now;
    fn.apply(this, args);
  };
}

function offset(element) {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  const rectElement = element.getBoundingClientRect();

  return {
    left: rectElement.left + scrollLeft,
    top: rectElement.top + scrollTop,
  };
}

function animationScrolling() {
  nodeAnimate.forEach(element => {
    const heightElement = element.offsetHeight;
    const animationsOffset = offset(element).top;

    const point = window.innerHeight - heightElement / part;
    const yOffset = window.pageYOffset;

    const scroll = yOffset > animationsOffset - point && yOffset < animationsOffset + heightElement;

    if (scroll) element.classList.add(activeAnimate);
    else if (isRemoveActive) element.classList.remove(activeAnimate);
  });
}

const scrolling = throttle(animationScrolling, scrollDelay);

window.addEventListener("scroll", scrolling);
scrolling();
