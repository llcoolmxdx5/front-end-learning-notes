const MORSE = [".-","-...","-.-.","-..",".","..-.","--.","....","..",
 ".---","-.-",".-..","--","-.","---",".--.","--.-",
 ".-.","...","-","..-","...-",".--","-..-","-.--","--.."];

/**
 * @param {string[]} words
 * @return {number}
 */
var uniqueMorseRepresentations = function(words) {
  const seen = new Set();
  for (const word of words) {
    let code = '';
    for (const ch of word) {
      code += (MORSE[ch.charCodeAt() - 'a'.charCodeAt()]);
    }
    seen.add(code);
  }
  return seen.size;
}
