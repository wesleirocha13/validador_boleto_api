const { module10, module11 } = require('../../services/bankSlipService/functions/module')

describe('Validate bank slip', ()=>{
    it('Must calculate the check digit of bank slips bankings', ()=>{
        const barCode = '23791900300000100003381260083483729300006330';
        const barcodeWithoutVerificationDigit = barCode.substring(0, 4) + barCode.substring(5);
        const verifyingDigit = Number(barCode[4]);
        const calculedVerifyingDigit  = module11(barcodeWithoutVerificationDigit, 'banking');
        expect(calculedVerifyingDigit).toBe(verifyingDigit);
    })

    it('Must calculate the check digit of bank slips concessionaires', ()=>{
        const barCode = '85690000058030100649151103479456000137469135';
        const barcodeWithoutVerificationDigit = barCode.substring(0, 3) + barCode.substring(4);
        const verifyingDigit = Number(barCode[3]);
        const calculedVerifyingDigit  = module11(barcodeWithoutVerificationDigit, 'concessionaires');
        expect(calculedVerifyingDigit).toBe(verifyingDigit);
    })
})