/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  const arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  for (let i = 0; i < arr.length / 2; i++) {
    if (arr[i] !== arr[arr.length - i - 1]) {
      return false;
    }
  }
  return true;
};

var isPalindrome = function (head) {
  let dumb = new ListNode(0, head);
  while (head.next) {
    head.next.prev = head;
    head = head.next;
  }
  while (dumb.next) {
    if (dumb.next.val !== head.val) {
      return false;
    }
    dumb = dumb.next;
    head = head.prev;
  }
  return true;
};
