const request = require('supertest');
const assert = require('assert');
expect = require('chai').expect;
const data_book = require('../data/book-data.json');
require('dotenv').config({ path: '.env' });

const url = process.env.URL


describe('GET - GetBooking Tests', function() {

    it('GET - GetBookingID - All ids List', async() => {
        const result = await request(url)
        .get('/booking')
        .set('Content-Type', 'application/json')
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(200);
            expect(result.body[0], JSON.stringify(result, null, 2)).to.have.property('bookingid')
        })

    })

    it('GET - GetBookingID - Filter by Firstname and Lastname', async() => {
        const result = await request(url)
        .get('/booking')
        .set('Content-Type', 'application/json')
        .query({
            firstname: data_book.firstname,
            lastname: data_book.lastname
        })
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(200);
            expect(result.body[0], JSON.stringify(result, null, 2)).to.have.property('bookingid')
        })

    })

    it('GET - GetBookingID - Filter by Firstname', async() => {
        const result = await request(url)
        .get('/booking')
        .set('Content-Type', 'application/json')
        .query({
            firstname: data_book.firstname
        })
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(200);
            expect(result.body[0], JSON.stringify(result, null, 2)).to.have.property('bookingid')
        })

    })

    it('GET - GetBookingID - Filter by Lastname', async() => {
        const result = await request(url)
        .get('/booking')
        .set('Content-Type', 'application/json')
        .query({
            lastname: data_book.lastname
        })
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(200);
            expect(result.body[0], JSON.stringify(result, null, 2)).to.have.property('bookingid')
        })

    })

    it('GET - GetBookingID - Filter by checking date', async() => {
        const result = await request(url)
        .get('/booking')
        .query({
            checkin: data_book.checkin
        })
        .set('Content-Type', 'application/json')
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(200);
            expect(result.body[0], JSON.stringify(result, null, 2)).to.have.property('bookingid')
        })

    })

    it('GET - GetBookingID - Filter by checkout date', async() => {
        const result = await request(url)
        .get('/booking')
        .query({
            checkout: data_book.checkout
        })
        .set('Content-Type', 'application/json')
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(200);
            expect(result.body[0], JSON.stringify(result, null, 2)).to.have.property('bookingid')
        })

    })

    it('GET - GetBookingID - Filter by checking/checkout date', async() => {
        const result = await request(url)
        .get('/booking')
        .query({
            checkin: data_book.checkin,
            checkout: data_book.checkout
        })
        .set('Accept', 'application/json')
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(200);
            expect(result.body[0], JSON.stringify(result, null, 2)).to.have.property('bookingid')
        })

    })

    it('GET - GetBookingID - Filter by malformedDate', async() => {
        const result = await request(url)
        .get('/booking')
        .query({
            checkin: "2023-06-0",
            checkout: data_book.checkout
        })
        .set('Accept', 'application/json')
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(500);
        })

    })

    it('GET - GetBooking - Returning A single info', async() => {
        const result = await request(url)
        .get('/booking/' + data_book.booking_id)
        .set('Accept', 'application/json')
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(200);
            expect(result.body.firstname, JSON.stringify(result, null, 2)).to.equal(data_book.firstname)
            expect(result.body.lastname, JSON.stringify(result, null, 2)).to.equal(data_book.lastname)
        })

    })

    it('GET - GetBooking - Wrong ID', async() => {
        const result = await request(url)
        .get('/booking/xpto')
        .set('Accept', 'application/json')
        .timeout({ response: 100000, deadline: 100000 })
        .then(result => {
            expect(result.statusCode, JSON.stringify(result, null, 2)).to.equal(404);
        })

    })

})