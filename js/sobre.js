// =====================================================
//  SOBRE.JS — Sidebar scroll e active state
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  const sidebar  = document.getElementById('sobre-sidebar');
  const content  = document.querySelector('.portfolio-main-content'); // ← mudança aqui
  const sections = document.querySelectorAll('.portfolio-section[id]');
  const links    = document.querySelectorAll('.portfolio-sidebar-link');

  if (!sidebar || !content) return;

  // ── Mostra sidebar só depois que o conteúdo aparecer ──
  const observer = new IntersectionObserver(
    ([entry]) => {
      document.body.classList.toggle('portfolio-sidebar-visible', entry.isIntersecting);
      document.body.classList.toggle('portfolio-sidebar-hidden-for-closing', !entry.isIntersecting);
    },
    {
      threshold: 0,
      rootMargin: '0px 0px -80% 0px' // ← sidebar aparece só quando conteúdo está bem visível
    }
  );
  observer.observe(content);

  // ── Marca link ativo conforme seção visível ──
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach(section => sectionObserver.observe(section));
});
