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
document.addEventListener("DOMContentLoaded", () => {
  const introSection = document.querySelector(".intro");
  const introContent = document.querySelector(".intro__content");
  const cursor = document.createElement("div");
  cursor.id = "custom-cursor";
  document.body.appendChild(cursor);

  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const originalIframe = modalContent.querySelector("iframe");
  const iframeSrcWithAutoplay = originalIframe.src; // autoplay bilan src
  const iframeSrcWithoutAutoplay = iframeSrcWithAutoplay.replace("&autoplay=1", ""); // autoplay'siz src

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

  // Intro section bosilganda modalni ko'rsatish (faqat intro__contentdan tashqarida)
  introSection.addEventListener("click", (e) => {
    if (!introContent.contains(e.target)) {
      modal.classList.add("show");
      // Modal ochilganda yangi iframe yaratamiz (autoplay bilan)
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
    }
  });

  // Modal yopilganda videoni to'xtatish
  const stopVideo = () => {
    modalContent.innerHTML = ""; // Iframe'ni butunlay o'chiramiz
    const newIframe = document.createElement("iframe");
    newIframe.className = "embedly-embed w-lightbox-embed";
    newIframe.src = iframeSrcWithoutAutoplay; // autoplay'siz src
    newIframe.width = "940";
    newIframe.height = "528";
    newIframe.scrolling = "no";
    newIframe.title = "YouTube embed";
    newIframe.frameBorder = "0";
    newIframe.allow = "autoplay; fullscreen; encrypted-media; picture-in-picture;";
    newIframe.allowFullscreen = true;
    modalContent.appendChild(newIframe); // Yangi iframe qo'shamiz, lekin autoplay yo'q
  };

  // Modal bosilganda, agar modal-content bo'lmasa, modal yopiladi va video to'xtaydi
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      stopVideo(); // Videoni to'xtatamiz
    }
  });

  // Close tugmasi bosilganda ham videoni to'xtatish
  const closeButton = document.querySelector(".close__modal");
  closeButton.addEventListener("click", () => {
    modal.classList.remove("show");
    stopVideo(); // Videoni to'xtatamiz
  });
});
