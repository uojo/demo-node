const fs = require("fs-extra");
const moment = require("moment");
const utils = require("./utils");

moment.locale("zh-cn");

const listData = {
  modifytime: 0,
  modifytimeStr: "",
  items: ["http://xxx", 0]
};

const itemData = {
  title: "",
  cover: "",
  video: ""
};

const extraWriteData = data => {
  const now = Date.now();
  return {
    modifytime: now,
    modifytimeStr: moment(now).format("YYYY-MM-DD HH:mm"),
    ...data
  };
};

// 检查链接是否重复，并返回追加后的结果
const checkRepeatLink = (wfilepath, witems) => {
  const fileContent = fs.readJsonSync(wfilepath);
  const items0 = fileContent.items.map(e => e[0]);
  const newLinks = witems.filter(link => {
    return !items0.includes(link);
  });
  return {
    hasNew: newLinks.length > 0,
    fullData: {
      ...fileContent,
      items: fileContent.items.concat(newLinks.map(e => [e, 0]))
    }
  };
};

const clearLink = url => {
  return url.replace(utils.urlPrefix, "");
};

const writeJson = (wfilepath, wData) =>
  new Promise(resolve => {
    // 写文件
    fs.writeJson(wfilepath, extraWriteData(wData), err => {
      if (err) return console.error(err);
      console.log(`文件写入成功: ${wfilepath}`);
      resolve(err);
    });
  });

const parseItemDescs = descs => {
  const rlt = {};
  descs
    .map(e => {
      if (!/:/.test(e)) {
        return null;
      }
      const key = e.split(":")[0];
      let val = [];
      const mrlt = e.match(/\[([^\]]*)]/g);
      if (mrlt) {
        val = mrlt.map(x => /\[(.*)]/.exec(x)[1]);
      }
      return { [key]: val.length === 1 ? val[0] : val };
    })
    .filter(e => e)
    .forEach(e => {
      Object.assign(rlt, e);
    });
  return rlt;
};

const covertListFilename = title =>
  new Promise(resolve => {
    const dataPath = utils.outputFilepath("conf/list_filename.json");
    fs.readJson(dataPath, (err, data) => {
      if (err) console.error(err);
      const targetFilename = data[title];
      if (targetFilename) {
        resolve();
      } else {
        // 新添加，并更新到文件中
        const newFilename = moment(Date.now()).format("YY_MMDD_HHmmss");
        const wdata = {
          ...data,
          // eg. 19_0101_101031
          [title]: newFilename
        };
        fs.writeJSON(dataPath, wdata, err0 => {
          if (!err0) {
            resolve(newFilename);
          }
        });
      }
    });
  });

module.exports = {
  saveListData: async ({ title, items }) => {
    console.log("开始保存列表数据");
    const wData = {
      title,
      items: items.map(link => clearLink(link))
    };
    // console.log("wData", wData);

    const wffname = await covertListFilename(wData.title);
    const wfilepath = utils.outputFilepath(`list/${wffname}.json`);

    // 是否已经存在
    const exists = await fs.pathExists(wfilepath);
    if (exists) {
      console.log("待写入文件已存在");
      // 查询是否重复
      const ckRlt = checkRepeatLink(wfilepath, wData.items);
      if (ckRlt.hasNew) {
        // 追加写入
        console.log("追加写入", ckRlt.fullData.items.length);
        await writeJson(wfilepath, ckRlt.fullData);
      } else {
        console.log("无需写入，均为重复记录");
      }
    } else {
      fs.ensureFileSync(wfilepath);
      console.log("待写入文件已创建");
      // 没，写入
      wData.items = wData.items.map(e => [e, 0]);
      await writeJson(wfilepath, wData);
    }
  },
  saveItemState: (ffpath, link) =>
    new Promise(async resolve => {
      console.log("开始保存页面访问状态=>", ffpath);
      const fileContent = fs.readJsonSync(ffpath);
      const wData = {
        ...fileContent,
        items: fileContent.items.map(e => {
          if (e[0] === link) {
            return [link, 1];
          }
          return e;
        })
      };
      await writeJson(ffpath, wData);
      console.log("!!!页面访问状态变更成功。");
      resolve();
    }),
  saveItemData: data =>
    new Promise(async (resolve, reject) => {
      console.log("开始保存详情数据");
      const descInfo = parseItemDescs(data.descs);
      if (!descInfo.SID) {
        console.log(`错误！sid获取失败`);
        reject();
        return;
      }
      const wfilepath = utils.outputFilepath(`item/${descInfo.SID}.json`);
      const wData = {
        ...data,
        descInfo
      };
      // 覆盖写入
      fs.ensureFileSync(wfilepath);
      console.log("待写入文件已创建");
      await writeJson(wfilepath, wData);
      resolve();
    })
};
