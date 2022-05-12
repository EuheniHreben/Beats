const hamburgerButton = document.getElementById('hamburgerButton');

hamburgerButton.addEventListener('click', function (event) {
  event.preventDefault();
  hamburgerMenu.classList.toggle('active');

  const hamburgerButton = document.getElementById('hamburgerButton');
  hamburgerButton.classList.toggle('active');
});