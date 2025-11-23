
# Cosmic Interstellar Slider Website

## 🌟 **Project Description**

**An interactive single-page slider website about interstellar objects that visited (or passed close to) our Solar System.**

**Each slide is a large transparent PNG + a short description and a source link. Navigation is done via circular avatars on the right side.**

**In the background — a live space animation on <canvas>: twinkling stars with slight drifting, rare “comets” with tails, and subtle “dust” clouds near the edges. The background does not capture clicks, is fully responsive, and respects prefers-reduced-motion (simplified animation or disabled comets).**

**Additionally: a separate slide with a stylized animated Solar System (<model-viewer> + local GLB + HDR environment).**

---

## Included objects::

* 1I/ʻOumuamua (2017)

* 2I/Borisov (2019)

* 3I/ATLAS (2025, preliminary data)

* 2019/OK (≈100 m, close flyby – July 25, 2019)

* 2023/DZ2 (40–90 m, close flyby – March 25, 2023)

* QD8/2025 (22 m, close flyby – September 3, 2025)

* Solar System (animated) — Sun + 8 planets with simplified orbits (GLB)

---

## **Key Website Features:**

* Smooth carousel/slider with avatar-based navigation

* “Learn more” modal: title, description, source link

* Responsive interface: mobile-first breakpoints (1200 / 768 / 640 / 420 / 380), burger menu with background dimming, safe-area support, no horizontal scrolling

* Contact icons displayed in one row on both mobile and desktop

* Accessibility (a11y): ARIA attributes, keyboard navigation (←/→), ESC/backdrop close for modal/menu, visible focus

* Performance: loading="lazy", decoding="async", fetchpriority for first slide, will-change, transform-based animations

* Visual style: transparent PNGs with soft shadows, unified dark background with a subtle glow spot

* Animated space background on canvas (stars, rare comets, soft vignette/bloom)

* Correct layering: canvas is under images/text, all buttons remain clickable

* Performance tweaks: clamped DPR (up to 2×), animation pauses on tab hide, recalculation on resize

* Accessibility: prefers-reduced-motion lowers animation intensity and disables comets

* SEO & Sharing: canonical, Open Graph/Twitter meta tags, meaningful alt

* 3D Solar System slide: local GLB + HDR environment; rotation/zoom, transparent background, clean focus

---

## 🔧 **Functional Features**

* Object switching by clicking on round avatars

* Smooth fade in/out for active slide images

* Modal with title, description, and source button

* Unified dark background with a light glow under objects

* Live background: stars twinkle with vertical drifting, rare comets with tails, subtle “dust” clouds on the edges

* Soft bloom in corners and light vignette (CSS ::after) for depth

* Simple extension: add a new <div class="item">...</div>, avatar, and data — new slide ready

---

## ✨ 3D Slide: Solar System (Animated):

* Rendering: <model-viewer> v4 (local, no CDN)

# Files:

* Model: static/models/solar_system_animation.glb

* HDR environment: static/env/royal_esplanade_2k.hdr

* Component scripts:
* static/vendor/model-viewer/lib/model-viewer.js
* static/vendor/model-viewer/lib/features/scene-graph.js

* Note: Orbits/animation are baked into the GLB as clip “Take 001”. Planet rotation speed is set by the model. Camera/light parameters can be adjusted via attributes.

## ✨ Space Background (Canvas)

* Rendered in <canvas id="fxStars">, injected last inside .carousel

* Layer #fxStars is placed between slide background and content (z-index = 1) with pointer-events: none


# What’s included:

* Stars: soft twinkling with slow downward drift

* Comets: rare appearance with glowing tails

* Dust: blurred colored clouds near screen edges

* Vignette/Bloom: added via .carousel::after

# A11y & Performance:

* prefers-reduced-motion: fewer particles, comets disabled

* DPR limited to 2×

* Animation paused on document.hidden

* Particle size/density recalculated on resize

## 🧪 Test Checklist:

* “Learn more” button is clickable everywhere; canvas never blocks it

* On mobile, burger opens/closes correctly; backdrop works; ESC closes

* With “Reduce motion”, comets are disabled; fewer particles

* On resize/orientation change — smooth recalculation, no visual glitches

---

## 🛠️ **Technologies Used**

**Frontend:**

* HTML5 + CSS3: custom properties, clamp(), svh, safe-area insets, @supports, overflow: clip (+ fallback)

* Vanilla JavaScript: slider engine, modal, burger menu, focus management, ARIA states

* Icons / Fonts: Remix Icon, Google Fonts (Montserrat)

* Canvas 2D (requestAnimationFrame, devicePixelRatio support, density based on area)

* prefers-reduced-motion for system-level animation control

* Hosting / CI: GitHub Pages (optionally via GitHub Actions)

* 3D: <model-viewer> v4 (local), HDR environment, transparent viewer background

**Backend:**

* Not used (static website only).

**DevOps:**

* GitHub Pages — live demo hosting

* GitHub Actions — auto build & deploy (.github/workflows/pages.yml)

* builds site/ from templates/index.html and static/**

* rewrites /static/ → ./static/ for correct GitHub Pages paths

* deploys artifact to Pages

**Security:**

* No backend, no cookies, no authentication

* All assets are local (no trackers)

* Recommendation: add CSP and rel="noopener noreferrer" for external links

---

## 🔐 **API Usage**

* No external APIs are used. The website is fully static.

### Available endpoints:

* N/A
---

## 🏢 **Project Structure**

```
.
├── 🐳 docker-compose.yml         — container orchestration (web, etc.)
├── 🐋 Dockerfile                  — image build recipe
├── 📘 README.md                   — project description and setup
├── 📦 requirements.txt            — Python dependencies (venv / image)
├── 📂 static                      — static website assets
│   ├── 🎨 css
│   │   └── 🎨 style.css           — layout & visual styles
│   ├── 🌅 env
│   │   └── 🌄 royal_esplanade_2k.hdr — HDR environment for realistic lighting
│   ├── 🖼️ images
│   │   └── 👤 avatar              — avatars / profile images
│   ├── ⚙️ js
│   │   └── ⚙️ script.js           — frontend logic (slider, 3D, UI)
│   └── 🪐 models
│       └── 🪐 solar_system_animation.glb — 3D Solar System model
├── 📄 structure.txt               — saved project tree (this file)
└── 🧩 templates
    └── 🏠 index.html              — main page (connects CSS/JS/3D scene)


```

---

## 🔗 Links

* Live demo:
* https://mr-shams86.github.io/cosmic-interstellar-slider/#home

---

## 📢 **Contacts**

* **Email**: sammertime763@gmail.com

* **Telegram**: [Mr_Shams_1986](https://t.me/Mr_Shams_1986)

---

## 📚 **License**

**MIT License**

* Solar System 3D Model — CC BY 4.0 (Attribution required):

* “Solar System animation” [(skfb.ly/oKOqS](https://skfb.ly/oKOqS?utm_source=chatgpt.com)
* by Samer_Arab_S5 is licensed under (https://creativecommons.org/licenses/by/4.0/?utm_source=chatgpt.com)
