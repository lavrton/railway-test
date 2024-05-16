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
  for (let i = 0; i < 50; i++) {
    const browser = await createBrowser();
    console.log('created browser', i);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
