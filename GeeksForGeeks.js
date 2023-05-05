const puppeteer = require('puppeteer-core');

const ClassLink = '#eventsLanding_eachEventContainer__O5VyK';
const LinkHttp = 'https://practice.geeksforgeeks.org';
const NameLink='#eventsLanding_eachEventContainer__O5VyK .eventsLanding_eventCardTitle__byiHw'
const TimeLink='#eventsLanding_eachEventContainer__O5VyK .eventsLanding_eventDateContainer__Z1zke>.sofia-pro'


const HandleGFGcode = async () => {
  const timeGFG = [];
  const nameGFG = [];
  const linkGFG = [];
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    });
    const page = await browser.newPage();
    await page.goto('https://atcoder.jp/contests');
    // Extract the Links
    await page.waitForSelector(ClassLink);
    await page.waitForFunction(
      `document.querySelectorAll('${ClassLink}').length > 0`
    );
    const links = await page.$$eval(ClassLink, links => links.map(link => link.querySelector('a').href));
    links.forEach(link => linkGFG.push(LinkHttp + link));

    
    //Extracting the names
    await page.waitForSelector(NameLink)
    await page.waitForFunction(
      `document.querySelectorAll('${NameLink}').length > 0`
    );
    const texts = await page.$$eval(NameLink, (elements) =>
    elements.map((el) => el.textContent.trim())
  );
  for (const text of texts) {
    nameGFG.push(text);
  }

  //Extracting the time
  await page.waitForSelector(TimeLink)
  await page.waitForFunction(
    `document.querySelectorAll('${TimeLink}').length > 0`
  );
    const times = await page.$$eval(TimeLink, (elements) =>
    elements.map((el) => el.textContent.trim())
  );
  for (const time of times) {
    timeGFG.push(time);
  }
  await browser.close();
  console.log(linkGFG,nameGFG,timeGFG)
  return { linkGFG, nameGFG, timeGFG };
  } catch (e) {
    console.log(e);
    return { linkGFG, nameGFG, timeGFG };
  }
}
HandleGFGcode()

