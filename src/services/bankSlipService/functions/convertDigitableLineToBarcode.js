const { removeMask } = require('../../../utils/stringManipulation');

const convertDigitableLineToBarcode = (code, bankSlipType)=> {
  try{
    const unmaskedCode = removeMask(code);
    const convertTypes = {
      'banking': ()=> bankSlipBankingDigitableLineToBarcode(unmaskedCode),
      'concessionaires': ()=> bankSlipConcessionairesgDigitableLineToBarcode(unmaskedCode),
    };
    return convertTypes[bankSlipType]();
  }catch(err){
    throw Error('Erro durante a conversão do código de barras do boleto.');
  }
}

//A conversão é feita retirando os três dígitos verificadores. Posições dos dígitos: 12, 24 e 36
const bankSlipConcessionairesgDigitableLineToBarcode = (code)=> {
  let barCode = '';
  barCode += code.substring(0, 11);
  barCode += code.substring(12, 23);
  barCode += code.substring(24, 35);
  barCode += code.substring(36, 47);

  return barCode;
}

//A conversão é feita retirando os três dígitos verificadores. Posições dos dígitos: 10, 21 e 32
//E reordenando as informações conforme o layout
const bankSlipBankingDigitableLineToBarcode = (code)=> {
  let barCode = '';
  barCode += code.substring(0, 3);
  barCode += code.substring(3, 4);
  barCode += code.substring(32, 33);
  barCode += code.substring(33, 37);
  barCode += code.substring(37, 47);
  barCode += code.substring(4, 9);
  barCode += code.substring(10, 20);
  barCode += code.substring(21, 31);

  return barCode;
}

module.exports = { convertDigitableLineToBarcode };
