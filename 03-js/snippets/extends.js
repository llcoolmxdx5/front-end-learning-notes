function _extends(subType, superType) {
  // 创建对象，创建父类原型的一个副本
  // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  // 指定对象，将新创建的对象赋值给子类的原型
  subType.prototype = Object.create(superType && superType.prototype, {
    constructor: {
      value: subType,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });

  if (superType) {
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subType, superType)
      : (subType.__proto__ = superType);
  }
}

function Rectangle(height, width) {
  this.height = height;
  this.width = width;
}
Object.defineProperty(Rectangle.prototype, "area", {
  // Getter
  get: function () {
    return this.calcArea();
  },
  enumerable: true,
  configurable: true,
});
Rectangle.prototype.calcArea = function () {
  return this.height * this.width;
};
const rectangle = new Rectangle(10, 20);
console.log(rectangle.area);
// 输出 200

// -----------------------------------------------------------------
function Square(length) {
  Rectangle.call(this, length, length);
  this.name = "Square";
}
Object.defineProperty(Square.prototype, "area", {
  get: function () {
    return this.height * this.width;
  },
  enumerable: true,
  configurable: true,
});

_extends(Square, Rectangle);

const square = new Square(10);
console.log(square.area);
// 输出 100
