/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  // dp[i][j]=min(dp[i-1][j-1],dp[i-1][j])+c[i][j]
  const { length } = triangle;
  const dp = [triangle[0]];
  for (let i = 1; i < length; i++) {
    dp.push([]);
    dp[i][0] = dp[i - 1][0] + triangle[i][0];
    for (let j = 1; j < i; j++) {
      dp[i].push(Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j]);
    }
    dp[i].push(dp[i - 1][i - 1] + triangle[i][i]);
  }
  // console.log(dp);
  return Math.min(...dp[length - 1]);
};

var minimumTotal = function (triangle) {
  // dp[i][j]=min(dp[i-1][j-1],dp[i-1][j])+c[i][j]
  const { length } = triangle;
  const dp = [triangle[0][0]];
  for (let i = 1; i < length; i++) {
    dp[i] = dp[i - 1] + triangle[i][i];
    for (let j = i - 1; j > 0; j--) {
      dp[j] = Math.min(dp[j - 1], dp[j]) + triangle[i][j];
    }
    dp[0] += triangle[i][0];
  }
  // console.log(dp);
  return Math.min(...dp);
};

console.assert(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]) === 11, 1);

console.assert(minimumTotal([[-10]]) === -10, 2);

console.assert(minimumTotal([[1], [-5, -2], [3, 6, 1], [-1, 2, 4, -3]]) === -3, 3);
