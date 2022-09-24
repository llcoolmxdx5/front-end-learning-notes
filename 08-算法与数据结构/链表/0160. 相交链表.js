/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let nodeA = headA;
  const map = new Map();
  while (nodeA) {
    map.set(nodeA, 1);
    nodeA = nodeA.next;
  }
  let nodeB = headB;
  while (nodeB) {
    if (map.get(nodeB)) {
      return nodeB;
    }
    nodeB = nodeB.next;
  }
  return null;
};

var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) {
    return null;
  }
  let pA = headA;
  let pB = headB;
  while (pA !== pB) {
    pA = pA ? pA.next : headB;
    pB = pB ? pB.next : headA;
  }
  return pA;
};
