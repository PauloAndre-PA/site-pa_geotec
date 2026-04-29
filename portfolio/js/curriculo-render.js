// =====================================================
//  CURRÍCULO A4 — RENDER
// =====================================================

function escapeHtml(text) {
  return String(text ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function carregarPortfolio() {
  const resposta = await fetch('data/portfolio.json');
  return resposta.json();
}

function renderCurriculo(data) {
  return `
    <!-- ========== PÁGINA 1 ========== -->
    <section class="curriculo-pagina">

      <!-- Hero expandido — sem cabeçalho interno -->
      <div class="curriculo-hero">
        <div class="curriculo-hero-texto">
          <h1 class="curriculo-hero-nome">${escapeHtml(data.perfil.nome)}</h1>
          <span class="curriculo-hero-cargo">${escapeHtml(data.perfil.cargo)}</span>
        </div>
        <div class="curriculo-hero-direita">
          <a href="${escapeHtml(data.perfil.site)}" target="_blank" class="curriculo-hero-site">
            ${escapeHtml(data.perfil.siteTexto)}
          </a>
          <div class="curriculo-hero-tags">
            ${data.portfolio.tags.map(tag => `
              <span class="curriculo-hero-tag">${escapeHtml(tag)}</span>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="conteudo-interno curriculo-conteudo">

        <div class="secao-header">
          <span class="secao-titulo-pagina">Perfil Profissional</span>
          <div class="secao-header-linha"></div>
        </div>

        <div class="curriculo-resumo">
          ${escapeHtml(data.perfil.resumo)}
        </div>

        <div class="secao-header">
          <span class="secao-titulo-pagina">Contato</span>
          <div class="secao-header-linha"></div>
        </div>

        <div class="curriculo-contato-grid">

          <!-- Linha 1: Email | WhatsApp | Localização -->
          <div class="curriculo-contato-item">
            <span class="curriculo-contato-label">✉ E-mail</span>
            <span class="curriculo-contato-valor">${escapeHtml(data.perfil.email)}</span>
          </div>
          <div class="curriculo-contato-item">
            <span class="curriculo-contato-label">📱 WhatsApp</span>
            <a href="${escapeHtml(data.perfil.whatsapp)}" target="_blank" class="curriculo-link">
              ${escapeHtml(data.perfil.telefone)}
            </a>
          </div>
          <div class="curriculo-contato-item">
            <span class="curriculo-contato-label">📍 Localização</span>
            <span class="curriculo-contato-valor">${escapeHtml(data.perfil.localizacao)}</span>
          </div>

          <!-- Linha 2: Site | LinkedIn (2 colunas) -->
          <div class="curriculo-contato-item">
            <span class="curriculo-contato-label">🌐 Site / Portfólio</span>
            <a href="${escapeHtml(data.perfil.site)}" target="_blank" class="curriculo-link">
              ${escapeHtml(data.perfil.siteTexto)}
            </a>
          </div>
          <div class="curriculo-contato-item curriculo-contato-item--largo">
            <span class="curriculo-contato-label">🔗 LinkedIn</span>
            <a href="${escapeHtml(data.perfil.linkedin)}" target="_blank" class="curriculo-link">
              ${escapeHtml(data.perfil.linkedinTexto)}
            </a>
          </div>

        </div>

        <div class="secao-header">
          <span class="secao-titulo-pagina">Experiência Profissional</span>
          <div class="secao-header-linha"></div>
        </div>

        <div class="curriculo-exp-container">
          ${data.experiencias.map(exp => `
            <div class="curriculo-exp-item">
              <div class="curriculo-exp-lateral">
                <div class="curriculo-exp-empresa">${escapeHtml(exp.empresa)}</div>
                <div class="curriculo-exp-periodo">${escapeHtml(exp.periodo)}</div>
                <div class="curriculo-exp-cargos">
                  ${exp.cargos.map(c => `<span>${escapeHtml(c)}</span>`).join('')}
                </div>
              </div>
              <div class="curriculo-exp-conteudo">
                <p class="curriculo-exp-desc">${escapeHtml(exp.descricao)}</p>
                ${exp.atividades && exp.atividades.length > 0 ? `
                  <ul class="curriculo-exp-lista">
                    ${exp.atividades.map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>

      </div>

      <div class="rodape">
        <span class="rodape-nome">${escapeHtml(data.perfil.nome)} – ${escapeHtml(data.perfil.cargo)}</span>
        <span class="rodape-pg">1 / 2</span>
      </div>

    </section>

    <!-- ========== PÁGINA 2 ========== -->
    <section class="curriculo-pagina">

      <div class="cabecalho-interno">
        <span class="cabecalho-interno-nome">${escapeHtml(data.perfil.nome)}</span>
        <a href="${escapeHtml(data.perfil.site)}" target="_blank" class="cabecalho-interno-site">
          ${escapeHtml(data.perfil.siteTexto)}
        </a>
      </div>

      <div class="conteudo-interno curriculo-conteudo">

        <div class="secao-header">
          <span class="secao-titulo-pagina">Formação Acadêmica</span>
          <div class="secao-header-linha"></div>
        </div>

        <div class="formacao-grid">
          ${data.formacao.academica.map(item => `
            <div class="formacao-item">
              <div class="formacao-curso">${escapeHtml(item.curso)}</div>
              <div class="formacao-inst">${escapeHtml(item.instituicao)}</div>
              <div class="formacao-periodo">${escapeHtml(item.periodo)}</div>
            </div>
          `).join('')}
        </div>

        <div class="secao-header">
          <span class="secao-titulo-pagina">Cursos Complementares</span>
          <div class="secao-header-linha"></div>
        </div>

        <div class="formacao-grid">
          ${data.formacao.cursos.map(item => `
            <div class="formacao-item">
              <div class="formacao-curso">${escapeHtml(item.curso)}</div>
              <div class="formacao-inst">${escapeHtml(item.instituicao)}</div>
              <div class="formacao-periodo">${escapeHtml(item.periodo)}</div>
            </div>
          `).join('')}
        </div>

        <div class="secao-header">
          <span class="secao-titulo-pagina">Competências Técnicas</span>
          <div class="secao-header-linha"></div>
        </div>

        <div class="comp-grid">
          ${data.competencias.map(grupo => `
            <div class="comp-grupo">
              <div class="comp-grupo-titulo">${escapeHtml(grupo.titulo)}</div>
              <ul class="comp-lista">
                ${grupo.itens.slice(0, 5).map(item => `<li>${escapeHtml(item)}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

      </div>

      <div class="rodape">
        <span class="rodape-nome">${escapeHtml(data.perfil.nome)} – ${escapeHtml(data.perfil.cargo)}</span>
        <span class="rodape-pg">2 / 2</span>
      </div>

    </section>
  `;
}

// =====================================================
//  INICIALIZAÇÃO
// =====================================================
document.addEventListener('DOMContentLoaded', async () => {
  const app = document.getElementById('curriculoA4');
  if (!app) return;

  try {
    const data = await carregarPortfolio();
    app.innerHTML = renderCurriculo(data);
  } catch (erro) {
    app.innerHTML = '<div style="padding:40px; color:red;">❌ Erro ao carregar portfolio.json</div>';
    console.error(erro);
  }
});
