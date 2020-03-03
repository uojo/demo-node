/* eslint-disable no-use-before-define */

const handleOutput = require("./output");
const listLinks = require("./temp/listlinks");
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
    openListPage(page, nextPageUrl);
  } else {
    console.log("没有下一页了");
  }
};

// 打开列表页
const openListPage = async (page, url) => {
  page.once("load", async () => {
    console.log(`Page loaded => ${url}`);
    // const td = page.$(".dataintable");
    // const dom1 = await page.$(".tabContents");
    readList(page);
  });

  await page.goto(url);
};

(async () => {
  const { browser, page } = utils.browserPage();

  // 建立串行任务
  utils.series(
    listLinks.map(e => cb => {
      openListPage(page, e.url);
      console.log(`[${e.name}]执行完毕`);
      ++listCount;
      cb();
    }),
    () => {
      console.log(`执行完毕，执行任务进度为${listCount}/${listLinks.length}`);
      browser.close();
    }
  );
})();
