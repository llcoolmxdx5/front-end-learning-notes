const isArray = (arg: any) => {
  return Object.prototype.toString.call(arg) === "[object Array]";
};

export default isArray;
