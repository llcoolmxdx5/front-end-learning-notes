class Stack {
  constructor() {
    this.items = [] // 用来保存栈
  }
  push(...args) {
    this.items.push(...args)
  }
  pop() {
    return this.items.pop()
  }
  peek() {
    return this.items[this.items.length - 1]
  }
  isEmpty() {
    return this.items.length === 0
  }
  clear() {
    this.items.length = 0
  }
  size() {
    return this.items.length
  }
}
const stack = new Stack()
console.log(stack.isEmpty())
stack.push(1, 2)
console.log(stack.peek())
