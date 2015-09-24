import {slugify} from './utils';
import findup from 'findup-sync';
import fs from 'fs';
import path from 'path';

function discoverPackageFile(directory) {
    if (!fs.lstatSync(directory).isDirectory()) {
        directory = path.dirname(directory);
    }

    const packagePath = findup('package.json', {cwd: directory});

    if (!packagePath) {
        throw new Error(`Unable to find a package.json in ${directory} or its ancestors.`);
    }

    return JSON.parse(fs.readFileSync(packagePath));
}

function getClassNameFromPackage(packageInfo) {
    if (!packageInfo.name) {
        throw new Error('A name is required in the package info.');
    }
    if (!packageInfo.version) {
        throw new Error('A version number is required in the package info.');
    };

    let className = slugify(`${packageInfo.name}-${packageInfo.version}`);

    // If the leading character is a dash, trim it
    if (className[0] === '-') {
        className = className.slice(1);
    }

    return className;
}

export default {discoverPackageFile, getClassNameFromPackage};
