function getString() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello world~~~");
    }, 2000);
  });
}

async function helloWorld() {
  let string = await getString();
  console.log(string);
}

// 导出函数模块
export default helloWorld;
