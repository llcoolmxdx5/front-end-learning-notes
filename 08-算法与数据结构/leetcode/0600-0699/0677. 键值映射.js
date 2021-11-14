class MapSum1 {
  constructor() {
    this.map = new Map();
  }

  /**
   * @param {string} key
   * @param {number} val
   * @return {void}
   */
  insert(key, val) {
    this.map.set(key, val);
  }

  /**
   * @param {string} prefix
   * @return {number}
   */
  sum(prefix) {
    const { length } = prefix;
    let ans = 0;
    [...this.map.keys()].forEach((key) => {
      if (key.slice(0, length) === prefix) {
        ans += this.map.get(key);
      }
    });
    return ans;
  }
}

class Node {
  constructor() {
    this.children = new Array(26).fill(0);
    this.val = 0;
  }
}

class MapSum {
  constructor() {
    this.root = new Node()
  }

  /**
   * @param {string} key
   * @param {number} val
   * @return {void}
   */
  insert(key, val) {
    let node = this.root
    const { length } = key
    for (let i = 0; i < length; i++) {
      const index = key[i].charCodeAt() - 97;
      if(!node.children[index]) {
        node.children[index] = new Node()
      }
      node = node.children[index]
    }
    node.val = val
  }

  /**
   * @param {string} prefix
   * @return {number}
   */
  sum(prefix) {
    let node = this.root
    const { length } = prefix
    for (let i = 0; i < length; i++) {
      const index = prefix[i].charCodeAt() - 97;
      if(!node.children[index]) {
        return 0
      }
      node = node.children[index]
    }
    return this.dfs(node)
  }

  dfs(node) {
    if(!node) {
      return 0
    }
    let ans = node.val
    const { length } = node.children
    for (let i = 0; i < length; i++) {
      ans += this.dfs(node.children[i])
    }
    return ans
  }
}

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */

const mapSum = new MapSum();
mapSum.insert("apple", 3);
console.assert(mapSum.sum("ap") === 3, 1); // apple = 3
mapSum.insert("app", 2);
console.assert(mapSum.sum("ap") === 5, 2); // apple + app = 3 + 2 = 5
