const hamburgerButton = document.getElementById('hamburgerButton');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const body = document.body;

hamburgerButton.addEventListener('click', e => {
  e.preventDefault();
  
  hamburgerMenu.classList.toggle('active');
  hamburgerButton.classList.toggle('active');
  body.classList.toggle('locked');
});

hamburgerMenu.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('menu__link')) {
    
    hamburgerMenu.classList.remove('active');
    hamburgerButton.classList.remove('active');
    body.classList.remove('locked');
  }
})