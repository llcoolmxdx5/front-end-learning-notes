import PriorityQueue from "../../datastructure/Queue/PriorityQueue";

/* Definition for singly-linked list. */
// @ts-ignore
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const pq = new PriorityQueue<ListNode>((a, b) => a.val < b.val);
  for (const list of lists) {
    list && pq.offer(list);
  }
  const dummy = new ListNode(0);
  let pre = dummy;
  while (pq.size() > 1) {
    let node = pq.poll();
    if (node) {
      pre.next = new ListNode(node.val);
      if (node.next) {
        pq.offer(node.next);
      }
      pre = pre.next;
    }
  }
  if (pq.size()) {
    pre.next = pq.poll();
  }
  return dummy.next;
}
