// 由于队列经常被应用在计算机领域和我们的现实生活中，就出现了一些队列的修改版本，我们会在本章实现它们。
// 这其中的一种叫作循环队列。循环队列的一个例子就是击鼓传花游戏（hotpotato）。
// 在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止，这个时候花在谁手里，谁就退出圆圈、结束游戏。
// 重复这个过程，直到只剩一个孩子（胜者）。
const Queue = require("./Queue");
function hotPotato(elementsList, num) {
  const queue = new Queue();
  queue.enqueue(...elementsList);
  const elimitatedList = [];
  while (queue.size() > 1) {
    new Array(num).fill("").forEach(() => {
      queue.enqueue(queue.dequeue());
    });
    elimitatedList.push(queue.dequeue());
  }
  return {
    eliminated: elimitatedList,
    winner: queue.dequeue(),
  };
}

const { eliminated, winner } = hotPotato(
  ["John", "Jack", "Camila", "Ingrid", "Carl"],
  7
);
eliminated.forEach((item) => {
  console.log(`${item}被淘汰了`);
});
console.log(`胜利者是${winner}`);
