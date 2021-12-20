const puppeteer = require('puppeteer');

const loginTelenor = async (loginURL, email, password) => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  await page.goto(loginURL, {
    waitUntil: 'networkidle2',
  });

  await page.type('[id="exampleInputEmail1"]', email);
  await page.keyboard.down('Enter');
  await page.waitForNavigation();
  await page.type('[id="password"]', password);
  await page.keyboard.down('Enter');
  await page.waitForNavigation();

  return {
    browser,
    page,
  };
};

const enterPin = async ({ loginURL, email, password, code }) => {
  const { browser, page } = await loginTelenor(loginURL, email, password);
  await page.type('[id="userCode"]', code);
  await page.keyboard.down('Enter');
  await page.waitForNavigation();
  const errors = await page.$$('.nalog-error');
  await browser.close();
  return !errors.length;
};

module.exports = {
  enterPin,
};
