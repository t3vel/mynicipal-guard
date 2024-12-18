// Константи
const sections = document.querySelectorAll(".section");
const menuItems = document.querySelectorAll(".nav-menu a");
const header = document.querySelector(".header");
const counters = document.querySelectorAll(".number");
const accordionHeaders = document.querySelectorAll(".accordion-header");
const modal = document.getElementById("modal");
const closeButton = document.querySelector(".close-btn");
const orderButtons = document.querySelectorAll(".service__btn");
const form = document.getElementById("orderForm");
const carouselItems = document.querySelectorAll(".carousel-item");
const totalCarouselItems = carouselItems.length;
let currentIndex = 0;
AOS.init({
    duration: 800, // Тривалість анімації в мс
    once: true,    // Анімація відбувається лише раз
});

// ========================= Тема сайту =========================
document.getElementById("themeToggle").addEventListener("click", () => {
    const root = document.documentElement;
    root.classList.toggle("dark-theme");
});

// ========================= Анімація секцій =========================
document.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + window.innerHeight - 100;

    sections.forEach(section => {
        if (section.offsetTop < scrollPosition) {
            section.classList.add("show");
        }
    });
});

// ========================= Динамічний активний пункт меню =========================
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const menuLinks = document.querySelectorAll(".nav-menu a");

    // Видаляємо клас "active" у всіх пунктах меню
    const removeActiveClasses = () => {
        menuLinks.forEach(link => link.classList.remove("active"));
    };

    // Додаємо клас "active" до поточного пункту меню
    const activateMenuItem = (id) => {
        removeActiveClasses();
        const activeLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active");
    };

    // Налаштування Intersection Observer
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    activateMenuItem(entry.target.id);
                }
            });
        },
        { threshold: 0.3 }
    );

    // Спостереження за секціями
    sections.forEach(section => observer.observe(section));
});


// ========================= Хедер при скролі =========================
let lastScrollY = 0;
let isShrunk = false;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && !isShrunk) {
        header.classList.add("shrink");
        isShrunk = true;
    } else if (currentScrollY < lastScrollY && currentScrollY <= 100) {
        header.classList.remove("shrink");
        isShrunk = false;
    }

    lastScrollY = Math.max(0, currentScrollY);
});

// ========================= Лічильники =========================
const runCounter = (counter, isFirstCounter) => {
    const target = +counter.dataset.target;
    let current = 0;
    const increment = Math.ceil(target / 125); // Кількість збільшення за один крок

    const updateCount = () => {
        if (current < target) {
            current += increment;
            counter.innerText = current > target ? target : current; // Уникаємо перевищення
            setTimeout(updateCount, 25); // Інтервал оновлення
        } else {
            counter.innerText = target + (isFirstCounter ? "/7" : ""); // Додаємо "/7" лише для першого лічильника
        }
    };

    updateCount();
};

const handleScroll = () => {
    counters.forEach((counter, index) => {
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !counter.classList.contains("animated")) {
            counter.classList.add("animated"); // Відзначаємо, що цей лічильник вже анімовано
            runCounter(counter, index === 0);
        }
    });
};

// Слухаємо подію прокручування
window.addEventListener("scroll", handleScroll);
handleScroll(); // Викликаємо спочатку, щоб перевірити видимість елементів на початку

// ========================= Аккордеон =========================
accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
        const item = header.parentElement;
        const content = item.querySelector(".accordion-content");

        document.querySelectorAll(".accordion-item").forEach(i => {
            if (i !== item) {
                i.classList.remove("open");
                i.querySelector(".accordion-content").style.maxHeight = null;
            }
        });

        if (item.classList.contains("open")) {
            item.classList.remove("open");
            content.style.maxHeight = null;
        } else {
            item.classList.add("open");
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// ========================= Модальне вікно =========================

const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
};

orderButtons.forEach(button => {
    button.addEventListener("click", () => {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
});
closeButton.addEventListener("click", closeModal);
window.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
});

// ========================= Email Sender =========================
const modalContent = document.querySelector(".modal-content");

form.addEventListener("submit", async (event) => {
    const response = await fetch("https://formsubmit.co/715c7bde9536781cca252090120ddd80@gmail.com", {
        method: "POST",
        body: new FormData(form)
    });
});

// ========================= Burger Menu =========================
document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.getElementById("burgerMenu");
    const navMenuWrapper = document.querySelector(".nav-menu-wrapper");

    burgerMenu.addEventListener("click", () => {
        navMenuWrapper.classList.toggle("active");
    });


    navMenuWrapper.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            navMenuWrapper.classList.remove("active");
        }
    });
});



window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.innerWidth > 768 && window.scrollY > 100) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});

const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.querySelector('.nav-menu');


burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});


menuItems.forEach(item => {
    item.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


// ========================= Відкриття фото з галереї на повний екран =========================
document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const galleryModal = document.getElementById("fullscreenModal");
    const modalImage = galleryModal.querySelector(".modal-image");
    const closeModalBtn = galleryModal.querySelector(".close-btn");


    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            modalImage.src = item.src;
            galleryModal.classList.add("visible");
            document.body.classList.add('no-scroll');
        });
    });


    closeModalBtn.addEventListener("click", () => {
        galleryModal.classList.remove("visible");
        document.body.classList.remove('no-scroll');
    });


    galleryModal.addEventListener("click", (e) => {
        if (e.target === galleryModal) {
            galleryModal.classList.remove("visible");
            document.body.classList.remove('no-scroll');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slider-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function updateSlider() {
        const offset = -currentIndex * 100;
        sliderWrapper.style.transform = `translateX(${offset}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });
});