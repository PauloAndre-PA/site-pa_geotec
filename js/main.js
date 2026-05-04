// =====================================================
//  MAIN.JS — Controle de tabs (index.html)
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  if (typeof getRootPath === 'function' && typeof renderHeader === 'function') {
    const root       = getRootPath();
    const activePage = getActivePage();

    const headerEl = document.getElementById('site-header');
    if (headerEl) headerEl.outerHTML = renderHeader(root, activePage);

    const footerEl = document.getElementById('site-footer');
    if (footerEl) footerEl.outerHTML = renderFooter(root);
  }

  if (typeof renderContatoSection === 'function') renderContatoSection();

  const tabLinks = document.querySelectorAll('[data-tab-link]');
  const sections = document.querySelectorAll('.tab-section');

  function activateTab(tabId, updateHistory = true, skipScroll = false) {
    sections.forEach(section => {
      section.classList.toggle('active', section.id === tabId);
    });
    tabLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.tabLink === tabId);
    });
    if (updateHistory) {
      const newUrl = tabId === 'inicio' ? 'index.html' : `index.html#${tabId}`;
      history.replaceState(null, '', newUrl);
    }
    // ✅ Só rola para o topo se não for um scroll para âncora
    if (!skipScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  tabLinks.forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const tabId = link.dataset.tabLink;
      if (!tabId) return;
      event.preventDefault();
      activateTab(tabId);
    });
  });

  const hash = window.location.hash.replace('#', '');
  const tabIds = ['inicio', 'portfolio'];

  if (tabIds.includes(hash)) {
    // ✅ É uma tab válida — ativa normalmente
    activateTab(hash, false);
  } else if (hash === 'contatohome-section-content') {
    // ✅ É a âncora de contato — ativa a tab início sem rolar pro topo
    activateTab('inicio', false, true);

    // Aguarda o render da seção e faz o scroll suave
    setTimeout(() => {
      const el = document.getElementById('contatohome-section-content');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } else {
    // ✅ Nenhum hash ou hash desconhecido — vai para o início
    activateTab('inicio', false);
  }
});