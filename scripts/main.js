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

// ========================= Тема сайту =========================
document.getElementById("themeToggle").addEventListener("click", () => {
    const root = document.documentElement;
    const currentBg = root.style.getPropertyValue("--bg-color");

    root.style.setProperty("--bg-color", currentBg === "#ffffff" ? "#121212" : "#ffffff");
    root.style.setProperty("--text-color", currentBg === "#ffffff" ? "#eaeaea" : "#333333");
    root.style.setProperty("--header-bg", currentBg === "#ffffff" ? "rgba(18, 18, 18, 0.9)" : "rgba(255, 255, 255, 0.9)");
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
        { threshold: 0.5 } // Активуємо пункт меню, якщо видно 50% розділу
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

    counter.setAttribute("data-running", "true");

    const updateCount = () => {
        const increment = target / 300;

        if (current < target) {
            current += increment;
            counter.innerText = Math.ceil(current);
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = target + (isFirstCounter ? "/7" : "");
            counter.setAttribute("data-completed", "true");
            counter.removeAttribute("data-running");
        }
    };

    updateCount();
};

const handleScroll = () => {
    counters.forEach((counter, index) => {
        const rect = counter.getBoundingClientRect();
        const isCompleted = counter.getAttribute("data-completed") === "true";
        const isRunning = counter.getAttribute("data-running") === "true";

        if (!isCompleted && !isRunning && rect.top < window.innerHeight && rect.bottom > 0) {
            runCounter(counter, index === 0);
        }
    });
};

window.addEventListener("scroll", handleScroll);
handleScroll();

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

// ========================= EmailJS =========================
emailjs.init("QoI8sNp-WAyZtfvjl");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    emailjs.send("service_qhahqzx", "template_qo7bt6d", { name, phone })
        .then(response => {
            alert("Повідомлення успішно надіслано!");
        })
        .catch(error => {
            alert("Помилка при відправленні. Спробуйте ще раз.");
        });
});

// ========================= Карусель =========================
const showSlide = (index) => {
    currentIndex = (index + totalCarouselItems) % totalCarouselItems;
    const offset = -currentIndex * 100 / totalCarouselItems;
    document.querySelector(".carousel").style.transform = `translateX(${offset}%)`;
};

document.querySelector(".prev").addEventListener("click", () => showSlide(currentIndex - 1));
document.querySelector(".next").addEventListener("click", () => showSlide(currentIndex + 1));
showSlide(currentIndex); // Початковий слайд
