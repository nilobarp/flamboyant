import * as puppeteer from 'puppeteer';
import * as EventEmitter from 'events';

const browserEvents = new EventEmitter();

async function close (args, meta) {
    this.browser.close();
    this.browser = undefined;
    browserEvents.emit('method.done', 'browser.close', meta);
    return this;
}

async function newPage (args, meta) {
    const page = await this.browser.newPage();
    this.page = page;
    browserEvents.emit('method.done', 'browser.newPage', meta);
    return this;
}

async function version () {
    const version = await this.browser.version();
    return this;
}

async function wsEndpoint () {
    const wsEndpoint = await this.browser.wsEndpoint();
    return this;
}

export {
    browserEvents,
    close,
    newPage,
    version,
    wsEndpoint
}