const slider = $('.slider__content-list').bxSlider({
  pager: false,
  controls: false
});

$('.slider__control--left').click(event => {

  event.preventDefault();

  slider.goToPrevSlide();
})

$('.slider__control--right').click(event => {

  event.preventDefault();

  slider.goToNextSlide();
})