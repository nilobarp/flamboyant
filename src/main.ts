import * as _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import { fnHash } from './wrapper';

let startTimer = process.hrtime();

const elapsedTime = function () {
    var precision = 3; // 3 decimal places
    var elapsed = process.hrtime(startTimer)[1] / 1000000; // divide by a million to get nano to milli
    var message = process.hrtime(startTimer)[0] + " s, " + elapsed.toFixed(precision) + " ms";
    startTimer = process.hrtime(); // reset the timer
    return message;
}

const story = JSON.parse(
    fs.readFileSync(
        path.resolve(__dirname, '..', 'story.json')
    ).toString()
);

const ObjectByString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

const pipe = async (fns: string[]) => {
    let context = {};
    for (let f of fns) {
        let namespaces = f.split('.');
        let callee = namespaces[namespaces.length - 1];
        let options = ObjectByString(story, f + '.args');
        let meta = ObjectByString(story, f + '.meta');
        let assert = ObjectByString(story, f + '.assert');

        try {
            context = await fnHash[callee].call(context, options, meta, assert);
        } catch (ex) {
            await fnHash['closeBrowser'].call(context);
            throw ex;
        }
    }
}

let callSequence = [];

function toNamespaces(jsonObj: JSON, prefix: string) {
    for (let func of Object.keys(jsonObj)) {
        if (func !== 'args' && func !== 'meta' && func !== 'assert') {
            callSequence.push(prefix ? prefix + '.' + func : func);
        }
        let funcProperties: Array<string> = Object.keys(jsonObj[func]);
        if (
            (funcProperties.indexOf('assert') > -1 && funcProperties.length > 3)
            || funcProperties.length > 2
        ) {
            toNamespaces(jsonObj[func], func);
        }
    }
}

toNamespaces(story, null);

fnHash.browserEvents.on('method.done', (method, meta) => {
    console.log(`Finished '${meta ? meta.summary : method}' after ${elapsedTime()}`);
});

fnHash.pageEvents.on('method.done', (method, meta) => {
    console.log(`Finished '${meta ? meta.summary : method}' after ${elapsedTime()}`);
});

pipe(callSequence)
    .then(() => console.log('Done'))
    .catch(ex => console.log(ex));