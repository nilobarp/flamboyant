import * as puppeteer from 'puppeteer';
import * as EventEmitter from 'events';
import { assert as assertions } from '../assert';
import * as chai from 'chai';

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

async function click(args, meta) {
    await this.page.click(args.selector, args.options);
    pageEvents.emit('method.done', 'page.click', meta);
    return this;
}

async function close(args, meta) {
    await this.page.close();
    this.page = undefined;
    pageEvents.emit('method.done', 'page.close', meta);
    return this;
}

async function runAssertions (context, assertObj) {
    for (let obj of assertObj) {
        try {
            let evaluated = await assertions[obj.target].call(context, obj.args);
            chai.assert[obj.op].call(null, evaluated, obj.expect);
            console.log('\t\t ✓', obj.test);
        } catch (ex) {
            console.log('\t\t ✗',ex.message);
        }
    }
}

async function goto(args, meta, assert) {
    await this.page.goto(args.url, args.options)
    if (assert) {
        runAssertions(this, assert);
    }
    pageEvents.emit('method.done', 'page.goto', meta);
    return this;
}

async function screenshot(args, meta) {
    await this.page.screenshot(args);
    pageEvents.emit('method.done', 'page.screenshot', meta);
    return this;
}

async function type(args, meta) {
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