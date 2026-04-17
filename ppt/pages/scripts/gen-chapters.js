const puppeteer = require('puppeteer-core');
const path = require('path');

const chapters = [
    { n: '1', t: '绪论', e: 'Introduction', file: '03-chapter1' },
    { n: '2', t: '相关技术与理论基础', e: 'Related Technologies & Theoretical Foundation', file: '04-chapter2' },
    { n: '3', t: '系统需求分析', e: 'Requirements Analysis', file: '05-chapter3' },
    { n: '4', t: '系统设计', e: 'System Design', file: '06-chapter4' },
    { n: '5', t: '系统实现', e: 'Implementation', file: '07-chapter5' },
    { n: '6', t: '总结与展望', e: 'Conclusion & Outlook', file: '08-chapter6' },
];

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        defaultViewport: { width: 1280, height: 720 },
        headless: true
    });

    const templatePath = path.resolve(__dirname, 'chapter-transition.html');

    for (const ch of chapters) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });

        const url = 'file:///' + templatePath.replace(/\\/g, '/') + '?n=' + ch.n + '&t=' + encodeURIComponent(ch.t) + '&e=' + encodeURIComponent(ch.e);
        await page.goto(url, { waitUntil: 'networkidle0' });

        const outputPath = path.resolve(__dirname, '..', ch.file + '.png');
        await page.screenshot({
            path: outputPath,
            clip: { x: 0, y: 0, width: 1280, height: 720 },
            type: 'png'
        });

        console.log('Saved: ' + ch.file + '.png');
        await page.close();
    }

    await browser.close();
    console.log('All chapter transitions generated!');
})();