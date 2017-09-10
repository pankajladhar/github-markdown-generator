//https://github.com/jquense/teaspoon/issues/12
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const testhelper = () => {
    const doc = new JSDOM('<!doctype html><html><body></body></html>');
    const win = doc.defaultView;
    
    global.document = doc;
    global.window = win;
    
    Object.keys(window).forEach((key) => {
      if (!(key in global)) {
        global[key] = window[key];
      }
    });
    return document;
}

export default testhelper