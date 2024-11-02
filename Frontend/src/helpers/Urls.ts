export const construirURL = (dados: any): string => {
  const baseURL = "http://localhost:3008/refazCotacoes";

  // Extrair dados do objeto
  const identificador = dados.identificador;
  const dataInicio = dados.dataInicio;
  const dataFim = dados.dataFim;

  // Montar siglasNovaCotacao e siglasTransportadorasWebservice a partir dos objetos em "tabs"
  const siglasNovaCotacao: any = [];
  const siglasTransportadorasWebservice: any = [];

  dados.tabs.forEach(tab => {
    if (tab.idPrazo && tab.idPreco) {
      // Verifica se `idTransf` é maior que 0 para construir a string correta
      const transfPart = tab.idTransf && tab.idTransf > 0 ? `_${tab.idTransf}` : '';
      siglasNovaCotacao.push(`${tab.sigla}_${tab.idPrazo}_${tab.idPreco}${transfPart}`);
    } else {
      // Se não houver idPrazo e idPreco, adiciona a sigla ao siglasTransportadorasWebservice
      siglasTransportadorasWebservice.push(tab.sigla);
    }
  });

  // Montar a string de siglasNovaCotacao
  const siglasNovaCotacaoString = siglasNovaCotacao.join(',');
  const siglasTransportadorasWebserviceString = siglasTransportadorasWebservice.join(',');

  // Construir a URL final
  const params = new URLSearchParams({
    identificador,
    siglasNovaCotacao: siglasNovaCotacaoString,
    dataInicio,
    dataFim,
  });

  // Adicionar tokenPortal se estiver presente
  if (dados.tokenPortal) {
    params.append('tokenCliente', dados.tokenPortal);
  }
  
  // Adicionar siglasTransportadorasWebservice se houver siglas
  if (siglasTransportadorasWebservice.length > 0) {
    params.append('siglasTransportadorasWebservice', siglasTransportadorasWebserviceString);
  }

  return `${baseURL}?${params.toString()}`;
};
