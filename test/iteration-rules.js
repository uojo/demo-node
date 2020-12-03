/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
async function p1() {
  console.log("p1");
  // throw new Error("p1.error");
  return true;
}

function main(item) {
  const rules = [
    function(item) {
      console.log(1);
      // throw new Error("foo");
      // return "foo";
    },
    // p1,
    async function(item) {
      console.log(2);
      await p1();
    },
    function(item) {
      console.log(3);
    }
  ];

  for (const rule of rules) {
    if (rule instanceof Promise) {
      (async function() {
        await rule();
      })();
    } else if (rule()) return;
  }
}

main({ a: 1, b: 2 });
