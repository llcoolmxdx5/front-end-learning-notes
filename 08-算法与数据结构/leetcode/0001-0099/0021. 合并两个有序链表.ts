class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeTwoLists(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  if(l1 === null) {
    return l2
  }
  if(l2 === null) {
    return l1
  }
  if(l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  }
  l2.next = mergeTwoLists(l1, l2.next)
  return l2
}

// function mergeTwoLists(
//   l1: ListNode | null,
//   l2: ListNode | null
// ): ListNode | null {
//   const preHead = new ListNode(-1);
//   let prev = preHead;
//   while (l1 !== null && l2 !== null) {
//     if (l1.val <= l2.val) {
//       prev.next = l1;
//       l1 = l1.next;
//     } else {
//       prev.next = l2;
//       l2 = l2.next;
//     }
//     prev = prev.next;
//   }
//   // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可
//   prev.next = l1 === null ? l2 : l1;
//   return preHead.next;
// }
