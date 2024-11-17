document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + window.innerHeight - 100;

    sections.forEach(section => {
        if (section.offsetTop < scrollPosition) {
            section.classList.add('show');
        }
    });
});

document.getElementById('themeToggle').addEventListener('click', () => {
    const root = document.documentElement;
    const currentBg = root.style.getPropertyValue('--bg-color');
    if (currentBg === '#ffffff') {
        root.style.setProperty('--bg-color', '#121212');
        root.style.setProperty('--text-color', '#eaeaea');
        root.style.setProperty('--header-bg', 'rgba(18, 18, 18, 0.9)');
    } else {
        root.style.setProperty('--bg-color', '#ffffff');
        root.style.setProperty('--text-color', '#333333');
        root.style.setProperty('--header-bg', 'rgba(255, 255, 255, 0.9)');
    }
});



// Отримуємо всі пункти меню
const menuItems = document.querySelectorAll('.nav-menu a');

// Функція для зміни активного класу
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Видаляємо клас "active" у всіх пунктах меню
        menuItems.forEach(i => i.classList.remove('active'));
        // Додаємо клас "active" до поточного пункту
        item.classList.add('active');
    });
});

// За замовчуванням встановлюємо клас active для першого пункту
menuItems[0].classList.add('active');

const header = document.querySelector('.header');
let lastScrollY = 0; // Поточна позиція прокрутки
let isShrunk = false; // Прапорець для відстеження стану хедера

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // Скрол вниз
        if (!isShrunk) {
            header.classList.add('shrink');
            isShrunk = true;
        }
    } else {
        // Скрол вверх
        if (currentScrollY < lastScrollY && currentScrollY <= 100) {
            header.classList.remove('shrink');
            isShrunk = false;
        }
    }

    lastScrollY = currentScrollY > 0 ? currentScrollY : 0; // Уникаємо від’ємних значень
});



document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const menuLinks = document.querySelectorAll(".nav-menu a");

    // Функція для видалення класу "active"
    function removeActiveClasses() {
        menuLinks.forEach(link => link.classList.remove("active"));
    }

    // Функція для активації меню
    function activateMenuItem(id) {
        removeActiveClasses();
        const activeLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active");
    }

    // Перевірка, чи розділ видно
    function isSectionVisible(section) {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight;
    }

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

    // Спостереження за кожним розділом
    sections.forEach(section => observer.observe(section));

    // Ручна активація першого пункту "Головна" після завантаження
    const firstSection = sections[0];
    if (firstSection && isSectionVisible(firstSection)) {
        activateMenuItem(firstSection.id);
    }
});




document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".number");

    const runCounter = (counter) => {
        const updateCount = () => {
            const target = +counter.dataset.target;
            const current = +counter.innerText;
            const increment = target / 100;

            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 80);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    const handleScroll = () => {
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                runCounter(counter);
            }
        });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run initially in case already in view
});


document.addEventListener("DOMContentLoaded", () => {
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const content = item.querySelector(".accordion-content");

            // Закрити всі інші елементи
            document.querySelectorAll(".accordion-item").forEach(i => {
                if (i !== item) {
                    i.classList.remove("open");
                    const otherContent = i.querySelector(".accordion-content");
                    otherContent.style.maxHeight = null;
                }
            });

            // Перемикання активного елемента
            if (item.classList.contains("open")) {
                item.classList.remove("open");
                content.style.maxHeight = null;
            } else {
                item.classList.add("open");
                content.style.maxHeight = content.scrollHeight + "px"; // Анімація на основі висоти контенту
            }
        });
    });
});


