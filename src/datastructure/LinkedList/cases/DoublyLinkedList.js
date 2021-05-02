const LinkedList = require("./LinkedList");
const Node = require("./Node");
const { defaultEquals } = require("./utils");

class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev;
  }
}

// 双向链表
class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.tail = undefined;
  }
  // 向任意位置插入一个新元素
  insert(element, index) {
    if (index < 0 || index > this.count) {
      return false;
    }
    const node = new DoublyNode(element);
    let current = this._head;
    if (index === 0) {
      if (this._head == null) {
        this._head = node;
        this.tail = node;
      } else {
        node.next = this._head;
        current.prev = node;
        this._head = node;
      }
    } else if (index === this.count) {
      current = this.tail;
      current.next = node;
      node.prev = current;
      this.tail = node;
    } else {
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      previous.next = node;
      current.prev = node;
      node.prev = previous;
    }
    this.count += 1;
    return true;
  }
  // 从任意位置移除元素
  removeAt(index) {
    if (index < 0 || index >= this.count) {
      return undefined;
    }
    let current = this._head;
    if (index === 0) {
      this._head = current.next;
      if (this.count === 1) {
        this.tail = undefined;
      } else {
        this._head.prev = undefined;
      }
    } else if (index === this.count - 1) {
      current = this.tail;
      this.tail = current.prev;
      this.tail.next = undefined;
    } else {
      current = this.getElementAt(index);
      const previous = current.prev;
      previous.next = current.next;
      current.next.prev = previous;
    }
    this.count -= 1;
    return current.element;
  }
}

module.exports = DoublyLinkedList;
