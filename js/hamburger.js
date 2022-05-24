const hamburgerButton = document.getElementById('hamburgerButton');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const body = document.body;


hamburgerButton.addEventListener('click', function (event) {
  event.preventDefault();

  hamburgerMenu.classList.toggle('active');
  hamburgerButton.classList.toggle('active');
  body.classList.toggle('locked');
});