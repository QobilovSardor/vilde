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
      slidesPerView: 2,
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

document.addEventListener("DOMContentLoaded", () => {
  const screenHeight = Math.max(window.innerHeight, window.screen.height);

  if (screenHeight > 1024) {
    const introSection = document.querySelector(".intro");
    const introContent = document.querySelector(".intro__content");
    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    document.body.appendChild(cursor);

    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-content");
    const originalIframe = modalContent.querySelector("iframe");

    // Iframe uchun autoplay va autoplay yo'q src'larni olamiz
    const iframeSrcWithAutoplay = originalIframe ? originalIframe.src : "";
    const iframeSrcWithoutAutoplay = iframeSrcWithAutoplay.replace("&autoplay=1", "");

    // Kursor harakatini intro section ichida kuzatish
    introSection.addEventListener("mousemove", (e) => {
      if (introContent.contains(e.target)) {
        cursor.style.display = "none";
      } else {
        cursor.style.display = "flex";
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }
    });

    // Intro sectiondan chiqib ketganda kursor yashiriladi
    introSection.addEventListener("mouseleave", () => {
      cursor.style.display = "none";
    });

    // Intro sectionga kirganda kursor ko'rinadi (agar intro__contentdan tashqarida bo'lsa)
    introSection.addEventListener("mouseenter", (e) => {
      if (!introContent.contains(e.target)) {
        cursor.style.display = "flex";
      }
    });

    // Modal ochilganda iframe qo'shamiz va autoplay yoqamiz
    const openModal = () => {
      modal.classList.add("show");
      if (!iframeSrcWithAutoplay) return; // Agar iframe yo'q bo'lsa, davom ettirmaymiz

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

      modalContent.innerHTML = ""; // Eski iframe'ni o'chiramiz
      modalContent.appendChild(newIframe); // Yangi iframe'ni qo'shamiz
    };

    // Intro section bosilganda modal ochiladi (faqat intro__content tashqarisida)
    introSection.addEventListener("click", (e) => {
      if (!introContent.contains(e.target)) {
        openModal();
      }
    });

    // Modal yopilganda videoni to'xtatish
    const stopVideo = () => {
      modalContent.innerHTML = ""; // Iframe'ni butunlay o'chiramiz
      if (!iframeSrcWithoutAutoplay) return;

      const newIframe = document.createElement("iframe");
      newIframe.className = "embedly-embed w-lightbox-embed";
      newIframe.src = iframeSrcWithoutAutoplay; // autoplay yo'q src
      newIframe.width = "940";
      newIframe.height = "528";
      newIframe.scrolling = "no";
      newIframe.title = "YouTube embed";
      newIframe.frameBorder = "0";
      newIframe.allow = "autoplay; fullscreen; encrypted-media; picture-in-picture;";
      newIframe.allowFullscreen = true;

      modalContent.appendChild(newIframe); // Yangi iframe'ni qo'shamiz
    };

    // Modal bosilganda, agar modal-content bo'lmasa, modal yopiladi va video to'xtaydi
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
        stopVideo();
      }
    });

    // Close tugmasi bosilganda ham videoni to'xtatish
    const closeButton = document.querySelector(".close__modal");
    closeButton.addEventListener("click", () => {
      modal.classList.remove("show");
      stopVideo();
    });

    // 🔥 **Agar foydalanuvchi boshqa tabga o'tsa, videoni to'xtatamiz**
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden" && modal.classList.contains("show")) {
        stopVideo();
      }
    });
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
