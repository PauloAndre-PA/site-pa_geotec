document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfólio carregado ✅');
  atualizarPaginasSumario();
  destacarPaginaAtiva();
  numerarPaginas();
});

function atualizarPaginasSumario() {
  const todasPaginas = Array.from(document.querySelectorAll('.pagina'));
  const itensSumario = document.querySelectorAll('.sumario-item[data-pagina-alvo]');

  const paginasContadas = todasPaginas.filter(p => !p.hasAttribute('data-sem-contagem'));

  itensSumario.forEach(item => {
    const alvo = item.dataset.paginaAlvo;
    const indexPagina = paginasContadas.findIndex(p => p.dataset.secao === alvo);

    if (indexPagina !== -1) {
      const pg = item.querySelector('.sumario-pg');
      if (pg) {
        pg.textContent = `pg. ${indexPagina + 1}`;
      }
    }
  });
}

function destacarPaginaAtiva() {
  const itens = document.querySelectorAll('.sumario-item');
  itens.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateX(4px)';
      item.style.transition = 'transform 0.2s';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateX(0)';
    });
  });
}

function numerarPaginas() {
  const paginas = document.querySelectorAll('.rodape-pg');
  const total = paginas.length;
  paginas.forEach((el, index) => {
    el.textContent = `${index + 1} / ${total}`;
  });
}
