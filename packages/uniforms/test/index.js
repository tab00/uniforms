// DOM for React
import {jsdom} from 'jsdom';

global.document = jsdom('');
global.window = document.defaultView;
global.navigator = window.navigator;
global.HTMLElement = window.HTMLElement;
Object.keys(window).forEach(property => {
    if (typeof global[property] === 'undefined') {
        global[property] = window[property];
    }
});

// Mocks
const Module = require('module');
const loader = Module._load;
Module._load = function _load (request, parent) {
    return loader(
        request.replace(/^uniforms/, '../src'),
        parent
    );
};

global.Package = {};

global.Package['check'] = {};
global.Package['check'].Match = {
    OneOf () {},
    Optional () {},
    ObjectIncluding () {}
};

global.Package['aldeed:simple-schema'] = {};
global.Package['aldeed:simple-schema'].SimpleSchema = {
    extendOptions () {},
    _makeGeneric (name) {
        if (typeof name !== 'string') {
            return null;
        }

        return name.replace(/\.[0-9]+(?=\.|$)/g, '.$');
    }
};
