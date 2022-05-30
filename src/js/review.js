const reviewAvatars = document.querySelector('#reviewAvatars');

const findReview = (reviewName) => {
  const activeReview = document.querySelector('.review__item--active');
  activeReview.classList.remove('review__item--active');
  const activeItem = document.querySelector(`.review__item[data-item="${reviewName}"]`);
  activeItem.classList.add('review__item--active');
}


reviewAvatars.addEventListener('click', (event) => {
  event.preventDefault();
  
  const target = event.target;

  if (target.classList.contains('review__img-icon')) {
    const activeItemIcon = document.querySelector('.review__item-icon--active');

    if (activeItemIcon) {
      activeItemIcon.classList.remove('review__item-icon--active');
    }

    const button = target.parentElement;
    const listElement = button.parentElement;
    const reviewId = button.getAttribute('data-open');
    listElement.classList.add('review__item-icon--active');
    findReview(reviewId);
  }
})