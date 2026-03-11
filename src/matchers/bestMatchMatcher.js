function similarityScore(a, b) {
  const aLetters = a.split("");
  const bLetters = b.split("");

  let matches = 0;

  for (const letter of aLetters) {
    const index = bLetters.indexOf(letter);

    if (index !== -1) {
      matches++;
      bLetters.splice(index, 1);
    }
  }

  return matches / Math.max(a.length, b.length);
}

export default function bestMatchMatcher(key, municipalitiesMap) {
  let bestMatch = null;
  let bestScore = 0;

  for (const mapKey of Object.keys(municipalitiesMap)) {
    const score = similarityScore(key, mapKey);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = municipalitiesMap[mapKey];
    }
  }

  if (bestScore >= 0.7) {
    return bestMatch;
  }

  return null;
}
