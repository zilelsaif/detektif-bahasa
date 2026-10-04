const games = {
  kedaiMatematik: {
    title: "Kedai Matematik",
    description: "Belajar Matematik melalui simulasi kedai, wang, masa dan ukuran.",
    url: "",
    artworkUrl: "assets/games/kedai-matematik-artwork.webp",
    logoUrl: "assets/games/kedai-matematik-logo.webp",
    artworkAlt: "Maskot Kedai Matematik memakai apron kedai",
    className: "math",
    label: "Dunia nombor",
    symbol: "RM",
    note: "Wang · Masa · Ukuran"
  },
  makmalCilik: {
    title: "Makmal Cilik",
    description: "Teroka Sains melalui eksperimen dan misi bersama PICO.",
    url: "",
    artworkUrl: "assets/games/makmal-cilik-artwork.webp",
    logoUrl: "assets/games/makmal-cilik-logo.webp",
    artworkAlt: "Eksperimen litar elektrik di makmal bersama PICO",
    className: "science",
    label: "Dunia eksperimen",
    symbol: "⚗",
    note: "Sains · Eksperimen · Misi"
  },
  detektifBahasa: {
    title: "Detektif Bahasa",
    description: "Selesaikan kes dan misteri Bahasa Melayu di Bayuraya.",
    url: "",
    artworkUrl: "assets/games/detektif-bahasa-artwork.svg",
    logoUrl: "assets/games/detektif-bahasa-logo.webp",
    artworkAlt: "Peta bandar Bayuraya dan Agensi Detektif Bahasa",
    className: "language",
    label: "Dunia misteri",
    symbol: "?",
    note: "Bahasa · Petunjuk · Kes"
  }
};

const gameGrid = document.querySelector("[data-game-grid]");

if (gameGrid) {
  gameGrid.innerHTML = Object.entries(games).map(([id, game]) => {
    const playAttributes = game.url
      ? `href="${game.url}"`
      : `href="#" aria-disabled="true" data-unavailable="true"`;

    const visualContent = game.artworkUrl
      ? `<img class="game-artwork" src="${game.artworkUrl}" alt="" loading="lazy" decoding="async" data-asset-image><strong class="game-symbol game-asset-fallback" aria-hidden="true" hidden>${game.symbol}</strong>`
      : `<strong class="game-symbol" aria-hidden="true">${game.symbol}</strong>`;
    const logoContent = game.logoUrl
      ? `<img class="game-logo" src="${game.logoUrl}" alt="" loading="lazy" decoding="async" data-logo-image><span class="game-label game-logo-fallback" hidden>${game.label}</span>`
      : `<span class="game-label">${game.label}</span>`;

    return `
      <article class="game-card ${game.className}" id="${id}">
        <div class="game-visual" role="img" aria-label="${game.artworkUrl ? game.artworkAlt : `Placeholder visual rasmi untuk ${game.title}`}">
          ${logoContent}
          ${visualContent}
          <small>${game.note}</small>
        </div>
        <div class="game-body">
          <h3>${game.title}</h3>
          <p>${game.description}</p>
          <div class="game-actions">
            <a class="button button-game" ${playAttributes}>Main Sekarang</a>
            <button class="button button-info" type="button" aria-expanded="false" aria-controls="info-${id}" data-info-toggle>Info</button>
          </div>
          <p id="info-${id}" class="game-info" hidden>${game.note}. Sesuai digunakan sebagai aktiviti pembelajaran kendiri atau bersama orang dewasa.</p>
        </div>
      </article>`;
  }).join("");

  gameGrid.addEventListener("error", (event) => {
    if (event.target.matches("[data-asset-image]")) {
      event.target.hidden = true;
      event.target.nextElementSibling.hidden = false;
    }
    if (event.target.matches("[data-logo-image]")) {
      event.target.hidden = true;
      event.target.nextElementSibling.hidden = false;
    }
  }, true);
}

document.addEventListener("click", (event) => {
  const unavailableLink = event.target.closest("[data-unavailable]");
  if (unavailableLink) event.preventDefault();

  const infoToggle = event.target.closest("[data-info-toggle]");
  if (infoToggle) {
    const info = document.getElementById(infoToggle.getAttribute("aria-controls"));
    const isOpen = infoToggle.getAttribute("aria-expanded") === "true";
    infoToggle.setAttribute("aria-expanded", String(!isOpen));
    info.hidden = isOpen;
    infoToggle.textContent = isOpen ? "Info" : "Tutup Info";
  }
});

const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const closeMenu = () => {
  nav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Buka menu");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav?.classList.contains("is-open")) {
    closeMenu();
    menuToggle?.focus();
  }
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
