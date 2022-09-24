/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const ret = [head];
  let node = head;
  while (node.next !== null) {
    node = node.next;
    ret.push(node);
  }
  const targetNode = ret[ret.length - n];
  if (targetNode === head) {
    return head.next;
  }
  let prevNode = head;
  while (prevNode.next !== targetNode) {
    prevNode = prevNode.next;
  }
  // 第二种情况
  if (targetNode.next === null) {
    prevNode.next = null;
  }
  // 第三种情况
  if (targetNode.next) {
    prevNode.next = targetNode.next;
  }
  return head;
};

// 双指针
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0, head);
  let first = head;
  let second = dummy;
  for (let i = 0; i < n; i++) {
    first = first.next;
  }
  while (first !== null) {
    first = first.next;
    second = second.next;
  }
  second.next = second.next.next;
  return dummy.next;
};
