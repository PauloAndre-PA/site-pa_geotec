// =====================================================
//  CONTEUDO-POST.JS — Sidebar scroll + Galerias
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

// ══ SIDEBAR ══
const sidebar  = document.getElementById('conteudo-sidebar');
const content  = document.querySelector('.portfolio-main-content');
const sections = document.querySelectorAll('.portfolio-section[id]');
const links    = document.querySelectorAll('.portfolio-sidebar-link');

if (sidebar && content) {
  let footerVisivel = false;

  // ── Observa o footer (injetado dinamicamente) ──
  function observarFooter() {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        footerVisivel = entry.isIntersecting;
        document.body.classList.toggle('portfolio-sidebar-visible', !footerVisivel);
        document.body.classList.toggle('portfolio-sidebar-hidden-for-closing', footerVisivel);
      },
      { threshold: 0 }
    );
    footerObserver.observe(footer);
  }

  // Tenta imediatamente, senão aguarda o DOM estabilizar
  if (document.querySelector('.site-footer')) {
    observarFooter();
  } else {
    const mutationObserver = new MutationObserver(() => {
      if (document.querySelector('.site-footer')) {
        mutationObserver.disconnect();
        observarFooter();
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  // ── Mostra/esconde sidebar conforme conteúdo visível ──
  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      if (!footerVisivel) {
        document.body.classList.toggle('portfolio-sidebar-visible', entry.isIntersecting);
        document.body.classList.toggle('portfolio-sidebar-hidden-for-closing', !entry.isIntersecting);
      }
    },
    { threshold: 0, rootMargin: '0px 0px -80% 0px' }
  );
  visibilityObserver.observe(content);

  // ── Marca link ativo + scroll automático na sidebar ──
  const sidebarInner = sidebar.querySelector('.portfolio-sidebar-inner');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => {
            const isActive = link.getAttribute('href') === `#${entry.target.id}`;
            link.classList.toggle('active', isActive);

            // ✅ Scroll automático para o link ativo dentro da sidebar
            if (isActive && sidebarInner) {
              const linkTop    = link.offsetTop;
              const linkHeight = link.offsetHeight;
              const innerHeight = sidebarInner.offsetHeight;
              const scrollTop  = sidebarInner.scrollTop;

              const abaixoDaVisao = linkTop + linkHeight > scrollTop + innerHeight;
              const acimaDaVisao  = linkTop < scrollTop;

              if (abaixoDaVisao || acimaDaVisao) {
                sidebarInner.scrollTo({
                  top: linkTop - innerHeight / 2 + linkHeight / 2,
                  behavior: 'smooth'
                });
              }
            }
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach(section => sectionObserver.observe(section));
}

  // ══ GALERIAS ══
  document.querySelectorAll('[data-blog-gallery]').forEach(gallery => {
    const mainImg = gallery.querySelector('[data-gallery-main-image]');
    const caption = gallery.querySelector('[data-gallery-caption]');
    const counter = gallery.querySelector('[data-gallery-counter]');
    const thumbs  = Array.from(gallery.querySelectorAll('[data-gallery-thumb]'));
    const btnPrev = gallery.querySelector('[data-gallery-prev]');
    const btnNext = gallery.querySelector('[data-gallery-next]');

    if (!mainImg || thumbs.length === 0) return;

    let current = 0;

    function goTo(index) {
      thumbs[current].classList.remove('active');
      current = (index + thumbs.length) % thumbs.length;
      const thumb = thumbs[current];

      mainImg.src = thumb.dataset.full;
      mainImg.alt = thumb.dataset.alt || '';
      if (caption) caption.textContent = thumb.dataset.caption || '';
      if (counter) counter.textContent = `${current + 1} / ${thumbs.length}`;

      thumbs[current].classList.add('active');
    }

    goTo(0);

    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => goTo(i));
    });

    if (btnPrev) btnPrev.addEventListener('click', () => goTo(current - 1));
    if (btnNext) btnNext.addEventListener('click', () => goTo(current + 1));

    gallery.setAttribute('tabindex', '0');
    gallery.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    });
  });

});
