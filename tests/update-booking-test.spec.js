const request = require('supertest');
const assert = require('assert');
expect = require('chai').expect;
const user_creation = require('../data/create-user-data.json');
const update_info = require('../data/update-data.json')
const data = require('../data/user-data.json');
require('dotenv').config({ path: '.env' });

const url = process.env.URL


describe('PUT - Update a book tests', function() {

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

    it('PUT - CreateBooking - Update a bookingID', async() => {

        const result = await request(url)
        .put('/booking/' + booking_id)
        .auth(data.valid_user.username, data.valid_user.password)
        .set('Accept', 'application/json')
        .send({
            firstname: update_info.firstname,
            lastname: update_info.lastname,
            totalprice: update_info.totalprice,
            depositpaid: update_info.depositpaid,
            bookingdates: {
                checkin: update_info.bookingdates.checkin,
                checkout: update_info.bookingdates.checkout
            },
            additionalneeds: update_info.additionalneeds
        })
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(200);
            expect(result.body.firstname, JSON.stringify(result, null, 2)).to.equal(update_info.firstname)
            expect(result.body.lastname, JSON.stringify(result, null, 2)).to.equal(update_info.lastname)
            expect(result.body.additionalneeds, JSON.stringify(result, null, 2)).to.equal(update_info.additionalneeds)
        })

    })

    it('PUT - CreateBooking - Update a bookingID withou Auth', async() => {

        const result = await request(url)
        .put('/booking/' + booking_id)
        .set('Accept', 'application/json')
        .send({
            firstname: update_info.firstname,
            lastname: update_info.lastname,
            totalprice: update_info.totalprice,
            depositpaid: update_info.depositpaid,
            bookingdates: {
                checkin: update_info.bookingdates.checkin,
                checkout: update_info.bookingdates.checkout
            },
            additionalneeds: update_info.additionalneeds
        })
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(403);
        })

    })

})