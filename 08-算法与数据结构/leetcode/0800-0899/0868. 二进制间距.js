/**
 * @param {number} n
 * @return {number}
 */
var binaryGap = function (n) {
  const binary = n.toString(2).replace(/0+$/, "");
  console.log(binary);
  let ans = 0;
  let temp = 0;
  for (let i = 0; i < binary.length - 1; i++) {
    if (binary[i + 1] === "0") {
      temp += 1;
    } else {
      ans = Math.max(ans, temp + 1);
      temp = 0;
    }
  }
  // console.log(ans);
  return ans;
};

console.assert(binaryGap(8) === 0, 1);
console.assert(binaryGap(22) === 2, 2);
console.assert(binaryGap(9) === 3, 3);
