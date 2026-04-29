const tabLinks = document.querySelectorAll('[data-tab-link]');
const sections = document.querySelectorAll('.tab-section');

function activateTab(tabId, updateHash = true) {
  sections.forEach((section) => {
    section.classList.toggle('active', section.id === tabId);
  });

  tabLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.tabLink === tabId);
  });

  if (updateHash) {
    const newUrl = tabId === 'inicio' ? 'index.html' : `index.html#${tabId}`;
    history.replaceState(null, '', newUrl);
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

tabLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const tabId = link.dataset.tabLink;
    if (!tabId) return;

    event.preventDefault();
    activateTab(tabId);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  const validTab = hash && document.getElementById(hash) ? hash : 'inicio';
  activateTab(validTab, false);
});
