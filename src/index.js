import { readCSV, writeCSV } from "./services/csv.service.js";
import getMunicipalitiesMap from "./services/ibge.service.js";

import processMunicipalities from "./processors/municipality.processor.js";
import submitResults from "./services/submit.service.js";
import calculateStatistics from "./stats/stats.js";

async function main() {
  try {
    const municipalitiesMap = await getMunicipalitiesMap();
    const rows = await readCSV("input.csv");
    const results = processMunicipalities(rows, municipalitiesMap);

    writeCSV("resultado.csv", results);

    const stats = calculateStatistics(results);
    const response = await submitResults(stats);

    console.log("Stats:", stats);
    console.log("Score:", response.score);
    console.log("Feedback:", response.feedback);
  } catch (error) {
    console.error("Execution error:", error.message);
  }
}

main();
