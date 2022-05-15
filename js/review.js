const reviewLink = document.querySelector('.review__item-icon');

reviewLink.addEventListener('click', function (event) {

  event.preventDefault();

  const target = event.target;
  console.log('target', target);


});