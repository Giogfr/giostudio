/* ========================================
   GioStudio — Production-Ready JavaScript
   GSAP + Three.js + Lenis | 60fps Optimized
   ======================================== */

const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
let scrollVelocity = 0;
// Robust touch detection for iOS/Android tablets and phones
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.innerWidth < 1024;
const isMobile = isTouchDevice;

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
    nav_home: "Home", nav_services: "Services", nav_projects: "Projects", nav_architecture: "Architecture", nav_experience: "Experience", nav_faq: "FAQ", nav_contact: "Contact",
    hero_eyebrow: "Full-Stack Web Developer & SaaS Architect — Kutaisi, Georgia — Available Worldwide",
    hero_subtitle: 'Building <strong>High-Performance Web Ecosystems</strong> & <strong>Scalable SaaS Infrastructure</strong> with Next.js, React, and Node.js.',
    hero_btn_projects: "View Projects", hero_btn_contact: "Start a Project",
    stat_projects: "Projects Delivered", stat_experience: "Years Experience", stat_lighthouse: "Lighthouse Score", stat_direct: "Direct Access",
    scroll: "Scroll",
    mq_custom: "Custom Software", mq_api: "API Architecture", mq_georgia: "Georgia",
    trans_what: "What I Build", trans_scale: "Architecture Built for Scale", trans_work: "Selected Work", trans_journey: "My Journey", trans_questions: "Questions", trans_talk: "Let's Talk",
    services_eyebrow: "Core Services", services_title: "Enterprise-Grade Web Architecture",
    services_desc: 'From <strong>Server-Side Rendered Frontends</strong> to <strong>Distributed Backend Systems</strong>, I engineer scalable, Google-ready applications optimized for Core Web Vitals.',
    s1_title: "Enterprise Frontend Development", s1_desc: 'Building <strong>React</strong> and <strong>Next.js</strong> applications optimized for <strong>Server-Side Rendering (SSR)</strong>, <strong>Edge Computing</strong>, and <strong>Responsive UI/UX</strong>. Lightning-fast load times and flawless cross-device performance.',
    s2_title: "Robust Backend Architecture", s2_desc: 'Architecting scalable <strong>Node.js</strong> and <strong>Java</strong> backends. Specializing in <strong>API Design</strong>, <strong>PostgreSQL</strong> database optimization, and secure data persistence for enterprise workloads.',
    s3_title: "Custom SaaS & Dashboard Engineering", s3_desc: 'Full-stack platforms featuring <strong>User Management</strong>, <strong>Real-Time Monitoring</strong>, <strong>Stripe Billing</strong>, and complex data visualization. From architecture to production deployment.',
    s4_title: "Technical SEO & Web Performance", s4_desc: 'Bridging the gap between beautiful design and <strong>Google-ready code</strong>. Every project includes <strong>Semantic HTML</strong>, <strong>Schema Markup</strong>, and <strong>Core Web Vitals</strong> optimization for maximum search visibility.',
    s5_title: "Java Backend Engineering", s5_desc: 'High-concurrency server systems and distributed architecture. From <strong>asynchronous processing</strong> to <strong>low-latency API gateways</strong>, I build optimized solutions that scale under pressure.',
    s6_title: "Maintenance & Performance Monitoring", s6_desc: 'Ongoing support for web applications and infrastructure. <strong>Performance monitoring</strong>, security patches, CI/CD pipeline management, and feature additions to keep your systems running at peak efficiency.',
    cta_start: "Start a project →", cta_discuss: "Discuss your backend →", cta_see: "See case studies →", cta_audit: "Audit your site →", cta_view: "Discuss architecture →", cta_support: "Get support →",
    arch_eyebrow: "Engineering Mindset", arch_title: "Architecture Built for Scale",
    arch_p1: 'Managing <strong>high-concurrency environments</strong> taught me something most web developers never learn: <strong>every millisecond of latency matters</strong>.',
    arch_p2: 'When you\'re handling thousands of simultaneous requests, you develop an instinct for <strong>memory management</strong>, <strong>asynchronous processing</strong>, and <strong>code efficiency</strong> that translates directly into building faster, more reliable web applications.',
    arch_p3: 'This is why my <strong>Next.js</strong> applications score 99+ on Lighthouse, my <strong>Node.js</strong> APIs handle massive concurrent loads, and my <strong>PostgreSQL</strong> queries are optimized from day one. I don\'t just write code that works — I write code that <strong>scales under pressure</strong>.',
    adv_latency: "Low Latency", adv_latency_desc: "Optimized for sub-100ms response times",
    adv_memory: "Memory Efficient", adv_memory_desc: "Zero memory leaks, clean garbage collection",
    adv_concurrency: "High Concurrency", adv_concurrency_desc: "Built to handle thousands of simultaneous users",
    projects_eyebrow: "Portfolio", projects_title: "Projects", projects_desc: "Real-world applications built from scratch with clean architecture, modern tech stacks, and enterprise-grade performance.",
    tag_saas: "Next.js SaaS Platform", tag_webapp: "React Assessment Platform",
    proj_geo_desc: 'Enterprise-grade <strong>cloud hosting platform</strong> built with <strong>Next.js</strong> and <strong>Node.js</strong>. Features <strong>user management</strong>, <strong>Stripe billing</strong>, and real-time <strong>server monitoring dashboard</strong> with <strong>PostgreSQL</strong> data persistence.',
    proj_iq_desc: 'Interactive <strong>cognitive assessment platform</strong> built with <strong>React</strong> and <strong>TypeScript</strong>. Features <strong>real-time scoring algorithms</strong>, interactive testing modules, and detailed <strong>analytics dashboard</strong> for comprehensive results visualization.',
    cta_start_project: "Start Your Project", cta_instagram: "Chat on Instagram",
    exp_eyebrow: "Experience", exp_title: "My Journey", exp_desc: "From self-taught developer to engineering full-stack applications and scalable SaaS platforms for clients worldwide.",
    tl1_date: "2023 — The Beginning", tl1_title: "Started Web Development", tl1_desc: "Began learning HTML, CSS, and JavaScript. Built my first websites and quickly moved into complex frontend interfaces with modern frameworks.",
    tl2_date: "2024 — Leveling Up", tl2_title: "Full-Stack & Backend Engineering", tl2_desc: 'Expanded into <strong>React</strong>, <strong>Next.js</strong>, and <strong>TypeScript</strong>. Started building full-stack applications with <strong>Node.js</strong> and <strong>PostgreSQL</strong> databases.',
    tl3_date: "2024 — First Clients", tl3_title: "Started Taking Client Projects", tl3_desc: "Began working with businesses. Delivered custom websites, web applications, and high-performance backend systems optimized for scale.",
    tl4_date: "2025 — Building Products", tl4_title: "Launched GEO Cloud & GioStudio IQ", tl4_desc: 'Built and launched my own SaaS products — <strong>GEO Cloud</strong> (hosting platform) and <strong>GioStudio IQ</strong> (assessment tool). Full-stack applications with real users.',
    tl5_date: "2026 — Present", tl5_title: "GioDev — Full-Stack Web Developer", tl5_desc: 'Now offering end-to-end web development — from <strong>React</strong> frontends to <strong>Node.js</strong> backends, custom SaaS platforms, and enterprise-grade software solutions.',
    tag_freelance: "Freelance", tag_webapps: "Web Apps", tag_backend: "Backend", tag_fullstack: "Full-Stack", tech_title: "Tech Stack",
    faq_title: "Frequently Asked Questions",
    faq1_q: "How much does a website or web application cost?", faq1_a: "It depends on the scope. A simple landing page starts at 119 GEL. Multi-page business sites start at 349 GEL. Custom SaaS platforms and web applications are quoted based on architectural requirements. I always provide a clear, transparent quote before starting — no hidden fees.",
    faq2_q: "How fast can you deliver a project?", faq2_a: "Simple websites can be delivered in 48 hours. Multi-page sites typically take 1-2 weeks. Custom web applications and SaaS platforms take 2-6 weeks depending on architectural complexity. I'll give you a clear timeline upfront.",
    faq3_q: "What technologies do you use for web development?", faq3_a: 'My core stack: <strong>Next.js</strong>, <strong>React</strong>, <strong>TypeScript</strong>, <strong>Node.js</strong>, and <strong>PostgreSQL</strong>. I also use <strong>Prisma</strong> for ORM, <strong>Stripe</strong> for payments, and <strong>Vercel</strong> for deployment. I choose the best tools for each project to ensure performance and scalability.',
    faq4_q: "Do you work with clients outside Georgia?", faq4_a: "Yes! I work with clients worldwide. All communication happens through Instagram, email, or video calls. Time zones are never an issue — I'm flexible and responsive.",
    faq5_q: "Do I get direct access to you during the project?", faq5_a: "Absolutely. You work directly with me — no middlemen, no project managers. I handle everything from architecture and design to deployment, and you can reach me anytime through Instagram or email.",
    faq6_q: "What about ongoing support after launch?", faq6_a: "Every project includes post-launch support. I also offer retainer agreements for ongoing maintenance, performance monitoring, security updates, and new feature development.",
    faq7_q: "Will my website be mobile-friendly and SEO-optimized?", faq7_a: "Yes. Every project is built with <strong>responsive design</strong> from the ground up and includes <strong>technical SEO</strong> optimization — semantic HTML, schema markup, fast load times, and Core Web Vitals compliance.",
    contact_subtitle: "Ready to build something great?", contact_btn_ig: "Message on Instagram", contact_btn_bbb: "BuiltByBit Store",
    contact_form_title: "Or fill out the form below",
    form_name: "Name", form_name_ph: "Your name", form_email: "Email", form_email_ph: "your@email.com",
    form_service: "Service", form_select: "Select a service",
    form_opt_website: "Website", form_opt_webapp: "Web Application", form_opt_saas: "SaaS Platform",
    form_opt_backend: "Backend / API", form_opt_java: "Java Backend Engineering", form_opt_other: "Other",
    form_message: "Message", form_message_ph: "Tell me about your project...", form_submit: "Send Message",
    label_email: "Email", label_ig: "Instagram", label_location: "Location",
    footer_tagline: "Full-Stack Web Development & SaaS Architecture — Kutaisi, Georgia", footer_copy: "© 2026 GioDev — All Rights Reserved"
  },
  ka: {
    nav_home: "მთავარი", nav_services: "სერვისები", nav_projects: "პროექტები", nav_architecture: "არქიტექტურა", nav_experience: "გამოცდილება", nav_faq: "FAQ", nav_contact: "კონტაქტი",
    hero_eyebrow: "Full-Stack ვებ დეველოპერი & SaaS არქიტექტორი — ქუთაისი, საქართველო — მთელს მსოფლიოში",
    hero_subtitle: 'ქმნის <strong>მაღალი წარმადობის ვებ ეკოსისტემებს</strong> და <strong>მასშტაბირებად SaaS ინფრასტრუქტურას</strong> Next.js, React და Node.js-ით.',
    hero_btn_projects: "პროექტები", hero_btn_contact: "პროექტის დაწყება",
    stat_projects: "პროექტი", stat_experience: "წელი გამოცდილება", stat_lighthouse: "Lighthouse ქულა", stat_direct: "პირდაპირი კონტაქტი",
    scroll: "სქროლი",
    mq_custom: "Custom Software", mq_api: "API არქიტექტურა", mq_georgia: "საქართველო",
    trans_what: "რას ვქმნი", trans_scale: "მასშტაბირებადი არქიტექტურა", trans_work: "რჩეული ნამუშევრები", trans_journey: "ჩემი გზა", trans_questions: "კითხვები", trans_talk: "დაგვიკავშირდით",
    services_eyebrow: "ძირითადი სერვისები", services_title: "Enterprise დონის ვებ არქიტექტურა",
    services_desc: '<strong>Server-Side Rendered ფრონტენდიდან</strong> <strong>განაწილებულ Backend სისტემებამდე</strong> — ვქმნი მასშტაბირებად, Google-ready აპლიკაციებს, ოპტიმიზირებულს Core Web Vitals-ზე.',
    s1_title: "Enterprise ფრონტენდ დეველოპმენტი", s1_desc: '<strong>React</strong> და <strong>Next.js</strong> აპლიკაციები ოპტიმიზირებული <strong>SSR</strong>-ით, <strong>Edge Computing</strong>-ით და <strong>Responsive UI/UX</strong>-ით. ელვისებური ჩატვირთვა და უნაკლო მუშაობა ყველა მოწყობილობაზე.',
    s2_title: "მყარი Backend არქიტექტურა", s2_desc: 'მასშტაბირებადი <strong>Node.js</strong> და <strong>Java</strong> backends. სპეციალიზაცია: <strong>API დიზაინი</strong>, <strong>PostgreSQL</strong> მონაცემთა ბაზის ოპტიმიზაცია და უსაფრთხო მონაცემთა შენახვა.',
    s3_title: "Custom SaaS & Dashboard ინჟინერია", s3_desc: 'სრული სტექის პლატფორმები <strong>მომხმარებლის მართვით</strong>, <strong>რეალური დროის მონიტორინგით</strong>, <strong>Stripe ბილინგით</strong> და მონაცემთა ვიზუალიზაციით. არქიტექტურიდან პროდაქშენამდე.',
    s4_title: "ტექნიკური SEO & ვებ წარმადობა", s4_desc: 'ლამაზ დიზაინსა და <strong>Google-ready კოდს</strong> შორის ხიდი. ყველა პროექტი მოიცავს <strong>Semantic HTML</strong>-ს, <strong>Schema Markup</strong>-ს და <strong>Core Web Vitals</strong> ოპტიმიზაციას.',
    s5_title: "Java Backend ინჟინერია", s5_desc: 'მაღალი კონკურენტულობის სერვერული სისტემები და განაწილებული არქიტექტურა. <strong>ასინქრონული პროცესინგიდან</strong> <strong>დაბალი ლატენტობის API კარიბჭემდე</strong>.',
    s6_title: "მხარდაჭერა & წარმადობის მონიტორინგი", s6_desc: 'უწყვეტი მხარდაჭერა ვებ აპლიკაციებისა და ინფრასტრუქტურისთვის. <strong>წარმადობის მონიტორინგი</strong>, უსაფრთხოების განახლებები, CI/CD მართვა და ახალი ფუნქციები.',
    cta_start: "პროექტის დაწყება →", cta_discuss: "განვიხილოთ თქვენი backend →", cta_see: "იხილეთ კვლევები →", cta_audit: "შეამოწმეთ თქვენი საიტი →", cta_view: "განვიხილოთ არქიტექტურა →", cta_support: "მიიღეთ მხარდაჭერა →",
    arch_eyebrow: "საინჟინრო აზროვნება", arch_title: "მასშტაბირებადი არქიტექტურა",
    arch_p1: '<strong>მაღალი კონკურენტული გარემოს</strong> მართვამ მასწავლა რასაც ვერასდროს ისწავლის უმეტესი ვებ დეველოპერი: <strong>ყოველი მილიწამი მნიშვნელოვანია</strong>.',
    arch_p2: 'ათასობით ერთდროული მოთხოვნის დამუშავებისას, გამოიმუშავებ ინსტინქტს <strong>მეხსიერების მართვის</strong>, <strong>ასინქრონული პროცესინგის</strong> და <strong>კოდის ეფექტურობის</strong> მიმართ.',
    arch_p3: 'ამიტომ ჩემი <strong>Next.js</strong> აპლიკაციები 99+ ქულას იღებს Lighthouse-ზე, <strong>Node.js</strong> API-ები უმკლავდება მასიურ კონკურენტულ დატვირთვას, და <strong>PostgreSQL</strong> ქვერიები დღე ერთიდან ოპტიმიზირებულია.',
    adv_latency: "დაბალი ლატენტობა", adv_latency_desc: "ოპტიმიზირებული 100ms-ზე ნაკლები რეაგირებისთვის",
    adv_memory: "მეხსიერების ეფექტურობა", adv_memory_desc: "ნულოვანი მეხსიერების გაჟონვა, სუფთა garbage collection",
    adv_concurrency: "მაღალი კონკურენტულობა", adv_concurrency_desc: "აგებული ათასობით ერთდროული მომხმარებლისთვის",
    projects_eyebrow: "პორტფოლიო", projects_title: "პროექტები", projects_desc: "რეალური აპლიკაციები აგებული ნულიდან სუფთა არქიტექტურით, თანამედროვე ტექნოლოგიებით და enterprise წარმადობით.",
    tag_saas: "Next.js SaaS პლატფორმა", tag_webapp: "React შეფასების პლატფორმა",
    proj_geo_desc: 'Enterprise დონის <strong>ქლაუდ ჰოსტინგ პლატფორმა</strong> აგებული <strong>Next.js</strong>-ით და <strong>Node.js</strong>-ით. <strong>მომხმარებლის მართვა</strong>, <strong>Stripe ბილინგი</strong> და რეალური დროის <strong>სერვერის მონიტორინგი</strong>.',
    proj_iq_desc: 'ინტერაქტიული <strong>კოგნიტური შეფასების პლატფორმა</strong> აგებული <strong>React</strong>-ით და <strong>TypeScript</strong>-ით. <strong>რეალური დროის სკორინგი</strong> და დეტალური <strong>ანალიტიკის დაშბორდი</strong>.',
    cta_start_project: "დაიწყე პროექტი", cta_instagram: "Instagram-ზე დაწერე",
    exp_eyebrow: "გამოცდილება", exp_title: "ჩემი გზა", exp_desc: "თვითნასწავლი დეველოპერიდან full-stack აპლიკაციებისა და მასშტაბირებადი SaaS პლატფორმების ინჟინერამდე.",
    tl1_date: "2023 — დასაწყისი", tl1_title: "ვებ დეველოპმენტის შესწავლა", tl1_desc: "დავიწყე HTML, CSS და JavaScript სწავლა. ავაშენე პირველი ვებ-საიტები და სწრაფად გადავერთე თანამედროვე ფრეიმვორკებზე.",
    tl2_date: "2024 — დონის ამაღლება", tl2_title: "Full-Stack & Backend ინჟინერია", tl2_desc: 'გადავერთე <strong>React</strong>-ზე, <strong>Next.js</strong>-ზე და <strong>TypeScript</strong>-ზე. დავიწყე full-stack აპლიკაციების აგება <strong>Node.js</strong>-ით და <strong>PostgreSQL</strong>-ით.',
    tl3_date: "2024 — პირველი კლიენტები", tl3_title: "კლიენტების პროექტები", tl3_desc: "დავიწყე ბიზნესებთან მუშაობა. მივაწოდე custom ვებ-საიტები, ვებ აპლიკაციები და მაღალი წარმადობის backend სისტემები.",
    tl4_date: "2025 — პროდუქტების შექმნა", tl4_title: "GEO Cloud & GioStudio IQ", tl4_desc: 'ავაშენე და გავუშვი საკუთარი SaaS პროდუქტები — <strong>GEO Cloud</strong> (ჰოსტინგ პლატფორმა) და <strong>GioStudio IQ</strong> (შეფასების ინსტრუმენტი).',
    tl5_date: "2026 — აწმყო", tl5_title: "GioDev — Full-Stack ვებ დეველოპერი", tl5_desc: 'ახლა ვთავაზობ end-to-end ვებ დეველოპმენტს — <strong>React</strong> ფრონტენდიდან <strong>Node.js</strong> ბექენდამდე, custom SaaS პლატფორმები და enterprise პროგრამული უზრუნველყოფა.',
    tag_freelance: "ფრილანსი", tag_webapps: "ვებ აპები", tag_backend: "ბექენდი", tag_fullstack: "Full-Stack", tech_title: "ტექნოლოგიები",
    faq_title: "ხშირად დასმული კითხვები",
    faq1_q: "რამდენი ღირს ვებ-საიტი ან ვებ აპლიკაცია?", faq1_a: "დამოკიდებულია მოცულობაზე. მარტივი ლენდინგი იწყება 119 GEL-დან. მრავალგვერდიანი საიტები 349 GEL-დან. Custom SaaS პლატფორმები ფასდება არქიტექტურული მოთხოვნების მიხედვით.",
    faq2_q: "რამდენად სწრაფად შეგიძლიათ პროექტის მიწოდება?", faq2_a: "მარტივი ვებ-საიტები 48 საათში. მრავალგვერდიანი საიტები 1-2 კვირაში. Custom ვებ აპლიკაციები და SaaS პლატფორმები 2-6 კვირა.",
    faq3_q: "რა ტექნოლოგიებს იყენებთ?", faq3_a: 'ძირითადი სტექი: <strong>Next.js</strong>, <strong>React</strong>, <strong>TypeScript</strong>, <strong>Node.js</strong> და <strong>PostgreSQL</strong>. ასევე <strong>Prisma</strong>, <strong>Stripe</strong> და <strong>Vercel</strong>.',
    faq4_q: "მუშაობთ თუ არა საქართველოს გარეთ კლიენტებთან?", faq4_a: "დიახ! ვმუშაობ კლიენტებთან მთელს მსოფლიოში. კომუნიკაცია Instagram-ით, ელ-ფოსტით ან ვიდეო ზარებით.",
    faq5_q: "მაქვს თუ არა პირდაპირი წვდომა თქვენთან?", faq5_a: "რა თქმა უნდა. მუშაობთ პირდაპირ ჩემთან — შუამავლების გარეშე. ყველაფერს ვაკეთებ არქიტექტურიდან დეპლოიმენტამდე.",
    faq6_q: "რა ხდება გაშვების შემდეგ?", faq6_a: "ყოველი პროექტი მოიცავს გაშვების შემდგომ მხარდაჭერას. ასევე ვთავაზობ რეტეინერ შეთანხმებებს უწყვეტი მომსახურებისთვის.",
    faq7_q: "იქნება თუ არა ჩემი საიტი მობილურზე მორგებული და SEO-ოპტიმიზირებული?", faq7_a: "დიახ. ყველა პროექტი აგებულია <strong>რესპონსიული დიზაინით</strong> და მოიცავს <strong>ტექნიკურ SEO</strong> ოპტიმიზაციას — სემანტიკური HTML, schema markup და Core Web Vitals.",
    contact_subtitle: "მზად ხარ რაღაც დიდებულის შესაქმნელად?", contact_btn_ig: "Instagram-ზე დაწერე", contact_btn_bbb: "BuiltByBit მაღაზია",
    contact_form_title: "ან შეავსეთ ფორმა ქვემოთ",
    form_name: "სახელი", form_name_ph: "თქვენი სახელი", form_email: "ელ-ფოსტა", form_email_ph: "თქვენი@email.com",
    form_service: "სერვისი", form_select: "აირჩიეთ სერვისი",
    form_opt_website: "ვებ-საიტი", form_opt_webapp: "ვებ აპლიკაცია", form_opt_saas: "SaaS პლატფორმა",
    form_opt_backend: "Backend / API", form_opt_java: "Java Backend ინჟინერია", form_opt_other: "სხვა",
    form_message: "შეტყობინება", form_message_ph: "მოგვწერეთ თქვენი პროექტის შესახებ...", form_submit: "შეტყობინების გაგზავნა",
    label_email: "ელ-ფოსტა", label_ig: "Instagram", label_location: "ლოკაცია",
    footer_tagline: "Full-Stack ვებ დეველოპმენტი & SaaS არქიტექტურა — ქუთაისი, საქართველო", footer_copy: "© 2026 GioDev — ყველა უფლება დაცულია"
  },
  ru: {
    nav_home: "Главная", nav_services: "Услуги", nav_projects: "Проекты", nav_architecture: "Архитектура", nav_experience: "Опыт", nav_faq: "FAQ", nav_contact: "Контакт",
    hero_eyebrow: "Full-Stack Веб-разработчик & SaaS Архитектор — Кутаиси, Грузия — Доступен по всему миру",
    hero_subtitle: 'Создаю <strong>высокопроизводительные веб-экосистемы</strong> и <strong>масштабируемую SaaS-инфраструктуру</strong> на Next.js, React и Node.js.',
    hero_btn_projects: "Проекты", hero_btn_contact: "Начать проект",
    stat_projects: "Проектов", stat_experience: "Лет опыта", stat_lighthouse: "Lighthouse Score", stat_direct: "Прямой контакт",
    scroll: "Скролл",
    mq_custom: "Custom Software", mq_api: "API Архитектура", mq_georgia: "Грузия",
    trans_what: "Что я создаю", trans_scale: "Архитектура для масштаба", trans_work: "Избранные работы", trans_journey: "Мой путь", trans_questions: "Вопросы", trans_talk: "Свяжитесь со мной",
    services_eyebrow: "Основные услуги", services_title: "Веб-архитектура Enterprise-уровня",
    services_desc: 'От <strong>Server-Side Rendered фронтендов</strong> до <strong>распределённых Backend-систем</strong> — я создаю масштабируемые, Google-ready приложения, оптимизированные для Core Web Vitals.',
    s1_title: "Enterprise Frontend разработка", s1_desc: 'Приложения на <strong>React</strong> и <strong>Next.js</strong>, оптимизированные для <strong>SSR</strong>, <strong>Edge Computing</strong> и <strong>Responsive UI/UX</strong>. Молниеносная загрузка и безупречная работа на всех устройствах.',
    s2_title: "Надёжная Backend архитектура", s2_desc: 'Масштабируемые бэкенды на <strong>Node.js</strong> и <strong>Java</strong>. Специализация: <strong>API Design</strong>, оптимизация <strong>PostgreSQL</strong> и безопасное хранение данных для enterprise-нагрузок.',
    s3_title: "Разработка SaaS и дашбордов", s3_desc: 'Full-stack платформы с <strong>управлением пользователями</strong>, <strong>мониторингом в реальном времени</strong>, <strong>Stripe-биллингом</strong> и визуализацией данных. От архитектуры до продакшена.',
    s4_title: "Техническое SEO и Web Performance", s4_desc: 'Мост между красивым дизайном и <strong>Google-ready кодом</strong>. Каждый проект включает <strong>Semantic HTML</strong>, <strong>Schema Markup</strong> и оптимизацию <strong>Core Web Vitals</strong>.',
    s5_title: "Java Backend инженерия", s5_desc: 'Высоконагруженные серверные системы и распределённая архитектура. От <strong>асинхронной обработки</strong> до <strong>low-latency API gateways</strong>.',
    s6_title: "Поддержка и мониторинг", s6_desc: 'Постоянная поддержка веб-приложений и инфраструктуры. <strong>Мониторинг производительности</strong>, патчи безопасности, управление CI/CD и новые функции.',
    cta_start: "Начать проект →", cta_discuss: "Обсудить ваш backend →", cta_see: "Смотреть кейсы →", cta_audit: "Аудит вашего сайта →", cta_view: "Обсудить архитектуру →", cta_support: "Получить поддержку →",
    arch_eyebrow: "Инженерное мышление", arch_title: "Архитектура для масштаба",
    arch_p1: 'Управление <strong>высоконагруженными средами</strong> научило меня тому, что большинство веб-разработчиков никогда не поймут: <strong>каждая миллисекунда задержки имеет значение</strong>.',
    arch_p2: 'Обрабатывая тысячи одновременных запросов, вы развиваете инстинкт к <strong>управлению памятью</strong>, <strong>асинхронной обработке</strong> и <strong>эффективности кода</strong>.',
    arch_p3: 'Именно поэтому мои приложения на <strong>Next.js</strong> набирают 99+ на Lighthouse, мои <strong>Node.js</strong> API обрабатывают massive concurrent loads, а <strong>PostgreSQL</strong> запросы оптимизированы с первого дня.',
    adv_latency: "Низкая задержка", adv_latency_desc: "Оптимизировано для отклика менее 100мс",
    adv_memory: "Эффективность памяти", adv_memory_desc: "Нулевые утечки памяти, чистая сборка мусора",
    adv_concurrency: "Высокая конкурентность", adv_concurrency_desc: "Построено для тысяч одновременных пользователей",
    projects_eyebrow: "Портфолио", projects_title: "Проекты", projects_desc: "Реальные приложения, созданные с нуля на чистой архитектуре, современных стеках и enterprise-производительности.",
    tag_saas: "Next.js SaaS Платформа", tag_webapp: "React Assessment Платформа",
    proj_geo_desc: 'Enterprise <strong>облачная хостинг-платформа</strong> на <strong>Next.js</strong> и <strong>Node.js</strong>. <strong>Управление пользователями</strong>, <strong>Stripe-биллинг</strong> и <strong>мониторинг серверов</strong> в реальном времени.',
    proj_iq_desc: 'Интерактивная <strong>платформа когнитивной оценки</strong> на <strong>React</strong> и <strong>TypeScript</strong>. <strong>Алгоритмы скоринга</strong> в реальном времени и детальная <strong>аналитика</strong>.',
    cta_start_project: "Начать проект", cta_instagram: "Написать в Instagram",
    exp_eyebrow: "Опыт", exp_title: "Мой путь", exp_desc: "От самоучки до инженера full-stack приложений и масштабируемых SaaS-платформ для клиентов по всему миру.",
    tl1_date: "2023 — Начало", tl1_title: "Начал веб-разработку", tl1_desc: "Начал изучать HTML, CSS и JavaScript. Создал первые сайты и быстро перешёл к сложным интерфейсам на современных фреймворках.",
    tl2_date: "2024 — Повышение уровня", tl2_title: "Full-Stack и Backend инженерия", tl2_desc: 'Перешёл на <strong>React</strong>, <strong>Next.js</strong> и <strong>TypeScript</strong>. Начал создавать full-stack приложения с <strong>Node.js</strong> и <strong>PostgreSQL</strong>.',
    tl3_date: "2024 — Первые клиенты", tl3_title: "Начал работать с клиентами", tl3_desc: "Начал работать с бизнесами. Создавал кастомные сайты, веб-приложения и высокопроизводительные backend-системы.",
    tl4_date: "2025 — Создание продуктов", tl4_title: "Запуск GEO Cloud и GioStudio IQ", tl4_desc: 'Создал и запустил собственные SaaS-продукты — <strong>GEO Cloud</strong> (хостинг-платформа) и <strong>GioStudio IQ</strong> (инструмент оценки).',
    tl5_date: "2026 — Настоящее время", tl5_title: "GioDev — Full-Stack Веб-разработчик", tl5_desc: 'Теперь предлагаю端到端 веб-разработку — от <strong>React</strong> фронтендов до <strong>Node.js</strong> бэкендов, кастомных SaaS-платформ и enterprise-решений.',
    tag_freelance: "Фриланс", tag_webapps: "Веб-апы", tag_backend: "Бэкенд", tag_fullstack: "Full-Stack", tech_title: "Технологии",
    faq_title: "Часто задаваемые вопросы",
    faq1_q: "Сколько стоит сайт или веб-приложение?", faq1_a: "Зависит от объёма. Простой лендинг от 119 GEL. Многостраничные сайты от 349 GEL. Кастомные SaaS-платформы оцениваются по архитектурным требованиям. Всегда даю чёткую оценку до начала — без скрытых платежей.",
    faq2_q: "Как быстро вы можете выполнить проект?", faq2_a: "Простые сайты за 48 часов. Многостраничные — 1-2 недели. Кастомные веб-приложения и SaaS — 2-6 недель в зависимости от архитектурной сложности.",
    faq3_q: "Какие технологии вы используете?", faq3_a: 'Основной стек: <strong>Next.js</strong>, <strong>React</strong>, <strong>TypeScript</strong>, <strong>Node.js</strong> и <strong>PostgreSQL</strong>. Также <strong>Prisma</strong>, <strong>Stripe</strong> и <strong>Vercel</strong>.',
    faq4_q: "Работаете ли вы с клиентами за пределами Грузии?", faq4_a: "Да! Работаю с клиентами по всему миру. Общение через Instagram, email или видеозвонки. Часовые пояса — не проблема.",
    faq5_q: "Получу ли я прямой доступ к вам во время проекта?", faq5_a: "Абсолютно. Вы работаете напрямую со мной — без посредников и менеджеров. Я занимаюсь всем от архитектуры и дизайна до деплоя.",
    faq6_q: "Что насчёт поддержки после запуска?", faq6_a: "Каждый проект включает пост-запусковую поддержку. Также предлагаю ретейнер-соглашения для постоянного обслуживания, мониторинга производительности и разработки новых функций.",
    faq7_q: "Будет ли мой сайт мобильным и SEO-оптимизированным?", faq7_a: "Да. Каждый проект создаётся с <strong>адаптивным дизайном</strong> и включает <strong>техническую SEO</strong> оптимизацию — семантический HTML, schema markup и Core Web Vitals.",
    contact_subtitle: "Готовы создать что-то великое?", contact_btn_ig: "Написать в Instagram", contact_btn_bbb: "Магазин BuiltByBit",
    contact_form_title: "Или заполните форму ниже",
    form_name: "Имя", form_name_ph: "Ваше имя", form_email: "Email", form_email_ph: "ваш@email.com",
    form_service: "Услуга", form_select: "Выберите услугу",
    form_opt_website: "Веб-сайт", form_opt_webapp: "Веб-приложение", form_opt_saas: "SaaS Платформа",
    form_opt_backend: "Backend / API", form_opt_java: "Java Backend инженерия", form_opt_other: "Другое",
    form_message: "Сообщение", form_message_ph: "Расскажите о вашем проекте...", form_submit: "Отправить сообщение",
    label_email: "Email", label_ig: "Instagram", label_location: "Локация",
    footer_tagline: "Full-Stack Веб-разработка & SaaS Архитектура — Кутаиси, Грузия", footer_copy: "© 2026 GioDev — Все права защищены"
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
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        // skip, handled by placeholder
      } else {
        el.innerHTML = t[key];
      }
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) el.placeholder = t[key];
  });

  // Update select options
  document.querySelectorAll('select option[data-i18n]').forEach((opt) => {
    const key = opt.getAttribute('data-i18n');
    if (t[key]) opt.textContent = t[key];
  });

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
