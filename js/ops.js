const sections = $('section');
const display = $('.main-content');
const sideMenu = $('.fixed-menu');
let inScroll = false;

// const mobileDetect = new mobileDetect(window.navigator.userAgent);
// const isMobile = mobileDetect.mobile();

sections.first().addClass('active');

const countSectionPosition = sectionEq => {
  return sectionEq * -100;
};

const changeMenuThemeForSection = sectionEq => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr('data-fixed-menu-theme');

  if (menuTheme === 'dark') {
    sideMenu.addClass('fixed-menu--dark');
  } else {
    sideMenu.removeClass('fixed-menu--dark');
  }
}; 

const changeFixedMenuItem = sectionEq => {
  sideMenu
  .find('.fixed-menu__item')
  .eq(sectionEq)
  .addClass('fixed-menu__item--active')
  .siblings()
  .removeClass('fixed-menu__item--active');
};

const activeSection = sectionEq => {
  sections
  .eq(sectionEq)
  .addClass('active')
  .siblings()
  .removeClass('active');
};

const performTransition = sectionEq => {

  if (inScroll === false) {
    inScroll = true;
    changeMenuThemeForSection(sectionEq);
    changeFixedMenuItem(sectionEq);
    activeSection(sectionEq);
    const position = countSectionPosition(sectionEq);
    const transitionTime = 1000;
    const mouseTime = 300;

    display.css({
      transform: `translateY(${position}%)`,
    });

    setTimeout(() => {
      inScroll = false;
    }, transitionTime + mouseTime);
  }
};

const scrollViewport = direction => {
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === 'next' && nextSection.length) {
    performTransition(nextSection.index());
  }
  
  if (direction === 'prev' && prevSection.length) {
    performTransition(prevSection.index());
  }
};

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollViewport('next');
  }
  
  if (deltaY < 0) {
    scrollViewport('prev');

  }
});

$(window).on('keydown', e => {
  const tagName = e.target.tagName.toLowerCase();

  if (tagName !== 'input' && tagName !== 'textarea') {

    switch (e.keyCode) {
      case 38:
        scrollViewport('prev');
        break
      case 40:
        scrollViewport('next');
        break
    }
  }
});

$('.wrapper').on('touchmove', e => e.preventDefault());

$('[data-scroll-to]').click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});

// if (isMobile) {

//   $('body').swipe({
//     swipe: function (event, direction) {
//       const scroller = viewportScroller();
//       let scrollDirection = '';
  
//       if (direction === 'up') scrollDirection = 'next';
//       if (direction === 'down') scrollDirection = 'prev';
  
//       scroller[scrollDirection]();
//     },
//   });
// };

$(function() {
  $("body").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction) {
      $(this).text("You swiped " + direction );  
    }
  });

  //Set some options later
  $("body").swipe( {fingers:2} );
});