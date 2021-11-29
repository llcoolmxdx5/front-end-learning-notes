const numbers = [1, 2, 3, 4, 5]
// numbers.unshift(-2)
// console.log(numbers) // [-2, 1, 2, 3, 4, 5]
// numbers.unshift(-4, -3)
// console.log(numbers) // [-4, -3, -2, 1, 2, 3, 4, 5]

Array.prototype._unshift = function () {
  let len = arguments.length
  for (let i = this.length; i >= 0; i--) {
    this[i + len - 1] = this[i - 1]
  }
  for (let i = 0; i < len; i++) {
    this[i] = arguments[i]
  }
  return this.length
}
numbers._unshift(-1, -2)
console.log(numbers)