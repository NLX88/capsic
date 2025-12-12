(function () {
  // EDITA este pool con tus archivos reales en /sources/articles/
  const IMAGE_POOL = [
    'sources/bimages/1.png',
    'sources/bimages/2.png',
    'sources/bimages/3.png',
    'sources/bimages/4.png',
    'sources/bimages/5.png',
    'sources/bimages/6.png',
    'sources/bimages/7.png',
  ];

  // Evitar correr en páginas que no son de artículo
  document.addEventListener('DOMContentLoaded', () => {
    const article = document.querySelector('article.contenido');
    if (!article || IMAGE_POOL.length === 0) return;

    const paragraphs = Array.from(article.querySelectorAll('p'));
    if (paragraphs.length < 2) return;

    // Cuántas imágenes insertar (por qué: control per-artículo)
    const maxByAttr = parseInt(article.getAttribute('data-images-count') || '0', 10);
    const IMG_COUNT = Number.isFinite(maxByAttr) && maxByAttr > 0 ? maxByAttr : Math.min(3, paragraphs.length - 1);

    // Indices de párrafos candidatos (evitamos el primero si es muy cerca del título)
    const candidates = paragraphs.map((_, i) => i).filter(i => i > 0 && i < paragraphs.length);
    shuffle(candidates);

    // Elegimos posiciones únicas y las primeras IMG_COUNT
    const positions = candidates.slice(0, IMG_COUNT).sort((a, b) => a - b);

    // Tomar imágenes únicas aleatorias del pool
    const images = uniqueRandomFrom(IMAGE_POOL, IMG_COUNT);

    positions.forEach((pIndex, idx) => {
      const targetP = paragraphs[pIndex];
      const fig = buildFigure(images[idx]);
      // Insertamos justo después del párrafo
      targetP.insertAdjacentElement('afterend', fig);
    });
  });

  function buildFigure(src) {
    const figure = document.createElement('figure');
    figure.className = 'art-figure';

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Ilustración relacionada al artículo';
    img.loading = 'lazy';
    img.decoding = 'async';

    const caption = document.createElement('figcaption');
    caption.textContent = ''; // opcional: agrega texto o deja vacío

    figure.appendChild(img);
    figure.appendChild(caption);
    return figure;
  }

  function uniqueRandomFrom(arr, n) {
    const copy = arr.slice();
    shuffle(copy);
    return copy.slice(0, Math.min(n, copy.length));
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
})();