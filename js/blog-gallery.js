function setupBlogGallery() {
  const galleries = document.querySelectorAll('[data-blog-gallery]');

  galleries.forEach((gallery) => {
    const thumbs = Array.from(gallery.querySelectorAll('[data-gallery-thumb]'));
    const mainImage = gallery.querySelector('[data-gallery-main-image]');
    const caption = gallery.querySelector('[data-gallery-caption]');
    const counter = gallery.querySelector('[data-gallery-counter]');
    const prevButton = gallery.querySelector('[data-gallery-prev]');
    const nextButton = gallery.querySelector('[data-gallery-next]');

    if (!thumbs.length || !mainImage) return;

    function setActiveImage(index) {
      const total = thumbs.length;
      const normalizedIndex = (index + total) % total;
      const activeThumb = thumbs[normalizedIndex];

      const full = activeThumb.getAttribute('data-full') || '';
      const alt = activeThumb.getAttribute('data-alt') || '';
      const text = activeThumb.getAttribute('data-caption') || '';

      mainImage.src = full;
      mainImage.alt = alt;

      if (caption) {
        caption.textContent = text;
      }

      if (counter) {
        counter.textContent = `${normalizedIndex + 1} / ${total}`;
      }

      thumbs.forEach((thumb) => thumb.classList.remove('active'));
      activeThumb.classList.add('active');
    }

    function getCurrentIndex() {
      const currentIndex = thumbs.findIndex((thumb) => thumb.classList.contains('active'));
      return currentIndex >= 0 ? currentIndex : 0;
    }

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        setActiveImage(index);
      });
    });

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        setActiveImage(getCurrentIndex() - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        setActiveImage(getCurrentIndex() + 1);
      });
    }

    setActiveImage(getCurrentIndex());
  });
}

document.addEventListener('DOMContentLoaded', setupBlogGallery);
