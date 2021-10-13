/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits.length === 0) {
    return [];
  }
  const obj = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };
  const resp = [];
  const temp = [];
  const { length } = digits;
  const backTrack = (start) => {
    if (temp.length === length) {
      resp.push(temp.join(''));
      return;
    }
    for (let i = 0; i < obj[digits[start]].length; i++) {
      const element = obj[digits[start]][i];
      temp.push(element);
      backTrack(start + 1);
      temp.pop();
    }
  };
  backTrack(0);
  return resp;
};

console.log(letterCombinations("23")); // ["ad","ae","af","bd","be","bf","cd","ce","cf"]

console.log(letterCombinations("")); // []

console.log(letterCombinations("2")); // ["a","b","c"]
