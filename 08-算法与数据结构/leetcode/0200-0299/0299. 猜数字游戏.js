/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function (secret, guess) {
  let bull = 0;
  let cow = 0;
  const { length } = secret;
  const map = new Map();
  const newSecret = [];
  for (let i = 0; i < length; i++) {
    const sValue = secret[i];
    const gValue = guess[i];
    if (sValue === gValue) {
      bull += 1;
    } else {
      map.set(gValue, (map.get(gValue) ?? 0) + 1);
      newSecret.push(sValue);
    }
  }
  // console.log(map, newSecret);
  for (let i = 0; i < newSecret.length; i++) {
    const value = newSecret[i];
    const count = map.get(value);
    if (map.has(value) && count) {
      cow += 1;
      map.set(value, count - 1);
    }
  }
  return `${bull}A${cow}B`;
};

var getHint = function (secret, guess) {
  let bulls = 0;
  const cntS = new Array(10).fill(0);
  const cntG = new Array(10).fill(0);
  for (let i = 0; i < secret.length; ++i) {
    if (secret[i] == guess[i]) {
      bulls += 1;
    } else {
      cntS[+secret[i]] += 1;
      cntG[+guess[i]] += 1;
    }
  }
  let cows = 0;
  for (let i = 0; i < 10; ++i) {
    cows += Math.min(cntS[i], cntG[i]);
  }
  return `${bulls}A${cows}B`;
};

console.assert(getHint("1807", "7810") === "1A3B", 1);
console.assert(getHint("1123", "0111") === "1A1B", 2);
console.assert(getHint("1", "0") === "0A0B", 3);
console.assert(getHint("1", "1") === "1A0B", 4);
