function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  const map = new Map();
  while (head) {
    if (map.has(head)) {
      return true;
    }
    map.set(head, 1);
    head = head.next;
  }
  return false;
};

var hasCycle = function (head) {
  let cur = head;
  let next = head?.next?.next;
  while (next) {
    if (cur === next) {
      return true;
    }
    cur = cur?.next;
    next = next?.next?.next;
  }
  return false;
};
