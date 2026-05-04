function criarCardPost(post) {
  const tags = Array.isArray(post.categoria)
    ? `<span class="post-tag">${post.categoria.join(' · ')}</span>`
    : `<span class="post-tag">${post.categoria}</span>`;

  return `
    <a href="${post.link}" class="post-card post-card-link">
      ${post.imagem ? `
        <div class="post-card-img-wrap">
          <img src="${post.imagem}" alt="${post.titulo}" class="post-card-img" loading="lazy">
        </div>
      ` : ''}
      <div class="post-card-body">
        <div class="post-card-tags">${tags}</div>
        <h3>${post.titulo}</h3>
        <p>${post.resumo}</p>
        <span class="post-link">Ler conteúdo</span>
      </div>
    </a>
  `;
}

function renderUltimosPostsHome() {
  const container = document.getElementById('ultimosPostsHome');
  if (!container || typeof conteudoPosts === 'undefined') return;

  const ultimosPosts = [...conteudoPosts]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 4);

  container.innerHTML = ultimosPosts.map(criarCardPost).join('');
}

function renderConteudoCompleto() {
  const container = document.getElementById('conteudoGridCompleto');
  if (!container || typeof conteudoPosts === 'undefined') return;

  const postsOrdenados = [...conteudoPosts]
    .sort((a, b) => new Date(b.data) - new Date(a.data));

  container.innerHTML = postsOrdenados.map(criarCardPost).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderUltimosPostsHome();
  renderConteudoCompleto();
});
