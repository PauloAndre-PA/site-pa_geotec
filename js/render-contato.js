// =====================================================
//  RENDER-CONTATO.JS — Renderiza a seção de contato no index.html
// =====================================================

function renderContatoSection() {
  const el = document.getElementById('contatohome-section-content');
  if (!el) return;

  const redesHTML = CONTATO.redes.map(rede => `
    <a
      class="contato-rede-link"
      href="${rede.href}"
      ${rede.externo ? 'target="_blank" rel="noopener noreferrer"' : ''}
    >
      ${rede.label} →
    </a>
  `).join('');

  el.innerHTML = `
  <div class="home-contact-wrap">
    <div class="home-contact-band">
      <div class="container-wide portfolio-contact-card">

        <div class="portfolio-contact-left">
          <h2 class="portfolio-contact-title">
            Vamos<br>Conversar?
          </h2>
          <p class="portfolio-contact-text">
            Estou disponível para novas oportunidades na área de 
            geoprocessamento, análise espacial e suporte territorial.
            <br>Entre em contato!
          </p>
        </div>

        <div class="portfolio-contact-right">

          <div class="portfolio-contact-item">
            <div class="portfolio-contact-item-label">E-mail</div>
            <div class="portfolio-contact-item-value">
              <a class="portfolio-contact-link" href="mailto:${CONTATO.email}">
                ${CONTATO.email}
              </a>
            </div>
          </div>

          <div class="portfolio-contact-item">
            <div class="portfolio-contact-item-label">Localização</div>
            <div class="portfolio-contact-item-value">${CONTATO.cidade}</div>
          </div>

          ${CONTATO.redes.map(rede => `
            <div class="portfolio-contact-item">
              <div class="portfolio-contact-item-label">${rede.label}</div>
              <div class="portfolio-contact-item-value">
                <a
                  class="portfolio-contact-link"
                  href="${rede.href}"
                  ${rede.externo ? 'target="_blank" rel="noopener noreferrer"' : ''}
                >
                  ${rede.href.replace('https://', '')}
                </a>
              </div>
            </div>
          `).join('')}

        </div>

      </div>
    </div>
  </div>
`;
}