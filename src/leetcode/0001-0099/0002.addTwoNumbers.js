/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const pre = new ListNode();
  let cur = pre;
  let carry = 0;
  while (l1 || l2) {
    const n1 = l1?.val || 0;
    const n2 = l2?.val || 0;
    const sum = n1 + n2 + carry;
    cur.next = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);
    l1 = l1?.next;
    l2 = l2?.next;
    cur = cur.next;
  }
  if (carry) {
    cur.next = new ListNode(carry);
  }
  return pre.next;
};
