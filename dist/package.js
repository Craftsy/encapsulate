'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _findupSync = require('findup-sync');

var _findupSync2 = _interopRequireDefault(_findupSync);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function discoverPackageFile(directory) {
    if (!_fs2['default'].lstatSync(directory).isDirectory()) {
        directory = _path2['default'].dirname(directory);
    }

    var packagePath = (0, _findupSync2['default'])('package.json', { cwd: directory });

    if (!packagePath) {
        throw new Error('Unable to find a package.json in ' + directory + ' or its ancestors.');
    }

    return JSON.parse(_fs2['default'].readFileSync(packagePath));
}

function getClassNameFromPackage(packageInfo) {
    if (!packageInfo.name) {
        throw new Error('A name is required in the package info.');
    }
    if (!packageInfo.version) {
        throw new Error('A version number is required in the package info.');
    };

    var className = (0, _utils.slugify)(packageInfo.name + '-' + packageInfo.version);

    // If the leading character is a dash, trim it
    if (className[0] === '-') {
        className = className.slice(1);
    }

    return className;
}

exports['default'] = { discoverPackageFile: discoverPackageFile, getClassNameFromPackage: getClassNameFromPackage };
module.exports = exports['default'];