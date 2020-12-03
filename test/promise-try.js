/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
async function p1() {
  console.log("p1");
  // throw new Error("p1.error");
  throw new Error("hello");
}

function p2() {
  return new Promise((resolve, reject) => {
    reject(new Error("fail"));
  });
}

async function main(item) {
  try {
    await p2();
  } catch (err) {
    console.log("err: ", err);
  }
}

main();
