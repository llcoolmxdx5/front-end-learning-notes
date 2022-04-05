import arrayFrom from "../from";

describe("Array.from", () => {
  test("从 String 生成数组", () => {
    expect(arrayFrom("foo")).toEqual(["f", "o", "o"]);
  });

  test("从 Set 生成数组", () => {
    const set = new Set(["foo", "bar", "baz", "foo"]);
    expect(arrayFrom(set)).toEqual(["foo", "bar", "baz"]);
  });

  test("从 Map 生成数组", () => {
    const map = new Map([
      [1, 2],
      [2, 4],
      [4, 8],
    ]);
    expect(arrayFrom(map)).toEqual([
      [1, 2],
      [2, 4],
      [4, 8],
    ]);
    const mapper = new Map([
      ["1", "a"],
      ["2", "b"],
    ]);
    expect(arrayFrom(mapper.values())).toEqual(["a", "b"]);
    expect(arrayFrom(mapper.keys())).toEqual(["1", "2"]);
  });

  test("从类数组对象（arguments）生成数组", () => {
    function f() {
      return arrayFrom(arguments);
    }
    // @ts-ignore
    expect(arrayFrom(f(1, 2, 3))).toEqual([1, 2, 3]);
  });

  test("在 Array.from 中使用箭头函数", () => {
    expect(arrayFrom([1, 2, 3], (x) => x + x)).toEqual([2, 4, 6]);
    expect(arrayFrom({ length: 5 }, (v, i) => i)).toEqual([0, 1, 2, 3, 4]);
  });

  test("序列生成器(指定范围)", () => {
    const range = (start: number, stop: number, step: number = 1) =>
      arrayFrom<unknown, number>(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
      );

    expect(range(0, 4)).toEqual([0, 1, 2, 3, 4]);
    expect(range(1, 10, 2)).toEqual([1, 3, 5, 7, 9]);
    expect(
      range("A".charCodeAt(0), "D".charCodeAt(0)).map((x) =>
        String.fromCharCode(x)
      )
    ).toEqual(["A", "B", "C", "D"]);
  });

  test("数组去重合并", () => {
    function combine() {
      // @ts-ignore
      let arr = [].concat.apply([], arguments); //没有去重复的新数组
      return arrayFrom(new Set(arr));
    }
    const m = [1, 2, 2],
      n = [2, 3, 3];
    // @ts-ignore
    expect(combine(m, n)).toEqual([1, 2, 3]);
  });
});
