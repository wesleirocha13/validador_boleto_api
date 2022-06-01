const { module10, module11 } = require('./module');

const validateBanking = (barCode) => {
  try{
    if (!/^[0-9]{44}$/.test(barCode)) return false;
    const verifyingDigit = barCode[4];
    const barcodeWithoutVerificationDigit = barCode.substring(0, 4) + barCode.substring(5);
    return module11(barcodeWithoutVerificationDigit, 'banking') === Number(verifyingDigit);
  }catch(err){
    throw Error('Erro no processo de validação do boleto.')
  }  
}

const validateConcessionaires = (barCode) => {
  try{
    if (!/^[0-9]{44}$/.test(barCode)) return false;
    const currencyCode = Number(barCode[2]);
    const verifyingDigit = Number(barCode[3]);
    const barcodeWithoutVerificationDigit = barCode.substring(0, 3) + barCode.substring(4);
  
    if(currencyCode === 6 || currencyCode === 7){
      return module10(barcodeWithoutVerificationDigit) === verifyingDigit;
    }else if(currencyCode === 8 || currencyCode === 9){
      return module11(barcodeWithoutVerificationDigit, 'concessionaires') === verifyingDigit;
    }else return false;
  }catch(err){
    throw Error('Erro no processo de validação do boleto.')
  }  
}

module.exports = { validateConcessionaires, validateBanking };
