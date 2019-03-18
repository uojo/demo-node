const chromeLauncher = require('chrome-launcher');
const cdp = require('chrome-remote-interface');

(async () => {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--disable-gpu', '--headless']
  })
  const protocol = await cdp({
    port: chrome.port
  })
  const {
    Page,
    Runtime
  } = protocol
  Page.navigate({
    url: 'https://www.baidu.com'
  })
  // Wait for window.onload before doing stuff.
  Page.loadEventFired(async () => {
    const js = "document.querySelector('title').textContent";
    // Evaluate the JS expression in the page.
    const result = await Runtime.evaluate({
      expression: js
    });

    console.log('Title of page: ' + result.result.value);
    protocol.close();
    // Kill Chrome.
    chrome.kill();
  });
})()