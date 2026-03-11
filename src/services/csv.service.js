import csv from "csv-parser";
import fs from "fs";
import { Parser } from "json2csv";

export function readCSV(path) {
  return new Promise((resolve) => {
    const results = [];

    fs.createReadStream(path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results));
  });
}

export function writeCSV(path, data) {
  const parser = new Parser();
  const csvData = parser.parse(data);

  fs.writeFileSync(path, csvData);
}
 