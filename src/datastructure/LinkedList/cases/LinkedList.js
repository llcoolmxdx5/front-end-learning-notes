const { defaultEquals } = require("./utils");
const Node = require("./Node");

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this._head = null;
    this.count = 0;
    this.equalsFn = equalsFn;
  }
  // 链表尾部添加一个新元素
  push(element) {
    const node = new Node(element);
    let current;
    if (this._head === null) {
      this._head = node;
    } else {
      current = this._head;
      while (current.next !== undefined) {
        current = current.next;
      }
      current.next = node;
    }
    this.count += 1;
  }
  // 返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回 undefined
  getElementAt(index) {
    if (index < 0 || index > this.count) {
      return undefined;
    }
    let node = this._head;
    for (let i = 0; i < index && node !== null; i++) {
      node = node.next;
    }
    return node;
  }
  // 从链表的特定位置移除一个元素
  removeAt(index) {
    if (index < 0 || index >= this.count) {
      return undefined;
    }
    let current = this._head;
    if (index === 0) {
      this._head = current.next;
    } else {
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      previous.next = current.next;
    }
    this.count -= 1;
    return current.element;
  }
  // 向链表的特定位置插入一个新元素
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      if (index === 0) {
        const current = this._head;
        node.next = current;
        this._head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        const current = previous.next;
        node.next = current;
        previous.next = current;
      }
      this.count += 1;
      return true;
    }
    return false;
  }
  // 返回元素在链表中的索引。如果链表中没有该元素则返回-1
  indexOf(element) {
    let current = this._head;
    for (let index = 0; index < this.count && current !== null; index++) {
      if (this.equalsFn(element, current.element)) {
        return index;
      }
      current = current.next;
    }
    return -1;
  }
  // 从链表中移除一个元素
  remove(element) {
    const index = this.indexOf(element);
    if (index !== -1) {
      this.removeAt(index);
    }
  }
  // 返回链表包含的元素个数，与数组的 length 属性类似
  get size() {
    return this.count;
  }
  // 如果链表中不包含任何元素，返回 true，如果链表长度大于 0则返回 false
  isEmpty() {
    return this.count === 0;
  }
  getHead() {
    return this._head;
  }
  // 返回表示整个链表的字符串。由于列表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString 方法，
  // 让其只输出元素的值。
  toString() {
    if (this._head === null) {
      return "";
    }
    let objString = `${this._head.element}`;
    let current = this._head.next;
    for (
      let index = 0;
      index < this.size && current !== null && current !== undefined;
      index++
    ) {
      objString += `,${current.element}`;
      current = current.next;
    }
    return objString;
  }
}

module.exports = LinkedList;

// const list = new LinkedList();
// list.push(1);
// list.push(2);
// list.removeAt(0);
// list.push("23");
// list.indexOf(2)
// console.log(list.toString());
