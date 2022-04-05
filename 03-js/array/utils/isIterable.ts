const isIterable = (obj: any) =>
  obj != null && typeof obj[Symbol.iterator] === "function";

export default isIterable;
