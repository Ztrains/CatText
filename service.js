const dotenv = require('dotenv').config();
const express = require('express');
const axios = require('axios').default;

const app = express();
const port = 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.get('/cat', (req, res) => {
    client.messages.create({
       body: 'Enjoy your kitty!',
       from: '+16464378116',
       mediaUrl: ['https://api.thecatapi.com/v1/images/search?format=src&limit=1'],
       to: '+18122076303'
    })
    .then(message => {
        console.log(`message status is ${message.status}`)
        res.send(message.status)
    })
    .catch(err => {
        console.log(`err: ${err}`)
        res.send(err)
    })
})

app.get('/test', (req, res) => {
    res.send(`<img src="https://api.thecatapi.com/v1/images/search?format=src&limit=1" />`)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

