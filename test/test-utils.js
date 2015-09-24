import {expect} from 'chai';
import {slugify} from '../src/utils';

describe('utils', function() {

    describe('slugify', function() {

        it('inserts dashes for any non-alphanumeric character', function() {
            const result = slugify('@123#four-five&six😹789');
            expect(result).to.equal('-123-four-five-six-789');
        });

    });

});
