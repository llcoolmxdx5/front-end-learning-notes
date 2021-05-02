const numbers = [1, 2, 3, 4, 5]

Array.prototype._shift = function () {
  let remove = this[0]
  for (let i = 0; i < this.length; i++) {
    if (this[i + 1]) {
      this[i] = this[i + 1]
    }
  }
  this.length = this.length - 1
  return remove
}
numbers._shift()
console.log(numbers) // [2, 3, 4, 5]
numbers.shift()
console.log(numbers) // [2, 3, 4, 5]
