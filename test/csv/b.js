const csvtojson = require("csvtojson");

const allUserFilePath = "./temp/user0211.csv";
const wjFilePath1 = "./temp/wj_0211_14.csv";

const fetchAllUser = async () => {
  const res = await csvtojson().fromFile(allUserFilePath);
  return res;
};

const fetchWJItems = async () => {
  const res = await csvtojson().fromFile(wjFilePath1);
  return res;
};

const main = async () => {
  const allUserInfo = await fetchAllUser();
  console.log("TCL: main -> allUserInfo", allUserInfo.length);
  const wjInfo = await fetchWJItems();
  console.log("TCL: main -> wjInfo", wjInfo[0]);
};

main();
