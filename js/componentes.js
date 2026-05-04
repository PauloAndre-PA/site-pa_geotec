// =====================================================
//  COMPONENTES.JS — Injeta Header e Footer em todas as páginas
// =====================================================

// ── Detecta o caminho relativo até a raiz ──
function getRootPath() {
  // Conta quantas pastas de profundidade o arquivo está
  const depth = window.location.pathname
    .split('/')
    .filter(Boolean)
    .length - 1; // -1 porque o último segmento é o arquivo .html

  // Retorna '../' repetido conforme a profundidade
  return depth > 0 ? '../'.repeat(depth) : './';
}

// ── Detecta a página ativa para marcar o nav-link ──
function getActivePage() {
  const path = window.location.pathname;
  if (path.includes('projetos'))  return 'projetos';
  if (path.includes('conteudos'))  return 'conteudos';
  if (path.includes('sobre'))     return 'sobre';
  return 'inicio'; // index.html ou raiz
}

// ── Renderiza o Header ──
function renderHeader(root, activePage) {
  const navItems = [
    { label: 'Início',    href: `${root}index.html`,             key: 'inicio',    tabLink: 'inicio'   },
    { label: 'Projetos',  href: `${root}paginas/projetos.html`,  key: 'projetos',  tabLink: null       },
    { label: 'Conteúdos', href: `${root}paginas/conteudos.html`, key: 'conteudos', tabLink: null       },
    { label: 'Sobre',     href: `${root}paginas/sobre.html`,     key: 'sobre',     tabLink: null       },
    { label: 'Contato', href: `${root}index.html#contatohome-section-content`, key: 'contato', tabLink: null },
  ];

  const navHTML = navItems.map(item => `
    <a
      href="${item.href}"
      class="nav-link${activePage === item.key ? ' active' : ''}"
      ${item.tabLink ? `data-tab-link="${item.tabLink}"` : ''}
    >${item.label}</a>
  `).join('');

  return `
    <header class="site-header">
      <div class="container-wide header-container">
        <div class="brand">
          <a href="${root}index.html" class="brand-logo-link">
            <img
              src="${root}imagens/logo-marca/logo_normal-fundo_transparente.svg"
              alt="PA GeoTec"
              class="brand-logo"
            >
          </a>
        </div>
        <nav class="main-nav" aria-label="Navegação principal">
          ${navHTML}
        </nav>
      </div>
    </header>
  `;
}

// ── Renderiza o Footer ──
function renderFooter(root) {
  const redesHTML = CONTATO.redes.map(rede => `
    <a
      class="footer-contact-link"
      href="${rede.href}"
      ${rede.externo ? 'target="_blank" rel="noopener noreferrer"' : ''}
    >${rede.label}</a>
  `).join('');

  return `
    <footer class="site-footer">
      <div class="container-wide footer-grid">

        <div class="footer-column footer-column-main">
          <h2 class="footer-title">Paulo André</h2>
          <p class="footer-text">Geoprocessamento, análise espacial e cartografia aplicada.</p>
          <p class="footer-text">Aqui reúno meu portfólio, projetos e conteúdos profissionais.</p>
        </div>

        <div class="footer-column">
          <h3 class="footer-heading">Navegação</h3>
          <nav class="footer-nav" aria-label="Navegação rodapé">
            <a class="footer-contact-link" href="${root}index.html">Início</a>
            <a class="footer-contact-link" href="${root}paginas/projetos.html">Projetos</a>
            <a class="footer-contact-link" href="${root}paginas/conteudos.html">Conteúdos</a>
            <a class="footer-contact-link" href="${root}paginas/sobre.html">Sobre</a>
            <a class="footer-contact-link" href="${root}index.html#contatohome-section-content">Contato</a>
          </nav>
        </div>

        <div class="footer-column">
          <h3 class="footer-heading">Contato</h3>
          <div class="footer-info-list">
            <a class="footer-contact-link" href="mailto:${CONTATO.email}">
              ${CONTATO.email}
            </a>
            <a class="footer-contact-link" href="tel:${CONTATO.telefone.replace(/\D/g, '')}">
              ${CONTATO.telefone}
            </a>
            <span class="footer-info-text">${CONTATO.cidade}</span>
          </div>
        </div>

        <div class="footer-column">
          <h3 class="footer-heading">Social</h3>
          <div class="footer-info-list">
            ${redesHTML}
          </div>
        </div>


      </div>
      <div class="container-wide footer-bottom">
        <p class="footer-bottom-text">© 2026 ${CONTATO.nome} — Site pessoal e portfólio profissional.</p>
      </div>
    </footer>
  `;
}

// ── Injeta tudo no DOM ──
document.addEventListener('DOMContentLoaded', () => {
  const root       = getRootPath();
  const activePage = getActivePage();

  // Injeta header
  const headerEl = document.getElementById('site-header');
  if (headerEl) {
    headerEl.outerHTML = renderHeader(root, activePage);
  }

  // Injeta footer
  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.outerHTML = renderFooter(root);
  }
});