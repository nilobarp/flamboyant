import * as puppeteer from 'puppeteer';

async function launch(args) {
    const browser = await puppeteer.launch(args);
    this.browser = browser;
    return this;
}

async function connect (args) {
    const browser = await puppeteer.connect(args);
    this.browser = browser;
    return this;
}

export {
    launch,
    connect
}