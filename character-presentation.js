// v2.10.1 — shared canonical character presentation for active case scenes.
var caseCharacterAssets = {
  puanSuraya: {
    name: "Puan Suraya",
    mugshot: "assets/characters/mugshots/puanSuraya.webp",
    pose: "assets/characters/poses/puanSuraya.webp",
  },
  affan: {
    name: "Affan",
    mugshot: "assets/characters/mugshots/affan.webp",
    pose: "assets/characters/poses/affan.webp",
  },
  farah: {
    name: "Cikgu Farah",
    mugshot: "assets/characters/mugshots/farah.webp",
    pose: "assets/characters/poses/farah.webp",
  },
  meiLing: {
    name: "Mei Ling",
    mugshot: "assets/characters/mugshots/meiLing.webp",
    pose: "assets/characters/poses/meiLing.webp",
  },
  xiaoFeng: {
    name: "Xiao Feng",
    mugshot: "assets/characters/mugshots/xiaoFeng.webp",
    pose: "assets/characters/poses/xiaoFeng.webp",
  },
  ayyash: {
    name: "Ayyash",
    mugshot: "assets/characters/mugshots/ayyash.webp",
    pose: "assets/characters/poses/ayyash.webp",
  },
  klu: {
    name: "KLU",
    mugshot: "assets/characters/mugshots/klu.webp",
    pose: "assets/klu.svg",
  },
};
var caseCharacterDialogue = function (
  id,
  text,
  { label = "DIALOG WATAK", compact = false } = {},
) {
  const person = caseCharacterAssets[id];
  if (!person) return "";
  return `<aside class="character-dialogue ${compact ? "compact" : ""}" role="note" aria-label="${person.name} berkata"><img src="${person.mugshot}" alt="Potret ${person.name}" loading="eager"><div><div class="eyebrow">${label}</div><b>${person.name}</b><p>“${text}”</p></div></aside>`;
};
var characterMoment = function (ids, title, text) {
  return `<section class="character-moment" aria-label="${title}"><div class="character-moment-poses">${ids
    .map((id) => {
      const person = caseCharacterAssets[id];
      return `<figure><img src="${person.pose}" alt="${person.name}" loading="eager"><figcaption>${person.name}</figcaption></figure>`;
    })
    .join(
      "",
    )}</div><div><div class="eyebrow">MOMEN WATAK</div><h3>${title}</h3><p>${text}</p></div></section>`;
};
var resolutionPresentation = function (background, backgroundAlt, ids, caption) {
  return `<section class="resolution-presentation"><figure class="resolution-environment"><img src="${background}" alt="${backgroundAlt}"><figcaption>${caption}</figcaption></figure><div class="resolution-cast" aria-label="Watak dalam resolusi">${ids
    .map((id) => {
      const person = caseCharacterAssets[id];
      return `<figure class="resolution-pose-card"><img src="${person.pose}" alt="${person.name}"><figcaption>${person.name}</figcaption></figure>`;
    })
    .join("")}</div></section>`;
};
var integratedResolutionPresentation = function (image, alt, caption) {
  return `<figure class="integrated-resolution"><img src="${image}" alt="${alt}" loading="eager"><figcaption>${caption}</figcaption></figure>`;
};
