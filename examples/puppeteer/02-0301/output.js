const fs = require("fs-extra");
const path = require("path");

const listData = {
  createtime: Date.now(),
  title: "",
  items: []
};

const itemData = {
  title: "",
  cover: "",
  video: ""
};

module.exports = {
  saveListData: data => {
    const wData = {
      createtime: Date.now(),
      ...data
    };
    console.log("wData", wData);
    const wfilepath = path.resolve(
      __dirname,
      `./data/${wData.createtime}.json`
    );
    fs.ensureFileSync(wfilepath);
    // 写文件
    fs.writeJsonSync(wfilepath, wData, err => {
      if (err) return console.error(err);
      console.log("write json success!");
    });
  }
};
