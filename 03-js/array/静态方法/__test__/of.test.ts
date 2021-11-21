import arrayOf from "../of";

describe("Array.of", () => {
  test("Array.of 基础", function () {
    expect(arrayOf("foo")).toEqual(Array.of("foo"));
    expect(arrayOf(7)).toEqual(Array.of(7));
    expect(arrayOf(1, 2, 3)).toEqual(Array.of(1, 2, 3));
  });

  test("类数组", function () {
    expect(arrayOf({ length: 7 })).toEqual(Array.of({ length: 7 }));
  });
});
