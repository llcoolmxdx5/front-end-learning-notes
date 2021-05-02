Array.prototype._forEach = function (fn) {
  for (var i = 0; i < this.length; i++) {
    fn(this[i], i, this);
  }
}
const numbers = [1, 2, 3, 7, 0]
numbers._forEach((item, index, arr) => {
  console.log(item, index, arr)
}) 