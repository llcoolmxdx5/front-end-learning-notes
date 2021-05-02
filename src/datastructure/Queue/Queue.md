# Queue

队列是遵循**先进先出**（FIFO，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾

## 创建队列

首先需要一个用于存储队列中元素的数据结构。我们可以使用数组，就像 Stack类那样。但是，为了写出一个在获取元素时更高效的数据结构，我们将使用一个对象来存储我们的元素。你会发现 Queue 类和 Stack 类非常类似，只是添加和移除元素的原则不同。也可以声明一个 count 属性来帮助我们控制队列的大小。此外，由于我们将要从队列前端移除元素，同样需要一个变量来帮助我们追踪第一个元素。因此，声明一个 lowestCount变量。

接下来需要声明一些队列可用的方法。

- enqueue(element(s))：向队列尾部添加一个（或多个）新的项。
- dequeue()：移除队列的第一项（即排在队列最前面的项）并返回被移除的元素。
- peek()：返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息——与 Stack 类的 peek 方法非常类似）。该方法在其他语言中也可以叫作 front 方法。
- isEmpty()：如果队列中不包含任何元素，返回 true，否则返回 false。
- size()：返回队列包含的元素个数，与数组的 length 属性类似。

## 双端队列

双端队列（deque，或称 double-ended queue）是一种允许我们同时从前端和后端添加和移除元素的特殊队列。

在计算机科学中，双端队列的一个常见应用是存储一系列的撤销操作。每当用户在软件中进行了一个操作，该操作会被存在一个双端队列中（就像在一个栈里）。当用户点击撤销按钮时，该操作会被从双端队列中弹出，表示它被从后面移除了。在进行了预先定义的一定数量的操作后，最先进行的操作会被从双端队列的前端移除。由于双端队列同时遵守了先进先出和后进先出原则，可以说它是把队列和栈相结合的一种数据结构。

既然双端队列是一种特殊的队列，我们可以看到其构造函数中的部分代码和队列相同，包括相同的内部属性和以下方法：isEmpty、clear、size 和 toString。

由于双端队列允许在两端添加和移除元素，还会有下面几个方法:

- addFront(element)：该方法在双端队列前端添加新的元素。
- addBack(element)：该方法在双端队列后端添加新的元素（实现方法和 Queue 类中的enqueue 方法相同）。
- removeFront()：该方法会从双端队列前端移除第一个元素（实现方法和 Queue 类中的dequeue 方法相同）。
- removeBack()：该方法会从双端队列后端移除第一个元素（实现方法和 Stack 类中的pop 方法一样）。
- peekFront()：该方法返回双端队列前端的第一个元素（实现方法和 Queue 类中的 peek方法一样）。
- peekBack()：该方法返回双端队列后端的第一个元素（实现方法和 Stack 类中的 peek方法一样）。