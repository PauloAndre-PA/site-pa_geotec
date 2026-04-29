function tagListToHTML(tags, className) {
  return tags.map(tag => `<span class="${className}">${escapeHtml(tag)}</span>`).join('');
}

function escapeHtml(text) {
  return String(text ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function normalizarImagem(imagem, padrao = {}) {
  if (typeof imagem === 'string') {
    return {
      src: imagem,
      width: padrao.width || '510px',
      height: padrao.height || '580px'
    };
  }

  return {
    src: imagem?.src || '',
    width: imagem?.width || padrao.width || '510px',
    height: imagem?.height || padrao.height || '580px'
  };
}

function normalizarImagemCapa(imagemCapa) {
  return normalizarImagem(imagemCapa, {
    width: '800px',
    height: '520px'
  });
}

function renderImagemCapaProjeto(projeto) {
  const img = normalizarImagemCapa(projeto.imagemCapa);

  return `
    <img
      src="${escapeHtml(img.src)}"
      alt="${escapeHtml(projeto.titulo)}"
      class="img-contorno02"
      style="width:${escapeHtml(img.width)}; height:${escapeHtml(img.height)}; object-fit:contain; flex:none; border-radius:8px; border:1px solid var(--cor-linha);"
    >
  `;
}

function renderCapa(data) {
  return `
    <section class="pagina capa" data-sem-contagem>
      <div class="capa-esquerda">
        <div class="capa-label">${escapeHtml(data.perfil.marca)}</div>
        <div class="capa-titulo">
          ${escapeHtml(data.perfil.nome.split(' ')[0] + ' ' + data.perfil.nome.split(' ')[1])}
          <span>${escapeHtml(data.perfil.nome.split(' ').slice(2).join(' '))}</span>
        </div>
        <div class="capa-subtitulo">
          ${escapeHtml(data.perfil.resumo)}
        </div>
        <div class="capa-tags">
          ${tagListToHTML(data.portfolio.tags, 'capa-tag')}
        </div>
      </div>

      <div class="capa-direita">
        <div class="capa-deco"></div>

        <div class="capa-contato">
          <div class="capa-contato-item">
            <div class="icon">✉</div>
            ${escapeHtml(data.perfil.email)}
          </div>

          <div class="capa-contato-item">
            <div class="icon">in</div>
            <a
              href="${escapeHtml(data.perfil.linkedin)}"
              target="_blank"
              style="color:#0000EE; text-decoration:underline;"
            >
              ${escapeHtml(data.perfil.linkedinTexto)}
            </a>
          </div>

          <div class="capa-contato-item">
            <div class="icon">📍</div>
            ${escapeHtml(data.perfil.localizacao)}
          </div>
        </div>

        <div class="capa-ano">${escapeHtml(data.portfolio.atualizacao)}</div>

        <a
          href="${escapeHtml(data.portfolio.linkGeral)}"
          target="_blank"
          style="
            display:inline-flex;
            align-items:center;
            gap:6px;
            margin-top:14px;
            padding:7px 14px;
            width:520px;
            background:rgba(255,255,255,0.08);
            border:1px solid rgba(255,255,255,0.2);
            border-radius:6px;
            color:rgba(255,255,255,0.75);
            font-size:10px;
            text-decoration:none;
            letter-spacing:0.4px;
            line-height:1.5;
            transition:background 0.2s;
            word-break:break-all;
          "
          onmouseover="this.style.background='rgba(255,255,255,0.15)'"
          onmouseout="this.style.background='rgba(255,255,255,0.08)'"
        >
          🔗 Acesse sempre a versão mais atualizada deste portfólio <br>
          ${escapeHtml(data.portfolio.linkGeral)}
        </a>
      </div>
    </section>
  `;
}

function renderSumario(data) {
  const itensFixos = [
    { numero: '01', titulo: 'Experiência Profissional', alvo: 'Experiência Profissional' },
    { numero: '02', titulo: 'Formação / Cursos / Ferramentas e Softwares', alvo: 'Formação / Cursos / Ferramentas e Softwares' },
    { numero: '03', titulo: 'Competências Técnicas', alvo: 'Competências Técnicas' }
  ];

  const projetos = data.projetos.map((projeto, index) => `
    <div class="sumario-item" data-pagina-alvo="Projeto ${escapeHtml(projeto.numero)} – ${escapeHtml(projeto.titulo)}">
      <div class="sumario-num">${String(index + 4).padStart(2, '0')}</div>
      <div class="sumario-info">
        <div class="sumario-info-titulo">Projeto ${escapeHtml(projeto.numero)} – ${escapeHtml(projeto.titulo)}</div>
      </div>
      <div class="sumario-pg"></div>
    </div>
  `).join('');

  return `
    <section class="pagina sumario" data-sem-contagem>
      <div class="sumario-lateral"></div>
      <div class="sumario-conteudo">
        <div class="secao-header">
          <span class="secao-titulo-pagina">Sumário</span>
          <div class="secao-header-linha"></div>
          <span style="font-size:10px;color:var(--cor-texto-claro);">
            ${escapeHtml(data.perfil.nome)} – ${escapeHtml(data.perfil.cargo)}
          </span>
        </div>

        <div class="sumario-grid">
          <div class="sumario-grupo-label">Perfil Profissional</div>

          ${itensFixos.map(item => `
            <div class="sumario-item" data-pagina-alvo="${escapeHtml(item.alvo)}">
              <div class="sumario-num">${item.numero}</div>
              <div class="sumario-info">
                <div class="sumario-info-titulo">${escapeHtml(item.titulo)}</div>
              </div>
              <div class="sumario-pg"></div>
            </div>
          `).join('')}

          <div class="sumario-grupo-label" data-pagina-alvo="Projetos Desenvolvidos" style="cursor:pointer;">Projetos</div>

          ${projetos}
        </div>
      </div>
    </section>
  `;
}

function renderExperiencias(data) {
  return `
    <section class="pagina" data-secao="Experiência Profissional">
      <div class="cabecalho-interno">
        <span class="cabecalho-interno-nome">${escapeHtml(data.perfil.nome)}</span>
        <span class="cabecalho-interno-secao">01 · Experiência Profissional</span>
      </div>

      <div class="conteudo-interno">
        <div class="secao-header">
          <span class="secao-titulo-pagina">Experiência Profissional</span>
          <div class="secao-header-linha"></div>
        </div>

        <div class="exp-container">
          ${data.experiencias.map(exp => `
            <div class="exp-item">
              <div class="exp-lateral">
                <div class="exp-empresa">${escapeHtml(exp.empresa)}</div>
                <div class="exp-periodo">${escapeHtml(exp.periodo)}</div>
                <div class="exp-cargo">
                  ${exp.cargos.map(cargo => `- ${escapeHtml(cargo)}`).join('<br>')}
                </div>
              </div>
              <div class="exp-conteudo">
                <div class="exp-desc">${escapeHtml(exp.descricao)}</div>
                <div class="exp-bullets">
                  ${exp.atividades.map(item => `<div class="exp-bullet">${escapeHtml(item)}</div>`).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="rodape">
        <span class="rodape-nome">${escapeHtml(data.perfil.nome)} – ${escapeHtml(data.perfil.cargo)}</span>
        <span class="rodape-pg"></span>
      </div>
    </section>
  `;
}

function renderFormacao(data) {
  return `
    <section class="pagina" data-secao="Formação / Cursos / Ferramentas e Softwares">
      <div class="cabecalho-interno">
        <span class="cabecalho-interno-nome">${escapeHtml(data.perfil.nome)}</span>
        <span class="cabecalho-interno-secao">02 · Formação / Cursos / Ferramentas e Softwares</span>
      </div>

      <div class="conteudo-interno">
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

        <div class="secao-header" style="margin-top:24px;">
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

        <div class="secao-header" style="margin-top:24px;">
          <span class="secao-titulo-pagina">Ferramentas e Softwares</span>
          <div class="secao-header-linha"></div>
        </div>

        <div class="formacao-grid">
          ${data.ferramentas.map(item => `
            <div class="formacao-item">
              <div class="formacao-curso">${escapeHtml(item.titulo)}</div>
              <div class="formacao-inst">${escapeHtml(item.descricao)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="rodape">
        <span class="rodape-nome">${escapeHtml(data.perfil.nome)} – ${escapeHtml(data.perfil.cargo)}</span>
        <span class="rodape-pg"></span>
      </div>
    </section>
  `;
}

function renderCompetencias(data) {
  return `
    <section class="pagina" data-secao="Competências Técnicas">
      <div class="cabecalho-interno">
        <span class="cabecalho-interno-nome">${escapeHtml(data.perfil.nome)}</span>
        <span class="cabecalho-interno-secao">03 · Competências Técnicas</span>
      </div>

      <div class="conteudo-interno">
        <div class="secao-header">
          <span class="secao-titulo-pagina">Competências Técnicas</span>
          <div class="secao-header-linha"></div>
        </div>

        <div class="comp-grid">
          ${data.competencias.map(grupo => `
            <div class="comp-grupo">
              <div class="comp-grupo-titulo">${escapeHtml(grupo.titulo)}</div>
              <ul class="comp-lista">
                ${grupo.itens.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="rodape">
        <span class="rodape-nome">${escapeHtml(data.perfil.nome)} – ${escapeHtml(data.perfil.cargo)}</span>
        <span class="rodape-pg"></span>
      </div>
    </section>
  `;
}

function renderSubcapaProjetos(data) {
  return `
    <section class="pagina subcapa-projetos" data-secao="Projetos Desenvolvidos">
      <div class="subcapa-esquerda">
        <div class="subcapa-label">Portfólio de Projetos</div>
        <div class="subcapa-titulo">Projetos<br>Desenvolvidos</div>
        <div class="subcapa-desc">
          Seleção de trabalhos práticos realizados ao longo da trajetória profissional,
          demonstrando aplicação de técnicas de geoprocessamento, análise territorial
          e elaboração de documentos cartográficos.
        </div>
      </div>

      <div class="subcapa-direita">
        <div class="subcapa-deco"></div>
        <div class="subcapa-deco2"></div>

        ${data.projetos.map(projeto => `
          <div class="subcapa-projeto-card" data-pagina-alvo="Projeto ${escapeHtml(projeto.numero)} – ${escapeHtml(projeto.titulo)}" style="cursor:pointer;">
            <div class="subcapa-projeto-num">${escapeHtml(projeto.numero)}</div>
            <div class="subcapa-projeto-info">
              <div class="subcapa-projeto-titulo">${escapeHtml(projeto.titulo)}</div>
              <div class="subcapa-projeto-tags">
                ${tagListToHTML(projeto.ferramentas, 'subcapa-projeto-tag')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="rodape rodape-oculto">
        <span class="rodape-nome">${escapeHtml(data.perfil.nome)} – ${escapeHtml(data.perfil.cargo)}</span>
        <span class="rodape-pg"></span>
      </div>
    </section>
  `;
}

function renderGaleriaImagens(imagens = []) {
  if (!imagens.length) return '';

  if (imagens.length === 1) {
    const img = normalizarImagem(imagens[0], {
      width: '855px',
      height: '604px'
    });

    return `
      <img
        src="${escapeHtml(img.src)}"
        alt="Imagem do projeto"
        class="img-contorno01"
        style="width:${escapeHtml(img.width)}; height:${escapeHtml(img.height)}; object-fit:contain; border-radius:8px; border:1px solid var(--cor-linha);"
      />
    `;
  }

  if (imagens.length === 2) {
    const imagensNormalizadas = imagens.map(img => normalizarImagem(img, {
      width: '510px',
      height: '580px'
    }));

    return `
      <div style="display:flex; flex-direction:row; gap:16px; align-items:flex-start; justify-content:center;">
        ${imagensNormalizadas.map(img => `
          <img
            src="${escapeHtml(img.src)}"
            alt="Imagem do projeto"
            class="img-contorno01"
            style="width:${escapeHtml(img.width)}; height:${escapeHtml(img.height)}; object-fit:contain; border-radius:8px; border:1px solid var(--cor-linha);"
          />
        `).join('')}
      </div>
    `;
  }

  const imagensNormalizadas = imagens.map(img => normalizarImagem(img, {
    width: '320px',
    height: '240px'
  }));

  return `
    <div style="display:flex; flex-wrap:wrap; gap:16px; justify-content:center;">
      ${imagensNormalizadas.map(img => `
        <img
          src="${escapeHtml(img.src)}"
          alt="Imagem do projeto"
          class="img-contorno01"
          style="width:${escapeHtml(img.width)}; height:${escapeHtml(img.height)}; object-fit:contain; border-radius:8px; border:1px solid var(--cor-linha);"
        />
      `).join('')}
    </div>
  `;
}

function renderPaginasExtrasProjeto(projeto, data) {
  if (!projeto.paginasExtras || !projeto.paginasExtras.length) return '';

  return projeto.paginasExtras.map((paginaExtra) => `
    <section class="pagina">
      <div class="cabecalho-interno">
        <span class="cabecalho-interno-nome">
          Projeto ${escapeHtml(projeto.numero)} – ${escapeHtml(projeto.titulo)}
        </span>
      </div>

      <div class="conteudo-interno" style="justify-content:center; align-items:center; flex-direction:column; gap:16px;">
        <div style="background:var(--cor-cinza);border-radius:8px;padding:14px 18px;border-left:4px solid var(--cor-acento); width:1050px; box-shadow: 0 0 0 1px var(--cor-acento);">
          <div style="font-size:12px;color:var(--cor-texto);line-height:1.4;">
            ${escapeHtml(paginaExtra.texto)}
          </div>
        </div>

        ${renderGaleriaImagens(paginaExtra.imagens)}
      </div>

      <div class="rodape">
        <span class="rodape-nome">${escapeHtml(data.perfil.nome)} – ${escapeHtml(data.perfil.cargo)}</span>
        <span class="rodape-pg"></span>
      </div>
    </section>
  `).join('');
}

function renderCardLinkProjeto(linkProjeto) {
  return `
    <div class="projeto-info-tag">
      <a
        href="${escapeHtml(linkProjeto)}"
        target="_blank"
        style="color:var(--cor-acento); text-decoration:none; font-size:11px; word-break:break-all;"
      >
        ${escapeHtml(linkProjeto)}
      </a>
    </div>
  `;
}

function renderProjetos(data) {
  return data.projetos.map(projeto => `
    <section class="pagina" data-secao="Projeto ${escapeHtml(projeto.numero)} – ${escapeHtml(projeto.titulo)}">
      <div class="projeto-header">
        <div class="projeto-header-label">Projeto ${escapeHtml(projeto.numero)}</div>
        <div class="projeto-header-titulo">${escapeHtml(projeto.titulo)}</div>
      </div>

      <div class="projeto-conteudo">
        <div class="projeto-info">
          <div class="projeto-info-bloco">
            <div class="projeto-info-label">Objetivo / Contexto</div>
            <div class="projeto-info-texto">${escapeHtml(projeto.objetivo)}</div>
          </div>

          <div class="projeto-info-bloco">
            <div class="projeto-info-label">Dados / Insumos</div>
            <div class="projeto-info-texto">
              ${tagListToHTML(projeto.dados, 'projeto-info-tag')}
            </div>
          </div>

          <div class="projeto-info-bloco">
            <div class="projeto-info-label">Ferramentas</div>
            <div class="projeto-info-texto">
              ${tagListToHTML(projeto.ferramentas, 'projeto-info-tag')}
            </div>
          </div>

          <div class="projeto-info-bloco">
            <div class="projeto-info-label">Tipo de Análise</div>
            <div class="projeto-info-texto">${escapeHtml(projeto.tipoAnalise)}</div>
          </div>

          <div class="projeto-info-bloco">
            <div class="projeto-info-label">Acesse aos arquivos dos projetos</div>
            ${renderCardLinkProjeto(projeto.linkProjeto)}
          </div>
        </div>

        <div class="projeto-visual ${projeto.slug === 'projeto-03' ? 'projeto-03' : ''}">
          <div class="projeto-metodologia">
            <div class="metodologia-titulo">Fluxo Metodológico</div>
            <div class="metodologia-steps">
              ${projeto.metodologia.map((etapa, index) => `
                <div class="metodologia-step">
                  <div class="step-num">${String(index + 1).padStart(2, '0')}</div>
                  <div class="step-texto">${escapeHtml(etapa)}</div>
                </div>
              `).join('')}
            </div>
          </div>

          ${renderImagemCapaProjeto(projeto)}
        </div>
      </div>

      <div class="rodape">
        <span class="rodape-nome">${escapeHtml(data.perfil.nome)} – ${escapeHtml(data.perfil.cargo)}</span>
        <span class="rodape-pg"></span>
      </div>
    </section>

    ${renderPaginasExtrasProjeto(projeto, data)}
  `).join('');
}

function renderContatoFinal(data) {
  return `
    <section class="pagina contato-final">
      <div class="contato-esquerda">
        <div class="contato-titulo">Vamos<br>Conversar?</div>
        <div class="contato-sub">
          Estou disponível para novas oportunidades na área de geoprocessamento,
          análise espacial e suporte territorial. Entre em contato!
        </div>
      </div>

      <div class="contato-direita">
        <div class="contato-item">
          <div class="contato-icone">✉</div>
          <div>
            <div class="contato-info-label">E-mail</div>
            <div class="contato-info-valor">${escapeHtml(data.perfil.email)}</div>
          </div>
        </div>

        <div class="contato-item">
          <div class="contato-icone">in</div>
          <div>
            <div class="contato-info-label">LinkedIn</div>
            <a
              href="${escapeHtml(data.perfil.linkedin)}"
              target="_blank"
              style="color:var(--cor-acento); text-decoration:none;"
            >
              <div class="contato-info-valor">${escapeHtml(data.perfil.linkedinTexto)}</div>
            </a>
          </div>
        </div>

        <div class="contato-item">
          <div class="contato-icone">📍</div>
          <div>
            <div class="contato-info-label">Localização</div>
            <div class="contato-info-valor">${escapeHtml(data.perfil.localizacao)}</div>
          </div>
        </div>
      </div>
    </section>
  `;
}


async function carregarPortfolio() {
  const resposta = await fetch('data/portfolio.json');
  return resposta.json();
}

function renderPortfolioCompleto(data) {
  return [
    renderCapa(data),
    renderSumario(data),
    renderExperiencias(data),
    renderFormacao(data),
    renderCompetencias(data),
    renderSubcapaProjetos(data),
    renderProjetos(data),
    renderContatoFinal(data)
  ].join('');
}

document.addEventListener('DOMContentLoaded', async () => {
  const app = document.getElementById('portfolioA4');
  if (!app) return;

  try {
    const data = await carregarPortfolio();
    app.innerHTML = renderPortfolioCompleto(data);

    if (typeof atualizarPaginasSumario === 'function') {
      atualizarPaginasSumario();
    }

    if (typeof destacarPaginaAtiva === 'function') {
      destacarPaginaAtiva();
    }

    if (typeof numerarPaginas === 'function') {
      numerarPaginas();
    }

    document.querySelectorAll('[data-pagina-alvo]').forEach((el) => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        const alvo = el.getAttribute('data-pagina-alvo');
        const pagina = document.querySelector(`[data-secao="${alvo}"]`);
        if (pagina) {
          pagina.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  } catch (erro) {
    app.innerHTML = '<div style="padding:40px;">Erro ao carregar portfolio.json</div>';
    console.error(erro);
  }
});
