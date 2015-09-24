import {expect} from 'chai';
import {discoverPackageFile, getClassNameFromPackage} from '../src/package';
import proxyquire from 'proxyquire';

describe('package', function() {

    const packageInfo = {
        name: '@craftsy/test-component',
        version: '1.0.0',
    };

    const testClassName = 'craftsy-test-component-1-0-0';

    describe('discoverPackageFile()', function() {

        it('takes a path and attempts to find a package.json in the given directory or the nearest ancestor directory', function() {
            const result = discoverPackageFile(`${__dirname}/test-package/test-component/files`);
            expect(result).to.deep.equal(packageInfo);
        });

        it('returns the same result if the path given points to a file rather than a directory', function() {
            const result = discoverPackageFile(`${__dirname}/test-package/test-component/files/test.css`);
            expect(result).to.deep.equal(packageInfo);
        });

        it('throws an error if no package.json is found', function() {
            // Re-require package.js with proxyquire, which allows us to insert
            // a stub for findup-sync
            const {discoverPackageFile} = proxyquire('../src/package', {'findup-sync': () => null});
            expect(() => discoverPackageFile(__dirname)).to.throw('Unable to find');
        });

    });

    describe('getClassNameFromPackage()', function() {

        it('takes package info and generates a classname', function() {
            const result = getClassNameFromPackage(packageInfo);
            expect(result).to.equal(testClassName);
        });

        it('throws an error if required details are not provided in the package info', function() {
            let runTest;

            runTest = () => getClassNameFromPackage({name: 'fail'});
            expect(runTest).to.throw('version number is required');

            runTest = () => getClassNameFromPackage({version: '0.0.0'});
            expect(runTest).to.throw('name is required');
        });

    });

});
