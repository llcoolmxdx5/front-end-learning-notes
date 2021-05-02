const { defaultEquals } = require("./utils");
const Node = require("./Node");
const LinkedList = require("./LinkedList");

// 循环链表
class CircularLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
  }
  insert(element, index) {
    if (index < 0 || index > this.count) {
      return false;
    }
    const node = new Node(element);
    let current = this.head;
    if (index === 0) {
      if (this.head == null) {
        this.head = node;
        node.next = this.head;
      } else {
        node.next = current;
        current = this.getElementAt(this.size);
        this.head = node;
        current.next = this.head;
      }
    } else {
      const previous = this.getElementAt(index - 1);
      node.next = previous.next;
      previous.next = node;
    }
    this.count += 1;
    return true;
  }
  removeAt(index) {
    if (index < 0 || index >= this.count) {
      return undefined;
    }
    let current = this.head;
    if (index === 0) {
      if (this.size === 1) {
        this.head = undefined;
      } else {
        const removed = this.head;
        current = this.getElementAt(this.size);
        this.head = this.head.next;
        current.next = this.head;
        current = removed;
      }
    } else {
      // 不需要修改循环链表最后一个元素
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      previous.next = current.next;
    }
    this.count -= 1;
    return current.element;
  }
}

module.exports = CircularLinkedList;
