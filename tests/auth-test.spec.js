const request = require('supertest');
const assert = require('assert');
expect = require('chai').expect;
require('dotenv').config({ path: '.env' });
const data = require('../data/user-data.json');


const url = process.env.URL

describe('POST - AUTH Tests', function() {

    it('POST - Create Auth - Valid information', async() => {
        const result = await request(url)
        .post('/auth')
        .set('Content-Type', 'application/json')
        .send({
            username: data.valid_user.username,
            password: data.valid_user.password
        })
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(200);
        })
    })

    it('POST - Create Auth - Invalid information', async() => {
        const result = await request(url)
        .post('/auth')
        .set('Content-Type', 'application/json')
        .send({
            username: data.invalid_user.username,
            password: data.invalid_user.password
        })
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(200);
            expect(result.body.reason, JSON.stringify(result, null, 2)).to.equal(data.reason);
        })
    })

    it('POST - Create Auth - Empty Body', async() => {
        const result = await request(url)
        .post('/auth')
        .set('Content-Type', 'application/json')
        .send({ })
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(200);
            expect(result.body.reason, JSON.stringify(result, null, 2)).to.equal(data.reason);
        })
    })

    it('POST - Create Auth - Bad Header', async() => {
        const result = await request(url)
        .post('/auth')
        .set('Accept', 'application/ogg')
        .send({
            username: data.invalid_user.username,
            password: data.invalid_user.password
        })
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(200);
            expect(result.body.reason, JSON.stringify(result, null, 2)).to.equal(data.reason);
        })
    })
})

