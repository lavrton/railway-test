import puppeteer from 'puppeteer';

async function createBrowser() {
  return puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
    headless: 'new',
  });
}

async function run() {
  const browser = await createBrowser();
  console.log('Browser created');
  // Keep the browser open for a bit to simulate work being done
  await new Promise((resolve) => setTimeout(resolve, 10000));
  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
