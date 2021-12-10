/**
 * @param {string} licensePlate
 * @param {string[]} words
 * @return {string}
 */
var shortestCompletingWord = function (licensePlate, words) {
  let res;
  const str = licensePlate.replace(/[0-9 ]/g, "").toLowerCase();
  const originStr = new Array(26).fill(0);
  for (let i = 0, len = str.length; i < len; i++) {
    originStr[str[i].charCodeAt() - 97] += 1;
  }
  // console.log(originStr);
  for (let i = 0, len = words.length; i < len; i++) {
    const arr = new Array(26).fill(0);
    for (let j = 0, wordLength = words[i].length; j < wordLength; j++) {
      arr[words[i][j].charCodeAt() - 97] += 1;
    }
    let flag = true;
    for (let k = 0; k < 26; k++) {
      if (originStr[k] && originStr[k] > arr[k]) {
        flag = false;
        break;
      }
    }
    if (flag && (!res || words[i].length < res.length)) {
      res = words[i];
    }
  }
  return res;
};

console.assert(
  shortestCompletingWord("AN87005", [
    "participant",
    "individual",
    "start",
    "exist",
    "above",
    "already",
    "easy",
    "attack",
    "player",
    "important",
  ]) === "important",
  0
);
console.assert(
  shortestCompletingWord("1s3 PSt", ["step", "steps", "stripe", "stepple"]) ===
    "steps",
  1
);
console.assert(
  shortestCompletingWord("1s3 456", ["looks", "pest", "stew", "show"]) ===
    "pest",
  2
);
console.assert(
  shortestCompletingWord("Ah71752", [
    "suggest",
    "letter",
    "of",
    "husband",
    "easy",
    "education",
    "drug",
    "prevent",
    "writer",
    "old",
  ]) === "husband",
  3
);
console.assert(
  shortestCompletingWord("OgEu755", [
    "enough",
    "these",
    "play",
    "wide",
    "wonder",
    "box",
    "arrive",
    "money",
    "tax",
    "thus",
  ]) === "enough",
  4
);
console.assert(
  shortestCompletingWord("iMSlpe4", [
    "claim",
    "consumer",
    "student",
    "camera",
    "public",
    "never",
    "wonder",
    "simple",
    "thought",
    "use",
  ]) === "simple",
  5
);
