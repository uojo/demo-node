const fs = require('fs');
const webdriver = require('selenium-webdriver');
const chromedriver = require('chromedriver');

// This should be the path to your Canary installation.
// I'm assuming Mac for the example.
const PATH_TO_CANARY = '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary';

const chromeCapabilities = webdriver.Capabilities.chrome();
chromeCapabilities.set('chromeOptions', {
  binary: PATH_TO_CANARY, // Screenshots require Chrome 60\. Force Canary.
  'args': [
    '--headless',
  ]
});

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .withCapabilities(chromeCapabilities)
  .build();

// Navigate to google.com, enter a search.
driver.get('https://www.google.com/');
driver.findElement({
  name: 'q'
}).sendKeys('webdriver');
driver.findElement({
  name: 'btnG'
}).click();
driver.wait(webdriver.until.titleIs('webdriver - Google Search'), 1000);

// Take screenshot of results page. Save to disk.
driver.takeScreenshot().then(base64png => {
  fs.writeFileSync('screenshot.png', new Buffer(base64png, 'base64'));
});

driver.quit();