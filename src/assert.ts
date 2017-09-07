import * as puppeteer from 'puppeteer';

function url() {
  return this.page.url();
}

async function evaluate(args) {
  const innerText = await this.page.$eval(args.selector, el => el.innerHTML);
  return innerText;
}

export const assert = {
  'page.url': url,
  'page.evaluate': evaluate
}