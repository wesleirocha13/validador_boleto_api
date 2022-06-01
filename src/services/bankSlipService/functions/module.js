const MODULE_ELEVEN = 11;
const INITIAL_MULTIPLIER = 2;
const FINAL_MULTIPLIER = 9;

//Calcula o dígito verificador utilizando módulo 10 com base código de barras sem o dígito verificador
const module10 = (barCode) => {
  const arrayDigitsbarCode = barCode.split("").reverse();
  const summation = arrayDigitsbarCode.reduce((accumulated, digit, index) => {
    let sum = Number(digit) * (((index + 1) % 2) + 1);
    sum = sum > 9 ? Math.trunc(sum / 10) + (sum % 10) : sum;
    return accumulated + sum;
  }, 0);
  return Math.ceil(summation / 10) * 10 - summation;
}

//Calcula o dígito verificador utilizando módulo 11 com base código de barras sem o dígito verificador
const module11 = (barCode, bankSlipType) => {
  console.log(barCode)
  let multiplierDigit = INITIAL_MULTIPLIER;
  const arrayDigitsbarCode = barCode.split("").reverse();

  const summation = arrayDigitsbarCode.reduce((accumulated, digit) => {
    const multipliedDigit = Number(digit) * multiplierDigit;
    multiplierDigit =
      multiplierDigit === FINAL_MULTIPLIER
        ? INITIAL_MULTIPLIER
        : multiplierDigit + 1;
    return accumulated + multipliedDigit;
  }, 0);

  const restDivision = summation % MODULE_ELEVEN;

  console.log(restDivision)

  if (bankSlipType === "banking") {
    return calcVerifyingDigitBanking(restDivision);
  } else {
    return calcVerifyingDigitConcessionaires(restDivision);
  }
}

const calcVerifyingDigitBanking = (restDivision) => {
  const DEFAULT_SUBTRACTION_RESULTS = [0, 10, 11];
  const verifyingDigit = MODULE_ELEVEN - restDivision;

  if (DEFAULT_SUBTRACTION_RESULTS.includes(verifyingDigit)) {
    return 1;
  } else {
    return verifyingDigit;
  }
};

const calcVerifyingDigitConcessionaires = (restDivision) => {
  if (restDivision === 0 || restDivision === 1) {
    return 0;
  }
  if (restDivision === 10) {
    return 1;
  }
  return MODULE_ELEVEN - restDivision;
};

module.exports = { module10, module11 };
