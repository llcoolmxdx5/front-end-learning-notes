// @ts-ignore
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// @ts-ignore
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head; // curr=[1,2,3,4,5]
  while (curr) {
    const next = curr.next; // next = [2,3,4,5]
    curr.next = prev; // curr.next = null
    prev = curr; // prev=[1]
    curr = next; // curr = [2,3,4,5]
  }
  return prev;
}

// @ts-ignore
var reverseList = function (head: ListNode | null) {
  if (head == null || head.next == null) {
    return head;
  }
  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
};
