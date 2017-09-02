import * as puppeteer from 'puppeteer';

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function launch(args) {
    const browser = await puppeteer.launch(args);
    this.browser = browser;
    return this;
}

async function page(args) {
    const page = await this.browser.newPage();
    this.page = page;
    return this;
}

async function goto(args) {
    await this.page.goto(args.url, args.options);
    return this;
}

async function screenshot(args) {
    await this.page.screenshot(args);
    return this;
}

async function pdf(args) {
    await this.page.pdf(args);
    return this;
}

async function close() {
    this.browser.close();
}

const fnHash = {
    launch,
    page,
    goto,
    screenshot,
    close,
    pdf
}

export { fnHash }