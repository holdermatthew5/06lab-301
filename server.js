'use strict';


// Bring in our dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
const { response } = require('express');

require('dotenv').config();

// Declare our port for our server to listen on
const PORT = process.env.PORT || 3000;

// start/instanciate Express
const app = express();

//
const client = new pg.Client(process.env.DATABASE_URL);

// Use CORS (cross origin resource sharing)
app.use(cors());

// Routes
app.get('/', (request, response) => {
    response.send('It\'s working!');
});
app.get('/location', location);
app.get('/weather', weather);
app.get('/trails', trails);
app.get('/movies', movies);
app.get('/yelp', yelp);

// handle request

function location(request, response) {
    // find city name recieved from search
    let city = request.query.city;
    // bring in key from .env
    let key = process.env.GEOCODE_API_KEY;
    // check db here if it's empty move to the next if not send that and next function
    let SQL = 'SELECT * FROM loc WHERE search_query = $1;';
    let safeValues = [city];
    client.query(SQL, safeValues)
        .then(results => {
            if (results.rowCount.length > 0) {
                response.JSON(results.rows[0]);
            } else {
                let url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
                // request data from provided url
                superagent.get(url).then(data => {
                    // tailor data to front-end needs
                    let location = new Location(data.body[0], city);
                    // insert new data into databbase
                    let SQL2 = 'INSERT INTO loc (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4);';
                    let safeValues2 = [location.search_query, location.formatted_query, location.latitude, location.longitude];
                    client.query(SQL2, safeValues2)
                    // send tailored data to front-end
                    response.send(location);
                })
            }
        })
        .catch((error) => {
            console.log(error);
            response.status(500).send('Opps... Something\'s wrong with our location services.');
        })
}

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
                // create instances of weather with info tailored to front end needs
                let weather = new Weather(dayObj);
                // push created objects in to dayArray to prepare to pass to client
                dayArray.push(weather);
            });
            // send forcast objects to client
            response.send(dayArray);
        })
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Oops... Something\'s wrong with our forecast.');
    }
}

function trails(request, response) {
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
    catch {
        console.log(error);
        response.status(500).send(`Oops... Something\'s wrong with our trail services.`)
    }
}

function movies(request, response) {
    try {
        // Define the search
        let city = request.query.search_query;
        // Define the API url
        let url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
        // Create array for .send
        let movieArr = [];
        // Send request to API
        superagent.get(url).then(data => {
            movieArr = data.body.results.map(obj => {
                // Tailor data to front end needs
                let movie = new Movies(obj);
                return movie;
            })
            // Send to front end
            response.send(movieArr);
        })
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Oops... Something\'s wrong with our movie listings.')
    }
}

function yelp(request, response) {
    try {
        // Define the search
        let lat = request.query.latitude;
        let lon = request.query.longitude;
        // Define the API url
        let url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&term=restaurant`;
        // Use API key
        const auth = 'Bearer ' + process.env.YELP_API_KEY;
        superagent.get(url).set('Authorization', auth)
        .then(data => {
            // Tailor data to front-end needs
            let yelpArr = data.body.businesses.map(obj => {
                let yelp = new Yelp(obj);
                return yelp;
            })
            // Send tailored data to front=end
            response.send(yelpArr);
        })
    }
    catch {
        console.log(error);
        response.status(500).send('Oops... Something\'s wrong with our business listings.');
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
    this.forecast = obj.weather.description,
    this.time = obj.valid_date
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

function Movies(obj) {
    this.title = obj.original_title,
    this.overview = obj.overview,
    this.average_votes = obj.vote_average,
    this.total_votes = obj.vote_count,
    this.image_url = `${obj.homepage}${obj.backdrop_path}`,
    this.popularity = obj.popularity,
    this.released_on = obj.release_date
}

function Yelp(obj) {
    this.name = obj.name,
    this.image_url = obj.image_url,
    this.price = obj.price,
    this.rating = obj.rating,
    this.url = obj.url
}

// Start our server!
client.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is now listening on port ${PORT}.`);
        })
    })
    .catch(error => console.log(error))
