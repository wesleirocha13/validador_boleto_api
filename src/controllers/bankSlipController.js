const { validateBankSlip, getInformationsToBarCode} = require('../services/bankSlipService')

exports.get = async (req, res) => {
    try {
        const { code } = req.params;
        const barCode = validateBankSlip(code);
        const response = getInformationsToBarCode(barCode);
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send({
            message: (err && err.message) || "Falha ao processar sua requisição"
        });
    }
}