const puppeteer = require("puppeteer-core");
const findChrome = require("carlo/lib/find_chrome");
const path = require("path");
const mainconf = require("./temp/conf");

const browserPage = async () => {
  const findChromePath = await findChrome({});
  const { executablePath } = findChromePath;
  // console.log(executablePath);
  const browser = await puppeteer.launch({
    executablePath,
    headless: true
  });
  const uagentVal = await browser.userAgent();
  const page = await browser.newPage();
  await page.setUserAgent(uagentVal.replace("Headless", ""));
  return {
    page,
    browser
  };
};

const filterTag = function(str) {
  return str.replace(/<.*?>/g, "");
};

const series = function(arr, callback) {
  let counter = 0;
  const process = function() {
    if (counter < arr.length) {
      const fun = arr[counter++];
      if (fun) fun(process);
    } else if (callback) callback();
  };
  process();
};

module.exports = {
  ...mainconf,
  addUrlPrefix: url => `${mainconf.urlPrefix}${url}`,
  outputFilepath: ffname => path.resolve(__dirname, `./temp/${ffname}`),
  series,
  filterTag
};
