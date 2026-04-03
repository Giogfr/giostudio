/* ========================================
   GioStudio — Production-Ready JavaScript
   GSAP + Three.js + Lenis | 60fps Optimized
   ======================================== */

const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
let scrollVelocity = 0;
let lastNavScrollTop = 0;
const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

// ---- LENIS SMOOTH SCROLL ----
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  normalizeWheel: true,
  infinite: false,
});

lenis.on('scroll', (e) => { scrollVelocity = e.velocity; });

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

// Refresh ScrollTrigger after everything loads to fix position calculations
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

// ---- MOUSE TRACKING ----
document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
});

// ========================================
// PAGE TRANSITION ON LOAD
// ========================================
(function initPageTransition() {
  const overlay = document.querySelector('.page-transition-overlay');
  if (!overlay) return;
  gsap.fromTo(overlay,
    { opacity: 1 },
    {
      opacity: 0, duration: 1, ease: 'power2.inOut', delay: 0.2,
      onComplete: () => overlay.style.display = 'none',
    }
  );
})();

// ========================================
// TOP NAV
// ========================================
(function initNav() {
  const nav = document.querySelector('.top-nav');
  if (!nav) return;

  lenis.on('scroll', ({ scroll }) => {
    if (scroll > lastNavScrollTop && scroll > 100) {
      nav.classList.add('nav-hidden');
      nav.classList.remove('nav-solid');
    } else {
      nav.classList.remove('nav-hidden');
      nav.classList.toggle('nav-solid', scroll > 50);
    }
    lastNavScrollTop = scroll;
  });

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
      lenis.scrollTo(target, { offset: -72, duration: 1.5 });
    }
  });
});

// ========================================
// HERO SCENE — Epic Animated Shader Background
// ========================================
(function initHeroScene() {
  if (isMobile) return;
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

  const particleCount = 600;
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
  if (isMobile) return;
  const canvas = document.getElementById('services-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;

  const count = 800;
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
  if (isMobile) return;
  const canvas = document.getElementById('contact-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;

  const count = 2000;
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
  if (isMobile) return;
  const canvas = document.getElementById('contact-morph-canvas');
  if (!canvas) return;

  const dpr = Math.min(window.devicePixelRatio, 2);
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
  if (isMobile) return;
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
  if (isMobile) return;
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
