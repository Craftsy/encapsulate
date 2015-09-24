import {expect} from 'chai';
import {transformJsx} from '../src/jsx';

describe('jsx', function() {

    const sampleJsx = `function render() {
    return (
        <div>
            <h1 className="bigHeader">Hello, World</h1>
            <p className={'expression'}>Isn't everything just grand?</p>
        </div>
    );
}`;

    const testClassName = 'craftsy-test-component-1-0-0';

    const expectedJsx = `function render() {
    return (
        <div className="${testClassName}">
            <h1 className="bigHeader ${testClassName}">Hello, World</h1>
            <p className={'expression' + " ${testClassName}"}>Isn't everything just grand?</p>
        </div>
    );
}`;

    describe('transformJsx()', function() {

        it('takes a jsx string and returns a transformed jsx string', function() {
            let result = transformJsx(sampleJsx, testClassName);
            expect(result).to.equal(expectedJsx);
        });

    });

});
