const request = require('supertest');
const app = require('../../app');

describe('Get informations bank slip', ()=>{
    it('Must receive a status code 404 when the route is invalid', async ()=>{
        const response = await request(app).get('/boletoo');
        expect(response.status).toBe(404);
    })

    // it('Must receive a status code 200 when bank slip valid code', async ()=>{
    //     const response = await request(app).get('/boleto');
    //     expect(response.status).toBe(200);
    // })
})