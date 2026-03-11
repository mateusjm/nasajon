import axios from "axios";
import { IBGE_API_URL } from "../config/env.js";
import normalize from "../utils/normalize.js";

async function getMunicipalitiesMap() {
  const response = await axios.get(IBGE_API_URL);

  const municipalitiesMap = {};

  response.data.forEach((municipality) => {
    const state = municipality.microrregiao?.mesorregiao?.UF?.sigla;
    const region = municipality.microrregiao?.mesorregiao?.UF?.regiao?.nome;

    if (!state || !region) return;

    const key = normalize(municipality.nome);

    municipalitiesMap[key] = {
      name: municipality.nome,
      state,
      region,
      ibge_id: municipality.id,
    };
  });

  return municipalitiesMap;
}

export default getMunicipalitiesMap;
