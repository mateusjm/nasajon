import normalize from "../utils/normalize.js";

import bestMatchMatcher from "../matchers/bestMatchMatcher.js";
import duplicateLetterMatcher from "../matchers/duplicateLetterMatcher.js";
import exactMatcher from "../matchers/exactMatcher.js";
import fuzzyMatcher from "../matchers/fuzzyMatcher.js";

function findMunicipalityMatch(key, municipalitiesMap) {
  return (
    exactMatcher(key, municipalitiesMap) ||
    duplicateLetterMatcher(key, municipalitiesMap) ||
    fuzzyMatcher(key, municipalitiesMap) ||
    bestMatchMatcher(key, municipalitiesMap)
  );
}

export default function processMunicipalities(rows, municipalitiesMap) {
  const results = [];

  for (const row of rows) {
    const municipalityInput = row.municipio;
    const populationInput = Number(row.populacao);

    const normalizedKey = normalize(municipalityInput);

    const match = findMunicipalityMatch(normalizedKey, municipalitiesMap);

    if (match) {
      results.push({
        municipio_input: municipalityInput,
        populacao_input: populationInput,
        municipio_ibge: match.name,
        uf: match.state,
        regiao: match.region,
        id_ibge: match.ibge_id,
        status: "OK",
      });
    } else {
      results.push({
        municipio_input: municipalityInput,
        populacao_input: populationInput,
        municipio_ibge: "",
        uf: "",
        regiao: "",
        id_ibge: "",
        status: "NAO_ENCONTRADO",
      });
    }
  }

  return results;
}
