// v2.11.1 — premium educational visuals and integrated case resolutions.
const c022ResolutionBeforeVisualUpgrade = c022Resolution;
c022Resolution = function () {
  return c022ResolutionBeforeVisualUpgrade().replace(
    /<section class="resolution-presentation">[\s\S]*?<\/section>/,
    integratedResolutionPresentation(
      "assets/locations/balai-resolusi-c022.webp",
      "Puan Suraya dan Affan di ruang persiapan pentas yang telah lengkap",
      "Persiapan pentas telah lengkap.",
    ),
  );
};

const c023ResolutionBeforeVisualUpgrade = c023Resolution;
c023Resolution = function () {
  return c023ResolutionBeforeVisualUpgrade().replace(
    /<section class="resolution-presentation">[\s\S]*?<\/section>/,
    integratedResolutionPresentation(
      "assets/locations/perpustakaan-resolusi-c023.webp",
      "Cikgu Farah dan Mei Ling di meja penyuntingan Perpustakaan Bayuraya",
      "Buku panduan telah disemak di Perpustakaan Bayuraya.",
    ),
  );
};

const c024ResolutionBeforeVisualUpgrade = c024Resolution;
c024Resolution = function () {
  return c024ResolutionBeforeVisualUpgrade().replace(
    /<section class="resolution-presentation">[\s\S]*?<\/section>/,
    integratedResolutionPresentation(
      "assets/locations/dataran-resolusi-c024.webp",
      "Xiao Feng dan Ayyash di Pameran Jelajah Bahasa yang telah dipulihkan",
      "Penerangan pameran kini lengkap dan mudah difahami.",
    ),
  );
};
