export default function fuzzyMatcher(key, municipalitiesMap) {
  const keys = Object.keys(municipalitiesMap);

  for (const mapKey of keys) {
    if (mapKey.includes(key) || key.includes(mapKey)) {
      return municipalitiesMap[mapKey];
    }
  }

  return null;
}
