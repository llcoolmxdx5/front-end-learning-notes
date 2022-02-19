/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map();
  for (const str of strs) {
    const arr = new Array(26).fill(0);
    for (const s of str) {
      arr[s.charCodeAt() - 97]++;
    }
    const hash = arr.join();
    map.set(hash, [str, ...(map.get(hash) ?? [])]);
  }
  return [...map.values()];
};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]];
console.log(groupAnagrams(["bdddddddddd", "bbbbbbbbbbc"]));
// [["bbbbbbbbbbc"], ["bdddddddddd"]];
