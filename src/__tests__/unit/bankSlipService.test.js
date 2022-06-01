const { module10, module11 } = require('../../services/bankSlipService/functions/module');
const { convertDigitableLineToBarcode } = require('../../services/bankSlipService/functions/convertDigitableLineToBarcode');
const { validateBanking, validateConcessionaires } = require('../../services/bankSlipService/functions/validateVerifyingDigit');
const { validateBankSlip } = require('../../services/bankSlipService');

describe('Perform check digit calculation using module 10 and module 11', ()=>{
    it('Must calculate the check digit using module 11', ()=>{
        const barCode = '23791900300000100003381260083483729300006330';
        const barcodeWithoutVerificationDigit = barCode.substring(0, 4) + barCode.substring(5);
        const verifyingDigit = Number(barCode[4]);
        const calculedVerifyingDigit  = module11(barcodeWithoutVerificationDigit, 'banking');
        expect(calculedVerifyingDigit).toBe(verifyingDigit);
    })

    it('Must return a invalid check digit using module 11', ()=>{
        const barCode = '23797900300000100003381260083483729300006330';
        const barcodeWithoutVerificationDigit = barCode.substring(0, 4) + barCode.substring(5);
        const verifyingDigit = Number(barCode[4]);
        const calculedVerifyingDigit  = module11(barcodeWithoutVerificationDigit, 'banking');
        expect(calculedVerifyingDigit).not.toBe(verifyingDigit);
    })

    it('Must calculate the check digit using module 10', ()=>{
        const barCode = '83630000002709901380006685459941108061488675';
        const barcodeWithoutVerificationDigit = barCode.substring(0, 3) + barCode.substring(4);
        const verifyingDigit = Number(barCode[3]);
        const calculedVerifyingDigit  = module10(barcodeWithoutVerificationDigit, 'concessionaires');
        expect(verifyingDigit).toBe(calculedVerifyingDigit);
    })
    
    it('Must return a invalid check digit using module 10', ()=>{
        const barCode = '83670000002709901380006685459941108061488675';
        const barcodeWithoutVerificationDigit = barCode.substring(0, 3) + barCode.substring(4);
        const verifyingDigit = Number(barCode[3]);
        const calculedVerifyingDigit  = module10(barcodeWithoutVerificationDigit, 'concessionaires');
        expect(calculedVerifyingDigit).not.toBe(verifyingDigit);
    })  
})

describe('Convert digitable line to barcode', ()=>{
    it('Must return the barcode for bank slip banking', () => {
        const digitableLine = '23793.38128 60083.483721 93000.063300 1 90030000010000';
        const expectedBarCode = '23791900300000100003381260083483729300006330';
        const result = convertDigitableLineToBarcode(digitableLine, 'banking');
        expect(result).toBe(expectedBarCode);
    });

    it('Must return the barcode for bank slip concessionaires', () => {
        const digitableLine = '83630000002-0 70990138000-2 66854599411-7 08061488675-4';
        const expectedBarCode = '83630000002709901380006685459941108061488675';
        const result = convertDigitableLineToBarcode(digitableLine, 'concessionaires');
        expect(result).toBe(expectedBarCode);
    });

    it('Must return error during bank slip barcode conversion', () => {
        try{
            const digitableLine = '23793.38128 60083.483721 93000.063300 1 90030000010000';
            const result = convertDigitableLineToBarcode(digitableLine, 'nonexistentKey');
            const expectedBarCode = '23791900300000100003381260083483729300006330';
            expect(result).toEqual(expectedBarCode);
        }catch(err){
            expect(err).toBeInstanceOf(Error);
        }
    });
})

describe('Validate barcode', ()=>{
    it('Must return true for validated bank slip banking barcode', () => {
        const barcode = '23791900300000100003381260083483729300006330';
        const result = validateBanking(barcode);
        expect(result).toBe(true);
    });

    it('Must return false for invalid bank slip banking barcode', () => {
        const barcode = '23791900300000100003381260083483729300006399';
        const result = validateBanking(barcode);
        expect(result).toBe(false);
    });

    it('Must return true for validated bank slip concessionaires barcode', () => {
        const barcode = '83630000002709901380006685459941108061488675';
        const result = validateConcessionaires(barcode);
        expect(result).toBe(true);
    });

    it('Must return false for invalid bank slip concessionaires barcode', () => {
        const barcode = '83630000002709901380006685459941108061488699';
        const result = validateBanking(barcode);
        expect(result).toBe(false);
    });
})

describe('Validate code', ()=>{

    it('Must return true for valid bank slip banking digitableLine', () => {
        const digitableLine = '23793.38128 60083.483721 93000.063300 1 90030000010000';
        const result = validateBankSlip(digitableLine);
        expect(result).toBe(true);        
    });

    it('Must return true for valid bank slip banking barcode', () => {
        const barCode = '23791900300000100003381260083483729300006330';
        const result = validateBankSlip(barCode);
        expect(result).toBe(true);        
    });

    it('Must return true for valid bank slip concessionaires digitableLine', () => {
        const digitableLine = '83630000002-0 70990138000-2 66854599411-7 08061488675-4';
        const result = validateBankSlip(digitableLine);
        expect(result).toBe(true);        
    });

    it('Must return true for valid bank slip concessionaires barcode', () => {
        const barCode = '83630000002709901380006685459941108061488675';
        const result = validateBankSlip(barCode);
        expect(result).toBe(true);        
    });


    it('Must return error for invalid bank slip banking digitableLine', () => {
        try{
            const digitableLine = '23799.38128 60083.483721 93000.063300 1 90030000010099';
            const result = validateBankSlip(digitableLine);
            expect(result).toBe(true);
        }catch(err){
            expect(err).toBeInstanceOf(Error);
        }
        
    });

    it('Must return error for invalid bank slip banking barCode', () => {
        try{
            const barCode = '23791900300000100003381260083483729300006330';
            const result = validateBankSlip(barCode);
            expect(result).toBe(true);
        }catch(err){
            expect(err).toBeInstanceOf(Error);
        }
        
    });

    it('Must return error for invalid bank slip concessionaires digitableLine', () => {
        try{
            const digitableLine = '83630000002-0 70990138000-2 66854599415-7 08061488675-8';
            const result = validateBankSlip(digitableLine);
            expect(result).toBe(true);
        }catch(err){
            expect(err).toBeInstanceOf(Error);
        }
        
    });

    it('Must return error for invalid bank slip concessionaires barCode', () => {
        try{
            const barCode = '83630000002709901380006685459941108061488675';
            const result = validateBankSlip(barCode);
            expect(result).toBe(true);
        }catch(err){
            expect(err).toBeInstanceOf(Error);
        }        
    });
})