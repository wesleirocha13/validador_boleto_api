
exports.get = async (req, res, next) => {
    try {
        // const digitableLine = req.query.digitableLine;
        res.status(200).send({
            barCode: '2020',
            amount: '20.00',
            expirationDate: '2022-05-30'
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}