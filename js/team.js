const teamList = document.querySelector('.team__list');

function openItem(button) {
  const contentWrap = button.nextElementSibling;
  const content = contentWrap.firstElementChild;
  const currentHeight = content.offsetHeight;
  
  contentWrap.style.height = currentHeight + 'px';
  button.classList.add('team__name--active')
}

function closeItem(button) {
  if (!button) return;
  const contentWrap = button.nextElementSibling;
  contentWrap.style.height = 0;
  button.classList.remove('team__name--active');
  
}

teamList.addEventListener('click', function (event) {
  
  event.preventDefault();

  const target = event.target;
  const activeItem = document.querySelector('.team__name--active');

  if (target.classList.contains('team__name')) {
    if (target.classList.contains('team__name--active')) {
      closeItem(target);
    } else {
      closeItem(activeItem);
      openItem(target)
    }
  }

});