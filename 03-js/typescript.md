# ts

tsc ./src/app.ts --outfile ./dist/app.js
tsc ./src/\* --outdir ./dist --watch

## 基础类型

### 任意类型 any

任意值是 TypeScript 针对编程时类型不明确的变量使用的一种数据类型，它常用于以下三种情况:

1. 变量的值会动态改变时，比如来自用户的输入，任意值类型可以让这些变量跳过编译阶段的类型检查

   ```js
   let x: any = 4;
   x = "I am who I am";
   ```

2. 改写现有代码时，任意值允许在编译时可选择地包含或移除类型检查

   ```js
   let x: any = 4;
   x.ifItExists(); // 正确，ifItExists方法在运行时可能存在，但这里并不会检查
   x.toFixed(); // 正确
   ```

3. 定义存储各种类型数据的数组时

   ```js
   let arrayList: any[] = [1, false, "fine"];
   arrayList[1] = 100;
   ```

### 未知类型 unknown

### 数据类型 number

`number`双精度 64 位浮点值。它可以用来表示整数和分数。

### 字符串类型 string

一个字符系列，使用单引号（'）或双引号（"）来表示字符串类型。反引号（`）来定义多行文本和内嵌表达式。

### 布尔类型 boolean

表示逻辑值：true 和 false。

### 数组类型

```js
// 在元素类型后面加上[]
let arr: number[] = [1, 2];
// 或者使用数组泛型
let arr: Array<number> = [1, 2];
// 定义存储各种类型数据的数组
let arrayList: any[] = [1, false, "fine"];
```

### 元组

```js
// 元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。
let x: [string, number];
x = ["Runoob", 1]; // 运行正常
x = [1, "Runoob"]; // 报错
console.log(x[0]); // 输出 Runoob
```

### 枚举 enum

```ts
// 枚举类型用于定义数值集合
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Blue;
console.log(c); // 输出 2
```

```ts
// 枚举类型用于定义数值集合
enum Color {
  Red = 1,
  Green,
  Blue,
}
let c: Color = Color.Blue;
console.log(c); // 输出 3
console.log(Color[3]); // 输出 Blue
```

### void

用于标识方法返回值的类型，表示该方法没有返回值。

```js
function hello(): void {
  alert("Hello Runoob");
}
```

### null

表示对象值缺失。null 是一个只有一个值的特殊类型。表示一个空对象引用。

用 typeof 检测 null 返回是 object。

### undefined

用于初始化变量为一个未定义的值 typeof 一个没有值的变量会返回 undefined。

Null 和 Undefined 是其他任何类型（包括 void）的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined。而在 TypeScript 中启用严格的空校验（--strictNullChecks）特性，就可以使得 null 和 undefined 只能被赋值给 void 或本身对应的类型，示例代码如下：

```js
// 启用 --strictNullChecks
let x: number;
x = 1; // 运行正确
x = undefined; // 运行错误
x = null; // 运行错误
```

### never

never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环）

```js
let x: never;
let y: number;

// 运行错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (() => {
  throw new Error("exception");
})();

// 运行正确，never 类型可以赋值给 数字类型
y = (() => {
  throw new Error("exception");
})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
  throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
  while (true) {}
}
```

### 模板字符串类型

4.1+

```typescript
type A = `${string}-${number}`;
const a: A = "aaa-2345";
```

### 类型断言

<类型>值 或者 值 as 类型 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种

有时候，我们确实需要在还不确定类型的时候就访问其中一个类型的属性或方法，比如:

```ts
function getLength(something: string | number): number {
  if (something.length) {
    return something.length;
  } else {
    return something.toString().length;
  }
}
// Property 'length' does not exist on type 'string | number'.Property 'length' does not exist on type 'number'.
function getLength(something: string | number): number {
  if ((something as string).length) {
    return (something as string).length;
  } else {
    return something.toString().length;
  }
}
```

类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的

```js
function toBoolean(something: string | number): boolean {
    return <boolean>something;
}
// Type 'string | number' cannot be converted to type 'boolean'.Type 'number' is not comparable to type 'boolean'
```

### 联合类型

联合类型（Union Types）可以通过管道(|)将变量设置多种类型，赋值时可以根据设置的类型来赋值。

```js
var val: string | number;
val = 12;
console.log("数字为 " + val);
val = "Runoob";
console.log("字符串为 " + val);
```

## 函数

### 可选参数

在 TypeScript 函数里，如果我们定义了参数，则我们必须传入这些参数，除非将这些参数设置为可选，可选参数使用问号标识 ？。

```js
function buildName(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}
let result1 = buildName("Bob"); // 正确
let result2 = buildName("Bob", "Adams", "Sr."); // 错误，参数太多了
let result3 = buildName("Bob", "Adams"); // 正确
```

### 默认参数

我们也可以设置参数的默认值，这样在调用函数的时候，如果不传入该参数的值，则使用默认参数

```js
function calculate_discount(price: number, rate: number = 0.5) {
  var discount = price * rate;
  console.log("计算结果: ", discount);
}
calculate_discount(1000);
calculate_discount(1000, 0.3);
```

### 剩余参数

有一种情况，我们不知道要向函数传入多少个参数，这时候我们就可以使用剩余参数来定义。

```js
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKenzie");
```

## 接口

接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法

需要注意接口不能转换为 JavaScript。 它只是 TypeScript 的一部分

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

```ts
interface testType {
  name: string;
  age: number;
}
function test(obj: testType): void {
  console.log(obj.name);
  console.log(obj.age);
}
test({ name: "fred", age: 20, height: 180 }); //错误
```

### 可选属性（接口定义中加“？”）

```ts
interface testType {
  name: string;
  age?: number;
}
```

### 字符串索引签名

SquareConfig 可以有任意数量的属性，并且只要它们不是 color 和 width，那么就无所谓它们的类型是什么。

```ts
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any; // 必须写any
}
```

### 只读属性（readonly）

```ts
interface testType {
  readonly name: string;
  readonly age: number;
}
let test1: testType = { name: "fred", age: 20 };
test1.name = "Bob"; //error

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

### 接口继承（extends）

```ts
interface nameFace {
  name: string;
}
interface ageFace {
  age: number;
}
interface heightFace extends nameFace, ageFace {
  height: number;
}
let person = <heightFace>{};
person.name = "fred";
person.age = 20;
person.height = 180;
```

### 函数的接口

对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配

```ts
interface Fun {
  (x: string, y: string): string;
}
let fun: Fun = (x, z) => {
  return x + z;
};
```

## const 断言

```typescript
const x = { text: "hello" } as const;
```

- 该表达式中的字面类型不应被扩展（例如：不能从“hello”转换为字符串）
- 对象字面量获取只读属性
- 数组文字成为只读元组

## 协变和逆变

### 子类型和父类型

假设 T 表示父类型，S 表示子类型，那么使用 T 的地方都可以使用 S 类型。

```ts
type T = boolean;
type S = true;
```

T 是 S 的父类型，使用 T :> S 表示。

S 是 T 的子类型，使用 S <: T 表示。

<: 或 :> 开口朝向哪边，哪边就是父类型，反之为子类型。

有很多具有父子类型关系

#### 顶端类型和尾端类型

像 any、unknown 是所有类型的父类型，表示如下：

```ts
1 <: any
'a' <: any
false <: any
{} <: any
() => void <: any
1n <: any

1 <: unknown
'a' <: unknown
false <: unknown
{} <: unknown
() => void <: unknown
1n <: unknown
```

使用 any 或 unknown 注解的类型，都可以使用子类型对其赋值。

never 是 TypeScript 系统中尾端类型，是所有类型的子类型，表示如下：

```ts
never <: 1
never <: 'a'
never <: false
never <: {}
never <: () => void
never <: 1n
```

#### 原始类型

像字面量类型，字面量类型是其对应的基础原始类型的子类型。如数字字面量类型是 number 类型的子类型。

```ts
1 <: number
'a' <: string
false <: boolean
1n <: bigint
```

### 变型规则

变型与复杂类型间的子类型关系有着密不可分的联系。变型描述的是复杂类型的组成类型是如何影响 复杂类型的子类型 关系。

```ts
type T = {
  name: string;
};
type S = {
  name: string;
  age: number;
};
function fn(params: T) {}
let func: (params: S) => void = fn;
```

有复杂类型 fn 和 func，fn 是 func 的子类型用 fn <: func 表示? fn 的参数类型 T 和 func 的参数类型 S 谁是父类型，谁又是子类型?

因此，函数的参数类型要遵循特定的变型规则，才确保函数子类型 fn 赋值不会出现类型兼容错误。

> 复杂类型：复杂类型包括类（Class）、对象、数组及函数等。其中类的属性、对象的属性、数组中的值、函数的参数和返回值类型都是构成复杂类型的类型。
> 现约定如果复杂类型 Complex 是由类型 T 构成，那么我们将其记作 Complex(T)。

变型规则主要有四种：

- 协变(Covariant)
- 逆变(Contravariant)
- 双变(Bivariant) = 协变 + 逆变
- 不变(Invariant)

### 协变

使你能够使用比原始指定的类型派生程度更大的类型

在 ts 中，对象、类、数组和函数的返回值类型都是协变关系

```ts
interface Animal {
  Eat(): void;
}
interface Dog extends Animal {
  Bark(): void;
}

function foo<T>(arg: T): T {
  return arg;
}
var dog: Dog = {
  Eat: () => {},
  Bark: () => {},
};
var animal: Animal = {
  Eat: () => {},
};
let derived = foo(dog);
let base = foo(animal);
base = derived;
derived = base; // 错误
```

在赋值过程中类型收敛了, 即只能将派生类赋值给基类

### 逆变

在 TypeScript 中，复杂类型的成员都会进行协变，包括对象、类、数组和函数的返回值类型。但是，函数的参数类型进行逆变。

因为有协变和逆变规则约定，复杂类型之间赋值若不遵循变型规则就会发生复杂类型的组成类型不兼容问题。

逆变(Contravariance)与双变(Bivariance)只针对函数有效。 --strictFunctionTypes 开启时只支持逆变，关闭时支持双变。

```ts
interface Animal {
  Eat(): void;
}
interface Dog extends Animal {
  Bark(): void;
}

function foo(type: Animal) {}
var dog: Dog = {
  Eat: () => {},
  Bark: () => {},
};
var animal: Animal = {
  Eat: () => {},
};

foo(dog);
foo(animal);
```

在传参过程中类型发散了,即你可以传入函数参数类型的派生类

## 类型别名

TypeScript 提供了为类型注解设置别名的便捷语法，你可以使用 `type SomeName = someValidTypeAnnotation` 来创建别名，比如：

```typescript
type Pet = "cat" | "dog";
let pet: Pet;

pet = "cat"; // Ok
pet = "dog"; // Ok
pet = "zebra"; // Compiler error
```

### 基础知识

#### typeof

在 TypeScript 中， typeof 操作符可以用来获取一个变量声明或对象的类型。

```typescript
interface Person {
  name: string;
  age: number;
}

const sem: Person = { name: "semlinker", age: 30 };
type Sem = typeof sem; // -> Person

function toArray(x: number): Array<number> {
  return [x];
}

type Func = typeof toArray; // -> (x: number) => number[]
```

#### keyof

keyof 操作符可以用来一个对象中的所有 key 值：

```typescript
interface Person {
  name: string;
  age: number;
}

type K1 = keyof Person; // "name" | "age"
type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join"
type K3 = keyof { [x: string]: Person }; // string | number
```

#### in

in 用来遍历枚举类型：

```typescript
type Keys = "a" | "b" | "c";

type Obj = {
  [p in Keys]: any;
}; // -> { a: any, b: any, c: any }
```

#### infer

在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

以上代码中 infer R 就是声明一个变量来承载传入函数签名的返回值类型，简单说就是用它取到函数返回值的类型方便之后使用。

#### extends

有时候我们定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束。

```typescript
interface ILengthwise {
  length: number;
}

function loggingIdentity<T extends ILengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：

`loggingIdentity(3); // Error, number doesn't have a .length property`

这时我们需要传入符合约束类型的值，必须包含必须的属性：

`loggingIdentity({length: 10, value: 3});`

#### is

```typescript
export const isString = (arg: unknown): arg is string =>
  typeof arg === "string";

```

### 内置类型别名

#### Partial

`Partial` 的作用就是将某个类型里的属性全部变为可选项 ? 。

定义：

```typescript
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

在以上代码中，首先通过 keyof T 拿到 T 的所有属性名，然后使用 in 进行遍历，将值赋给 P ，最后通过 T[P] 取得相应的属性值。中间的 ? ，用于将所有属性变为可选。

示例：

```typescript
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

#### Required

`Required<T>` 的作用就是将某个类型里的属性全部变为必选项。

定义：

```typescript
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

以上代码中， -? 的作用就是移除可选项 ? 。

示例：

```typescript
interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 }; // OK
const obj2: Required<Props> = { a: 5 }; // Error: property 'b' missing
```

#### Readonly

`Readonly` 的作用是将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋值。

定义：

```typescript
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

如果将上面的 readonly 改成 -readonly ， 就是移除子属性的 readonly 标识。

示例：

```typescript
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
```

Readonly 对于表示在运行时将赋值失败的表达式很有用（比如，当尝试重新赋值冻结对象的属性时）。

function freeze(obj: T): Readonly;

#### Record

`Record<K extends keyof any, T>` 的作用是将 K 中所有的属性的值转化为 T 类型。

定义：

```typescript
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

示例：

```typescript
interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const x: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};
```

#### Pick

`Pick<T, K extends keyof T>` 的作用是将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。

定义：

```typescript
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

示例：

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

#### Exclude

`Exclude<T, U>` 的作用是将某个类型中属于另一个的类型移除掉。

定义：

```typescript
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```

如果 T 能赋值给 U 类型的话，那么就会返回 never 类型，否则返回 T 类型。最终实现的效果就是将 T 中某些属于 U 的类型移除掉。

示例：

```typescript
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

#### Extract

`Extract<T, U>` 的作用是从 T 中提取出 U 。

定义：

```typescript
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;
```

如果 T 能赋值给 U 类型的话，那么就会返回 T 类型，否则返回 never 类型。

示例：

```typescript
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T1 = Extract<string | number | (() => void), Function>; // () => void
```

#### Omit

`Omit<T, K extends keyof any>` 的作用是使用 T 类型中除了 K 类型的所有属性，来构造一个新的类型。

定义：

```typescript
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

示例：

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

#### NonNullable

`NonNullable<T>` 的作用是用来过滤类型中的 null 及 undefined 类型。

定义：

```typescript
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;
```

示例：

```typescript
type T0 = NonNullable<string | number | undefined>; // string | number
type T1 = NonNullable<string[] | null | undefined>; // string[]
```

#### ReturnType

`ReturnType<T>` 的作用是用于获取函数 T 的返回类型。

定义：

```typescript
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

示例：

```typescript
type T0 = ReturnType<() => string>; // string
type T1 = ReturnType<(s: string) => void>; // void
type T2 = ReturnType<<T>() => T>; // {}
type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T4 = ReturnType<any>; // any
type T5 = ReturnType<never>; // any
type T6 = ReturnType<string>; // Error
type T7 = ReturnType<Function>; // Error
```

#### InstanceType

`InstanceType<T>` 的作用是获取构造函数类型的实例类型。

定义：

```typescript
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;
```

示例：

```typescript
class C {
  x = 0;
  y = 0;
}

type T0 = InstanceType<typeof C>; // C
type T1 = InstanceType<any>; // any
type T2 = InstanceType<never>; // any
type T3 = InstanceType<string>; // Error
type T4 = InstanceType<Function>; // Error
```

#### ThisType

`ThisType<T>` 的作用是用于指定上下文对象的类型。

定义：

```typescript
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Marker for contextual 'this' type
 */
interface ThisType<T> {}
```

注意：使用 ThisType 时，必须确保 --noImplicitThis 标志设置为 true。

示例：

```typescript
interface Person {
  name: string;
  age: number;
}

const obj: ThisType<Person> = {
  doSth() {
    this.name; // string
  },
};
```

#### Parameters

`Parameters<T>` 的作用是用于获得函数的参数类型组成的元组类型。

定义：

```typescript
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
```

示例：

```typescript
type A = Parameters<() => void>; // []
type B = Parameters<typeof Array.isArray>; // [any]
type C = Parameters<typeof parseInt>; // [string, (number | undefined)?]
type D = Parameters<typeof Math.max>; // number[]
```

#### ConstructorParameters

`ConstructorParameters<T>` 的作用是提取构造函数类型的所有参数类型。它会生成具有所有参数类型的元组类型（如果 T 不是函数，则返回的是 never 类型）。

定义：

```typescript
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;
```

示例：

```typescript
type A = ConstructorParameters<ErrorConstructor>; // [(string | undefined)?]
type B = ConstructorParameters<FunctionConstructor>; // string[]
type C = ConstructorParameters<RegExpConstructor>; // [string, (string | undefined)?]
```

#### 改变大小写

`intrinsic` 代表了这些工具类型是由 TS 编译器内部实现的，其实也很好理解，我们无法通过类型编程来改变字面量的值

```typescript
type Uppercase<S extends string> = intrinsic;
type Lowercase<S extends string> = intrinsic;
// 首字母大小写
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;
```

## 类

### 创建类

```js
class Car {
  engine: string; // 字段
  constructor(engine: string) {
    this.engine = engine; // 构造函数
  }
  dips(): void {
    // 方法
    console.log("函数中显示发动机型号  :   " + this.engine);
  }
}
var obj = new Car("BMW"); // 创建一个对象
console.log("读取发动机型号 :  " + obj.engine); // 访问字段
obj.dips(); // 访问方法
```

### 继承

类继承使用关键字 extends，子类除了不能继承父类的私有成员(方法和属性)和构造函数，其他的都可以继承。

子类只能继承一个父类，TypeScript 不支持继承多个类，但支持多重继承

类继承后，子类可以对父类的方法重新定义，这个过程称之为方法的重写。其中 super 关键字是对父类的直接引用，该关键字可以引用父类的属性和方法

```js
class PrinterClass {
  doPrint(): void {
    console.log("父类的 doPrint() 方法。");
  }
}
class StringPrinter extends PrinterClass {
  doPrint(): void {
    super.doPrint(); // 调用父类的函数
    console.log("子类的 doPrint()方法。");
  }
}
```

### static 关键字

static 关键字用于定义类的数据成员（属性和方法）为静态的，静态成员可以直接通过类名调用。

```js
class StaticMem {
  static num: number;
  static dips(): void {
    console.log("num 值为 " + StaticMem.num);
  }
}
StaticMem.num = 12; // 初始化静态变量
StaticMem.dips(); // 调用静态方法
```

### 访问控制修饰符

TypeScript 中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。TypeScript 支持 3 种不同的访问权限

- public（默认） : 公有，可以在任何地方被访问

- protected : 受保护，可以被其自身以及其子类和父类访问。

- private : 私有，只能被其定义所在的类访问。

```js
class Encapsulate {
    public str1:string = "hello"
    private str2:string = "world"
    protected str3:string = "!"
 }
 var obj = new Encapsulate()
 console.log(obj.str1)     // 可访问
 console.log(obj.str2)   // 编译错误， str2 是私有的
 console.log(obj.str3) // 编译错误， str3 是受保护的
```

### 抽象类

抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract 关键字是用于定义抽象类和在抽象类内部定义抽象方法。

抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract 关键字并且可以包含访问修饰符。

```ts
abstract class Department {
  constructor(public name: string) {}
  printName(): void {
    console.log("Department name: " + this.name);
  }
  abstract printMeeting(): void; // 必须在派生类中实现
}
class AccountingDepartment extends Department {
  constructor() {
    super("Accounting and Auditing"); // 在派生类的构造函数中必须调用 super()
  }
  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }
  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}
let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在
```

### 类和接口

类可以实现接口，使用关键字 implements，并将 interest 字段作为类的属性使用。

```ts
interface ILoan {
  interest: number;
}
class AgricLoan implements ILoan {
  interest: number;
  rebate: number;
  constructor(interest: number, rebate: number) {
    this.interest = interest;
    this.rebate = rebate;
  }
}
var obj = new AgricLoan(10, 1);
console.log("利润为 : " + obj.interest + "，抽成为 : " + obj.rebate);
```

## 命名空间

TypeScript 中命名空间使用 namespace 来定义，语法格式如下

```ts
namespace SomeNameSpaceName {
  export interface ISomeInterfaceName {}
  export class SomeClassName {}
}
```

要在另外一个命名空间调用语法格式为：`SomeNameSpaceName.SomeClassName;`

如果一个命名空间在一个单独的 TypeScript 文件中，则应使用三斜杠 /// 引用它，语法格式如下：

`/// <reference path = "SomeFileName.ts" />`

```ts
// IShape.ts 文件代码：
namespace Drawing {
  export interface IShape {
    draw();
  }
}
// Circle.ts 文件代码：
/// <reference path = "IShape.ts" />
namespace Drawing {
  export class Circle implements IShape {
    public draw() {
      console.log("Circle is drawn");
    }
  }
}
// Triangle.ts 文件代码：
/// <reference path = "IShape.ts" />
namespace Drawing {
  export class Triangle implements IShape {
    public draw() {
      console.log("Triangle is drawn");
    }
  }
}
// TestShape.ts 文件代码：
/// <reference path = "IShape.ts" />
/// <reference path = "Circle.ts" />
/// <reference path = "Triangle.ts" />
function drawAllShapes(shape: Drawing.IShape) {
  shape.draw();
}
drawAllShapes(new Drawing.Circle());
drawAllShapes(new Drawing.Triangle());
// 使用 tsc 命令编译以上代码 tsc --out app.js TestShape.ts  会生成app.js
```

### 嵌套命名空间

```ts
// Invoice.ts 文件代码：
namespace Runoob {
  export namespace invoiceApp {
    export class Invoice {
      public calculateDiscount(price: number) {
        return price * 0.4;
      }
    }
  }
}
// InvoiceTest.ts 文件代码：
/// <reference path = "Invoice.ts" />
var invoice = new Runoob.invoiceApp.Invoice();
console.log(invoice.calculateDiscount(500)); // 200
```

## 模块

模块导出使用关键字 export 关键字，语法格式如下：

```ts
// 文件名 : SomeInterface.ts
export interface SomeInterface {
  // 代码部分
}
```

要在另外一个文件使用该模块就需要使用 import 关键字来导入:

`import someInterfaceRef = require("./SomeInterface");`

```ts
// IShape.ts 文件代码：
/// <reference path = "IShape.ts" />
export interface IShape {
  draw();
}
// Circle.ts 文件代码：
import shape = require("./IShape");
export class Circle implements shape.IShape {
  public draw() {
    console.log("Circle is drawn (external module)");
  }
}
// Triangle.ts 文件代码：
import shape = require("./IShape");
export class Triangle implements shape.IShape {
  public draw() {
    console.log("Triangle is drawn (external module)");
  }
}
// TestShape.ts 文件代码：
import shape = require("./IShape");
import circle = require("./Circle");
import triangle = require("./Triangle");
function drawAllShapes(shapeToDraw: shape.IShape) {
  shapeToDraw.draw();
}
drawAllShapes(new circle.Circle());
drawAllShapes(new triangle.Triangle());
// 使用 tsc 命令编译以上代码（AMD）：tsc --module amd TestShape.ts
```

## 声明文件

在 TypeScript 中，我们并不知道 $ 或 jQuery 是什么东西 这时，我们需要使用 declare 关键字来定义它的类型，帮助 TypeScript 判断我们传入的参数类型对不对

```ts
declare var jQuery: (selector: string) => any;
jQuery("#foo");
```

### 声明文件或模块

声明文件以 .d.ts 为后缀

```ts
// 声明文件或模块的语法格式如下:
declare module Module_Name {
}
TypeScript 引入声明文件语法格式：
/// <reference path = " runoob.d.ts" />
```
