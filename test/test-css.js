import {expect} from 'chai';
import {transformCss, transformCssNode} from '../src/css';
import css from 'css';

describe('css', function() {

    const sampleCss = `div {
    background-color: black;
}

h1.bigHeader {
    color: green;
}

p {
    color: white;
    font-size: 14px;
}

p > span {
    color: blue;
}

p + span, p ~ span {
    color: red;
}

p[lang=en]:first {
    color: white;
}

@keyframes identifier {
  0% { top: 0; left: 0; }
  30% { top: 50px; }
  68%, 72% { left: 50px; }
  100% { top: 100px; left: 100%; }
}`;

    const sampleAstNode = css.parse(sampleCss);

    const expectedCss = `div.craftsy-test-component-1-0-0 {
    background-color: black;
}

h1.bigHeader.craftsy-test-component-1-0-0 {
    color: green;
}

p.craftsy-test-component-1-0-0 {
    color: white;
    font-size: 14px;
}

p.craftsy-test-component-1-0-0 > span.craftsy-test-component-1-0-0 {
    color: blue;
}

p.craftsy-test-component-1-0-0 + span.craftsy-test-component-1-0-0,
p.craftsy-test-component-1-0-0 ~ span.craftsy-test-component-1-0-0 {
    color: red;
}

p[lang=en].craftsy-test-component-1-0-0:first {
    color: white;
}

@keyframes identifier {
    0% {
        top: 0;
        left: 0;
    }

    30% {
        top: 50px;
    }

    68%, 72% {
        left: 50px;
    }

    100% {
        top: 100px;
        left: 100%;
    }
}`;

let incss = `@keyframes identifier {
  0% { top: 0; left: 0; }
  30% { top: 50px; }
  68%, 72% { left: 50px; }
  100% { top: 100px; left: 100%; }
}`;

let outcss = `@keyframes identifier {
    0% {
        top: 0;
        left: 0;
    }

    30% {
        top: 50px;
    }

    68%, 72% {
        left: 50px;
    }

    100% {
        top: 100px;
        left: 100%;
    }
}`;

    const testClassName = 'craftsy-test-component-1-0-0';

    describe('transformCss()', function() {

        it('takes a css string and a classname and returns a stringified result from the ast transformation', function() {
            const result = transformCss(sampleCss, testClassName);
            expect(result).to.equal(expectedCss);
        });

    });

    describe('transformCssNode()', function() {

        it('recursively transforms the given ast node using the given classname', function() {
            const result = transformCssNode(sampleAstNode, testClassName);
            const stringResult = css.stringify(result, {indent: '    '});

            expect(stringResult).to.equal(expectedCss);
        });

        it('does not mutate the ast node', function() {
            const pristineNode = css.parse(sampleCss);
            const testNode = css.parse(sampleCss);

            transformCssNode(testNode, 'test');

            expect(testNode).to.deep.equal(pristineNode);
        });

    });

});
