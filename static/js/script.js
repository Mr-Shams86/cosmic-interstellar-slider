// ========= Общие DOM ссылки ===========================================
const items   = Array.from(document.querySelectorAll('.carousel .item'));
const avatars = Array.from(document.querySelectorAll('.avatar li'));

// Активный индекс
let index = Math.max(0, items.findIndex(el => el.classList.contains('active')));

// ========= Навигация по слайдам (без сдвигов, только .active) =========
function goTo(i){
  if (!items.length) return;
  index = (i + items.length) % items.length;

  // активный слайд
  items.forEach((el, k) => el.classList.toggle('active', k === index));

  // аватары
  document.querySelector('.avatar .selected')?.classList.remove('selected');
  if (avatars[index]) avatars[index].classList.add('selected');

  avatars.forEach((el, k) => {
    el.setAttribute('aria-selected', k === index ? 'true' : 'false');
    el.tabIndex = k === index ? 0 : -1;
  });
}

// клики/клавиатура на аватарах
avatars.forEach((avatar, i) => {
  avatar.setAttribute('role', 'button');
  avatar.tabIndex = i === index ? 0 : -1;
  const alt = avatar.querySelector('img')?.alt || `Slide ${i+1}`;
  avatar.setAttribute('aria-label', `Show ${alt}`);

  avatar.addEventListener('click', () => goTo(i));
  avatar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i); }
  });
});

// стрелки на клавиатуре
document.addEventListener('keydown', (e) => {
  const inModal = document.getElementById('infoModal')?.classList.contains('open');
  const navOpen = document.querySelector('.site-nav.open');
  if (inModal || navOpen) return;
  if (e.key === 'ArrowRight') goTo(index + 1);
  if (e.key === 'ArrowLeft')  goTo(index - 1);
});

// старт
goTo(index);

// ========= Модалка =====================================================
const DETAILS = [
  {
    title: "1I/ʻOumuamua",
    html: `
      <p>The first confirmed interstellar object (2017). Discovered by Pan-STARRS on a hyperbolic orbit.
      It showed a small non-gravitational acceleration; leading hypotheses involve unusual outgassing.</p>
      <ul>
        <li>Designation: 1I/2017 U1</li>
        <li>Type: interstellar small body</li>
      </ul>`,
    link: "https://en.wikipedia.org/wiki/%CA%BBOumuamua"
  },
  {
    title: "2I/Borisov",
    html: `
      <p>The first known interstellar comet (2019) discovered by Gennady Borisov.
      A classic active comet with dust/gas; imaged by Hubble.</p>
      <ul>
        <li>Perihelion: 2019-12</li>
        <li>Notes: CO-rich chemistry reported in studies</li>
      </ul>`,
    link: "https://en.wikipedia.org/wiki/2I/Borisov"
  },
  {
    title: "3I/ATLAS",
    html: `
      <p>The third interstellar object (discovered Jul 1, 2025 by the ATLAS survey).
      Under active observation by major facilities. Early analyses indicate unusually CO₂-rich activity (CO₂/H₂O ≈ 8:1).</p>
      <ul>
        <li>Designation: 3I/2025 ATLAS</li>
        <li>Type: active comet on a hyperbolic orbit</li>
      </ul>`,
    link: "https://en.wikipedia.org/wiki/3I/ATLAS"
  },
  {
    title: "OK/2019",
    html: `
      <p>~100 m asteroid spotted only days in advance; safely passed Earth on 25 Jul 2019
      at ~73,000 km (~0.19 lunar distances).</p>
      <ul>
        <li>Close approach: 2019-07-25</li>
        <li>Class: near-Earth asteroid</li>
      </ul>`,
    link: "https://en.wikipedia.org/wiki/2019_OK"
  },
  {
    title: "DZ2/2023",
    html: `
      <p>~40–90 m near-Earth asteroid that safely flew past on 25 Mar 2023 at ~175,000 km
      (~0.45 lunar distances).</p>
      <ul>
        <li>Close approach: 2023-03-25</li>
        <li>Class: Apollo NEO</li>
      </ul>`,
    link: "https://en.wikipedia.org/wiki/2023_DZ2"
  },
  {
    title: "QD8/2025",
    html: `
      <p>Near-Earth asteroid of the Apollo group, first detected on 18 Aug 2025.
      On 3 Sep 2025 it passed ~0.6 LD (~200,000 km) from Earth — a completely
      safe close approach. The estimated diameter is ~17–38 m (many reports cite
      ~22 m, comparable to the Chelyabinsk bolide).</p>
      <ul>
        <li>Type: Apollo NEO</li>
        <li>Close approach date: 2025-09-03</li>
        <li>Minimum distance: ≈0.6 LD (~200,000 km)</li>
        <li>Size: ~17–38 m (H-based estimate)</li>
      </ul>`,
    link: "https://en.wikipedia.org/wiki/2025_QD8"
  },
  {
  title: "Solar System (animated)",
  html: `
    <p>A stylized, animated model of the Solar System embedded locally as a GLB.
    You can rotate, pan, and zoom the scene. The visualization is meant for readability,
    so planet sizes, distances, and orbital speeds are artistically compressed (not to scale).</p>
    <ul>
      <li><strong>Type:</strong> Interactive 3D GLB with baked loop <em>“Take&nbsp;001”</em>.</li>
      <li><strong>Contents:</strong> Sun and the eight planets (Mercury → Neptune), rings &amp; orbit guides.</li>
      <li><strong>Scale:</strong> Non-linear; sizes and distances are simplified for screen viewing.</li>
      <li><strong>Animation:</strong> Simplified orbital motion; continuous loop.</li>
      <li><strong>Controls:</strong> Drag to rotate, wheel/pinch to zoom, right-drag to pan.</li>
      <li><strong>Formats:</strong> .glb (web); optional .usdz for iOS AR via <code>ios-src</code>.</li>
      <li><strong>Source:</strong> Sketchfab model “Solar System animation”.</li>
      <li><strong>Author:</strong> Samer_Arab_S5</li>
      <li><strong>License:</strong> Creative Commons Attribution 4.0 (CC&nbsp;BY&nbsp;4.0)</li>
      <li><strong>Notes:</strong> Educational/stylized; not a physically accurate ephemeris.</li>
    </ul>
    <p class="credit small">
      “Solar System animation” (<a href="https://skfb.ly/oKOqS" target="_blank" rel="noopener">model</a>)
      by Samer_Arab_S5 is licensed under
      <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>.
      Attribution is required if you reuse or modify the asset.
    </p>
  `,
  link: "https://en.wikipedia.org/wiki/Solar_System"
}

];

const modal       = document.getElementById("infoModal");
const modalTitle  = document.getElementById("modalTitle");
const modalBody   = document.getElementById("modalBody");
const modalSource = document.getElementById("modalSource");

function openModalForCurrent() {
  const d = DETAILS[index] || {
    title: items[index]?.querySelector("h2")?.textContent || "Details",
    html: "<p>More information coming soon.</p>",
    link: "#"
  };

  modalTitle.textContent = d.title;
  modalBody.innerHTML    = d.html;

  if (d.link && d.link !== "#") {
    modalSource.href = d.link;
    modalSource.style.display = "inline-flex";
  } else {
    modalSource.style.display = "none";
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  modal.querySelector(".modal__close")?.focus({ preventScroll: true });
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  const headerOpen = document.querySelector('.site-nav.open');
  if (!headerOpen) document.body.classList.remove("no-scroll");
}

document.addEventListener("click", (e) => {
  const openBtn = e.target.closest("[data-open-modal], .info-item .btn");
  if (openBtn) { e.preventDefault(); openModalForCurrent(); return; }
  if (e.target.matches("[data-close-modal]")) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});
modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal__backdrop")) closeModal();
});

// ========= Бургер =======================================================
(() => {
  const header = document.querySelector('.site-nav');
  const toggle = header?.querySelector('.nav-toggle');
  const scrim  = header?.querySelector('.nav-scrim');
  const links  = header?.querySelectorAll('.nav-menu a');
  if (!header || !toggle) return;

  function setOpen(isOpen) {
    header.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    const lock = isOpen || modal.classList.contains('open');
    document.body.classList.toggle('no-scroll', lock);
  }

  toggle.addEventListener('click', () => setOpen(!header.classList.contains('open')));
  scrim?.addEventListener('click', () => setOpen(false));
  links?.forEach(a => a.addEventListener('click', () => setOpen(false)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('open')) setOpen(false);
  });
})();

// ========= Звёзды / «кометы» ===========================================
(() => {
  const root = document.querySelector('.carousel');
  const cvs  = document.getElementById('fxStars');
  if (!root || !cvs) return;

  const ctx = cvs.getContext('2d', { alpha: true });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let W = 0, H = 0, stars = [], comets = [], dust = [], raf = 0;
  const prefersReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    const rect = root.getBoundingClientRect();
    W = Math.floor(rect.width);
    H = Math.floor(rect.height);

    cvs.width  = Math.floor(W * dpr);
    cvs.height = Math.floor(H * dpr);
    cvs.style.width  = W + 'px';
    cvs.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initStarsAndDust();
  }

  function initStarsAndDust(){
    const area  = W * H;
    const count = prefersReduce ? 60 : Math.max(90, Math.min(260, Math.round(area / 9000)));
    stars = new Array(count).fill(0).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      s: Math.random() * 1.2 + 0.3,
      v: Math.random() * 0.06 + 0.02,
      tw: Math.random() * Math.PI * 2
    }));

    const DUST_COUNT = prefersReduce ? 8 : 16;
    const margin = Math.max(60, Math.min(160, Math.round(Math.min(W, H) * 0.14)));
    dust = new Array(DUST_COUNT).fill(0).map(() => spawnDust(margin));
  }

  function spawnDust(margin){
    const side = Math.floor(Math.random() * 4);
    let x, y;
    if (side === 0) { x = Math.random() * margin;        y = Math.random() * H; }
    else if (side === 1){ x = W - Math.random() * margin; y = Math.random() * H; }
    else if (side === 2){ x = Math.random() * W;          y = Math.random() * margin; }
    else {                x = Math.random() * W;          y = H - Math.random() * margin; }

    return {
      x, y,
      r: 20 + Math.random()*70,
      a: 0.02 + Math.random()*0.05,
      hue: 160 + Math.random()*60,
      vx: (Math.random()-0.5)*0.05,
      vy: (Math.random()-0.5)*0.05
    };
  }

  function spawnComet(){
    if (prefersReduce) return;
    const fromRight = Math.random() > 0.5;
    const startX = fromRight ? W + 40 : -40;
    const startY = Math.random() * (H * 0.4);
    const vx = (fromRight ? -1 : 1) * (1.8 + Math.random()*0.9);
    const vy = 0.6 + Math.random()*0.5;

    comets.push({ x: startX, y: startY, vx, vy, life: 0, maxLife: 5 + Math.random()*2, trail: [] });
  }

  function drawStar(s, dt){
    s.tw += dt * 2;
    const a = 0.5 + 0.5 * Math.sin(s.tw);
    ctx.globalAlpha = 0.35 + 0.35 * a;
    ctx.beginPath(); ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2);
    ctx.fillStyle = '#9ffcff'; ctx.fill();
    ctx.globalAlpha = 1;
  }

  function drawDust(d){
    d.x += d.vx; d.y += d.vy;

    const centerBox = Math.min(W, H) * 0.6;
    const cx = (W - centerBox) / 2, cy = (H - centerBox) / 2;
    if (d.x > cx && d.x < cx + centerBox && d.y > cy && d.y < cy + centerBox){
      const margin = Math.max(60, Math.min(160, Math.round(Math.min(W, H) * 0.14)));
      Object.assign(d, spawnDust(margin));
    }

    ctx.filter = 'blur(18px)';
    ctx.beginPath();
    ctx.fillStyle = `hsla(${Math.round(d.hue)}, 100%, 60%, ${d.a})`;
    ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
    ctx.fill();
    ctx.filter = 'none';
  }

  function drawComet(c){
    c.trail.push({ x: c.x, y: c.y });
    if (c.trail.length > 28) c.trail.shift();

    for (let i = 1; i < c.trail.length; i++){
      const p0 = c.trail[i-1], p1 = c.trail[i];
      const t = i / c.trail.length;
      ctx.strokeStyle = 'rgba(140,255,250,' + (0.06 + 0.18 * t) + ')';
      ctx.lineWidth = 1 + 3 * (1 - t);
      ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(c.x, c.y, 1.6, 0, Math.PI*2);
    ctx.fillStyle = '#cfffff'; ctx.fill();
  }

  let lastT = performance.now();
  function tick(now){
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;

    ctx.clearRect(0, 0, W, H);

    for (const d of dust) drawDust(d);
    for (const s of stars){
      s.y += s.v; if (s.y > H) { s.y = -2; s.x = Math.random() * W; }
      drawStar(s, dt);
    }
    for (let i = comets.length - 1; i >= 0; i--){
      const c = comets[i];
      c.x += c.vx; c.y += c.vy; c.life += dt;
      drawComet(c);
      const out = c.x < -80 || c.x > W + 80 || c.y > H + 60 || c.life > c.maxLife;
      if (out) comets.splice(i, 1);
    }

    raf = requestAnimationFrame(tick);
  }

  // редкие кометы
  let cometTimer;
  function scheduleComets(){
    clearTimeout(cometTimer);
    const next = (prefersReduce ? 15000 : 8000) + Math.random()*6000;
    cometTimer = setTimeout(() => { spawnComet(); scheduleComets(); }, next);
  }
  

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else { lastT = performance.now(); raf = requestAnimationFrame(tick); }
  });

  resize();
  addEventListener('resize', resize);
  scheduleComets();
  raf = requestAnimationFrame(tick);
})();

(() => {
  const mv = document.getElementById('solarMV');
  if (!mv) return;

  // 0. Когда модель загрузилась — можем трогать материалы и анимацию
  mv.addEventListener('load', () => {

    // 1) Перекраска орбит (подбери оттенок, сейчас — бирюза)
    const ORBIT_BASE = [0.62, 0.98, 0.95, 1.0]; // rgba 0..1  (≈ #9EFFF3)
    const ORBIT_EMISS = [0.15, 0.75, 0.7];     // лёгкое «свечение»

    mv.model?.materials?.forEach(mat => {
      const n = (mat.name || '').toLowerCase();
      // Подхватим названия вида "orbit", "orbits", "path", "trail", "line"
      if (n.includes('orbit') || n.includes('path') || n.includes('trail') || n.includes('line')) {
        try { mat.pbrMetallicRoughness.setBaseColorFactor(ORBIT_BASE); } catch {}
        try { mat.emissiveFactor = ORBIT_EMISS; } catch {}
        try { mat.pbrMetallicRoughness.setMetallicFactor(0.0); } catch {}
        try { mat.pbrMetallicRoughness.setRoughnessFactor(1.0); } catch {}
      }
    });

    // 2) Замедлить анимацию (было «слишком быстро»)
    setSolarAnimSpeed(0.1); // 0.1x от исходной скорости
  });

  // Меняем скорость анимации. Предпочтительно через публичное свойство, иначе — фолбэк.
  function setSolarAnimSpeed(mult = 0.1) {
    // Если модель имеет анимации — убедимся, что что-то включено
    if (mv.availableAnimations?.length && !mv.animationName) {
      mv.animationName = mv.availableAnimations[0];
    }

    // Новые версии (<model-viewer> 3.x) — поддерживают animationTimeScale
    if ('animationTimeScale' in mv) {
      mv.animationTimeScale = mult;
      return;
    }

    // Фолбэк: вручную двигаем currentTime медленнее
    let raf = 0, last = performance.now();
    mv.pause(); // останавливаем «внутренний» плеер
    const tick = (t) => {
      const dt = (t - last) / 1000; last = t;
      const dur = mv.duration || 1;
      mv.currentTime = (mv.currentTime + dt * mult) % dur;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // На всякий пожарный — останавливаем фолбэк, если слайд скрыли
    mv.addEventListener('model-visibility', (e) => {
      if (e.detail.visible === false) cancelAnimationFrame(raf);
    });
  }
})();
