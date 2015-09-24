'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
function slugify(text) {
    return text.replace(/[^a-zA-Z0-9]+/g, '-');
}

exports['default'] = { slugify: slugify };
module.exports = exports['default'];