const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        defaultViewport: { width: 1280, height: 720 },
        headless: true
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });

    const htmlPath = path.resolve(__dirname, '99-placeholder.html');
    await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

    await page.screenshot({
        path: path.resolve(__dirname, '..', '99-placeholder.png'),
        clip: { x: 0, y: 0, width: 1280, height: 720 },
        type: 'png'
    });

    console.log('Saved: 99-placeholder.png');
    await page.close();
    await browser.close();
})();