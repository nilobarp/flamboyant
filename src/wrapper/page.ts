import * as puppeteer from 'puppeteer';
import * as EventEmitter from 'events';

const pageEvents = new EventEmitter();

async function $(selector) {
    const elementHandle = await this.page.$(selector);
    this.elementHandle = elementHandle;
    pageEvents.emit('method.done', 'page.$');
    return this;
}

async function $$(selector) {
    const elementHandle = await this.page.$$(selector);
    this.elementHandle = elementHandle;
    pageEvents.emit('method.done', 'page.$$');
    return this;
}

async function click (args, meta) {
    await this.page.click(args.selector, args.options);
    pageEvents.emit('method.done', 'page.click', meta);
    return this;
}

async function close (args, meta) {
    await this.page.close();
    this.page = undefined;
    pageEvents.emit('method.done', 'page.close', meta);
    return this;
}

async function goto (args, meta) {
    await this.page.goto(args.url, args.options)
    pageEvents.emit('method.done', 'page.goto', meta);
    return this;
}

async function screenshot(args, meta) {
    await this.page.screenshot(args);
    pageEvents.emit('method.done', 'page.screenshot', meta);
    return this;
}

async function type (args, meta) {
    await this.page.type(args.text, args.options);
    pageEvents.emit('method.done', 'page.type', meta);
    return this;
}

export {
    pageEvents,
    $,
    $$,
    click,
    close,
    goto,
    screenshot,
    type
}