const fs = require("fs-extra");
const puppeteer = require("puppeteer-core");
const findChrome = require("./node_modules/carlo/lib/find_chrome");
const handleOutput = require("./output");

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

// 读取列表页内容，并翻页
const readList = async page => {
  // 读取列表数据
  const listData = await page.$$eval(".x_box12 a.h4", el => {
    return el.map(e => ({ title: e.title, link: e.href }));
  });
  // console.log("listData", listData);
  handleOutput.saveListData({ items: listData });

  // 翻页
  const nextPageSStr = "a[title='下一页']";
  const nextPageEl = await page.$(nextPageSStr);

  // 有下一页
  if (nextPageEl) {
    const nextPageUrl = await page.$eval(nextPageSStr, el => el.href);
    console.log("nextPageUrl", nextPageUrl);
    openListPage(page, nextPageUrl);
    // console.log("nextPageEl", nextPageEl.getAttribute("href"));
    // 跳转
    // const [response] = await Promise.all([
    //   page.waitForNavigation(),
    //   page.click(nextPageSStr)
    // ]);
    // console.log("response", response);
  } else {
    console.log("nextPageEl is null");
  }
};

(async () => {
  let findChromePath = await findChrome({});
  let executablePath = findChromePath.executablePath;
  // console.log(executablePath);
  const browser = await puppeteer.launch({
    executablePath,
    headless: true
  });
  const uagentVal = await browser.userAgent();
  const page = await browser.newPage();
  await page.setUserAgent(uagentVal.replace("Headless", ""));

  const url = "http://heart.xxx.cn/tag/guideline";
  openListPage(page, url);
  // const pageContent = await page.content();
  // console.log("pageContent", pageContent);
  // await browser.close();
})();
