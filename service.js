var http = require('http');
var express = require('express');
var twilio = require('twilio');
var request = require('request');
var parseString = require('xml2js').parseString;

var app = express();

app.post('/sms', function(req, res) {
    var twiml = new twilio.twiml.MessagingResponse();
    var message = twiml.message()
    message.body('Here is a cat picture');
    message.media('http://thecatapi.com/api/images/get?format=src&results_per_page=1')
    console.log('msg:', message.body)
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

http.createServer(app).listen(1337, function () {
  console.log("Express server listening on port 1337");
});
