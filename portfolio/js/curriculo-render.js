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
    <section class="pagina">
      <div class="cabecalho-interno">
        <span class="cabecalho-interno-nome">${escapeHtml(data.perfil.nome)}</span>
        <span class="cabecalho-interno-secao">${escapeHtml(data.perfil.cargo)}</span>
      </div>

      <div class="conteudo-interno" style="gap:18px;">
        <div class="secao-header">
          <span class="secao-titulo-pagina">Perfil Profissional</span>
          <div class="secao-header-linha"></div>
        </div>

        <div style="font-size:13px; line-height:1.8; background:var(--cor-cinza); padding:14px 16px; border-left:4px solid var(--cor-acento); border-radius:0 8px 8px 0;">
          ${escapeHtml(data.perfil.resumo)}
        </div>

        <div class="secao-header" style="margin-bottom:10px;">
          <span class="secao-titulo-pagina">Contato</span>
          <div class="secao-header-linha"></div>
        </div>

        <div class="formacao-grid">
          <div class="formacao-item">
            <div class="formacao-curso">E-mail</div>
            <div class="formacao-inst">${escapeHtml(data.perfil.email)}</div>
          </div>

          <div class="formacao-item">
            <div class="formacao-curso">LinkedIn</div>
            <div class="formacao-inst">
              <a href="${escapeHtml(data.perfil.linkedin)}" target="_blank" style="color:var(--cor-secundaria); text-decoration:none;">
                ${escapeHtml(data.perfil.linkedinTexto)}
              </a>
            </div>
          </div>

          <div class="formacao-item">
            <div class="formacao-curso">Localização</div>
            <div class="formacao-inst">${escapeHtml(data.perfil.localizacao)}</div>
          </div>

          <div class="formacao-item">
            <div class="formacao-curso">Portfólio</div>
            <div class="formacao-inst">
              <a href="${escapeHtml(data.portfolio.linkGeral)}" target="_blank" style="color:var(--cor-secundaria); text-decoration:none;">
                Acessar portfólio online
              </a>
            </div>
          </div>
        </div>

        <div class="secao-header" style="margin-bottom:10px;">
          <span class="secao-titulo-pagina">Experiência Profissional</span>
          <div class="secao-header-linha"></div>
        </div>

        <div class="exp-container">
          ${data.experiencias.map(exp => `
            <div class="exp-item">
              <div class="exp-lateral">
                <div class="exp-empresa">${escapeHtml(exp.empresa)}</div>
                <div class="exp-periodo">${escapeHtml(exp.periodo)}</div>
                <div class="exp-cargo">${exp.cargos.map(c => escapeHtml(c)).join('<br>')}</div>
              </div>
              <div class="exp-conteudo">
                <div class="exp-desc">${escapeHtml(exp.descricao)}</div>
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

    <section class="pagina">
      <div class="cabecalho-interno">
        <span class="cabecalho-interno-nome">${escapeHtml(data.perfil.nome)}</span>
        <span class="cabecalho-interno-secao">Formação e Competências</span>
      </div>

      <div class="conteudo-interno" style="gap:18px;">
        <div class="secao-header" style="margin-bottom:10px;">
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

        <div class="secao-header" style="margin-bottom:10px;">
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

        <div class="secao-header" style="margin-bottom:10px;">
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

document.addEventListener('DOMContentLoaded', async () => {
  const app = document.getElementById('curriculoA4');
  if (!app) return;

  try {
    const data = await carregarPortfolio();
    app.innerHTML = renderCurriculo(data);
  } catch (erro) {
    app.innerHTML = '<div style="padding:40px;">Erro ao carregar portfolio.json</div>';
    console.error(erro);
  }
});
