'use strict';


// Bring in our dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

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
        let key = process.env.GEOCODE_API_KEY;
        // assign location api url
        let url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
        // request data from provided url
        // console.log('');
        superagent.get(url).then(data => {
            // create object instance to pass to frontend
            let location = new Location(data.body[0], city);
            // pass object to front end
            response.send(location);
        });
    }
    // log error
    catch (error) {
        console.log(error);
        response.status(500).send('Opps... Something\'s wrong with our location services.');
    }
}

// listen for request

app.get('/weather', weather);

// handle request

function weather(request, response) {
    try {
        // define city
        let city = request.query.search_query;
        // define api url
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}`;
        // create array to push forcast objects in to
        let dayArray = [];
        superagent.get(url).then(data => {
            // navigate to array of daily forecast objects
            let forecastArr = JSON.parse(data.req.res.text).data;
            // loop through the forecast array to grab individual forcasts
            forecastArr.map(dayObj => {
                // console.log(dayObj);
                // create instances of weather with info tailored to front end needs
                let weather = new Weather(dayObj);
                // push created objects in to dayArray to prepare to pass to client
                dayArray.push(weather);
            });
            // send forcast objects to client
            response.send(dayArray);
        })
    }
    // log error to terminal and to site
    catch (error) {
        console.log(error);
        response.status(500).send('Oops... Something\'s wrong with our forecast.');
    }
}

// listen for request

app.get('/trails', trails);

// handle trail request

function trails (request, response) {
    try {
        // define the city name
        let city = request.query.search_query;
        // define the url
        let url = `https://www.hikingproject.com/data/get-trails?lat=${request.query.latitude}&lon=${request.query.longitude}&maxDistance=10&key=${process.env.HIKING_API_KEY}`;
        // request api data
        superagent.get(url).then(data => {
            // define the array of trail objects
            let trails = data.body.trails;
            // tailor recieved data to front-end needs
            let newArr = trails.map(obj => {
                // create tailored trail objects
                let trails = new Hiking(obj);
                // push new trail objects into array for easy transfer
                return trails;
            });
            // send tailored data to front-end
            response.send(newArr);
        });
    }
    // log error if try fails
    catch {
        // log error to terminal for back end team
        console.log(error);
        // log error to front-end for front-end team
        response.status(500).send(`Oops... Something\'s wrong with our trail services.`)
    }
}

// Constructors to tailor our incoming raw data

function Location(obj, query) {
    this.search_query = query,
        this.formatted_query = obj.display_name,
        this.latitude = obj.lat,
        this.longitude = obj.lon
}

function Weather(obj) {
    this.forecast = obj.weather.description;
    this.time = obj.valid_date;
}

function Hiking(obj) {
    this.name = obj.name,
    this.location = obj.location,
    this.length = obj.length,
    this.stars = obj.stars,
    this.star_votes = obj.starVotes,
    this.summary = obj.summary,
    this.trail_url = obj.url,
    this.conditions = obj.conditionStatus,
    this.condition_date = obj.conditionDate,
    this.condition_time = obj.conditionDate
}

// Start our server!
app.listen(PORT, () => {
    console.log(`Server is now listening on port ${PORT}`);
});