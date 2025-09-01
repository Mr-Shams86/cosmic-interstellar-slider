const avatars = document.querySelectorAll('.avatar li');
const infoSlider = document.querySelectorAll('.info-slider');
const imgSlider = document.querySelectorAll('.img-slider');
const items = document.querySelectorAll('.item');

let index = 0;

avatars.forEach((avatar, ind) => {
    avatar.addEventListener('click', () => {

        document.querySelector('.avatar .selected').classList.remove('selected');
        avatar.classList.add('selected');

        index = ind;

        infoSlider.forEach(slide => {
            slide.style.transform = `translateY(${index * -100}%)`;
        });
        imgSlider.forEach(slide => {
            slide.style.transform = `translateX(${index * -100}%)`;
        });

        document.querySelector('.item.active').classList.remove('active');
        items[index].classList.add('active');
    });
});

/* ===== Learn more modal ===== */

/* Детальные тексты в порядке твоих слайдов 0..4 */
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


const modal = document.getElementById("infoModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalSource = document.getElementById("modalSource");

function openModalForCurrent() {
  const d = DETAILS[index] || {
    title: items[index]?.querySelector("h2")?.textContent || "Details",
    html: "<p>More information coming soon.</p>",
    link: "#"
  };
  modalTitle.textContent = d.title;
  modalBody.innerHTML = d.html;
  if (d.link && d.link !== "#") {
    modalSource.href = d.link;
    modalSource.style.display = "inline-flex";
  } else {
    modalSource.style.display = "none";
  }
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal__close").focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* Делегируем клик по любой кнопке .btn */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn");
  if (btn) {
    e.preventDefault();
    openModalForCurrent();
  }
  if (e.target.matches("[data-close-modal]")) {
    closeModal();
  }
});

/* Закрытие по ESC и по клику на фон */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});
modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal__backdrop")) closeModal();
});

