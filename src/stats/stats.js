export default function calculateStatistics(results) {
  const statistics = {
    total_municipios: results.length,
    total_ok: 0,
    total_nao_encontrado: 0,
    total_erro_api: 0,
    pop_total_ok: 0,
    medias_por_regiao: {},
  };

  const populationSumByRegion = {};
  const countByRegion = {};
  const processedMunicipalities = new Set();

  for (const item of results) {
    if (item.status === "OK") {
      statistics.total_ok++;

      if (!processedMunicipalities.has(item.id_ibge)) {
        processedMunicipalities.add(item.id_ibge);

        statistics.pop_total_ok += item.populacao_input;

        if (!populationSumByRegion[item.regiao]) {
          populationSumByRegion[item.regiao] = 0;
          countByRegion[item.regiao] = 0;
        }

        populationSumByRegion[item.regiao] += item.populacao_input;
        countByRegion[item.regiao]++;
      }
    }

    if (item.status === "NAO_ENCONTRADO") {
      statistics.total_nao_encontrado++;
    }

    if (item.status === "ERRO_API") {
      statistics.total_erro_api++;
    }
  }

  for (const region of Object.keys(populationSumByRegion)) {
    statistics.medias_por_regiao[region] =
      populationSumByRegion[region] / countByRegion[region];
  }

  return statistics;
}
