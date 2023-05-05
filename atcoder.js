const puppeteer = require('puppeteer-core');

const ClassLink = '#contest-table-upcoming td a';

const Handleatcodercode = async () => {
  const timeatcoder = [];
  const nameatcoder = [];
  const linkatcoder = [];

  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    });
    const page = await browser.newPage();
    await page.goto('https://atcoder.jp/contests');

    await page.waitForSelector(ClassLink);

    await page.waitForFunction(
      `document.querySelectorAll('${ClassLink}').length > 0`
    );

    const texts = await page.$$eval(ClassLink, (elements) =>
      elements.map((el) => el.textContent.trim())
    );
    let c = 0;
    for (const text of texts) {
      if (c % 2 === 0) {
        timeatcoder.push(text);
      } else {
        nameatcoder.push(text);
      }
      c++;
    }

    const links = await page.$$eval(ClassLink, (links) =>
      links.map((link) => link.href)
    );
    c = 0;
    for (const link of links) {
      if (c % 2 === 1) {
        linkatcoder.push(link);
      }
      c++;
    }

    await browser.close();

    return { linkatcoder, nameatcoder, timeatcoder };
  } catch (e) {
    console.log(e);
    return { linkatcoder, nameatcoder, timeatcoder };
  }
};
module.exports={Handleatcodercode}
