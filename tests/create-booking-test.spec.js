const request = require('supertest');
const assert = require('assert');
expect = require('chai').expect;
const user_creation = require('../data/create-user-data.json');
require('dotenv').config({ path: '.env' });

const url =  process.env.URL

describe('POST - Create A book tests', function() {

    it('POST - CreateBooking - Empty Fields', async() => {
        const result = await request(url)
        .post('/booking')
        .set('Content-Type', 'application/json')
        .send({ })
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(500);
        })

    })

    it('POST - CreateBooking - Incorrect Fields', async() => {
        const result = await request(url)
        .post('/booking')
        .set('Content-Type', 'application/json')
        .send({  xpto: "morning"})
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(500);
        })

    })

    it('POST - CreateBooking - Correct Creation', async() => {
        const result = await request(url)
        .post('/booking')
        .set('Accept', 'application/json')
        .send({
            firstname: user_creation.firstname,
            lastname: user_creation.lastname,
            totalprice: user_creation.totalprice,
            depositpaid: user_creation.depositpaid,
            bookingdates: {
                checkin: user_creation.bookingdates.checkin,
                checkout: user_creation.bookingdates.checkout
            },
            additionalneeds: user_creation.additionalneeds
        })
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(200);
            expect(result.body.booking.firstname, JSON.stringify(result, null, 2)).to.equal(user_creation.firstname)
            expect(result.body.booking.lastname, JSON.stringify(result, null, 2)).to.equal(user_creation.lastname)
            expect(result.body.booking.additionalneeds, JSON.stringify(result, null, 2)).to.equal(user_creation.additionalneeds)
        })

    })

})