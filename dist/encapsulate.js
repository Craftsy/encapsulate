'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _package = require('./package');

var _css = require('./css');

var _jsx = require('./jsx');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function getClassNameAndContents(filePath, contents) {
    var packageInfo = (0, _package.discoverPackageFile)(filePath);
    var className = (0, _package.getClassNameFromPackage)(packageInfo);

    // Read the file if no contents were provided
    if (!contents) {
        contents = _fs2['default'].readFileSync(filePath);
    }

    return { className: className, contents: contents };
}

function encapsulateCssWithPackage(filePath, cssString) {
    var _getClassNameAndContents = getClassNameAndContents(filePath, cssString);

    var className = _getClassNameAndContents.className;
    var contents = _getClassNameAndContents.contents;

    return (0, _css.transformCss)(contents, className);
}

function encapsulateJsxWithPackage(filePath, jsxString) {
    var _getClassNameAndContents2 = getClassNameAndContents(filePath, jsxString);

    var className = _getClassNameAndContents2.className;
    var contents = _getClassNameAndContents2.contents;

    return (0, _jsx.transformJsx)(contents, className);
}

exports['default'] = {
    getClassNameAndContents: getClassNameAndContents,
    encapsulateCssWithPackage: encapsulateCssWithPackage,
    encapsulateJsxWithPackage: encapsulateJsxWithPackage,
    transformCss: _css.transformCss,
    transformJsx: _jsx.transformJsx
};
module.exports = exports['default'];