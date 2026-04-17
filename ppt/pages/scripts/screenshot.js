const puppeteer = require('puppeteer-core');
const path = require('path');

const file = process.argv[2] || '01-cover';
const inputName = file + '.html';
const outputName = file + '.png';

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        defaultViewport: { width: 1280, height: 720 },
        headless: true
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });

    const htmlPath = path.resolve(__dirname, inputName);
    await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

    await page.screenshot({
        path: path.resolve(__dirname, '..', outputName),
        clip: { x: 0, y: 0, width: 1280, height: 720 },
        type: 'png'
    });

    console.log('Screenshot saved: ' + outputName);
    await browser.close();
})();