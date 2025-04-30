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
  breakpoints: {
    1200: {
      spaceBetween: 35,
      slidesPerView: 5,
    },
    1024: {
      spaceBetween: 20,
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 3,
    },
    0: {
      spaceBetween: 10,
      slidesPerView: 1.5,
    }
  }
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
  },
  loop: true,
  breakpoints: {
    1300: {
      spaceBetween: 50,
    },
    768: {
      spaceBetween: 0,
    },
    0: {
      slidesPerView: 1.2,
      centeredSlides: true,
      spaceBetween: 0,
    }
  }
});

const nav = document.querySelector(".header .nav");
const openNavBtn = document.querySelector(".open__menu-btn");
const closeNavBtn = document.querySelector(".menu__close-btn");

openNavBtn.addEventListener("click", () => {
  nav.classList.add("show")
  document.body.style.overflow = 'hidden'
})
closeNavBtn.addEventListener("click", () => {
  nav.classList.remove("show");
  document.body.style.overflow = ''
})

// =================================================================================================================================
// =================================================================================================================================
// =================================================================================================================================
// =================================================================================================================================
// =================================================================================================================================
// =================================================================================================================================


const introSection = document.querySelector(".intro");
const introContent = document.querySelector(".intro__content");
const cursor = document.createElement("div");
cursor.id = "custom-cursor";
cursor.style.display = "none"; // <-- Bu qatorni qo‘sh
document.body.appendChild(cursor);

// Kursor faqat 1024px va undan katta ekranlarda ishlaydi
let isCursorActive = window.innerWidth >= 1024;

// Ekran o'lchami o'zgarsa — flagni yangilaymiz
window.addEventListener("resize", () => {
  isCursorActive = window.innerWidth >= 1024;
  if (!isCursorActive) {
    cursor.style.display = "none";
  }
});

// Custom cursor harakati
introSection.addEventListener("mousemove", (e) => {
  if (!isCursorActive) return;

  if (introContent.contains(e.target)) {
    cursor.style.display = "none";
  } else {
    cursor.style.display = "flex";
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }
});

introSection.addEventListener("mouseleave", () => {
  if (isCursorActive) {
    cursor.style.display = "none";
  }
});

// introSection.addEventListener("mouseenter", (e) => {
//   if (isCursorActive && !introContent.contains(e.target)) {
//     cursor.style.display = "flex";
//   }
// });
introSection.addEventListener("mouseenter", (e) => {
  if (isCursorActive && !introContent.contains(e.target)) {
    cursor.style.display = "flex";
  } else {
    cursor.style.display = "none";
  }
});


// ==== Modal video qismi ====
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const originalIframe = modalContent.querySelector("iframe");

const iframeSrcWithAutoplay = originalIframe ? originalIframe.src : "";
const iframeSrcWithoutAutoplay = iframeSrcWithAutoplay.replace("&autoplay=1", "");

// Modal ochish
const openModal = () => {
  modal.classList.add("show");
  if (!iframeSrcWithAutoplay) return;

  const newIframe = document.createElement("iframe");
  newIframe.className = "embedly-embed w-lightbox-embed";
  newIframe.src = iframeSrcWithAutoplay;
  newIframe.width = "940";
  newIframe.height = "528";
  newIframe.scrolling = "no";
  newIframe.title = "YouTube embed";
  newIframe.frameBorder = "0";
  newIframe.allow = "autoplay; fullscreen; encrypted-media; picture-in-picture;";
  newIframe.allowFullscreen = true;

  modalContent.innerHTML = "";
  modalContent.appendChild(newIframe);
};

// Intro bosilganda modal ochilsin
introSection.addEventListener("click", (e) => {
  if (!introContent.contains(e.target)) {
    openModal();
  }
});

// Modal yopish funksiyasi
const stopVideo = () => {
  modalContent.innerHTML = "";
  if (!iframeSrcWithoutAutoplay) return;

  const newIframe = document.createElement("iframe");
  newIframe.className = "embedly-embed w-lightbox-embed";
  newIframe.src = iframeSrcWithoutAutoplay;
  newIframe.width = "940";
  newIframe.height = "528";
  newIframe.scrolling = "no";
  newIframe.title = "YouTube embed";
  newIframe.frameBorder = "0";
  newIframe.allow = "autoplay; fullscreen; encrypted-media; picture-in-picture;";
  newIframe.allowFullscreen = true;

  modalContent.appendChild(newIframe);
};

// Modalni bosib yopish
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    stopVideo();
  }
});

// Close tugmasi
const closeButton = document.querySelector(".close__modal");
closeButton.addEventListener("click", () => {
  modal.classList.remove("show");
  stopVideo();
});

// Tabdan chiqsa — video to'xtaydi
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden" && modal.classList.contains("show")) {
    stopVideo();
  }
});
