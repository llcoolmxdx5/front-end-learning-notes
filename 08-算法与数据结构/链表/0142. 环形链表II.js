/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  const map = new Map();
  while (head) {
    if (map.has(head)) {
      return head;
    }
    map.set(head, 1);
    head = head.next;
  }
  return null;
};

var detectCycle = function (head) {
  if (!head || !head.next) {
    return null;
  }
  let slow = head.next;
  let fast = head.next.next;
  while (slow !== fast && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  if (!fast || !fast.next) {
    return null;
  }
  let ptx = head;
  while (ptx !== fast) {
    ptx = ptx.next;
    fast = fast.next;
  }
  return ptx;
};
