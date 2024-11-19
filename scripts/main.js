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

    const runCounter = (counter, isFirstCounter) => {
        const target = +counter.dataset.target;
        let current = 0;

        // Позначаємо, що анімація виконується
        counter.setAttribute("data-running", "true");

        const updateCount = () => {
            const increment = target / 200; // Менший приріст для плавності

            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
                if (isFirstCounter) {
                    counter.innerText += "/7"; // Додаємо " / 7" тільки до першого лічильника
                }
                counter.setAttribute("data-completed", "true"); // Позначаємо завершення
                counter.removeAttribute("data-running"); // Знімаємо прапорець виконання
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
    handleScroll(); // Запуск при завантаженні сторінки
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

            // Якщо анімація все ще триває, повертаємо нічого
            if (content.style.maxHeight && content.style.maxHeight !== "0px" && !item.classList.contains("open")) {
                return;
            }

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


// Отримуємо елементи
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close-btn');
const orderButtons = document.querySelectorAll('.service__btn');

// Функція для закриття модалки
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';  // Включаємо скролл
}

// Відкриття модального вікна
orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';  // Вимикаємо скролл
    });
});

// Закриття при кліку на кнопку .close-btn
closeButton.addEventListener('click', closeModal);

// Закриття при кліку за межами модального вікна
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Ініціалізація EmailJS
emailjs.init("QoI8sNp-WAyZtfvjl");

// Обробка події "submit" форми
const form = document.getElementById('orderForm');

form.addEventListener('submit', (event) => {
    // Забороняємо перезавантаження сторінки
    event.preventDefault();

    // Отримуємо значення полів форми
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    emailjs.send("service_qhahqzx", "template_qo7bt6d", {
        name: name, // Змінна з форми
        phone: phone, // Змінна з форми
    })
        .then(response => {
            console.log("Успіх!", response.status, response.text);
            alert("Повідомлення успішно надіслано!");
        })
        .catch(error => {
            console.error("Помилка при відправленні:", error);
            alert("Помилка при відправленні. Спробуйте ще раз.");
        });
});


let currentIndex = 0; // Текущий индекс слайда
const items = document.querySelectorAll('.carousel-item'); // Всі елементи каруселі
const totalItems = items.length; // Загальна кількість елементів

// Функція для перемикання слайдів
function showSlide(index) {
    if (index >= totalItems) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalItems - 1;
    } else {
        currentIndex = index;
    }

    // Зміна позиції каруселі
    const offset = -currentIndex * 100 / totalItems;
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
}

// Обробники для кнопок
document.querySelector('.prev').addEventListener('click', () => showSlide(currentIndex - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(currentIndex + 1));

// Початковий показ слайду
showSlide(currentIndex);