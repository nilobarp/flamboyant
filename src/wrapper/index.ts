import { connect, launch } from './puppeteer';
import { browserEvents, close as closeBrowser, newPage, version, wsEndpoint } from './browser';
import { pageEvents, $, $$, click, close as closePage, goto, screenshot, type } from './page';

const fnHash = {
    connect, launch,
    browserEvents, closeBrowser, newPage, version, wsEndpoint,
    pageEvents, $, $$, click, closePage, goto, screenshot, type
}

export { fnHash }