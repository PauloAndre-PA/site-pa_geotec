function criarCardPost(post) {
  return `
    <a href="${post.link}" class="post-card post-card-link">
      <div class="post-tag">${post.categoria}</div>
      <h3>${post.titulo}</h3>
      <p>${post.resumo}</p>
      <span class="post-link">Ler artigo</span>
    </a>
  `;
}

function renderUltimosPostsHome() {
  const container = document.getElementById('ultimosPostsHome');
  if (!container || typeof blogPosts === 'undefined') return;

  const ultimosPosts = [...blogPosts]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 4);

  container.innerHTML = ultimosPosts.map(criarCardPost).join('');
}

function renderBlogCompleto() {
  const container = document.getElementById('blogGridCompleto');
  if (!container || typeof blogPosts === 'undefined') return;

  const postsOrdenados = [...blogPosts]
    .sort((a, b) => new Date(b.data) - new Date(a.data));

  container.innerHTML = postsOrdenados.map(criarCardPost).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderUltimosPostsHome();
  renderBlogCompleto();
});
