// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', (e) => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Handle navigation to sections
    const href = n.getAttribute('href');
    if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Use scrollIntoView with scroll-margin-top for proper navbar offset
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}));

// Handle logo navigation
document.querySelector('.logo-link').addEventListener('click', (e) => {
    e.preventDefault();
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.scrollIntoView({
            behavior: 'smooth'
        });
    }
});

// Handle CTA button navigation
document.querySelector('.cta-button').addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth'
        });
    }
});

// Language switching functionality
const translations = {
    pl: {
        'nav-home': 'HOME',
        'nav-about': 'O NAS',
        'nav-team': 'TEAM',
        'nav-areas': 'SPECJALIZACJE',
        'nav-contact': 'KONTAKT',
        'hero-title': 'Witamy w Legaicha.in',
        'hero-subtitle': 'We translate code into compliance.',
        'hero-cta': 'Skontaktuj się z nami',
        'about-title': 'O nas',
        'about-full-text': 'W Legaichain wierzymy, że prawo powinno nadążać za tempem technologii, którą reguluje. Dlatego od początku budujemy kancelarię, która biegle posługuje się kodem, rozumie rynek i mówi językiem Founderów, CTO i Compliance Officerów.\n\nNie jesteśmy kolejną kancelarią, która skupia się na tworzeniu samych procedur i opinii prawnych. Pracujemy ramię w ramię z zespołami produktowymi, analitykami, inwestorami i specjalistami od cyberbezpieczeństwa. Wdrażamy zgodność regulacyjną tam, gdzie technologia rewolucjonizuje zasady gry - od rozproszonych środowisk DevSecOps i zaawansowanych platform AI/ML, po skomplikowane, stokenizowane modele biznesowe. Nasze podejście opiera się na legal design, a cała struktura pracy jest zorientowana na zadania i dokumentację, która aktywnie funkcjonuje w narzędziach takich jak Jira, Notion czy Figma.\n\nNasze doświadczenie obejmuje współpracę zarówno z innowacyjnymi startupami, jak i z dużymi międzynarodowymi grupami kapitałowymi, funduszami inwestycyjnymi, software house\'ami oraz spółkami infrastrukturalnymi o strategicznym znaczeniu. Pomagamy zespołom w implementacji zgodności z kluczowymi regulacjami, takimi jak AI Act, RODO, DORA, NIS2, MiCA i AML, tworząc rozwiązania, które są nie tylko zgodne z prawem, ale przede wszystkim odpowiadają praktycznym potrzebom i są idealnie dopasowane do realiów operacyjnych każdej organizacji.\n\nRozumiemy złożone wyzwania sektora technologicznego - ale także te, które dotyczą instytucji o strategicznym znaczeniu i zespołów pracujących w ramach skomplikowanych struktur. Posiadamy unikalne doświadczenie w pracy prawnika na styku prawa, technologii oraz podejmowania realnych decyzji biznesowych.\n\nNie komplikujemy. Nie teoretyzujemy.\n\nProjektujemy rozwiązania prawne, które można wdrożyć w praktyce.',
        'team-title': 'Nasz zespół',
        'areas-title': 'Obszary działalności',
        'area1-title': 'Prawo cywilne',
        'area1-desc': 'Opis obszaru działalności',
        'area2-title': 'Prawo gospodarcze',
        'area2-desc': 'Opis obszaru działalności',
        'area3-title': 'Prawo karne',
        'area3-desc': 'Opis obszaru działalności',
        'contact-title': 'Kontakt',
        'form-name': 'Imię i nazwisko',
        'form-email': 'Email',
        'form-message': 'Wiadomość',
        'form-submit': 'Wyślij wiadomość',
        'ania-heading': 'ANIA',
        'ania-text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\nTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\n\nNulla facilisi. Curabitur lacinia pulvinar nibh. Aliquam porttitor, nulla quis luctus finibus, risus nibh porta nisi, nec commodo arcu tortor id nunc. Proin quis neque lacinia, euismod dui a, aliquet nisi.',
        'ola-heading': 'OLA',
        'ola-text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\nTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\n\nNulla facilisi. Curabitur lacinia pulvinar nibh. Aliquam porttitor, nulla quis luctus finibus, risus nibh porta nisi, nec commodo arcu tortor id nunc. Proin quis neque lacinia, euismod dui a, aliquet nisi.'
    },
    en: {
        'nav-home': 'HOME',
        'nav-about': 'ABOUT US',
        'nav-team': 'TEAM',
        'nav-areas': 'AREAS',
        'nav-contact': 'CONTACT',
        'hero-title': 'Welcome to Legaicha.in',
        'hero-subtitle': 'We translate code into compliance.',
        'hero-cta': 'Contact us',
        'about-title': 'About us',
        'about-full-text': 'At Legaichain, we believe that law should be as agile as the technology it regulates. That\'s why we\'ve been building a law firm from the ground up that understands code, knows the market, and speaks the language of Founders, CTOs, and Compliance Officers.\n\nWe\'re not a law firm that just provides opinions – we work hand in hand with product teams, analysts, investors, and cybersecurity specialists. We implement compliance where technology changes the rules of the game – from distributed DevSecOps environments, through AI/ML platforms, to tokenized business models. We operate based on legal design, task structure, and documentation that actually lives in tools like Jira, Notion, or Figma.\n\nOur experience spans both innovative startups and international capital groups, investment funds, software houses, and infrastructure and technology companies. We help teams implement compliance with regulations such as AI Act, GDPR, DORA, NIS2, MiCA, and AML – in a way that is usable, scalable, and adequate to the realities of organizational operations.\n\nWe understand the challenges facing the technology sector – but also those facing institutions, companies of strategic importance, and teams composed of multiple partners. We have experience working at the intersection of law, technology, and real operational decisions.\n\nWe don\'t complicate. We don\'t theorize.\n\nWe design solutions that can actually be implemented.',
        'team-title': 'Our team',
        'areas-title': 'Areas of practice',
        'area1-title': 'Civil law',
        'area1-desc': 'Description of practice area',
        'area2-title': 'Business law',
        'area2-desc': 'Description of practice area',
        'area3-title': 'Criminal law',
        'area3-desc': 'Description of practice area',
        'contact-title': 'Contact',
        'form-name': 'Full name',
        'form-email': 'Email',
        'form-message': 'Message',
        'form-submit': 'Send message',
        'ania-heading': 'ANIA',
        'ania-text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\nTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\n\nNulla facilisi. Curabitur lacinia pulvinar nibh. Aliquam porttitor, nulla quis luctus finibus, risus nibh porta nisi, nec commodo arcu tortor id nunc. Proin quis neque lacinia, euismod dui a, aliquet nisi.',
        'ola-heading': 'OLA',
        'ola-text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\nTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\n\nNulla facilisi. Curabitur lacinia pulvinar nibh. Aliquam porttitor, nulla quis luctus finibus, risus nibh porta nisi, nec commodo arcu tortor id nunc. Proin quis neque lacinia, euismod dui a, aliquet nisi.'
    },
    ru: {
        'nav-home': 'ГЛАВНАЯ',
        'nav-about': 'О НАС',
        'nav-team': 'КОМАНДА',
        'nav-areas': 'ОБЛАСТИ',
        'nav-contact': 'КОНТАКТЫ',
        'hero-title': 'Добро пожаловать в Legaicha.in',
        'hero-subtitle': 'We translate code into compliance.',
        'hero-cta': 'Свяжитесь с нами',
        'about-title': 'О нас',
        'about-full-text': 'В Legaichain мы верим, что право должно быть таким же гибким, как технология, которую оно регулирует. Поэтому мы с самого начала строим юридическую фирму, которая понимает код, знает рынок и говорит на языке Основателей, CTO и Compliance-офицеров.\n\nМы не юридическая фирма, которая только дает заключения – мы работаем рука об руку с продуктовыми командами, аналитиками, инвесторами и специалистами по кибербезопасности. Мы внедряем соответствие там, где технология меняет правила игры – от распределенных DevSecOps-сред до платформ AI/ML и токенизированных бизнес-моделей. Мы работаем на основе legal design, задачной структуры и документации, которая действительно живет в таких инструментах, как Jira, Notion или Figma.\n\nНаш опыт охватывает как инновационные стартапы, так и международные капитальные группы, инвестиционные фонды, software house и инфраструктурные и технологические компании. Мы помогаем командам внедрять соответствие с такими регулированиями, как AI Act, GDPR, DORA, NIS2, MiCA и AML – способом, который является используемым, масштабируемым и адекватным реалиям деятельности организации.\n\nМы понимаем вызовы, с которыми сталкивается технологический сектор – но также те, которые стоят перед институтами, компаниями стратегического значения и командами, состоящими из множества партнеров. У нас есть опыт работы на стыке права, технологий и реальных операционных решений.\n\nМы не усложняем. Мы не теоретизируем.\n\nМы проектируем решения, которые действительно можно внедрить.',
        'team-title': 'Наша команда',
        'areas-title': 'Области практики',
        'area1-title': 'Гражданское право',
        'area1-desc': 'Описание области практики',
        'area2-title': 'Хозяйственное право',
        'area2-desc': 'Описание области практики',
        'area3-title': 'Уголовное право',
        'area3-desc': 'Описание области практики',
        'contact-title': 'Контакты',
        'form-name': 'Имя и фамилия',
        'form-email': 'Email',
        'form-message': 'Сообщение',
        'form-submit': 'Отправить сообщение',
        'ania-heading': 'АНЯ',
        'ania-text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\nTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\n\nNulla facilisi. Curabitur lacinia pulvinar nibh. Aliquam porttitor, nulla quis luctus finibus, risus nibh porta nisi, nec commodo arcu tortor id nunc. Proin quis neque lacinia, euismod dui a, aliquet nisi.',
        'ola-heading': 'ОЛЯ',
        'ola-text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\nTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\n\nNulla facilisi. Curabitur lacinia pulvinar nibh. Aliquam porttitor, nulla quis luctus finibus, risus nibh porta nisi, nec commodo arcu tortor id nunc. Proin quis neque lacinia, euismod dui a, aliquet nisi.'
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

// Mobile language functionality
document.addEventListener('click', (e) => {
    // Check if click is on mobile menu flags
    if (window.innerWidth <= 768 && e.target.closest('.nav-menu')) {
        const navMenu = e.target.closest('.nav-menu');
        const rect = navMenu.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        
        // Check if click is in the flags area (after separator line)
        if (clickY > rect.height * 0.8) { // Approximate position of flags
            const flagArea = e.target.textContent;
            let lang = 'pl'; // default
            
            if (flagArea.includes('🇬🇧')) lang = 'en';
            else if (flagArea.includes('🇷🇺')) lang = 'ru';
            
            switchLanguage(lang);
            
            // Update active button in desktop
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            document.querySelector(`.lang-btn[data-lang="${lang}"]`)?.classList.add('active');
            
            // Close mobile menu after language selection
            const hamburger = document.querySelector('.hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

function switchLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            // Special handling for about-full-text, ania-text, and ola-text with paragraphs
            if (key === 'about-full-text' || key === 'ania-text' || key === 'ola-text') {
                const text = translations[lang][key];
                const paragraphs = text.split('\n\n');
                element.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update active state for both desktop and mobile language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    document.querySelectorAll('.lang-btn-mobile').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
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

// About text scroll animation
function updateAboutTextAnimation() {
    const aboutSection = document.getElementById('about');
    const aboutTextContainer = document.querySelector('.about-text-container');
    
    if (!aboutSection || !aboutTextContainer) return;
    
    const sectionTop = aboutSection.offsetTop;
    const sectionBottom = sectionTop + aboutSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight * 0.6; // Trigger when 60% of viewport reaches section
    
    if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        aboutTextContainer.classList.add('visible');
    } else {
        aboutTextContainer.classList.remove('visible');
    }
}

function updateSectionTitleAnimations() {
    const sections = ['about', 'team', 'areas', 'contact'];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const heading = section.querySelector('.about-heading, .team-heading, .areas-heading, .contact-heading');
        if (!heading) return;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight * 0.6;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            heading.classList.add('visible');
        } else {
            heading.classList.remove('visible');
        }
    });
}

// Navbar background opacity on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.7)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.5)';
    }
    
    // Update about text animation
    updateAboutTextAnimation();
    updateSectionTitleAnimations(); // Update section title animations on scroll
});

// Background floating icons animation
class FloatingIcon {
    constructor(element, speed = 1) {
        this.element = element;
        this.speed = speed;
        this.isLarge = element.classList.contains('large-icon');
        this.size = this.isLarge ? 120 : 60;
        
        this.x = Math.random() * (window.innerWidth - this.size);
        this.y = Math.random() * (window.innerHeight - this.size);
        this.dx = (Math.random() - 0.5) * 1.5 * this.speed;
        this.dy = (Math.random() - 0.5) * 1.5 * this.speed;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 4; // Random rotation speed
        
        // Set initial position and rotation
        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    }
    
    update() {
        // Update position
        this.x += this.dx;
        this.y += this.dy;
        
        // Update rotation
        this.rotation += this.rotationSpeed;
        
        // Bounce off edges exactly at screen boundaries
        if (this.x <= 0 || this.x >= window.innerWidth - this.size) {
            this.dx = -this.dx;
            this.x = Math.max(0, Math.min(window.innerWidth - this.size, this.x));
        }
        
        if (this.y <= 0 || this.y >= window.innerHeight - this.size) {
            this.dy = -this.dy;
            this.y = Math.max(0, Math.min(window.innerHeight - this.size, this.y));
        }
        
        // Apply position and rotation
        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    }
}

// Initialize floating icons
let floatingIcons = [];

function initFloatingIcons() {
    const icons = document.querySelectorAll('.floating-icon');
    floatingIcons = [];
    
    icons.forEach((icon, index) => {
        const speed = (0.8 + (index * 0.2)) * 1; // Normal speed, 8 icons with varied speeds
        floatingIcons.push(new FloatingIcon(icon, speed));
    });
}

function animateFloatingIcons() {
    floatingIcons.forEach(icon => icon.update());
    requestAnimationFrame(animateFloatingIcons);
}

// Handle window resize
window.addEventListener('resize', () => {
    initFloatingIcons();
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    switchLanguage(currentLanguage);
    
    // Initialize about text animation
    updateAboutTextAnimation();
    
    // Initialize section title animations
    updateSectionTitleAnimations();
    
    // Show first section title immediately
    const firstHeading = document.querySelector('.about-heading');
    if (firstHeading) {
        firstHeading.classList.add('visible');
    }
    
    // Initialize and start floating icons animation
    initFloatingIcons();
    animateFloatingIcons();
});