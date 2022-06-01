const { removeMask } = require('../../utils/stringManipulation');
const { convertDigitableLineToBarcode } = require('./functions/convertDigitableLineToBarcode');
const { validateBanking, validateConcessionaires } = require('./functions/validateVerifyingDigit')

const validateBankSlip = (code)=>{
    const unmaskedCode = removeMask(code);
    let isValid;
    let barCode;

    if (Number(unmaskedCode[0]) !== 8){
        barCode = unmaskedCode.length === 44 
            ? unmaskedCode 
            : convertDigitableLineToBarcode(unmaskedCode, 'banking');

        isValid = validateBanking(barCode);

    }else{
        barCode = unmaskedCode.length === 44 
            ? unmaskedCode 
            : convertDigitableLineToBarcode(unmaskedCode, 'concessionaires');

        isValid = validateConcessionaires(barCode);
    }

    if(!isValid) throw Error('O código inserido é inválido.');

    return barCode;
}

const getInformationsToBarCode = (barCode)=>{
    try{
        const isConcessionaires = Number(barCode[0]) === 8;
        //Realiza o cálculo do valor do boleto
        const digitsAmount = isConcessionaires
            ? barCode.substring(5, 15) 
            : barCode.substring(9, 19);

        const amount = (Number(digitsAmount)/100).toFixed(2);

        //Realiza o cálculo da data a partir da data base e da quantodade de dias
        let expirationDate = '';
        if(isConcessionaires){
            const formatedDate = `${barCode.substring(24,28)}-${barCode.substring(28,30)}-${barCode.substring(30,32)}`
            Date.parse(formatedDate) && (expirationDate = formatedDate);
        }else{
            const digitsDays = Number(barCode.substring(5, 9));
            Date.prototype.addDays = function(days) {
                const data = new Date(this.valueOf());
                data.setDate(data.getDate() + days);
                return data;
            }        
            const initialDateFebraban = new Date(1997, 10 - 1, 7);
            expirationDate = initialDateFebraban.addDays(digitsDays).toISOString().split('T')[0];
        }

        return {
            barCode,
            amount,
            expirationDate
        }
    }catch(err){
        throw Error('Erro ao tentar obter as informações do boleto.')
    }
}

module.exports = { validateBankSlip, getInformationsToBarCode };