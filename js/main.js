// Mobil menü toggle fonksiyonu
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");
const menuIcon = document.getElementById("menuIcon");

// Menüyü açıp kapatma ve ikon değiştirme fonksiyonu
const toggleMenu = () => {
  navLinks.classList.toggle("active");
  // Menü ikonunu değiştir
  if (navLinks.classList.contains("active")) {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  } else {
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }
};

// Hamburger menü tıklama olayı
navToggle.addEventListener("click", toggleMenu);

// Scroll olayında header'ın görünümünü değiştirme
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !navbar.classList.contains("scroll-down")) {
    navbar.classList.remove("scroll-up");
    navbar.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    navbar.classList.contains("scroll-down")
  ) {
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");
  }
  lastScroll = currentScroll;
});

// Smooth scroll için link tıklama olayları
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });

      // Mobil menüyü kapat ve ikonu varsayılana döndür
      if (navLinks.classList.contains("active")) {
        toggleMenu();
      }
    }
  });
});

// Sayfa yüklendiğinde animasyonları başlat
document.addEventListener("DOMContentLoaded", () => {
  // Servis kartları için görünüm animasyonu
  const cards = document.querySelectorAll(".service-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.5s ease-out";
    observer.observe(card);
  });

  // Değişen yazılar için fonksiyon
  function initChangingText() {
    const slides = document.querySelectorAll(".text-slide");
    let currentSlide = 0;

    function nextSlide() {
      // Aktif slaytı kaldır
      slides[currentSlide].classList.remove("active");

      // Sonraki slayta geç
      currentSlide = (currentSlide + 1) % slides.length;

      // Yeni slaytı aktif yap
      slides[currentSlide].classList.add("active");
    }

    // 3 saniyede bir değiştir
    setInterval(nextSlide, 3000);
  }

  // Sayfa yüklendiğinde başlat
  initChangingText();

  // Slider hover kontrolü
  const slider = document.querySelector(".slider");

  slider.addEventListener("mouseenter", () => {
    slider.style.animationPlayState = "paused";
  });

  slider.addEventListener("mouseleave", () => {
    slider.style.animationPlayState = "running";
  });
});
