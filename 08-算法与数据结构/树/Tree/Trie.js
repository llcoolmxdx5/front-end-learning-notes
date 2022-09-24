class Trie {
  constructor() {
    this.children = {};
  }
  /**
   * 插入字符串 对于当前字符对应的子节点，有两种情况：
   * - 子节点存在。沿着指针移动到子节点，继续处理下一个字符。
   * - 子节点不存在。创建一个新的子节点，记录在 children 数组的对应位置上，然后沿着指针移动到子节点，继续搜索下一个字符。
   * @param {string} word
   * @return {void}
   */
  insert(word) {
    let node = this.children;
    for (const ch of word) {
      if (!node[ch]) {
        node[ch] = {};
      }
      node = node[ch];
    }
    node.isEnd = true;
  }
  /**
   * 查找前缀 对于当前字符对应的子节点，有两种情况：
   * - 子节点存在。沿着指针移动到子节点，继续搜索下一个字符。
   * - 子节点不存在。说明字典树中不包含该前缀，返回空指针
   * @param {*} prefix
   * @returns
   */
  searchPrefix(prefix) {
    let node = this.children;
    for (const ch of prefix) {
      if (!node[ch]) {
        return false;
      }
      node = node[ch];
    }
    return node;
  }
  /**
   * 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；
   * 否则，返回 false
   * @param {string} word
   * @return {boolean}
   */
  search(word) {
    const node = this.searchPrefix(word);
    return node !== undefined && node.isEnd !== undefined;
  }
  /**
   * 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；
   * 否则，返回 false。
   * @param {string} prefix
   * @return {boolean}
   */
  startsWith(prefix) {
    return this.searchPrefix(prefix);
  }
}
