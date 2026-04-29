function escapeArticleHtml(text) {
  return String(text ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function slugifyArticleTitle(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function renderArticleSidebarLinks(titles) {
  return titles.map((item) => `
    <a
      href="#${escapeArticleHtml(item.id)}"
      class="article-sidebar-link${item.active ? ' active' : ''}"
      data-article-sidebar-link
    >
      ${escapeArticleHtml(item.text)}
    </a>
  `).join('');
}

function getArticleHeaderOffset() {
  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.offsetHeight : 0;

  return headerHeight + 16;
}

function setActiveArticleSidebarLink(activeId) {
  const links = Array.from(document.querySelectorAll('[data-article-sidebar-link]'));

  links.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${activeId}`);
  });
}

function getBestVisibleArticleSection(sections) {
  if (!sections.length) return null;

  const offset = getArticleHeaderOffset();
  const scrollPosition = window.scrollY + offset + 8;

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

function scrollToArticleSection(target) {
  if (!target) return;

  const offset = getArticleHeaderOffset();
  const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: 'smooth'
  });
}

function setupArticleSidebarNav() {
  const sidebarNav = document.getElementById('article-sidebar-nav');
  const blocks = Array.from(document.querySelectorAll('[data-article-section]'));

  if (!sidebarNav || !blocks.length) return;

  const usedIds = new Set();

  const mappedTitles = blocks.map((block, index) => {
    const title = block.querySelector('.article-block-title');
    if (!title) return null;

    let baseId = title.id || slugifyArticleTitle(title.textContent.trim());

    if (!baseId) {
      baseId = `secao-${index + 1}`;
    }

    let finalId = baseId;
    let duplicateIndex = 2;

    while (usedIds.has(finalId) || (document.getElementById(finalId) && title.id !== finalId)) {
      finalId = `${baseId}-${duplicateIndex}`;
      duplicateIndex += 1;
    }

    usedIds.add(finalId);
    title.id = finalId;
    block.setAttribute('data-article-section-id', finalId);

    return {
      id: finalId,
      text: title.textContent.trim(),
      active: index === 0
    };
  }).filter(Boolean);

  sidebarNav.innerHTML = renderArticleSidebarLinks(mappedTitles);

  const sectionLinks = Array.from(document.querySelectorAll('[data-article-sidebar-link]'));
  const sections = mappedTitles
    .map((item) => document.getElementById(item.id))
    .filter(Boolean);

  if (!sectionLinks.length || !sections.length) return;

  function updateActiveStates() {
    const activeSection = getBestVisibleArticleSection(sections);
    if (!activeSection) return;

    const activeId = activeSection.getAttribute('id');
    if (!activeId) return;

    setActiveArticleSidebarLink(activeId);
  }

  sectionLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      setActiveArticleSidebarLink(target.id);
      scrollToArticleSection(target);

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

function setupArticleSidebarVisibility() {
  const hero = document.querySelector('.article-hero');
  const conclusion = document.querySelector('.article-conclusion');
  const body = document.body;
  const sidebar = document.querySelector('.article-sidebar');

  if (!body || !sidebar) return;

  if (!hero && !conclusion) {
    body.classList.add('article-sidebar-visible');
    body.classList.remove('article-sidebar-hidden-for-closing');
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

    if (conclusion) {
      const sidebarRect = sidebar.getBoundingClientRect();
      const conclusionTop = conclusion.getBoundingClientRect().top;
      shouldHideOnClosing = conclusionTop <= sidebarRect.bottom + 24;
    }

    body.classList.toggle('article-sidebar-visible', shouldShowAfterHero && !shouldHideOnClosing);
    body.classList.toggle('article-sidebar-hidden-for-closing', shouldHideOnClosing);
  }

  window.addEventListener('scroll', updateSidebarVisibility, { passive: true });
  window.addEventListener('resize', updateSidebarVisibility);

  updateSidebarVisibility();
}

document.addEventListener('DOMContentLoaded', () => {
  setupArticleSidebarNav();
  setupArticleSidebarVisibility();
});
