const fs = require("fs-extra");
const csvtojson = require("csvtojson");

const filePath1 = "./temp/0526-rating_form.csv";

const fetchAllUser = async () => {
  const res = await csvtojson().fromFile(filePath1);
  return res;
};

// const fetchWJItems = async () => {
//   const res = await csvtojson().fromFile(wjFilePath1);
//   return res;
// };

const main = async () => {
  const allUserInfo = await fetchAllUser();
  console.log("TCL: main -> allUserInfo", allUserInfo.length);
  console.log("TCL: main -> allUserInfo", allUserInfo[0]);
  const r1 = allUserInfo.filter(
    e => e["层级"] === "健检顾问" && e["上级"] !== "/"
  );
  // console.log("main -> r1", r1.length, r1[0]);

  // 完整记录
  const r2 = r1.map(e => {
    return {
      dest: e["姓名"],
      soures: ["上级", "平级1", "平级2", "平级3", "平级4"]
        .map(x => e[x])
        .filter(y => y)
    };
  });
  console.log("main -> r2", r2.length, r2[0]);

  // 评委
  const set1 = new Set([]);
  const r3 = r2.forEach(e => {
    e.soures.forEach(x => set1.add(x));
  });
  console.log("main -> set1", set1.size);

  const map1 = {};
  set1.forEach(e => {
    r2.forEach(x => {
      if (x.soures.includes(e)) {
        if (!map1[e]) {
          map1[e] = [x.dest];
        } else {
          map1[e].push(x.dest);
        }
      }
    });
  });
  console.log("main -> map1", Object.keys(map1).length);

  const w1 = Object.keys(map1).map(e => {
    return `${e} => ${map1[e].toString()}`;
  });
  fs.outputFile("./w1.txt", w1.join("\n"), err => {
    console.log(err); // => null
  });
};

main();
