const puppeteer = require('puppeteer');

const handleLeetcode = async (page) => {
  const linkHttp = 'https://leetcode.com';
  const linkClass = '.swiper-wrapper .swiper-slide .shadow-level1 .h-full.w-full';
  const links = await page.$$eval(linkClass, (elements) =>
    elements.map((el) => el.getAttribute('href'))
  );
  for (const link of links) {
    if (link !== undefined) {
      const fullLink = linkHttp + link;
      console.log(`Links : ${fullLink}`);
    }
  }

  const imgClass = '.swiper-wrapper .swiper-slide .shadow-level1 .h-full.w-full.object-cover';
  const srcs = await page.$$eval(imgClass, (elements) =>
    elements.map((el) => el.getAttribute('src'))
  );
  for (const src of srcs) {
    if (src !== undefined) {
      const fullSrc = linkHttp + src;
      console.log(`src : ${fullSrc}`);
    }
  }

  const timeClass = '.swiper-wrapper .swiper-slide .shadow-level1 .h-full.w-full .flex.items-center';
  const texts = await page.$$eval(timeClass, (elements) =>
    elements.map((el) => el.textContent.trim())
  );
  for (const text of texts) {
    console.log(text);
  }
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://leetcode.com/contest');

  await handleLeetcode(page);

  await browser.close();
})();
