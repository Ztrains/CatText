# CatText
Simple nodejs webservice using express to serve a random image of a cat via [TheCatAPI](https://thecatapi.com/). Also integrated with Twilio to have the option to send an MMS of a random cat instead.

## Usage
To run:
    npm i
    npm start

navigate to ```localhost:PORT/test``` to see a random cat image displayed in your browser.  
navigate to ```localhost:PORT/cat``` to send an MMS with a random cat image after providing the necessary environment variables.