/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
var findRestaurant = function (list1, list2) {
  let index = Number.MAX_SAFE_INTEGER;
  let ans = [];
  const map = new Map(list1.map((item, i) => [item, i]));
  for (let i = 0, length = list2.length; i < length; i++) {
    const element = list2[i];
    if (!map.has(element)) {
      continue;
    }
    const sum = map.get(element) + i;
    if (sum < index) {
      index = sum;
      ans = [element];
    } else if (sum === index) {
      ans.push(element);
    }
  }
  return ans;
};

console.assert(
  findRestaurant(
    ['Shogun', 'Tapioca Express', 'Burger King', 'KFC'],
    ['Piatti', 'The Grill at Torrey Pines', 'Hungry Hunter Steakhouse', 'Shogun']
  ).join() === ['Shogun'].join(),
  1
);

console.assert(
  findRestaurant(
    ['Shogun', 'Tapioca Express', 'Burger King', 'KFC'],
    ['KFC', 'Shogun', 'Burger King']
  ).join() === ['Shogun'].join(),
  2
);
