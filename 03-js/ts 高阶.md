# ts 高阶

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

- 协变(Covariant)：协变表示`Complex<T>`类型兼容和 T 的一致
- 逆变(Contravariant)：逆变表示`Complex<T>`类型兼容和 T 相反。
- 双变(Bivariant) = 协变 + 逆变：双向协变表示`Complex<T>`类型双向兼容。
- 不变(Invariant)：不变表示`Complex<T>`双向都不兼容。

### 协变

假设复杂类型 Complex(A) 和 Complex(B)，如果由 Complex(A) 是 Complex(B) 的子类型能够得出 A 是 B 的子类型，我们将这种变型称作 **协变**。

```ts
Complex(A) <: Complex(B)  ->  A <: B
```

协变是指：子集能赋值给其超集。

```ts
class Chordate {
  hasSpine(): boolean {
    return true;
  }
}
class Mammal extends Chordate {
  canBreastFeed(): boolean {
    return true;
  }
}
function foo(animal: Chordate) {
  animal.hasSpine();
}
foo(new Chordate());
foo(new Mammal());
```

以上代码证明了 Typescript 支持协变，Mammal 是 Chordate 的子集，方法 foo 接受参数类型为 Chordate，而 Mammal 实例也能赋值给 Chordate 参数。

### 逆变

如果由 Complex(A) 是 Complex(B) 的子类型能够得出 B 是 A 的子类型，我们将这种变型称为 逆变。

```ts
Complex(A) <: Complex(B)  ->  B <: A
```

根据上面的举例说明，函数类型 fn 是 func 的子类型，fn 参数 T 是 func 参数 S 的父类型，函数参数类型在 TypeScript 类型系统中遵守一种 **逆变** 的规则。

```ts
fn <: func
T :> S
```

在 TypeScript 中，复杂类型的成员都会进行协变，包括对象、类、数组和函数的返回值类型。但是，函数的参数类型进行逆变。

因为有协变和逆变规则约定，复杂类型之间赋值若不遵循变型规则就会发生复杂类型的组成类型不兼容问题。

逆变(Contravariance)与双变(Bivariance)只针对函数有效。 --strictFunctionTypes 开启时只支持逆变，关闭时支持双变。

```ts
class Chordate {
  hasSpine(): boolean {
    return true;
  }
}
class Mammal extends Chordate {
  canBreastFeed(): boolean {
    return true;
  }
}
declare let f1: (x: Chordate) => void;
declare let f2: (x: Mammal) => void;
f2 = f1;
f1 = f2; //Error: Mammal is incompatible with Chordate
```

### 类型安全和不变性

最后来聊一下不变性 (Invariant) 的应用。上面我们提到 `Array<T>` 这一复合类型是协变。但是对于可变数组，协变并不安全。同样，逆变也不安全（不过一般逆变不存在于数组）。

下面这个例子中运行便会报错：

```ts
class Animal {}
class Cat extends Animal {
  meow() {
    console.log("cat meow");
  }
}
class Dog extends Animal {
  wow() {
    console.log("dog wow");
  }
}

let catList: Cat[] = [new Cat()];
let animalList: Animal[] = [new Animal()];
let dog = new Dog();

// covariance is not type safe
animalList = catList;
animalList.push(dog);
catList.forEach((cat) => cat.meow()); // cat.meow is not a function

// contravariance is also not type safe, if it exist here
catList = animalList;
animalList.push(dog);
catList.forEach((cat) => cat.meow());
```

## 类型别名

TypeScript 提供了为类型注解设置别名的便捷语法，你可以使用 `type SomeName = someValidTypeAnnotation` 来创建别名，比如：

```typescript
type Pet = "cat" | "dog";
let pet: Pet;

pet = "cat"; // Ok
pet = "dog"; // Ok
pet = "zebra"; // Compiler error
```

## 基础知识

### typeof

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

### keyof

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

### in

in 用来遍历枚举类型：

```typescript
type Keys = "a" | "b" | "c";

type Obj = {
  [p in Keys]: any;
}; // -> { a: any, b: any, c: any }
```

### infer

在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

以上代码中 infer R 就是声明一个变量来承载传入函数签名的返回值类型，简单说就是用它取到函数返回值的类型方便之后使用。

### extends

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

## 内置类型别名

### Partial

Partial 的作用就是将某个类型里的属性全部变为可选项 ? 。

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

### Required

Required 的作用就是将某个类型里的属性全部变为必选项。

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

### Readonly

Readonly 的作用是将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋值。

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

### Record

Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。

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

### Pick

Pick<T, K extends keyof T> 的作用是将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。

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

### Exclude

Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉。

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

### Extract

Extract<T, U> 的作用是从 T 中提取出 U 。

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

### Omit

Omit<T, K extends keyof any> 的作用是使用 T 类型中除了 K 类型的所有属性，来构造一个新的类型。

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

### NonNullable

NonNullable 的作用是用来过滤类型中的 null 及 undefined 类型。

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

### ReturnType

ReturnType 的作用是用于获取函数 T 的返回类型。

定义：

````typescript
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```ts

示例：
```ts
type T0 = ReturnType<() => string>; // string
type T1 = ReturnType<(s: string) => void>; // void
type T2 = ReturnType<<T>() => T>; // {}
type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T4 = ReturnType<any>; // any
type T5 = ReturnType<never>; // any
type T6 = ReturnType<string>; // Error
type T7 = ReturnType<Function>; // Error
````

3.11 InstanceType

InstanceType 的作用是获取构造函数类型的实例类型。

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

3.12 ThisType

ThisType 的作用是用于指定上下文对象的类型。

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
  dosth() {
    this.name; // string
  },
};
```

### Parameters

Parameters 的作用是用于获得函数的参数类型组成的元组类型。

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

### ConstructorParameters

ConstructorParameters 的作用是提取构造函数类型的所有参数类型。它会生成具有所有参数类型的元组类型（如果 T 不是函数，则返回的是 never 类型）。

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
