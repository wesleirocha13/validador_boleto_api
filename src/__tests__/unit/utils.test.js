const { removeMask } = require('../../utils/stringManipulation')

describe('Validate barcode', ()=>{
    it('Must return an unmasked string', () => {
        const digitableLine = '23793.38128 60083.483721 93000.063300 1 90030000010000';
        const expectedDigitableLine = '23793381286008348372193000063300190030000010000'
        const result = removeMask(digitableLine);
        expect(result).toBe(expectedDigitableLine);
    });
});