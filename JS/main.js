const sections = document.querySelectorAll("section");
const headerLinks = document.querySelectorAll("header .nav-links a");

function setActiveLink(links, id) {
    links.forEach(link => {
        if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active");
        } else {
        link.classList.remove("active");
        }
    });
}

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
        }
    });

    if (currentSection) {
        setActiveLink(headerLinks, currentSection);
    }
});
const scrollBtn = document.getElementById("top");
const heroSection = document.getElementById("hero");

window.addEventListener("scroll", () => {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    if (window.scrollY > heroBottom) {
    scrollBtn.classList.add("show");
    } else {
    scrollBtn.classList.remove("show");
    }
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
    top: 0,
    behavior: "smooth"
    });
});
const body = document.body
const themeToggle = document.getElementById("themeToggle")
const themeIcon = themeToggle.querySelector("i")

const currentTheme = localStorage.getItem("theme")
if(currentTheme === 'light'){
    body.classList.add('light')
    themeIcon.classList.replace('fa-sun', 'fa-moon')
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme')
    if(body.classList.contains('dark-theme')){
        themeIcon.classList.replace('fa-sun', 'fa-moon')
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun')
        localStorage.setItem('theme','dark')
    }
})

// اختار كل العناصر اللي ليها أي class من دول
const elements = document.querySelectorAll('.zoom, .bounce-top, .fade-in, .fade-in-left, .fade-in-right');

// اعمل الـ Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view'); // يضيف الكلاس لما يبان
        }
    });
}, {
    threshold: 0.1 // يعني يظهر 10% من العنصر عالأقل
});

// اربط الـ Observer بكل عنصر
elements.forEach((el) => observer.observe(el));

const scroller = document.querySelector(".scroller")
const height = document.documentElement.scrollHeight - document.documentElement.clientHeight

window.addEventListener("scroll", () => {
    let scrollTop = document.documentElement.scrollTop
    scroller.style.width = `${(scrollTop / height) * 100}%`
})