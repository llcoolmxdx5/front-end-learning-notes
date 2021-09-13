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
function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (!head) return null;
  let left = head.val;
  // let right = head.next?.val;
  let skip = 101;
  const arr = [];
  while (head) {
    let right = head.next?.val;
    // console.log(left, right)
    if (left === right) {
      skip = left;
    } else if (skip === left) {
      left = right!;
    } else {
      left = right!;
      arr.push(head.val);
    }
    head = head.next;
  }
  // console.log(arr);
  if (!arr.length) {
    return null;
  }
  let pre = new ListNode(arr[0]);
  let dummy = pre;
  for (let index = 1; index < arr.length; index++) {
    const element = arr[index];
    pre.next = new ListNode(element);
    pre = pre.next;
  }
  return dummy;
}

// @ts-ignore
function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (!head) {
    return head;
  }
  const dummy = new ListNode(0, head);
  let cur = dummy;
  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      const x = cur.next.val;
      while (cur.next?.val === x) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
};
