import Chart from 'chart.js/auto';

export const GerarGraficos = (): void => {
  const ctx = document.getElementById('grafico1');

  if (ctx instanceof HTMLCanvasElement) {
    fetch('http://localhost:3008/cotacoesVencedorasQuantitativo')
      .then(res => res.json())
      .then((data: { codigoServico: string; quantidade: number }[]) => {
        const labels = data.map(item => item.codigoServico);
        const dados = data.map(item => item.quantidade);

        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Cotações Vencedoras',
              data: dados,
              borderWidth: 1,
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)', // Cores com transparência
                'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)', 'rgba(0, 255, 255, 0.8)', 'rgba(255, 255, 0, 0.8)', // Mais cores com transparência
                'rgba(0, 0, 0, 0.8)', 'rgba(128, 128, 128, 0.8)', 'rgba(255, 0, 255, 0.8)', 'rgba(0, 255, 0, 0.8)' // Outras cores com transparência
              ]
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });
  } else {
    console.error('Elemento com ID "grafico1" não encontrado');
  }

  const ctx2 = document.getElementById('grafico2');

  if (ctx2 instanceof HTMLCanvasElement) {
    fetch('http://localhost:3008/cotacoesVencedorasQuantitativo')
      .then(res => res.json())
      .then((data: { codigoServico: string; quantidade: number }[]) => {
        const labels = data.map(item => item.codigoServico);
        const dados = data.map(item => item.quantidade);

        new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Cotações Vencedoras',
              data: dados,
              borderWidth: 1,
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)', // Cores com transparência
                'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)', 'rgba(0, 255, 255, 0.8)', 'rgba(255, 255, 0, 0.8)', // Mais cores com transparência
                'rgba(0, 0, 0, 0.8)', 'rgba(128, 128, 128, 0.8)', 'rgba(255, 0, 255, 0.8)', 'rgba(0, 255, 0, 0.8)' // Outras cores com transparência
              ]
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });
  } else {
    console.error('Elemento com ID "grafico2" não encontrado');
  }
}
