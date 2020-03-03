const fs = require("fs-extra");
const path = require("path");
const puppeteer = require("puppeteer-core");
const findChrome = require("carlo/lib/find_chrome");
const handleOutput = require("./output");
const utils = require("./utils");

// 读取页面地址，到 list 目录内遍历文件
const fetchItemsUrl = () =>
  new Promise(resolve => {
    fs.readdir(utils.outputFilepath("list"), (err, filenames) => {
      if (err) throw err;
      console.log("filenames", filenames);
      let jsonFilenames = [];
      if (filenames.length) {
        jsonFilenames = filenames
          .map(ffname => (/\.json$/.test(ffname) ? ffname : null))
          .filter(e => e);
      }

      const linksInfo = [];
      const readfilecontent = ffname => cb => {
        fs.readJSON(
          utils.outputFilepath(`list/${ffname}`),
          (err0, response) => {
            if (!err0) {
              if (response && response.items) {
                response.items.forEach(e => {
                  // 过滤已读取的链接
                  if (e[1] === 0) {
                    linksInfo.push([ffname, e[0]]);
                  }
                });
              }
            }
            cb();
          }
        );
      };

      // 获取文件内容
      utils.series(
        jsonFilenames.map(ffname => readfilecontent(ffname)),
        () => {
          console.log("linksInfo", linksInfo.length);
          resolve(linksInfo);
        }
      );
    });
  });

// 读取详情页内容
const readPage = async (page, ffname, url) => {
  // 解析页面内容
  const cover = await page.$eval(".mfbig", el => el.src);
  const video = await page.$$eval("source", els =>
    els.length ? els[0].src : ""
  );
  const descs = await page.$$eval("tr:nth-child(7) p:nth-child(n+7)", els => {
    return els.map((el, i) => (i < 10 ? el.innerText : null)).filter(e => e);
  });

  const wdata = {
    url,
    cover,
    video,
    descs
  };
  console.log("!获取页面数据成功");
  // 文件写入
  await handleOutput.saveItemData(wdata);
  // 设置解析状态
  await handleOutput.saveItemState(utils.outputFilepath(`list/${ffname}`), url);

  return true;
};
// 打开详情页
const openPage = (page, ffname, url) => async cb => {
  page.once("load", async () => {
    console.log(`页面加载成功 => ${url}`);
    // const td = page.$(".dataintable");
    // const dom1 = await page.$(".tabContents");
    await readPage(page, ffname, url);
    cb();
  });

  await page.goto(`${utils.addUrlPrefix(url)}`);
};

const main = async () => {
  const { browser, page } = await utils.browserPage();
  // 业务流程
  const itemlinks = await fetchItemsUrl();
  console.log(`准备访问${itemlinks.length}个页面`);
  // console.log("main -> itemlinks", itemlinks);
  const q1 = itemlinks.map(e => {
    return openPage(page, e[0], e[1]);
  });
  // 串行访问页面
  utils.series(q1, () => {
    console.log(`执行完毕，共访问${itemlinks.length}个页面`);
    browser.close();
  });
};

main();
