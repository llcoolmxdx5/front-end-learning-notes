const Stack = require('./stackWeakMap')

function baseConverter(decNumber, base) {
  let remStack = new Stack()
  let digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let number = decNumber
  let rem
  let baseString = ''
  if (base < 2 || base > 36) {
    return ''
  }
  while (number > 0) {
    rem = Math.floor(number % base)
    remStack.push(rem)
    number = Math.floor(number / base)
  }
  while (remStack.isEmpty() === false) {
    baseString += digits[remStack.pop()]
  }
  return baseString
}

let result = baseConverter(100345, 16)
console.log(result)
