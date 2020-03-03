/* eslint-disable no-use-before-define */

const handleOutput = require("./output");
const listLinks = require("./temp/conf/list_user_input");
const utils = require("./utils");

const readPageLimit = 3;
let readPageNo = 0;
let listCount = 0;

// 读取列表页内容，并翻页
const readList = async page => {
  // 读取列表数据
  const listData = await page.$$eval("tr:nth-child(9) td a", el => {
    return el.map(e => e.href);
  });
  const listTitle = await page.$eval("tr:nth-child(9) td h1", el => {
    return el.innerHTML;
  });
  // console.log("listData", listData);
  await handleOutput.saveListData({ title: listTitle, items: listData });

  ++readPageNo;
  console.log(`!第${readPageNo}个列表页解析任务完成`);
  if (readPageNo === readPageLimit) {
    console.log(`!!!访问停止，超出设定访问量：${readPageLimit}`);
    return;
  }
  // 翻页
  const nextPageSStr = "tr:nth-child(8) td a:last-child";
  const nextPageEl = await page.$(nextPageSStr);

  // 有下一页
  if (nextPageEl) {
    console.log(`!开始访问下一页`);
    const nextPageUrl = await page.$eval(nextPageSStr, el => el.href);
    // console.log("nextPageUrl", nextPageUrl);
    // 打开下一页
    openListPage0(page, nextPageUrl);
  } else {
    console.log("没有下一页了");
  }
};

const openListPage0 = (page, url) =>
  new Promise(resolve => {
    page.once("load", async () => {
      // console.log(`Page loaded => ${item.url}`);
      readList(page);
      ++listCount;
      console.log(
        `页面解析完成，总任务执行进度为${listCount}/${listLinks.length}`
      );
      resolve();
    });

    page.goto(url);
  });

// 打开列表页
const openListPage = (page, item) => async cb => {
  await openListPage0(page, item.url);
  cb();
};

(async () => {
  const { browser, page } = await utils.browserPage();
  const sq = listLinks.map(item => openListPage(page, item));
  // 建立串行任务
  utils.series(sq, () => {
    console.log(`执行完毕，执行任务进度为${listCount}/${listLinks.length}`);
    // browser.close();
  });
})();
