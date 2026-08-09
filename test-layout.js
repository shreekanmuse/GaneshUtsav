import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const filePath = `file://${path.resolve(__dirname, 'index.html').replace(/\\/g, '/')}`;
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  console.log('--- Checking Page 2 Elements Bounding Boxes ---');
  const page2Box = await page.$eval('.page-2', el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, height: r.height };
  });
  console.log('Page 2 Bounding Box:', page2Box);

  const mainAlcoveBox = await page.$eval('.page-2 .main-alcove', el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, height: r.height };
  });
  console.log('Page 2 Main Alcove Bounding Box:', mainAlcoveBox);

  const gridBox = await page.$eval('.page-2 .grid-alcoves-container', el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, height: r.height, display: window.getComputedStyle(el).display };
  });
  console.log('Page 2 Grid Alcoves Bounding Box:', gridBox);

  const footerBox = await page.$eval('.page-2 .page-footer', el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, height: r.height };
  });
  console.log('Page 2 Footer Bounding Box:', footerBox);

  console.log('--- Checking Page 3 Elements Bounding Boxes ---');
  const page3Box = await page.$eval('.page-3', el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, height: r.height };
  });
  console.log('Page 3 Bounding Box:', page3Box);

  const splitAlcovesBox = await page.$eval('.page-3 .split-alcoves-row', el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, height: r.height };
  });
  console.log('Page 3 Split Row Bounding Box:', splitAlcovesBox);

  const awardsAlcoveBox = await page.$eval('.page-3 .awards-alcove', el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, height: r.height };
  });
  console.log('Page 3 Awards Alcove Bounding Box:', awardsAlcoveBox);

  const finaleAlcoveBox = await page.$eval('.page-3 .finale-poster-alcove', el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, height: r.height };
  });
  console.log('Page 3 Finale Alcove Bounding Box:', finaleAlcoveBox);

  const footer3Box = await page.$eval('.page-3 .page-footer', el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, height: r.height };
  });
  console.log('Page 3 Footer Bounding Box:', footer3Box);

  await browser.close();
}

run().catch(err => {
  console.error(err);
});
