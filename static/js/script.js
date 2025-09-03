// ===== Карусель =========================================================
const avatars    = document.querySelectorAll('.avatar li');
const infoSlider = document.querySelectorAll('.info-slider');
const imgSlider  = document.querySelectorAll('.img-slider');
const items      = document.querySelectorAll('.item');

// читаем шаги сдвига из CSS (:root --slide-step-y/x)
const rootStyles = getComputedStyle(document.documentElement);
const STEP_Y = parseFloat(rootStyles.getPropertyValue('--slide-step-y')) || 100;
const STEP_X = parseFloat(rootStyles.getPropertyValue('--slide-step-x')) || 100;

let index = 0;

function applyTransforms() {
  infoSlider.forEach(s => (s.style.transform = `translateY(${-(index * STEP_Y)}%)`));
  imgSlider.forEach(s  => (s.style.transform = `translateX(${-(index * STEP_X)}%)`));
}

function goTo(i){
  if (!items.length) return;

  // циклическая навигация
  index = (i + items.length) % items.length;

  // визуальное состояние
  document.querySelector('.avatar .selected')?.classList.remove('selected');
  avatars[index]?.classList.add('selected');

  document.querySelector('.item.active')?.classList.remove('active');
  items[index]?.classList.add('active');

  // доступность
  avatars.forEach((el, k) => {
    el.setAttribute('aria-selected', k === index ? 'true' : 'false');
    el.tabIndex = k === index ? 0 : -1;
  });

  applyTransforms();
}

// подготовка аватаров
avatars.forEach((avatar, i) => {
  avatar.setAttribute('role', 'button');
  avatar.tabIndex = i === 0 ? 0 : -1;
  const alt = avatar.querySelector('img')?.alt || `Slide ${i+1}`;
  avatar.setAttribute('aria-label', `Show ${alt}`);

  avatar.addEventListener('click', () => goTo(i));
  avatar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i); }
    if (e.key === 'ArrowRight') goTo(index + 1);
    if (e.key === 'ArrowLeft')  goTo(index - 1);
  });
});

// глобальные стрелки (не мешаем модалке/меню)
document.addEventListener('keydown', (e) => {
  const inModal = document.getElementById('infoModal')?.classList.contains('open');
  const navOpen = document.querySelector('.site-nav.open');
  if (inModal || navOpen) return;

  if (e.key === 'ArrowRight') goTo(index + 1);
  if (e.key === 'ArrowLeft')  goTo(index - 1);
});

// ===== Модалка "Learn more" ============================================
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
    title: "2019 OK",
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
    title: "2023 DZ2",
    html: `
      <p>~40–90 m near-Earth asteroid that safely flew past on 25 Mar 2023 at ~175,000 km
      (~0.45 lunar distances).</p>
      <ul>
        <li>Close approach: 2023-03-25</li>
        <li>Class: Apollo NEO</li>
      </ul>`,
    link: "https://en.wikipedia.org/wiki/2023_DZ2"
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
  document.body.classList.add("no-scroll"); // совместимо с бургером

  modal.querySelector(".modal__close")?.focus({ preventScroll: true });
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  // если бургер закрыт — вернём прокрутку
  const headerOpen = document.querySelector('.site-nav.open');
  if (!headerOpen) document.body.classList.remove("no-scroll");
}

// Делегирование: ловим и [data-open-modal], и .info-item .btn
document.addEventListener("click", (e) => {
  const openBtn = e.target.closest("[data-open-modal], .info-item .btn");
  if (openBtn) {
    e.preventDefault();
    openModalForCurrent();
    return;
  }
  if (e.target.matches("[data-close-modal]")) {
    closeModal();
  }
});

// Закрытие по ESC и по клику на тёмную подложку
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});
modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal__backdrop")) closeModal();
});

// ===== Мобильное меню (бургер) =========================================
(() => {
  const header = document.querySelector('.site-nav');
  const toggle = header?.querySelector('.nav-toggle');
  const scrim  = header?.querySelector('.nav-scrim');
  const links  = header?.querySelectorAll('.nav-menu a');
  if (!header || !toggle) return;

  function setOpen(isOpen) {
    header.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
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

// применяем стартовые сдвиги (на случай, если index ≠ 0)
applyTransforms();
