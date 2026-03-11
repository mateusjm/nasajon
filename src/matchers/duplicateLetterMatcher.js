export default function duplicateLetterMatcher(key, municipalitiesMap) {
  const simplified = key.replace(/(.)\1+/g, "$1");

  const keys = Object.keys(municipalitiesMap);

  for (const mapKey of keys) {
    if (mapKey.includes(simplified) || simplified.includes(mapKey)) {
      return municipalitiesMap[mapKey];
    }
  }

  return null;
}
