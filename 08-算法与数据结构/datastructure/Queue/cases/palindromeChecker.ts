import Dequeue from "../Dequeue";

// 回文
const palindromeChecker = (aString: string) => {
  if (
    Object.prototype.toString.call(aString).slice(8, -1) !== "String" ||
    !aString.length
  ) {
    return false;
  }
  const dequeue = new Dequeue<string>();
  aString.split("").forEach((item) => {
    dequeue.addFront(item);
  });
  while (dequeue.size() > 1) {
    if (dequeue.peekBack() !== dequeue.peekFront()) {
      return false;
    }
    dequeue.removeFront();
    dequeue.removeBack();
  }
  return true;
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
