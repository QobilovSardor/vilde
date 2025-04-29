// features__swiper
const featuresSwiper = new Swiper('.features__swiper', {
  spaceBetween: 35,
  slidesPerView: 5,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true,
  centeredSlides: true,
  roundLengths: true,
});

// game__slider
const gameSlider = new Swiper('.game__slider', {
  loop: false,
  slidesPerView: 2,
  centeredSlides: true,
  initialSlide: 1,
  spaceBetween: 50,
  navigation: {
    nextEl: '.game__slider-next',
    prevEl: '.game__slider-prev',
  }
});