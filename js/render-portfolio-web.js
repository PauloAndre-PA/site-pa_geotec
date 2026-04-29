function escapeHtml(text) {
  return String(text ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function normalizeImage(image, fallback = {}) {
  if (!image) {
    return {
      src: '',
      width: fallback.width || '',
      height: fallback.height || ''
    };
  }

  if (typeof image === 'string') {
    return {
      src: image,
      width: fallback.width || '',
      height: fallback.height || ''
    };
  }

  return {
    src: image.src || '',
    width: image.width || fallback.width || '',
    height: image.height || fallback.height || ''
  };
}

function renderTagList(tags = [], className) {
  return tags.map(tag => `<span class="${className}">${escapeHtml(tag)}</span>`).join('');
}

function collectProjectImages(project) {
  const images = [];

  if (project.imagemCapa) {
    images.push({
      ...normalizeImage(project.imagemCapa),
      alt: project.titulo
    });
  }

  if (Array.isArray(project.paginasExtras)) {
    project.paginasExtras.forEach((extra, extraIndex) => {
      if (Array.isArray(extra.imagens)) {
        extra.imagens.forEach((img, imageIndex) => {
          images.push({
            ...normalizeImage(img),
            alt: `${project.titulo} - imagem ${extraIndex + 1}.${imageIndex + 1}`
          });
        });
      }
    });
  }

  return images.filter(item => item.src);
}

function renderSectionHeader(title) {
  return `
    <div class="portfolio-section-header">
      <h2>${escapeHtml(title)}</h2>
      <div class="portfolio-section-line"></div>
    </div>
  `;
}

function renderPortfolioSidebar(data) {
  return `
    <aside class="portfolio-sidebar" aria-label="Navegação lateral do portfólio">
      <div class="portfolio-sidebar-inner">
        <div class="portfolio-sidebar-label">Navegação</div>

        <nav class="portfolio-sidebar-nav">
          <a href="#perfil-profissional" class="portfolio-sidebar-link active" data-sidebar-link>
            Perfil
          </a>

          <a href="#experiencia-profissional" class="portfolio-sidebar-link" data-sidebar-link>
            Experiência
          </a>

          <a href="#formacao-cursos-ferramentas" class="portfolio-sidebar-link" data-sidebar-link>
            Formação
          </a>

          <a href="#competencias-tecnicas" class="portfolio-sidebar-link" data-sidebar-link>
            Competências
          </a>

          <a href="#projetos-desenvolvidos" class="portfolio-sidebar-link" data-sidebar-link>
            Projetos
          </a>

          <div class="portfolio-sidebar-subnav">
            ${data.projetos.map((project) => `
              <a
                href="#projeto-${escapeHtml(project.numero)}"
                class="portfolio-sidebar-sublink"
                data-project-sidebar-link
              >
                <span class="portfolio-sidebar-sublink-text">
                  Projeto ${escapeHtml(project.numero)}
                </span>
              </a>
            `).join('')}
          </div>
        </nav>
      </div>
    </aside>
  `;
}

function renderProfileSection(data) {
  return `
    <section id="perfil-profissional" class="portfolio-section layout-content portfolio-scroll-section">
      ${renderSectionHeader('Perfil Profissional')}

      <div class="portfolio-surface">
        <div class="portfolio-profile-grid">
          <div>
            <h3 class="portfolio-profile-name">${escapeHtml(data.perfil.nome)}</h3>
            <div class="portfolio-profile-role">${escapeHtml(data.perfil.cargo)}</div>

            <div class="layout-reading">
              <p class="portfolio-profile-text">${escapeHtml(data.perfil.resumo)}</p>
            </div>

            <div class="portfolio-chip-list">
              ${renderTagList(data.portfolio.tags, 'portfolio-chip')}
            </div>
          </div>

          <aside class="portfolio-info-list">
            <div class="portfolio-info-item">
              <div class="portfolio-info-label">Marca</div>
              <div class="portfolio-info-value">${escapeHtml(data.perfil.marca)}</div>
            </div>

            <div class="portfolio-info-item">
              <div class="portfolio-info-label">E-mail</div>
              <div class="portfolio-info-value">${escapeHtml(data.perfil.email)}</div>
            </div>

            <div class="portfolio-info-item">
              <div class="portfolio-info-label">LinkedIn</div>
              <div class="portfolio-info-value">
                <a
                  class="portfolio-link-inline"
                  href="${escapeHtml(data.perfil.linkedin)}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${escapeHtml(data.perfil.linkedinTexto)}
                </a>
              </div>
            </div>

            <div class="portfolio-info-item">
              <div class="portfolio-info-label">Localização</div>
              <div class="portfolio-info-value">${escapeHtml(data.perfil.localizacao)}</div>
            </div>

            <div class="portfolio-info-item">
              <div class="portfolio-info-label">Atualização</div>
              <div class="portfolio-info-value">${escapeHtml(data.portfolio.atualizacao)}</div>
            </div>

            <div class="portfolio-info-item">
              <div class="portfolio-info-label">Versão mais atualizada</div>
              <div class="portfolio-info-value">
                <a
                  class="portfolio-link-inline"
                  href="${escapeHtml(data.portfolio.linkGeral)}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir pasta do portfólio
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `;
}

function renderExperienceSection(data) {
  return `
    <section id="experiencia-profissional" class="portfolio-section layout-content portfolio-scroll-section">
      ${renderSectionHeader('Experiência Profissional')}

      <div class="portfolio-surface">
        <div class="portfolio-experience-list">
          ${data.experiencias.map(exp => `
            <article class="portfolio-experience-item">
              <div class="portfolio-experience-side">
                <div class="portfolio-experience-company">${escapeHtml(exp.empresa)}</div>
                <div class="portfolio-experience-period">${escapeHtml(exp.periodo)}</div>

                <div class="portfolio-role-stack">
                  ${exp.cargos.map(cargo => `
                    <div class="portfolio-role-badge">${escapeHtml(cargo)}</div>
                  `).join('')}
                </div>
              </div>

              <div class="portfolio-experience-body">
                <p>${escapeHtml(exp.descricao)}</p>
                <ul class="portfolio-bullet-list">
                  ${exp.atividades.map(item => `
                    <li>${escapeHtml(item)}</li>
                  `).join('')}
                </ul>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderEducationSection(data) {
  return `
    <section id="formacao-cursos-ferramentas" class="portfolio-section layout-content portfolio-scroll-section">
      ${renderSectionHeader('Formação, Cursos e Ferramentas')}

      <div class="portfolio-surface">
        <div class="portfolio-grid-2">
          <div class="portfolio-subsection">
            <h3>Formação Acadêmica</h3>
            <div class="portfolio-plain-list">
              ${data.formacao.academica.map(item => `
                <div class="portfolio-plain-item">
                  <div class="portfolio-plain-title">${escapeHtml(item.curso)}</div>
                  <div class="portfolio-plain-subtitle">${escapeHtml(item.instituicao)}</div>
                  <div class="portfolio-plain-meta">${escapeHtml(item.periodo)}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="portfolio-subsection">
            <h3>Cursos Complementares</h3>
            <div class="portfolio-plain-list">
              ${data.formacao.cursos.map(item => `
                <div class="portfolio-plain-item">
                  <div class="portfolio-plain-title">${escapeHtml(item.curso)}</div>
                  <div class="portfolio-plain-subtitle">${escapeHtml(item.instituicao)}</div>
                  <div class="portfolio-plain-meta">${escapeHtml(item.periodo)}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="portfolio-subsection" style="margin-top: 34px;">
          <h3>Ferramentas e Softwares</h3>
          <div class="portfolio-tools-grid">
            ${data.ferramentas.map(item => `
              <div class="portfolio-tool-box">
                <h4>${escapeHtml(item.titulo)}</h4>
                <p>${escapeHtml(item.descricao)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCompetencySection(data) {
  return `
    <section id="competencias-tecnicas" class="portfolio-section layout-content portfolio-scroll-section">
      ${renderSectionHeader('Competências Técnicas')}

      <div class="portfolio-surface">
        <div class="portfolio-competency-grid">
          ${data.competencias.map(group => `
            <article class="portfolio-competency-item">
              <h3>${escapeHtml(group.titulo)}</h3>
              <ul class="portfolio-bullet-list">
                ${group.itens.map(item => `
                  <li>${escapeHtml(item)}</li>
                `).join('')}
              </ul>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderProjectGallery(project, projectIndex) {
  const images = collectProjectImages(project);

  if (!images.length) {
    return '';
  }

  const mainImage = images[0];
  const projectClass = `portfolio-project-gallery-${String(project.numero).padStart(2, '0')}`;

  return `
    <div
      class="portfolio-gallery-wrap ${projectClass}"
      data-gallery
      data-gallery-index="${projectIndex}"
      tabindex="0"
      aria-label="Galeria de imagens do projeto ${escapeHtml(project.titulo)}"
    >
      <div class="portfolio-gallery-main">
        <button
          type="button"
          class="portfolio-gallery-arrow portfolio-gallery-arrow-prev"
          data-gallery-prev
          aria-label="Imagem anterior"
        >
          ‹
        </button>

        <div class="portfolio-gallery-frame">
          <img
            id="portfolio-gallery-main-${projectIndex}"
            src="${escapeHtml(mainImage.src)}"
            alt="${escapeHtml(mainImage.alt || project.titulo)}"
            data-gallery-main
          >
        </div>

        <button
          type="button"
          class="portfolio-gallery-arrow portfolio-gallery-arrow-next"
          data-gallery-next
          aria-label="Próxima imagem"
        >
          ›
        </button>
      </div>

      <div class="portfolio-gallery-thumbs">
        ${images.map((img, imageIndex) => `
          <button
            type="button"
            class="portfolio-gallery-thumb ${imageIndex === 0 ? 'active' : ''}"
            data-gallery-thumb
            data-target="portfolio-gallery-main-${projectIndex}"
            data-src="${escapeHtml(img.src)}"
            data-alt="${escapeHtml(img.alt || project.titulo)}"
            data-image-index="${imageIndex}"
            aria-label="Abrir imagem ${imageIndex + 1}"
          >
            <img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt || project.titulo)}">
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function renderProjectExtras(project) {
  if (!Array.isArray(project.paginasExtras) || !project.paginasExtras.length) {
    return '';
  }

  return `
    <div class="portfolio-extra-list">
      ${project.paginasExtras.map(extra => `
        <div class="portfolio-extra-item">
          <p>${escapeHtml(extra.texto)}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function renderProjectsSection(data) {
  return `
    <section id="projetos-desenvolvidos" class="portfolio-section layout-wide portfolio-scroll-section">
      ${renderSectionHeader('Projetos Desenvolvidos')}

      <div class="portfolio-surface">
        <div class="portfolio-projects-intro">
          <p class="portfolio-projects-intro-text">
            Esta seção reúne projetos aplicados em geoprocessamento, com foco em análise territorial,
            produção cartográfica e organização de dados espaciais para apoio técnico e tomada de decisão.
          </p>
        </div>

        <div class="portfolio-projects-list">
          ${data.projetos.map((project, index) => `
            <article
              id="projeto-${escapeHtml(project.numero)}"
              class="portfolio-project ${escapeHtml(project.slug || '')}"
              data-project-section
            >
              <div class="portfolio-project-top">
                <div class="portfolio-project-number">Projeto ${escapeHtml(project.numero)}</div>
                <h3 class="portfolio-project-title">${escapeHtml(project.titulo)}</h3>
              </div>

              <div class="portfolio-project-grid">
                <div class="portfolio-project-block">
                  <h4>Objetivo / Contexto</h4>
                  <p>${escapeHtml(project.objetivo)}</p>
                </div>

                <div class="portfolio-project-block">
                  <h4>Tipo de Análise</h4>
                  <p>${escapeHtml(project.tipoAnalise)}</p>
                </div>

                <div class="portfolio-project-block">
                  <h4>Dados / Insumos</h4>
                  <div class="portfolio-tag-group">
                    ${renderTagList(project.dados, 'portfolio-tag-pill')}
                  </div>
                </div>

                <div class="portfolio-project-block">
                  <h4>Ferramentas</h4>
                  <div class="portfolio-tag-group">
                    ${renderTagList(project.ferramentas, 'portfolio-tag-pill')}
                  </div>
                </div>
              </div>

              <div class="portfolio-project-block">
                <h4>Fluxo Metodológico</h4>
                <div class="portfolio-method-list">
                  ${project.metodologia.map((step, stepIndex) => `
                    <div class="portfolio-method-step">
                      <div class="portfolio-method-number">${String(stepIndex + 1).padStart(2, '0')}</div>
                      <div class="portfolio-method-text">${escapeHtml(step)}</div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="portfolio-project-block">
                <h4>Arquivos do Projeto</h4>
                <a
                  class="portfolio-project-link"
                  href="${escapeHtml(project.linkProjeto)}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir pasta do projeto no Google Drive
                </a>
              </div>

              ${renderProjectGallery(project, index)}
              ${renderProjectExtras(project)}

              ${index < data.projetos.length - 1 ? '<div class="portfolio-project-divider"></div>' : ''}
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderContactSection(data) {
  return `
    <section id="contato-final" class="portfolio-contact-section">
      <div class="portfolio-contact-band">
        <div class="layout-wide">
          <div class="portfolio-contact-card">
            <div class="portfolio-contact-left">
              <h2 class="portfolio-contact-title">Vamos conversar?</h2>
              <p class="portfolio-contact-text">
                Este portfólio reúne minha trajetória, competências e projetos em geoprocessamento.
                Caso meu perfil esteja alinhado com a sua oportunidade, fico à disposição para uma conversa.
              </p>
            </div>

            <div class="portfolio-contact-right">
              <div class="portfolio-contact-item">
                <div class="portfolio-contact-item-label">Nome</div>
                <div class="portfolio-contact-item-value">${escapeHtml(data.perfil.nome)}</div>
              </div>

              <div class="portfolio-contact-item">
                <div class="portfolio-contact-item-label">Cargo</div>
                <div class="portfolio-contact-item-value">${escapeHtml(data.perfil.cargo)}</div>
              </div>

              <div class="portfolio-contact-item">
                <div class="portfolio-contact-item-label">E-mail</div>
                <div class="portfolio-contact-item-value">${escapeHtml(data.perfil.email)}</div>
              </div>

              <div class="portfolio-contact-item">
                <div class="portfolio-contact-item-label">LinkedIn</div>
                <div class="portfolio-contact-item-value">
                  <a
                    class="portfolio-contact-link"
                    href="${escapeHtml(data.perfil.linkedin)}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ${escapeHtml(data.perfil.linkedinTexto)}
                  </a>
                </div>
              </div>

              <div class="portfolio-contact-item">
                <div class="portfolio-contact-item-label">Portfólio Completo</div>
                <div class="portfolio-contact-item-value">
                  <a
                    class="portfolio-contact-link"
                    href="${escapeHtml(data.portfolio.linkGeral)}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir pasta do portfólio
                  </a>
                </div>
              </div>

              <div class="portfolio-contact-item">
                <div class="portfolio-contact-item-label">Localização</div>
                <div class="portfolio-contact-item-value">${escapeHtml(data.perfil.localizacao)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderPortfolioWeb(data) {
  return `
    <div class="portfolio-main-grid">
      ${renderPortfolioSidebar(data)}

      <div class="portfolio-main-content">
        ${renderProfileSection(data)}
        ${renderExperienceSection(data)}
        ${renderEducationSection(data)}
        ${renderCompetencySection(data)}
        ${renderProjectsSection(data)}
      </div>
    </div>

    ${renderContactSection(data)}
  `;
}

async function loadPortfolioData() {
  const response = await fetch('portfolio/data/portfolio.json');

  if (!response.ok) {
    throw new Error('Erro ao carregar portfolio/data/portfolio.json');
  }

  return response.json();
}

function setActiveGalleryImage(gallery, nextIndex) {
  const thumbs = Array.from(gallery.querySelectorAll('[data-gallery-thumb]'));
  const mainImage = gallery.querySelector('[data-gallery-main]');

  if (!thumbs.length || !mainImage) return;

  const normalizedIndex = (nextIndex + thumbs.length) % thumbs.length;
  const activeThumb = thumbs[normalizedIndex];
  const src = activeThumb.getAttribute('data-src');
  const alt = activeThumb.getAttribute('data-alt');

  if (!src) return;

  mainImage.src = src;
  mainImage.alt = alt || '';

  thumbs.forEach((thumb) => thumb.classList.remove('active'));
  activeThumb.classList.add('active');
}

function getCurrentGalleryIndex(gallery) {
  const thumbs = Array.from(gallery.querySelectorAll('[data-gallery-thumb]'));
  return thumbs.findIndex((thumb) => thumb.classList.contains('active'));
}

function setupPortfolioGallery() {
  const galleries = document.querySelectorAll('[data-gallery]');

  galleries.forEach((gallery) => {
    const thumbs = Array.from(gallery.querySelectorAll('[data-gallery-thumb]'));
    const prevButton = gallery.querySelector('[data-gallery-prev]');
    const nextButton = gallery.querySelector('[data-gallery-next]');

    thumbs.forEach((button, index) => {
      button.addEventListener('click', () => {
        setActiveGalleryImage(gallery, index);
        gallery.focus();
      });
    });

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        const currentIndex = getCurrentGalleryIndex(gallery);
        setActiveGalleryImage(gallery, currentIndex - 1);
        gallery.focus();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        const currentIndex = getCurrentGalleryIndex(gallery);
        setActiveGalleryImage(gallery, currentIndex + 1);
        gallery.focus();
      });
    }

    gallery.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        const currentIndex = getCurrentGalleryIndex(gallery);
        setActiveGalleryImage(gallery, currentIndex - 1);
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        const currentIndex = getCurrentGalleryIndex(gallery);
        setActiveGalleryImage(gallery, currentIndex + 1);
      }
    });
  });
}

function setActiveSidebarLink(activeId) {
  const links = Array.from(document.querySelectorAll('[data-sidebar-link]'));

  links.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${activeId}`);
  });
}

function setActiveProjectSidebarLink(activeId) {
  const links = Array.from(document.querySelectorAll('[data-project-sidebar-link]'));

  links.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${activeId}`);
  });
}

function getBestVisibleSection(sections) {
  if (!sections.length) return null;

  const scrollPosition = window.scrollY + 160;
  let currentSection = sections[0];

  for (const section of sections) {
    if (section.offsetTop <= scrollPosition) {
      currentSection = section;
    } else {
      break;
    }
  }

  return currentSection;
}

function getBestVisibleProject(projectSections) {
  if (!projectSections.length) return null;

  const scrollPosition = window.scrollY + 180;
  let currentProject = projectSections[0];

  for (const project of projectSections) {
    if (project.offsetTop <= scrollPosition) {
      currentProject = project;
    } else {
      break;
    }
  }

  return currentProject;
}

function setupPortfolioSidebarNav() {
  const sectionLinks = Array.from(document.querySelectorAll('[data-sidebar-link]'));
  const sections = [
    document.getElementById('perfil-profissional'),
    document.getElementById('experiencia-profissional'),
    document.getElementById('formacao-cursos-ferramentas'),
    document.getElementById('competencias-tecnicas'),
    document.getElementById('projetos-desenvolvidos')
  ].filter(Boolean);

  const projectLinks = Array.from(document.querySelectorAll('[data-project-sidebar-link]'));
  const projectSections = Array.from(document.querySelectorAll('[data-project-section]'));

  if (!sectionLinks.length || !sections.length) return;

  function updateActiveStates() {
    const activeSection = getBestVisibleSection(sections);
    if (activeSection) {
      const activeId = activeSection.getAttribute('id');
      if (activeId) {
        setActiveSidebarLink(activeId);
      }
    }

    const projectsSection = document.getElementById('projetos-desenvolvidos');
    const closingSection = document.getElementById('contato-final');

    if (!projectsSection || !projectSections.length || !projectLinks.length) return;

    const scrollY = window.scrollY;
    const referenceLine = scrollY + 180;

    const projectsTop = projectsSection.offsetTop;
    const closingTop = closingSection ? closingSection.offsetTop : Number.POSITIVE_INFINITY;

    const insideProjectsArea = referenceLine >= projectsTop && referenceLine < closingTop;

    if (!insideProjectsArea) {
      projectLinks.forEach((link) => link.classList.remove('active'));
      return;
    }

    const activeProject = getBestVisibleProject(projectSections);
    if (!activeProject) return;

    const activeProjectId = activeProject.getAttribute('id');
    if (!activeProjectId) return;

    setActiveProjectSidebarLink(activeProjectId);
  }

  sectionLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      setActiveSidebarLink(target.id);

      if (target.id !== 'projetos-desenvolvidos') {
        setActiveProjectSidebarLink('');
      }

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      window.setTimeout(updateActiveStates, 80);
      window.setTimeout(updateActiveStates, 220);
      window.setTimeout(updateActiveStates, 420);
      window.setTimeout(updateActiveStates, 700);
    });
  });

  projectLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      setActiveSidebarLink('projetos-desenvolvidos');
      setActiveProjectSidebarLink(target.id);

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      window.setTimeout(updateActiveStates, 80);
      window.setTimeout(updateActiveStates, 220);
      window.setTimeout(updateActiveStates, 420);
      window.setTimeout(updateActiveStates, 700);
    });
  });

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveStates();
        ticking = false;
      });
      ticking = true;
    }
  });

  window.addEventListener('resize', updateActiveStates);

  updateActiveStates();
}

function setupPortfolioSidebarVisibility() {
  const hero = document.querySelector('.portfolio-hero');
  const closingSection = document.getElementById('contato-final');
  const body = document.body;
  const sidebar = document.querySelector('.portfolio-sidebar');

  if (!body || !sidebar) return;

  if (!hero && !closingSection) {
    body.classList.add('portfolio-sidebar-visible');
    body.classList.remove('portfolio-sidebar-hidden-for-closing');
    return;
  }

  function updateSidebarVisibility() {
    let shouldShowAfterHero = true;
    let shouldHideOnClosing = false;

    if (hero) {
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      const triggerPoint = heroBottom - 140;
      shouldShowAfterHero = window.scrollY >= triggerPoint;
    }

    if (closingSection) {
      const sidebarRect = sidebar.getBoundingClientRect();
      const closingTop = closingSection.getBoundingClientRect().top;
      shouldHideOnClosing = closingTop <= sidebarRect.bottom + 24;
    }

    body.classList.toggle('portfolio-sidebar-visible', shouldShowAfterHero && !shouldHideOnClosing);
    body.classList.toggle('portfolio-sidebar-hidden-for-closing', shouldHideOnClosing);
  }

  window.addEventListener('scroll', updateSidebarVisibility, { passive: true });
  window.addEventListener('resize', updateSidebarVisibility);

  updateSidebarVisibility();
}

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('portfolioWebContent');
  if (!container) return;

  try {
    const data = await loadPortfolioData();
    container.innerHTML = renderPortfolioWeb(data);
    setupPortfolioGallery();
    setupPortfolioSidebarNav();
    setupPortfolioSidebarVisibility();
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <div class="portfolio-empty-message">
        Não foi possível carregar os dados do portfólio web.
      </div>
    `;
  }
});
