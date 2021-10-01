/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
  const stack = [],
    ans = [];
  const backtrack = (graph, x, n) => {
    if (x === n) {
      ans.push(stack.slice());
      return;
    }
    for (const y of graph[x]) {
      stack.push(y);
      backtrack(graph, y, n);
      stack.pop();
    }
  };

  stack.push(0);
  backtrack(graph, 0, graph.length - 1);
  return ans;
};

console.log(allPathsSourceTarget([[1, 2], [3], [3], []])); // [[0,1,3],[0,2,3]]

console.log(allPathsSourceTarget([[4, 3, 1], [3, 2, 4], [3], [4], []]));
// [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]

console.log(allPathsSourceTarget([[1], []])); // [[0,1]]

console.log(allPathsSourceTarget([[1, 2, 3], [2], [3], []])); // [[0,1,2,3],[0,2,3],[0,3]]

console.log(allPathsSourceTarget([[1, 3], [2], [3], []])); // [[0,1,2,3],[0,3]]
