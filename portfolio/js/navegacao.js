function irParaPagina(numeroPagina) {
  const paginas = document.querySelectorAll('.pagina');
  const alvo = paginas[numeroPagina - 1];
  if (alvo) {
    alvo.scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('keydown', (e) => {
  const paginas = document.querySelectorAll('.pagina');
  const atual = encontrarPaginaVisivel(paginas);

  if (e.key === 'ArrowDown' && atual < paginas.length - 1) {
    paginas[atual + 1].scrollIntoView({ behavior: 'smooth' });
  }

  if (e.key === 'ArrowUp' && atual > 0) {
    paginas[atual - 1].scrollIntoView({ behavior: 'smooth' });
  }
});

function encontrarPaginaVisivel(paginas) {
  let maisVisivel = 0;
  let maiorArea = 0;

  paginas.forEach((pagina, index) => {
    const rect = pagina.getBoundingClientRect();
    const areaVisivel = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    if (areaVisivel > maiorArea) {
      maiorArea = areaVisivel;
      maisVisivel = index;
    }
  });

  return maisVisivel;
}
