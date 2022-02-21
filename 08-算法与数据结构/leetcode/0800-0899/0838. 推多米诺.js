/**
 * @param {string} dominoes
 * @return {string}
 */
var pushDominoes = function (dominoes) {
  const { length } = dominoes;
  let left = dominoes[0];
  for (let i = 1; i < length; i++) {
    if (left[i - 1] === "R" && dominoes[i] === ".") {
      left += "R";
    } else {
      left += dominoes[i];
    }
  }
  let right = dominoes[length - 1];
  for (let i = length - 2; i >= 0; i--) {
    if (right[0] === "L" && dominoes[i] === ".") {
      right = "L" + right;
    } else {
      right = dominoes[i] + right;
    }
  }
  let ans = "";
  for (let i = 0; i < length; ) {
    if (left[i] === right[i] || right[i] === ".") {
      ans += left[i];
      i++;
    } else if (left[i] === ".") {
      ans += right[i];
      i++;
    } else {
      let count = 0;
      while (left[i] !== right[i] && left[i] !== "." && right[i] !== ".") {
        count += 1;
        i += 1;
      }
      const num = Math.floor(count / 2);
      if (count % 2 == 1) {
        ans += "R".repeat(num) + "." + "L".repeat(num);
      } else {
        ans += "R".repeat(num) + "L".repeat(num);
      }
    }
  }
  // console.log(left, right, ans);
  return ans;
};

var pushDominoes = function (dominoes) {
  // 先将已平衡的牌锁定，状态肯定不会变
  dominoes = dominoes.replace(/R\.L/g, "X");
  // 牌中只要有可以倒的牌，就循环
  while (/R\./.test(dominoes) || /\.L/.test(dominoes)) {
    // 向左倒
    dominoes = dominoes.replace(/\.L/g, "LL");
    // 向右倒
    dominoes = dominoes.replace(/R\./g, "RR");
    // 若出现平衡状态的，将其锁定
    dominoes = dominoes.replace(/R\.L/g, "X");
  }
  // 最后没有可以倒的牌，将平衡状态的解锁
  dominoes = dominoes.replace(/X/g, "R.L");
  return dominoes;
};

console.assert(pushDominoes("RR.L") === "RR.L", 1);
console.assert(pushDominoes(".L.R...LR..L..") === "LL.RR.LLRRLL..", 2);
console.assert(pushDominoes("L") === "L", 3);
