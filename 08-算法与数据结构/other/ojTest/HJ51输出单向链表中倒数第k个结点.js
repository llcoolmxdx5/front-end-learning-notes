// 输入一个单向链表，输出该链表中倒数第k个结点，链表的倒数第1个结点为链表的尾指针。
// 本题有多组样例输入。

// 输入说明
// 1 输入链表结点个数
// 2 输入链表的值
// 3 输入k的值

// 输出描述：
// 输出一个整数

// 输入
// 8
// 1 2 3 4 5 6 7 8
// 4

// 输出：
// 5

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputArr = [];

rl.on('line', function (line) {
  inputArr.push(line.split(' '));
}).on('close', function () {
  fun();
});

class Node {
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

function create(values) {
  const head = new Node(values[0], null);
  let p = head;
  for (let i = 1; i < values.length; i++) {
    let val = values[i];
    let node = new Node(val, null);
    p.next = node;
    p = node;
  }
  return head;
}

function fun() {
  for (let i = 0; i < inputArr.length; i += 3) {
    get([inputArr[i], inputArr[i + 1], inputArr[i + 2]]);
  }
}

function get(arr) {
  const [length, values, k] = arr;
  let head = create(values);
  for (let i = 0; i < length - k; i++) {
    head = head.next;
  }
  console.log(head.val);
}
