// features__swiper
const swiper = new Swiper('.features__swiper', {
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
