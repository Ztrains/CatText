// libraries
const dotenv = require('dotenv').config();
const express = require('express');
const readline = require("readline");
const http = require('http');

// server config
const app = express();
const port = process.env.PORT || 3000;
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// twilio config
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// middleware
app.use(express.urlencoded({ extended: true }));

// sends MMS of random cat image
app.get('/cat', (req, res) => {
    let statusURL = '';
    if(process.env.NGROK_URL) {
        console.log(`setting statusURL to ${process.env.NGROK_URL}`);
        statusURL = process.env.NGROK_URL;
    }

    client.messages.create({
       body: 'Enjoy your cat!',
       from: process.env.FROM_NUMBER,
       to: process.env.TO_NUMBER,
       mediaUrl: ['https://api.thecatapi.com/v1/images/search?format=src&limit=1'],
       statusCallback: statusURL
    })
    .then(message => {
        const messageSid = message.sid;
        const messageStatus = message.status;

        console.log(`${messageSid} status: ${messageStatus}`)
        res.send('sending mms, check console for status')
    })
    .catch(err => {
        console.log(`err: ${err}`)
        res.send(err)
    });
});

// status callback of /cat
app.post('/status', (req, res) => {
    const messageSid = req.body.MessageSid;
    const messageStatus = req.body.MessageStatus;

    console.log(`${messageSid} status: ${messageStatus}`);

    res.sendStatus(200);
});

// serves random cat image
app.get('/test', (req, res) => {
    res.send(`<img src="https://api.thecatapi.com/v1/images/search?format=src&limit=1" />`);
})

// start server
app.listen(port, () => {
    let msg = '';
    let timeout = 10;
    let arg = process.argv[2];

    console.log(`service listening at http://localhost:${port}`);

    // for running 'node service.js send'
    if (arg === 'send') http.get(`http://localhost:${port}/cat`);

    else {
        reader.on('line', input => {
            if (input === 'yes' || input === 'y') {
                reader.close();
                http.get(`http://localhost:${port}/cat`);
            } else console.log(`did not understand ${input}, try 'yes' or 'y'`);
        })
    
        reader.on('close', () => {
            if (msg === 'timeout') console.log('prompt expired');
            clearTimeout(countdown);
        })
    
        console.log(`send image to ${process.env.TO_NUMBER}?`);
        let countdown = setTimeout(() => {
            msg = 'timeout';
            reader.close();
        }, timeout * 1000);
    }

})