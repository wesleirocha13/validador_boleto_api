const request = require('supertest');
const app = require('../../app');

describe('Get informations bank slip', ()=>{
    it('Must receive a status code 404 when the route is invalid', async ()=>{
        const response = await request(app).get('/boletoo');
        expect(response.status).toBe(404);
    })

    it('Must receive a status code 200 when bank slip banking valid barCode', async ()=>{
        const expectedResponse = {
            "barCode": "23791900300000100003381260083483729300006330",
            "amount": "100.00",
            "expirationDate": "2022-06-01"
        }
        const response = await request(app).get('/boleto/23791900300000100003381260083483729300006330');
        expect(response.status).toBe(200);
        expect(JSON.stringify(response.body)).toBe(JSON.stringify(expectedResponse));
    })

    it('Must receive a status code 200 when bank slip banking valid digitable line', async ()=>{
        const expectedResponse = {
            "barCode": "23791900300000100003381260083483729300006330",
            "amount": "100.00",
            "expirationDate": "2022-06-01"
        }
        const response = await request(app).get('/boleto/23793.38128 60083.483721 93000.063300 1 90030000010000');
        expect(response.status).toBe(200);
        expect(JSON.stringify(response.body)).toBe(JSON.stringify(expectedResponse));
    })

    it('Must receive a status code 200 when bank slip concessionaires valid barCode', async ()=>{
        const expectedResponse = {
            "barCode": "83630000002709901380006685459941108061488675",
            "amount": "270.99",
            "expirationDate": ""
        }
        const response = await request(app).get('/boleto/83630000002709901380006685459941108061488675');
        expect(response.status).toBe(200);
        expect(JSON.stringify(response.body)).toBe(JSON.stringify(expectedResponse));
    })

    it('Must receive a status code 200 when bank slip concessionaires valid digitable line', async ()=>{
        const expectedResponse = {
            "barCode": "83630000002709901380006685459941108061488675",
            "amount": "270.99",
            "expirationDate": ""
        }
        const response = await request(app).get('/boleto/83630000002-0 70990138000-2 66854599411-7 08061488675-4');
        expect(response.status).toBe(200);
        expect(JSON.stringify(response.body)).toBe(JSON.stringify(expectedResponse));
    })

    it('Must receive a status code 400 when bank slip banking invalid barCode', async ()=>{
        const response = await request(app).get('/boleto/23791900300000100003381260083483729300006399');
        expect(response.status).toBe(400);
    })

    it('Must receive a status code 400 when bank slip banking invalid digitable line', async ()=>{
        const response = await request(app).get('/boleto/23793.38128 60083.483721 93000.063300 1 90030000010099');
        expect(response.status).toBe(400);
    })

    it('Must receive a status code 400 when bank slip concessionaires invalid barCode', async ()=>{
        const response = await request(app).get('/boleto/89630000002709901380006685459941108061488699');
        expect(response.status).toBe(400);
    })

    it('Must receive a status code 400 when bank slip concessionaires invalid digitable line', async ()=>{
        const response = await request(app).get('/boleto/83630000002-0 70990138000-2 66854599411-7 08061488679-9');
        expect(response.status).toBe(400);
    })
})