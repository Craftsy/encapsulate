import {discoverPackageFile, getClassNameFromPackage} from './package';
import {transformCss} from './css';
import {transformJsx} from './jsx';
import fs from 'fs';

function getClassNameAndContents(filePath, contents) {
    const packageInfo = discoverPackageFile(filePath);
    const className = getClassNameFromPackage(packageInfo);

    // Read the file if no contents were provided
    if (!contents) {
        contents = fs.readFileSync(filePath);
    }

    return {className, contents};
}

function encapsulateCssWithPackage(filePath, cssString) {
    const {className, contents} = getClassNameAndContents(filePath, cssString);
    return transformCss(contents, className);
}

function encapsulateJsxWithPackage(filePath, jsxString) {
    const {className, contents} = getClassNameAndContents(filePath, jsxString);
    return transformJsx(contents, className);
}

export default {
    getClassNameAndContents,
    encapsulateCssWithPackage,
    encapsulateJsxWithPackage,
    transformCss,
    transformJsx
};
