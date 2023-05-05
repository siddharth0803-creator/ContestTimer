const puppeteer = require('puppeteer-core');

const NameLink = '.contestList .datatable .left';
const ClassLink='.contestList .datatable .right'
const TimeLink='.contestList .datatable td a'
//const LinkHttp = 'https://codeforces.com/contests';

const HandleCodeforcescode = async (page) => {
  try {

    //Extracting names
    await page.waitForSelector(NameLink);
    const texts = await page.$$eval(NameLink, (elements) =>
      elements.map((el) => el.textContent.trim())
    );
    var flagName=false;
    for (const text of texts) {
      if(text==="Name"){
        if(!flagName)flagName=true;
        else break
      }
      else{
      console.log(text);
      }
    }

    //Extracting Link
    await page.waitForSelector(ClassLink);
    const links = await page.$$eval(ClassLink, links => links.map(link => link.querySelector('a')?.href));
    var flagLink=false
    for(const link of links){
      if(!link){
        if(!flagLink)flagLink=true;
        else break;
      }
      else{
        console.log(link)
        flagLink=false
      }
    }

    //Extracting Time
    const Times = await page.$$eval(TimeLink, times => {
      return times
        .filter(time => time.getAttribute('target') === '_blank')
        .map(time => time.textContent.trim());
    });
    
    for(const Time of Times){
      console.log(Time)
    }
    

  } catch (e) {
    console.log(e);
  }
};

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  });
  const page = await browser.newPage();
  await page.goto('https://codeforces.com/contests');
  await HandleCodeforcescode(page);
  await browser.close();
})();