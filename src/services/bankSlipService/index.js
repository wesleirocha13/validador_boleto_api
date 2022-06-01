const { removeMask } = require('../../utils/stringManipulation');
const { convertDigitableLineToBarcode } = require('./functions/convertDigitableLineToBarcode');
const { validateBanking, validateConcessionaires } = require('./functions/validateVerifyingDigit')

const validateBankSlip = (code)=>{
    const unmaskedCode = removeMask(code);
    let isValid;

    if (Number(unmaskedCode[0]) !== 8){
        const barCode = unmaskedCode.length === 44 
            ? unmaskedCode 
            : convertDigitableLineToBarcode(unmaskedCode, 'banking');

        isValid = validateBanking(barCode);

    }else{
        const barCode = unmaskedCode.length === 44 
            ? unmaskedCode 
            : convertDigitableLineToBarcode(unmaskedCode, 'concessionaires');

        isValid = validateConcessionaires(barCode);
    }

    if(!isValid) throw Error('O código inserido é inválido.');

    return true;
}

module.exports = { validateBankSlip };