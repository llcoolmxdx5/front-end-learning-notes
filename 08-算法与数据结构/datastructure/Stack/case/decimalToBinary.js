// import Stack from './stackWeakMap.js'
const Stack = require('./stackWeakMap')

function decimalToBinary(decNumber) {
  let remStack = new Stack()
  let number = decNumber
  let rem
  let binaryString = ''
  while (number > 0) {
    rem = Math.floor(number % 2)
    remStack.push(rem)
    number = Math.floor(number / 2)
  }
  while (remStack.isEmpty() === false) {
    binaryString += remStack.pop().toString()
  }
  return binaryString
}

let result = decimalToBinary(20)
console.log(result) // 10100
