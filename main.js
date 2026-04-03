/* ========================================
   GioStudio — Production-Ready JavaScript
   GSAP + Three.js + Lenis | 60fps Optimized
   ======================================== */

const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
let scrollVelocity = 0;
const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

// ---- SMOOTH SCROLL (Native) ----
document.documentElement.style.scrollBehavior = 'smooth';

gsap.registerPlugin(ScrollTrigger);

// Refresh ScrollTrigger after everything loads
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
  // Hide loader after 1.5s
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.style.display = 'none', 500);
    }
  }, 1500);
});

// ---- MOUSE TRACKING ----
document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
});

// ========================================
// MULTILINGUAL SYSTEM (EN / KA / RU)
// ========================================
const translations = {
  en: {
    hero_eyebrow: "Full-Stack Web Developer — Kutaisi, Georgia — Available Worldwide",
    hero_subtitle: 'Building <strong>Scalable Web Applications</strong>, <strong>Custom SaaS Platforms</strong>, and <strong>High-Performance Software</strong> for clients worldwide.',
    hero_stat1_num: "50+", hero_stat1_label: "Projects",
    hero_stat2_num: "3yr", hero_stat2_label: "Experience",
    hero_stat3_num: "48h", hero_stat3_label: "Fast Launch",
    hero_stat4_num: "100%", hero_stat4_label: "Direct Access",
    nav_services: "Services", nav_projects: "Projects", nav_experience: "Experience", nav_faq: "FAQ", nav_contact: "Contact",
    services_eyebrow: "Core Services", services_title: "Engineering-Grade Development",
    services_desc: 'From <strong>Scalable Web Applications</strong> to <strong>High-Performance Backend Systems</strong>, I bridge the gap between design and enterprise-ready code.',
    s1_title: "Scalable Web Applications", s1_desc: 'Building <strong>React</strong> and <strong>Next.js</strong> applications optimized for <strong>Server-Side Rendering (SSR)</strong>, <strong>Technical SEO</strong>, and lightning-fast load times. I deliver <strong>Responsive Design</strong> that performs flawlessly across all devices.',
    s2_title: "High-Performance Backend Systems", s2_desc: 'Architecting robust <strong>Node.js</strong> and <strong>Java</strong> backends. I specialize in <strong>API Integration</strong>, <strong>PostgreSQL</strong> database design, and handling complex logic with enterprise-grade security and efficiency.',
    s3_title: "Custom SaaS & Dashboard Development", s3_desc: 'Full-stack platforms like <strong>GEO Cloud</strong> featuring <strong>user management</strong>, <strong>real-time monitoring</strong>, <strong>Stripe billing</strong>, and complex data visualization. From concept to production deployment.',
    s4_title: "Technical SEO & UI Optimization", s4_desc: 'I bridge the gap between beautiful design and <strong>Google-ready code</strong>. Every project includes <strong>Core Web Vitals</strong> optimization, semantic HTML structure, and schema markup for maximum search visibility.',
    s5_title: "Java & Plugin Development", s5_desc: 'Custom <strong>Java</strong> applications and <strong>Spigot</strong> plugins. From high-concurrency server systems to specialized backend tools, I build optimized solutions.',
    s6_title: "Maintenance & Support", s6_desc: 'Ongoing support for plugins, servers, and web applications. <strong>Performance monitoring</strong>, security patches, and feature additions to keep your infrastructure running smoothly.',
    transition_what: "What I Do", transition_work: "Selected Work", transition_journey: "My Journey", transition_questions: "Questions", transition_talk: "Let's Talk",
    projects_eyebrow: "Portfolio", projects_title: "Projects", projects_desc: "Real projects, real results. Every one built from scratch with clean code and modern tech.",
    experience_eyebrow: "Experience", experience_title: "My Journey", experience_desc: "From self-taught developer to building full-stack applications for clients worldwide.",
    faq_eyebrow: "FAQ", faq_title: "Frequently Asked Questions",
    contact_subtitle: "Ready to build something great?", contact_form_title: "Or fill out the form below",
    footer_tagline: "Full-Stack Web Development — Kutaisi, Georgia", footer_copy: "© 2026 GioDev — All Rights Reserved"
  },
  ka: {
    hero_eyebrow: "Full-Stack ვებ დეველოპერი — ქუთაისი, საქართველო — მთელს მსოფლიოში",
    hero_subtitle: 'ქმნის <strong>მასშტაბირებად ვებ აპლიკაციებს</strong>, <strong>Custom SaaS პლატფორმებს</strong> და <strong>მაღალი წარმადობის პროგრამულ უზრუნველყოფას</strong> მსოფლიო მასშტაბით.',
    hero_stat1_num: "50+", hero_stat1_label: "პროექტი",
    hero_stat2_num: "3წლ", hero_stat2_label: "გამოცდილება",
    hero_stat3_num: "48სთ", hero_stat3_label: "სწრაფი გაშვება",
    hero_stat4_num: "100%", hero_stat4_label: "პირდაპირი კონტაქტი",
    nav_services: "სერვისები", nav_projects: "პროექტები", nav_experience: "გამოცდილება", nav_faq: "FAQ", nav_contact: "კონტაქტი",
    services_eyebrow: "ძირითადი სერვისები", services_title: "საინჟინრო დონის დეველოპმენტი",
    services_desc: '<strong>მასშტაბირებადი ვებ აპლიკაციებიდან</strong> <strong>მაღალი წარმადობის Backend სისტემებამდე</strong> — ვქმნი დიზაინსა და enterprise დონის კოდს შორის ხიდს.',
    s1_title: "მასშტაბირებადი ვებ აპლიკაციები", s1_desc: '<strong>React</strong> და <strong>Next.js</strong> აპლიკაციები ოპტიმიზირებული <strong>SSR</strong>-ით, <strong>ტექნიკური SEO</strong>-ით და ელვისებური ჩატვირთვით. <strong>რესპონსიული დიზაინი</strong> ყველა მოწყობილობისთვის.',
    s2_title: "მაღალი წარმადობის Backend სისტემები", s2_desc: 'მყარი <strong>Node.js</strong> და <strong>Java</strong> backends. სპეციალიზაცია: <strong>API ინტეგრაცია</strong>, <strong>PostgreSQL</strong> მონაცემთა ბაზის დიზაინი და enterprise დონის უსაფრთხოება.',
    s3_title: "Custom SaaS და Dashboard დეველოპმენტი", s3_desc: 'სრული სტექის პლატფორმები როგორიცაა <strong>GEO Cloud</strong> — <strong>მომხმარებლის მართვა</strong>, <strong>რეალური დროის მონიტორინგი</strong>, <strong>Stripe ბილინგი</strong> და მონაცემთა ვიზუალიზაცია.',
    s4_title: "ტექნიკური SEO და UI ოპტიმიზაცია", s4_desc: 'ლამაზ დიზაინსა და <strong>Google-ready კოდს</strong> შორის ხიდი. ყველა პროექტი მოიცავს <strong>Core Web Vitals</strong> ოპტიმიზაციას, სემანტიკურ HTML-ს და schema markup-ს.',
    s5_title: "Java და პლაგინ დეველოპმენტი", s5_desc: 'Custom <strong>Java</strong> აპლიკაციები და <strong>Spigot</strong> პლაგინები. მაღალი კონკურენტული სერვერული სისტემებიდან სპეციალიზებულ backend ინსტრუმენტებამდე.',
    s6_title: "მხარდაჭერა და მომსახურება", s6_desc: 'უწყვეტი მხარდაჭერა პლაგინების, სერვერებისა და ვებ აპლიკაციებისთვის. <strong>წარმადობის მონიტორინგი</strong>, უსაფრთხოების განახლებები და ახალი ფუნქციები.',
    transition_what: "რას ვაკეთებ", transition_work: "რჩეული ნამუშევრები", transition_journey: "ჩემი გზა", transition_questions: "კითხვები", transition_talk: "დაგვიკავშირდით",
    projects_eyebrow: "პორტფოლიო", projects_title: "პროექტები", projects_desc: "რეალური პროექტები, რეალური შედეგები. ყველა აგებულია ნულიდან სუფთა კოდით და თანამედროვე ტექნოლოგიებით.",
    experience_eyebrow: "გამოცდილება", experience_title: "ჩემი გზა", experience_desc: "თვითნასწავლი დეველოპერიდან full-stack აპლიკაციების შემქმნელამდე მსოფლიო მასშტაბის კლიენტებისთვის.",
    faq_eyebrow: "FAQ", faq_title: "ხშირად დასმული კითხვები",
    contact_subtitle: "მზად ხარ რაღაც დიდებულის შესაქმნელად?", contact_form_title: "ან შეავსეთ ფორმა ქვემოთ",
    footer_tagline: "Full-Stack ვებ დეველოპმენტი — ქუთაისი, საქართველო", footer_copy: "© 2026 GioDev — ყველა უფლება დაცულია"
  },
  ru: {
    hero_eyebrow: "Full-Stack Веб-разработчик — Кутаиси, Грузия — Доступен по всему миру",
    hero_subtitle: 'Создаю <strong>масштабируемые веб-приложения</strong>, <strong>индивидуальные SaaS-платформы</strong> и <strong>высокопроизводительное ПО</strong> для клиентов по всему миру.',
    hero_stat1_num: "50+", hero_stat1_label: "Проектов",
    hero_stat2_num: "3г", hero_stat2_label: "Опыта",
    hero_stat3_num: "48ч", hero_stat3_label: "Быстрый запуск",
    hero_stat4_num: "100%", hero_stat4_label: "Прямой контакт",
    nav_services: "Услуги", nav_projects: "Проекты", nav_experience: "Опыт", nav_faq: "FAQ", nav_contact: "Контакт",
    services_eyebrow: "Основные услуги", services_title: "Разработка инженерного уровня",
    services_desc: 'От <strong>масштабируемых веб-приложений</strong> до <strong>высокопроизводительных Backend-систем</strong> — я соединяю дизайн и enterprise-код.',
    s1_title: "Масштабируемые веб-приложения", s1_desc: 'Приложения на <strong>React</strong> и <strong>Next.js</strong>, оптимизированные для <strong>SSR</strong>, <strong>технического SEO</strong> и молниеносной загрузки. <strong>Адаптивный дизайн</strong> для всех устройств.',
    s2_title: "Высокопроизводительные Backend-системы", s2_desc: 'Надёжные бэкенды на <strong>Node.js</strong> и <strong>Java</strong>. Специализация: <strong>API-интеграция</strong>, проектирование <strong>PostgreSQL</strong> и enterprise-безопасность.',
    s3_title: "Разработка SaaS и дашбордов", s3_desc: 'Full-stack платформы как <strong>GEO Cloud</strong> с <strong>управлением пользователями</strong>, <strong>мониторингом в реальном времени</strong>, <strong>Stripe-биллингом</strong> и визуализацией данных.',
    s4_title: "Техническое SEO и UI-оптимизация", s4_desc: 'Мост между красивым дизайном и <strong>Google-ready кодом</strong>. Каждый проект включает оптимизацию <strong>Core Web Vitals</strong>, семантический HTML и schema markup.',
    s5_title: "Java и разработка плагинов", s5_desc: 'Индивидуальные приложения на <strong>Java</strong> и плагины <strong>Spigot</strong>. От высоконагруженных серверных систем до специализированных backend-инструментов.',
    s6_title: "Поддержка и обслуживание", s6_desc: 'Постоянная поддержка плагинов, серверов и веб-приложений. <strong>Мониторинг производительности</strong>, патчи безопасности и новые функции.',
    transition_what: "Что я делаю", transition_work: "Избранные работы", transition_journey: "Мой путь", transition_questions: "Вопросы", transition_talk: "Свяжитесь со мной",
    projects_eyebrow: "Портфолио", projects_title: "Проекты", projects_desc: "Реальные проекты, реальные результаты. Каждый создан с нуля на чистом коде и современных технологиях.",
    experience_eyebrow: "Опыт", experience_title: "Мой путь", experience_desc: "От самоучки до разработчика full-stack приложений для клиентов по всему миру.",
    faq_eyebrow: "FAQ", faq_title: "Часто задаваемые вопросы",
    contact_subtitle: "Готовы создать что-то великое?", contact_form_title: "Или заполните форму ниже",
    footer_tagline: "Full-Stack Веб-разработка — Кутаиси, Грузия", footer_copy: "© 2026 GioDev — Все права защищены"
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  const t = translations[lang];

  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  // Update specific elements by ID/class
  const heroEyebrow = document.querySelector('.hero-eyebrow');
  if (heroEyebrow) heroEyebrow.textContent = t.hero_eyebrow;

  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) heroSubtitle.innerHTML = t.hero_subtitle;

  // Update stat labels
  const statLabels = document.querySelectorAll('.hero-stat-label');
  if (statLabels[0]) statLabels[0].textContent = t.hero_stat1_label;
  if (statLabels[1]) statLabels[1].textContent = t.hero_stat2_label;
  if (statLabels[2]) statLabels[2].textContent = t.hero_stat3_label;
  if (statLabels[3]) statLabels[3].textContent = t.hero_stat4_label;

  // Update section headers
  const sectionEyebrows = document.querySelectorAll('.section-eyebrow');
  const sectionTitles = document.querySelectorAll('.section-title');
  const sectionDescs = document.querySelectorAll('.section-desc');

  // Services section
  if (sectionEyebrows[0]) sectionEyebrows[0].textContent = t.services_eyebrow;
  if (sectionTitles[0]) sectionTitles[0].textContent = t.services_title;
  if (sectionDescs[0]) sectionDescs[0].innerHTML = t.services_desc;

  // Footer
  const footerTagline = document.querySelector('.footer-tagline');
  if (footerTagline) footerTagline.textContent = t.footer_tagline;
  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) footerCopy.textContent = t.footer_copy;

  // Update lang links active state
  document.querySelectorAll('.lang-link').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('data-lang') === lang);
    link.removeAttribute('aria-current');
    if (link.getAttribute('data-lang') === lang) link.setAttribute('aria-current', 'true');
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang === 'en' ? 'en' : lang === 'ka' ? 'ka' : 'ru';

  // Save preference
  localStorage.setItem('giodev-lang', lang);
}

// Language switcher
document.querySelectorAll('.lang-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const lang = link.getAttribute('data-lang');
    setLanguage(lang);
  });
});

// Load saved language preference
const savedLang = localStorage.getItem('giodev-lang');
if (savedLang && translations[savedLang]) {
  setLanguage(savedLang);
}

// ========================================
// TOP NAV
// ========================================
(function initNav() {
  const nav = document.querySelector('.top-nav');
  if (!nav) return;

  let lastNavScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    if (scroll > lastNavScrollTop && scroll > 100) {
      nav.classList.add('nav-hidden');
      nav.classList.remove('nav-solid');
    } else {
      nav.classList.remove('nav-hidden');
      nav.classList.toggle('nav-solid', scroll > 50);
    }
    lastNavScrollTop = scroll;
  }, { passive: true });

  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isActive = toggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isActive);
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        mobileNav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();

// ---- SMOOTH SCROLL NAV ----
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========================================
// HERO SCENE — Epic Animated Shader Background
// ========================================
(function initHeroScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Lower DPR on mobile for performance
  renderer.setPixelRatio(isMobile ? 1 : 1);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050505);

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    varying vec2 vUv;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    float fbm(vec2 p) {
      float value = 0.0; float amplitude = 0.5; float frequency = 1.0;
      for (int i = 0; i < 6; i++) {
        value += amplitude * snoise(p * frequency);
        frequency *= 2.0; amplitude *= 0.5; p += vec2(1.7, 9.2);
      }
      return value;
    }

    void main() {
      vec2 uv = vUv;
      vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
      vec2 p = (uv - 0.5) * aspect;
      float t = uTime * 0.08;

      vec2 q = vec2(0.0);
      q.x = fbm(p + vec2(0.0, 0.0) + t * 0.5);
      q.y = fbm(p + vec2(5.2, 1.3) + t * 0.3);

      vec2 r = vec2(0.0);
      r.x = fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.2);
      r.y = fbm(p + 4.0 * q + vec2(8.3, 2.8) + t * 0.4);

      float f = fbm(p + 3.5 * r);
      vec2 mouseOffset = uMouse * 0.15;
      f += snoise(p * 2.0 + mouseOffset + t) * 0.1;

      vec3 color = mix(vec3(0.02, 0.02, 0.02), vec3(0.08, 0.08, 0.08), clamp(f * f * 3.0, 0.0, 1.0));
      float ridge = 1.0 - abs(f);
      ridge = pow(ridge, 4.0);
      color += vec3(0.7, 0.7, 0.75) * ridge * 0.5;

      float vignette = 1.0 - length(uv - 0.5) * 0.8;
      color *= vignette;

      float centerGlow = exp(-length(p) * 1.5) * (0.5 + 0.3 * sin(uTime * 0.3));
      color += vec3(0.5, 0.5, 0.55) * centerGlow * 0.15;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader, fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0, 0) },
    },
  });

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(plane);

  const particleCount = isMobile ? 150 : 300;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(particleCount * 3);
  const pSizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 4;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
    pPos[i * 3 + 2] = Math.random() * 2;
    pSizes[i] = Math.random() * 2 + 0.5;
  }

  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));

  const pCam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  pCam.position.z = 3;

  const pVS = `
    attribute float size;
    uniform float uTime;
    varying float vAlpha;
    void main() {
      vec3 pos = position;
      pos.y += sin(uTime * 0.3 + position.x * 3.0) * 0.1;
      pos.x += cos(uTime * 0.2 + position.y * 2.0) * 0.05;
      vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = size * (100.0 / -mvPos.z);
      gl_Position = projectionMatrix * mvPos;
      vAlpha = smoothstep(5.0, 1.0, -mvPos.z);
    }
  `;

  const pFS = `
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      if (d > 0.5) discard;
      float a = smoothstep(0.5, 0.0, d) * vAlpha * 0.3;
      gl_FragColor = vec4(0.8, 0.8, 0.85, a);
    }
  `;

  const pMat = new THREE.ShaderMaterial({
    vertexShader: pVS, fragmentShader: pFS,
    uniforms: { uTime: { value: 0 } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });

  const pts = new THREE.Points(pGeo, pMat);
  scene.add(pts);

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();
    material.uniforms.uTime.value = elapsed;
    material.uniforms.uMouse.value.set(mouse.tx, mouse.ty);
    pMat.uniforms.uTime.value = elapsed;
    renderer.render(scene, pCam);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    material.uniforms.uResolution.value.set(w, h);
    pCam.aspect = w / h;
    pCam.updateProjectionMatrix();
  });
})();

// ========================================
// HERO GSAP ANIMATIONS
// ========================================
(function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.8 });

  tl.to('.hero-eyebrow', { opacity: 1, duration: 0.8, ease: 'power2.out' })
    .to('.hero-letter', {
      opacity: 1, filter: 'blur(0px)', scale: 1, y: 0,
      duration: 1.2, stagger: 0.08, ease: 'power3.out',
    }, '-=0.4')
    .to('.hero-subtitle', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5')
    .to('.hero-buttons', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
    .to('.hero-stats', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.3')
    .to('.scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.2');
})();

// ========================================
// MARQUEE — Duplicate for seamless loop
// ========================================
(function initMarquee() {
  document.querySelectorAll('.marquee-track').forEach((track) => {
    const content = track.innerHTML;
    track.innerHTML = content + content;
  });
})();

// ========================================
// SECTION TRANSITIONS
// ========================================
(function initSectionTransitions() {
  document.querySelectorAll('.section-transition').forEach((transition) => {
    const lines = transition.querySelectorAll('.transition-line');
    const text = transition.querySelector('.transition-text');

    gsap.set(lines, { scaleX: 0 });
    gsap.set(text, { opacity: 0, y: 20 });

    gsap.to(lines, {
      scaleX: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: transition, start: 'top 85%', toggleActions: 'play none none none' },
    });
    gsap.to(text, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
      scrollTrigger: { trigger: transition, start: 'top 85%', toggleActions: 'play none none none' },
    });
  });
})();

// ========================================
// SERVICES — Background Particles
// ========================================
(function initServicesScene() {
  const canvas = document.getElementById('services-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;

  const count = 400;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 25;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const vs = `
    varying float vAlpha;
    void main() {
      vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = 2.0 * (100.0 / -mvPos.z);
      gl_Position = projectionMatrix * mvPos;
      vAlpha = smoothstep(15.0, 3.0, -mvPos.z);
    }
  `;

  const fs = `
    uniform vec3 uColor;
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      if (d > 0.5) discard;
      float a = smoothstep(0.5, 0.0, d) * vAlpha * 0.3;
      gl_FragColor = vec4(uColor, a);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader: vs, fragmentShader: fs,
    uniforms: { uColor: { value: new THREE.Color(0xe0e0e0) } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    points.rotation.y = clock.getElapsedTime() * 0.012;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

// ========================================
// CONTACT SCENE — Nebula Star Field
// ========================================
(function initContactScene() {
  const canvas = document.getElementById('contact-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;

  const count = 1000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const depths = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    sizes[i] = Math.random() * 4 + 1;
    depths[i] = positions[i * 3 + 2];
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('depth', new THREE.BufferAttribute(depths, 1));

  const vs = `
    attribute float size;
    attribute float depth;
    uniform float uTime;
    varying float vAlpha;
    varying float vDepth;
    void main() {
      vec3 pos = position;
      pos.x += sin(uTime * 0.1 + depth * 0.5) * 0.3;
      pos.y += cos(uTime * 0.08 + depth * 0.3) * 0.2;
      vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
      float dof = abs(depth);
      float blur = smoothstep(0.0, 10.0, dof);
      float finalSize = mix(size, size * 3.0, blur);
      gl_PointSize = finalSize * (150.0 / -mvPos.z);
      gl_Position = projectionMatrix * mvPos;
      vAlpha = smoothstep(20.0, 2.0, -mvPos.z) * (1.0 - blur * 0.5);
      vDepth = depth;
    }
  `;

  const fs = `
    uniform vec3 uColor;
    varying float vAlpha;
    varying float vDepth;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      if (d > 0.5) discard;
      float a = smoothstep(0.5, 0.0, d) * vAlpha;
      vec3 c = uColor + vec3(0.05, 0.05, 0.08) * sin(vDepth * 0.5);
      gl_FragColor = vec4(c, a * 0.5);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader: vs, fragmentShader: fs,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0xe0e0e0) } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });

  const stars = new THREE.Points(geometry, material);
  scene.add(stars);

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    material.uniforms.uTime.value = clock.getElapsedTime();
    stars.rotation.y = clock.getElapsedTime() * 0.01;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

// ========================================
// CONTACT — Particle Morph Text
// ========================================
(function initContactMorph() {
  const canvas = document.getElementById('contact-morph-canvas');
  if (!canvas) return;

  const dpr = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;

  const textCanvas = document.createElement('canvas');
  textCanvas.width = w; textCanvas.height = h;
  const tCtx = textCanvas.getContext('2d');
  tCtx.fillStyle = '#000'; tCtx.fillRect(0, 0, w, h);
  tCtx.fillStyle = '#fff';
  tCtx.font = `900 ${h * 0.7}px 'Playfair Display', serif`;
  tCtx.textAlign = 'center'; tCtx.textBaseline = 'middle';
  tCtx.fillText('GIOSTUDIO', w / 2, h / 2);

  const imageData = tCtx.getImageData(0, 0, w, h);
  const textPixels = [];
  const step = 4;

  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const i = (y * w + x) * 4;
      if (imageData.data[i] > 128) textPixels.push({ x, y });
    }
  }

  const particles = textPixels.map((p) => ({
    x: Math.random() * w, y: Math.random() * h,
    tx: p.x, ty: p.y,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 2,
  }));

  let startTime = null;
  let animated = false;

  ScrollTrigger.create({
    trigger: '.contact', start: 'top 60%',
    onEnter: () => { startTime = performance.now(); animated = true; },
    once: true,
  });

  function draw(now) {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, w, h);
    if (!animated) return;
    const elapsed = (now - startTime) / 1000;
    particles.forEach((p) => {
      const t = Math.max(0, Math.min(1, (elapsed - p.delay) / 2));
      const eased = 1 - Math.pow(1 - t, 3);
      ctx.fillStyle = `rgba(224, 224, 224, ${eased * 0.8})`;
      ctx.beginPath();
      ctx.arc(p.x + (p.tx - p.x) * eased, p.y + (p.ty - p.y) * eased, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  requestAnimationFrame(draw);
})();

// ========================================
// MAGNETIC BUTTONS
// ========================================
(function initMagneticButtons() {
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (e.clientX - rect.left - rect.width / 2) * 0.3,
        y: (e.clientY - rect.top - rect.height / 2) * 0.3,
        duration: 0.4, ease: 'power2.out',
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
    });
  });
})();

// ========================================
// PARALLAX EFFECTS
// ========================================
(function initParallax() {
  gsap.utils.toArray('.section-transition').forEach((t) => {
    gsap.to(t.querySelector('.transition-text'), {
      y: -20, ease: 'none',
      scrollTrigger: { trigger: t, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
  });

  gsap.to('.hero-content', {
    y: 80, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
  });
})();

// ========================================
// TEXT REVEAL ANIMATIONS
// ========================================
(function initTextReveals() {
  gsap.utils.toArray('.section-title').forEach((title) => {
    const text = title.textContent;
    title.innerHTML = '';
    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(100%) rotateX(-90deg)';
      title.appendChild(span);
    });

    gsap.to(title.children, {
      opacity: 1, y: 0, rotateX: 0,
      duration: 0.6, stagger: 0.03,
      ease: 'power3.out',
      scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none none' },
    });
  });

  gsap.set('.section-eyebrow', { y: 20, opacity: 0 });
  gsap.utils.toArray('.section-eyebrow').forEach((el) => {
    gsap.to(el, {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
    });
  });

  gsap.set('.section-desc', { y: 20, opacity: 0 });
  gsap.utils.toArray('.section-desc').forEach((el) => {
    gsap.to(el, {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
    });
  });
})();

// ========================================
// CARD HOVER GLOW FOLLOW
// ========================================
(function initCardGlow() {
  document.querySelectorAll('.service-card, .project-card, .timeline-content').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(224,224,224,0.04), rgba(17,17,17,0.6) 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
})();

// ========================================
// CONTACT FORM
// ========================================
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const service = data.get('service');
    const message = data.get('message');

    const mailtoLink = `mailto:giosemail0@gmail.com?subject=New Project Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoLink;
  });
})();

// ========================================
// FAQ ACCORDION
// ========================================
(function initFAQ() {
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('active'));
      document.querySelectorAll('.faq-question').forEach((q) => q.setAttribute('aria-expanded', 'false'));
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
(function initScrollReveals() {
  // Section headers — fade up (hide first)
  gsap.utils.toArray('.section-header').forEach((header) => {
    gsap.set(header.children, { y: 40, opacity: 0 });
    gsap.to(header.children, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' },
    });
  });

  // Service cards — staggered pop in (hide first)
  gsap.set('.service-card', { y: 60, opacity: 0, scale: 0.9, rotation: 3 });
  gsap.to('.service-card', {
    y: 0, opacity: 1, scale: 1, rotation: 0,
    duration: 0.7, stagger: { each: 0.1, from: 'random' },
    ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '.services-grid', start: 'top 80%', toggleActions: 'play none none none' },
  });

  // Project cards — slide up (hide first)
  gsap.set('.project-card', { y: 80, opacity: 0 });
  gsap.to('.project-card', {
    y: 0, opacity: 1,
    duration: 0.8, stagger: { each: 0.15, from: 'start' },
    ease: 'power3.out',
    scrollTrigger: { trigger: '.projects-grid', start: 'top 80%', toggleActions: 'play none none none' },
  });

  // Project images — zoom reveal (hide first)
  gsap.set('.project-image', { scale: 1.15, opacity: 0 });
  gsap.to('.project-image', {
    scale: 1, opacity: 1, duration: 1, stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.projects-grid', start: 'top 80%', toggleActions: 'play none none none' },
  });

  // Timeline items — slide from left (hide first)
  gsap.set('.timeline-item', { x: -60, opacity: 0 });
  gsap.to('.timeline-item', {
    x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.timeline', start: 'top 75%', toggleActions: 'play none none none' },
  });

  // Timeline dots — pop in
  gsap.set('.timeline-dot', { scale: 0 });
  gsap.to('.timeline-dot', {
    scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(2)',
    scrollTrigger: { trigger: '.timeline', start: 'top 75%', toggleActions: 'play none none none' },
  });

  // Tech tags — pop in randomly (hide first)
  gsap.set('.tech-tag', { y: 20, opacity: 0, scale: 0.7 });
  gsap.to('.tech-tag', {
    y: 0, opacity: 1, scale: 1,
    duration: 0.4, stagger: { each: 0.04, from: 'random' },
    ease: 'back.out(1.7)',
    scrollTrigger: { trigger: '.tech-tags', start: 'top 90%', toggleActions: 'play none none none' },
  });

  // FAQ items — slide in (hide first)
  gsap.set('.faq-item', { x: -30, opacity: 0 });
  gsap.to('.faq-item', {
    x: 0, opacity: 1, duration: 0.5, stagger: 0.06,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.faq-list', start: 'top 85%', toggleActions: 'play none none none' },
  });

  // Contact elements (hide first)
  gsap.set('.contact-subtitle', { y: 30, opacity: 0 });
  gsap.to('.contact-subtitle', {
    y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-subtitle', start: 'top 90%', toggleActions: 'play none none none' },
  });

  gsap.set('.contact-buttons', { y: 40, opacity: 0 });
  gsap.to('.contact-buttons', {
    y: 0, opacity: 1, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-buttons', start: 'top 90%', toggleActions: 'play none none none' },
  });

  gsap.set('.contact-form-wrap', { y: 50, opacity: 0, scale: 0.95 });
  gsap.to('.contact-form-wrap', {
    y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-form-wrap', start: 'top 85%', toggleActions: 'play none none none' },
  });

  gsap.set('.contact-info', { y: 30, opacity: 0 });
  gsap.to('.contact-info', {
    y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-info', start: 'top 90%', toggleActions: 'play none none none' },
  });

  // Hero stats (hide first)
  gsap.set('.hero-stat', { y: 30, opacity: 0, scale: 0.8 });
  gsap.to('.hero-stat', {
    y: 0, opacity: 1, scale: 1,
    duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)',
    scrollTrigger: { trigger: '.hero-stats', start: 'top 90%', toggleActions: 'play none none none' },
  });

  // Marquee — fade in (hide first)
  gsap.set('.marquee-section', { opacity: 0, y: 20 });
  gsap.to('.marquee-section', {
    opacity: 1, y: 0, duration: 0.8,
    scrollTrigger: { trigger: '.marquee-section', start: 'top 90%', toggleActions: 'play none none none' },
  });

  // Footer (hide first)
  gsap.set('.footer > *', { y: 30, opacity: 0 });
  gsap.to('.footer > *', {
    y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.footer', start: 'top 90%', toggleActions: 'play none none none' },
  });
})();

// ========================================
// RESIZE
// ========================================
window.addEventListener('resize', () => { ScrollTrigger.refresh(); });
