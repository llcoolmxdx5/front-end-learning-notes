const Deque = require("./Deque");

// 回文
const palindromeChecker = (aString) => {
  if (
    Object.prototype.toString.call(aString).slice(8, -1) !== "String" ||
    !aString.length
  ) {
    return false;
  }
  const deque = new Deque();
  deque.addFront(...aString.split(""));
  while (deque.size() > 1) {
    if (deque.peekBack() !== deque.peekFront()) {
      return false;
    }
    deque.removeFront();
    deque.removeBack();
  }
  return true
};

console.log("a", palindromeChecker("a"));
console.log("aa", palindromeChecker("aa"));
console.log("kayak", palindromeChecker("kayak"));
console.log("level", palindromeChecker("level"));
console.log(
  "Was it a car or a cat I saw",
  palindromeChecker("Was it a caror a cat I saw")
);
console.log("Step on no pets", palindromeChecker("Step on no pets"));
