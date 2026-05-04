function criarCardProjeto(projeto) {
  const tags = Array.isArray(projeto.categoria)
    ? `<span class="post-tag">${projeto.categoria.join(' · ')}</span>`
    : `<span class="post-tag">${projeto.categoria}</span>`;

  return `
    <a href="${projeto.link}" class="post-card post-card-link">
      ${projeto.imagem ? `
        <div class="post-card-img-wrap">
          <img src="${projeto.imagem}" alt="${projeto.titulo}" class="post-card-img" loading="lazy" width="640" height="360">
        </div>
      ` : ''}
      <div class="post-card-body">
        <div class="post-card-tags">${tags}</div>
        <h3>${projeto.titulo}</h3>
        <p>${projeto.resumo}</p>
        <span class="post-link">Ver projeto</span>
      </div>
    </a>
  `;
}

function renderProjetosDestaque() {
  const container = document.getElementById('projetosDestaqueHome');
  if (!container || typeof projetoPosts === 'undefined') return;

  const destaques = projetoPosts
    .filter(p => p.destaque === true)
    .slice(0, 4);

  container.innerHTML = destaques.map(criarCardProjeto).join('');
}

function renderTodosProjetos() {
  const container = document.getElementById('projetosGridCompleto');
  if (!container || typeof projetoPosts === 'undefined') return;

  const ordenados = [...projetoPosts]
    .sort((a, b) => new Date(b.data) - new Date(a.data));

  container.innerHTML = ordenados.map(criarCardProjeto).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjetosDestaque();
  renderTodosProjetos();
});
