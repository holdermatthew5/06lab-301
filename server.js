'use strict';


// Bring in our dependencies
const express = require('express');
const cors = require('cors');

require('dotenv').config();

// Declare our port for our server to listen on
const PORT = process.env.PORT || 3000;

// start/instanciate Express
const app = express();

// Use CORS (cross origin resource sharing)
app.use(cors());

// Routes
app.get('/', (request, response) => {
    response.send('Hello World');
});

// listen for request

app.get('/location', location);

// handle request

function location(request, response) {
    try {
        // find city name recieved from search
        let city = request.query.city;
        // bring location.json data in
        let data = require('./data/location.json');
        // create object instance to pass to frontend
        let location = new Location(data, city);
        // pass object to front end
        response.send(location);
    }
    // log error
    catch (error) {
        console.log(error);
        response.status(500).send('Oops... Something\'s wrong here.');
    }
}

// listen for request

app.get('/weather', weather);

// handle request

function weather(request, response) {
    try {
        // bring weather.json data in
        let data = require('./data/weather.json');
        // create array to push forcast objects in to
        let dayArray = [];
        // loop through the array in weather.json to grab individual forcasts
        data.data.forEach(dayObj => {
            // create instances of weather with the info front end needs
            let weather = new Weather(dayObj);
            // push created objects in to dayArray to prepare to pass to client
            dayArray.push(weather);
        });
        // send forcast objects to client
        response.send(dayArray);
    }
    // log error
    catch (error) {
        console.log(error);
        response.status(500).send('Oops... Something\'s wrong Headers.');
    }
}

// Constructors to tailor our incoming raw data

function Location(obj, query) {
    this.latitude = obj[0].lat,
        this.longitude = obj[0].lon,
        this.search_query = query,
        this.formatted_query = obj[0].display_name
}

function Weather(obj) {
    this.forecast = obj.weather.description;
    this.time = obj.valid_date;
}

// Start our server!
app.listen(PORT, () => {
    console.log(`Server is now listening on port ${PORT}`);
});