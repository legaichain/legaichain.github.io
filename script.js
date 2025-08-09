// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Language switching functionality
const translations = {
    pl: {
        'nav-home': 'HOME',
        'nav-about': 'O NAS',
        'nav-team': 'ZESPÓŁ',
        'nav-areas': 'OBSZARY',
        'nav-contact': 'KONTAKT',
        'hero-title': 'Witamy w Legaicha.in',
        'hero-subtitle': 'Profesjonalne usługi prawne na najwyższym poziomie',
        'hero-cta': 'Skontaktuj się z nami',
        'about-title': 'O nas',
        'about-text': 'Nasza firma świadczy kompleksowe usługi prawne z wieloletnim doświadczeniem w branży.',
        'team-title': 'Nasz zespół',
        'areas-title': 'Obszary działalności',
        'area1-title': 'Prawo cywilne',
        'area1-desc': 'Opis obszaru działalności',
        'area2-title': 'Prawo gospodarcze',
        'area2-desc': 'Opis obszaru działalności',
        'area3-title': 'Prawo karne',
        'area3-desc': 'Opis obszaru działalności',
        'contact-title': 'Kontakt'
    },
    en: {
        'nav-home': 'HOME',
        'nav-about': 'ABOUT US',
        'nav-team': 'TEAM',
        'nav-areas': 'AREAS',
        'nav-contact': 'CONTACT',
        'hero-title': 'Welcome to Legaicha.in',
        'hero-subtitle': 'Professional legal services at the highest level',
        'hero-cta': 'Contact us',
        'about-title': 'About us',
        'about-text': 'Our company provides comprehensive legal services with years of experience in the industry.',
        'team-title': 'Our team',
        'areas-title': 'Areas of practice',
        'area1-title': 'Civil law',
        'area1-desc': 'Description of practice area',
        'area2-title': 'Business law',
        'area2-desc': 'Description of practice area',
        'area3-title': 'Criminal law',
        'area3-desc': 'Description of practice area',
        'contact-title': 'Contact'
    },
    ru: {
        'nav-home': 'ГЛАВНАЯ',
        'nav-about': 'О НАС',
        'nav-team': 'КОМАНДА',
        'nav-areas': 'ОБЛАСТИ',
        'nav-contact': 'КОНТАКТЫ',
        'hero-title': 'Добро пожаловать в Legaicha.in',
        'hero-subtitle': 'Профессиональные юридические услуги на высшем уровне',
        'hero-cta': 'Свяжитесь с нами',
        'about-title': 'О нас',
        'about-text': 'Наша компания предоставляет комплексные юридические услуги с многолетним опытом работы в отрасли.',
        'team-title': 'Наша команда',
        'areas-title': 'Области практики',
        'area1-title': 'Гражданское право',
        'area1-desc': 'Описание области практики',
        'area2-title': 'Хозяйственное право',
        'area2-desc': 'Описание области практики',
        'area3-title': 'Уголовное право',
        'area3-desc': 'Описание области практики',
        'contact-title': 'Контакты'
    }
};

let currentLanguage = 'pl';

// Language button functionality
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        switchLanguage(lang);
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

function switchLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// CTA button functionality
document.querySelector('.cta-button').addEventListener('click', () => {
    const contactSection = document.querySelector('#contact');
    const offsetTop = contactSection.offsetTop - 70;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
});

// Navbar background opacity on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.7)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.5)';
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    switchLanguage(currentLanguage);
});