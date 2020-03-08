const fs = require("fs-extra");
const path = require("path");
const topicLinks = require("./temp/conf/list_user_input");
const ouput = require("./output");
const utils = require("./utils");

//
const needParseTopics = () =>
  new Promise(resolve => {
    // 在 list 目录内遍历文件
    fs.readdir(utils.outputFilepath("list"), (err, filenames) => {
      if (err) throw err;
      // console.log("filenames", filenames);
      let jsonFilenames = [];
      if (filenames.length) {
        jsonFilenames = filenames
          .map(ffname => (/\.json$/.test(ffname) ? ffname.split(".")[0] : null))
          .filter(e => e);
      }

      console.log("jsonFilenames", jsonFilenames);

      const mainRlt = [];

      // 判断是否已经生成过分析结果
      const readfilecontent = fname => cb => {
        const readPath = utils.outputFilepath(`topic_items/${fname}.text`);
        fs.pathExists(readPath, (err0, exists) => {
          if (!err0 && !exists) {
            // console.log("exists", fname, exists);
            fs.readJson(
              utils.outputFilepath(`list/${fname}.json`),
              (err1, response) => {
                // console.log("response", response);
                if (!err1) {
                  mainRlt.push({
                    fname,
                    response
                  });
                  cb();
                }
              }
            );
          } else {
            cb();
          }
        });
      };

      // 串行读取
      utils.series(
        jsonFilenames.map(fname => readfilecontent(fname)),
        () => {
          // console.log("mainRlt", mainRlt.length);
          resolve(mainRlt);
        }
      );
    });
  });

const sidData = {};
const readItemFile = sid => cb => {
  const readPath = utils.outputFilepath(`item/${sid}.json`);
  fs.pathExists(readPath, (err0, exists) => {
    if (!err0 && exists) {
      // console.log("exists", exists);
      fs.readJson(
        utils.outputFilepath(`item/${sid}.json`),
        (err1, response) => {
          // console.log("response", response);
          if (!err1) {
            sidData[sid] = response;
            // console.log(Object.keys(sidData).length);
            cb();
          } else {
            console.log("错误，文件读取失败", readPath);
            cb();
          }
        }
      );
    } else {
      console.log("错误，路径不存在", readPath);
    }
  });
};

const fetchItemsInfo = sids =>
  new Promise(resolve => {
    utils.series(
      sids.map(sid => readItemFile(sid)),
      () => {
        console.log("所需的所有item文件读取完毕");
        resolve();
      }
    );
  });

const batchWriteReports = wdatas =>
  new Promise(resolve => {
    utils.series(
      wdatas.map(item => cb => {
        const wpath = utils.outputFilepath(`topic_items/${item.fname}.text`);
        const wdata = `${item.title}\n\n${item.items
          .reduce((total, it) => total.concat(it), [])
          .filter(e => e)
          .join(",\n")}`;
        fs.ensureFileSync(wpath);
        fs.outputFile(wpath, wdata, err => {
          if (!err) {
            console.log(`报告已写入成功=>${item.title}`);
            cb();
          }
        });
      }),
      () => {
        console.log(`${wdatas.length}份报告写入完毕`);
        resolve();
      }
    );
  });

const main = async () => {
  const topicsList = await needParseTopics();
  // console.log("main -> topicsList", topicsList.length);
  if (!topicsList.length) {
    console.log(`报告均已存在，无需汇总输出`);
    return;
  }
  console.log(`有${topicsList.length}个专题需要汇总输出`);

  // 汇总需要读取的item文件
  let mainSids = [];
  topicsList.forEach(topic => {
    const sids = topic.response.items.filter(e => e[1] !== 0).map(e => e[1]);
    mainSids = mainSids.concat(sids);
  });
  // 去重
  mainSids = Array.from(new Set(mainSids)).filter(e => e);
  console.log(`需要读取${mainSids.length}个item文件`);

  // 遍历读取item文件
  await fetchItemsInfo(mainSids);

  // 数据组装
  const wdatas = topicsList.map(({ fname, response }) => {
    const etitle = /\[(.*)]/.exec(response.title);
    return {
      fname,
      title: etitle ? etitle[1] : "",
      items: response.items
        .filter(e => e[1] !== 0)
        .map(e => {
          const itemInfo = sidData[e[1]];
          if (itemInfo) {
            const { cover, video } = itemInfo;
            return [cover, video];
          }
          console.log(`错误，item数据读取失败，sid=>${e[1]}`, e);
        })
        .filter(e => e)
    };
  });
  // console.log("main -> wdatas", wdatas);
  console.log(`数据组装完成，准备批量输出${wdatas.length}个专题文件`);

  // 批量输出
  await batchWriteReports(wdatas);
};

main();
