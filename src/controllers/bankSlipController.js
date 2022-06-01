const {validateBankSlip} = require('../services/bankSlipService')

exports.get = async (req, res, next) => {
    try {
        const { code } = req.params;
        validateBankSlip(code);

        res.status(200).send({
            barCode: '2020',
            amount: '20.00',
            expirationDate: '2022-05-30'
        });
    } catch (err) {
        res.status(400).send({
            message: (err && err.message) || "Falha ao processar sua requisição"
        });
    }
}