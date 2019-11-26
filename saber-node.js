const jsdom = require('jsdom');
const { JSDOM } = jsdom;

global.document = new JSDOM().window.document;
