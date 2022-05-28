const colorsList = document.querySelector('.colors__list');
const items = document.querySelectorAll('.colors__item');

const getItemWidth = (button) => {

  let resultWidth = 524;

  const windowWidth = window.innerWidth;
  const contentWidth = button.offsetWidth;

  const isTablet = window.matchMedia('(max-width: 768px)').matches;
  const isPhone = window.matchMedia('(max-width: 480px)').matches;

  if (isTablet) {
    resultWidth = windowWidth - contentWidth*items.length;
  }

  if (isPhone) {
    resultWidth = windowWidth - contentWidth;
  }

  
  console.log('windowWidth', windowWidth);
  console.log('resultWidth', resultWidth);
  console.log('itemWidth', contentWidth);
  
  return resultWidth;
  
};


openMenu = function (button) {

  const contentWidth = button.nextElementSibling;
  const parentElement = button.parentElement;
  const textWidth = contentWidth.firstElementChild;

  contentWidth.style.width = `${getItemWidth(button)}px`;
  textWidth.style.width = `${getItemWidth(button)}px`;
  button.classList.add('colors__link--active');
  parentElement.classList.add('colors__item--active');

  getItemWidth(button);
};


closeMenu = function (button) {
  
  if (!button) return;

  const itemWidth = button.nextElementSibling;
  const parentElement = button.parentElement;

  itemWidth.style.width = 0;
  button.classList.remove('colors__link--active');
  parentElement.classList.remove('colors__item--active');

};


colorsList.addEventListener('click', function (event) {
  event.preventDefault();

  const target = event.target;
  const activeLink = document.querySelector('.colors__link--active');
  const prevElement = target.previousElementSibling;
  const parentElement = target.parentElement;

  console.log('Element', target);
  console.log('prevElement', prevElement);
  console.log('parentElement', parentElement);

  if (target.classList.contains('colors__link')) {
    if (target.classList.contains('colors__link--active')) {
      closeMenu(target);
    } else {
      closeMenu(activeLink);
      openMenu(target);
    }
  }

  if (target.classList.contains('colors__content')) {
    closeMenu(activeLink);
}

  if (target.classList.contains('colors__desc')) {
    closeMenu(activeLink);
}

  if (target.classList.contains('colors__link-title')) {
    if (parentElement.classList.contains('colors__link--active')) {
      closeMenu(parentElement);
    } else {
      closeMenu(activeLink);
      openMenu(parentElement);
    }
  }

});

window.addEventListener('resize', () => {

  const activeLink = document.querySelector('.colors__link--active');

  if (activeLink) {
    closeMenu(activeLink);
  }
})