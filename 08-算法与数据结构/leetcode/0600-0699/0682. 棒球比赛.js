/**
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function (ops) {
  const stack = [];
  for (const item of ops) {
    if (item === "C") {
      stack.pop();
    } else if (item === "+") {
      stack.push(stack.at(-1) + stack.at(-2));
    } else if (item === "D") {
      stack.push(stack.at(-1) * 2);
    } else {
      stack.push(parseInt(item));
    }
  }
  // console.log(stack);
  return stack.reduce((prev, cur) => prev + cur, 0);
};

console.assert(calPoints(["5", "2", "C", "D", "+"]) === 30, 1);
console.assert(calPoints(["5", "-2", "4", "C", "D", "9", "+", "+"]) === 27, 2);
console.assert(calPoints(["1"]) === 1, 3);
