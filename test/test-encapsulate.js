import chai, {expect} from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('encapsulate', function() {

    const sampleCss = 'div {background-color: blue;}';
    const sampleJsx = 'function render() {return <div></div>;}';
    const packageInfo = {name: 'test-package', version: '0.1.0'};
    const className = 'test-package-0-1-0';

    const discoverPackageFileStub = sinon.stub().returns(packageInfo);
    const getClassNameStub = sinon.stub().returns(className);
    const readFileStub = sinon.stub().returns(sampleCss);
    const transformCssSpy = sinon.spy();
    const transformJsxSpy = sinon.spy();

    // Require encapsulateWithPackage and insert stubs for dependencies
    const {
        getClassNameAndContents,
        encapsulateCssWithPackage,
        encapsulateJsxWithPackage,
    } = proxyquire('../src/encapsulate', {
        './package': {
            'discoverPackageFile': discoverPackageFileStub,
            'getClassNameFromPackage': getClassNameStub,
        },
        'fs': {
            'readFileSync': readFileStub,
        },
        './css': {
            'transformCss': transformCssSpy,
        },
        './jsx': {
            'transformJsx': transformJsxSpy,
        },
    });

    afterEach(function() {
        discoverPackageFileStub.reset();
        getClassNameStub.reset();
        readFileStub.reset();
        transformCssSpy.reset();
        transformJsxSpy.reset();
    });

    describe('getClassNameAndContents()', function() {

        it('takes a file path and calls discoverPackageFile to retrieve package info', function() {
            getClassNameAndContents('/path/to/my/file.css');
            expect(discoverPackageFileStub).to.have.been.calledWith('/path/to/my/file.css');
        });

        it('gets a class name to pass to the transformer', function() {
            getClassNameAndContents('/path/to/my/file.jsx');
            expect(getClassNameStub).to.have.been.calledWith(packageInfo);
        });

        it('reads the file if no contents were passed to the function', function() {
            getClassNameAndContents('/path/to/my/file.css');
            expect(readFileStub).to.have.been.calledWith('/path/to/my/file.css');
        });

        it('does not read the file if contents were passed to the function', function() {
            getClassNameAndContents('/path/to/my/file.css', sampleCss);
            expect(readFileStub).to.not.have.been.called;
        });

        it('returns the class name and contents', function() {
            const result = getClassNameAndContents('/path/to/my/file.css');
            expect(result.className).to.equal(className);
            expect(result.contents).to.equal(sampleCss);
        });

    });

    describe('encapsulateCssWithPackage()', function() {

        it('passes the contents of a css file and the class name to the transformCss() function', function() {
            encapsulateCssWithPackage('/path/to/my/file.css', sampleCss);
            expect(transformCssSpy).to.have.been.calledWith(sampleCss, className);
        });

    });

    describe('encapsulateJsxWithPackage()', function() {

        it('passes the contents of a jsx file and the class name to the transformJsx() function', function() {
            encapsulateJsxWithPackage('/path/to/my/file.jsx', sampleJsx);
            expect(transformJsxSpy).to.have.been.calledWith(sampleJsx, className);
        });

    });

});
