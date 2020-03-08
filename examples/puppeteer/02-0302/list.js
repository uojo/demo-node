/* eslint-disable no-use-before-define */

const handleOutput = require("./output");
const topicLinks = require("./temp/conf/list_user_input");
const utils = require("./utils");

/**
 * 手动执行
 * 功能：从手动维护的专题地址中分析出专题内的所有列表页中的详情地址。
 */
const readPageLimit = 0;
let readPageNo = 0;
// 加载专题数，一个专题页中包含多个页面
let loadTopicCount = 0;
// 加载页面数
let loadPageCount = 0;

// 读取专题页内容，并翻页
const readList = async page => {
  const listTitle = await page.$eval("tr:nth-child(9) td h1", el => {
    return el.innerHTML;
  });
  // 判断专题是否已被解析
  // 专题内总记录数
  const topicItemsCount = await page.$eval("tr:nth-child(8) td", el => {
    const pageText = el.innerText.replace(/\s/g, "");
    const prlt = /\/([\d]+)/.exec(pageText);
    return prlt ? parseInt(prlt[1]) : 0;
  });
  if (topicItemsCount && topicItemsCount > 0) {
    console.log("读取本地数据");
    const topicInfo = await handleOutput.fetchTopicInfo(listTitle);
    if (topicInfo && topicInfo.totalCount === topicItemsCount) {
      console.log("无需处理，已存记录数与线上记录数相同");
      return;
    }
  }

  // 读取专题数据
  const listData = await page.$$eval("tr:nth-child(9) td a", els => {
    return els.length > 0 ? els.map(e => e.href) : [];
  });

  // console.log("listData", listData);
  if (listData.length > 0) {
    await handleOutput.saveListData({ title: listTitle, items: listData });
  } else {
    console.log("专题页面解析项总数为0");
  }

  ++readPageNo;
  console.log(`!专题内的第${readPageNo}个页面解析任务完成`);
  ++loadPageCount;
  console.log(`累计解析页面数${loadPageCount}`);

  if (readPageLimit && readPageNo === readPageLimit) {
    console.log(`!!!访问停止，超出设定访问量：${readPageLimit}`);
    return;
  }
  // 翻页
  const nextPageSStr = "tr:nth-child(8) td a:last-child";
  const nextPageEl = await page.$$eval(nextPageSStr, els => {
    if (els.length > 0 && />/.test(els[0].innerText)) {
      return [els[0].href];
    }
    return [];
  });

  // 有下一页
  if (nextPageEl.length > 0) {
    console.log(`!开始访问下一页`);
    const nextPageUrl = nextPageEl[0];
    // console.log("nextPageUrl", nextPageUrl);
    // 继续打开下一页
    await openTopicPage(page, nextPageUrl);
  } else {
    console.log("没有下一页了");
  }
};

const openTopicPage = (page, url) =>
  new Promise(resolve => {
    page.once("load", async () => {
      console.log(`页面已加载完成，url => ${url}`);
      // 解析页面内容
      await readList(page);
      resolve();
    });

    page.goto(url);
  });

// 打开专题页
const loadTopicPage = (page, item) => async cb => {
  await openTopicPage(page, item.url);
  ++loadTopicCount;
  setTimeout(() => {
    cb();
  }, 1000);
};

(async () => {
  const { browser, page } = await utils.browserPage();
  const sq = topicLinks
    .filter(
      item => item && item.length === 3 && item[0] === 1 && item[1] && item[2]
    )
    .map(item => loadTopicPage(page, { title: item[1], url: item[2] }));
  // 建立串行任务
  utils.series(sq, () => {
    console.log(`所有专题任务执行完毕，完成比率${loadTopicCount}/${sq.length}`);
    browser.close();
  });
})();
