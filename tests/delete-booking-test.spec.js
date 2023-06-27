const request = require('supertest');
const assert = require('assert');
expect = require('chai').expect;
const user_creation = require('../data/create-user-data.json');
const update_info = require('../data/update-data.json')
const data = require('../data/user-data.json');
require('dotenv').config({ path: '.env' });

const url =  process.env.URL


describe('DELETE - Delete a book tests', function() {

    let booking_id = "";
    before(async() => {
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
        booking_id = result.body.bookingid

    });

    it('DELETE - DeleteBooking - Delete a bookingID', async() => {

        const result = await request(url)
        .delete('/booking/' + booking_id)
        .auth(data.valid_user.username, data.valid_user.password)
        .set('Accept', 'application/json')
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(201);
        })

    })

    it('DELETE - DeleteBooking - Delete a bookingID withou Auth', async() => {

        const result = await request(url)
        .put('/booking/' + booking_id)
        .set('Accept', 'application/json')
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(403);
        })

    })


})