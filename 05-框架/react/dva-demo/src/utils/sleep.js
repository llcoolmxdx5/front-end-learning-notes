export function sleep(wait, ...args) {
  console.log(123);
  return new Promise((res) => setTimeout(res, wait, args));
}
