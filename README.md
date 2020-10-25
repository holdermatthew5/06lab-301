# City Explorer

**Author**: Matthew Holder
**Version**: 1.1.1

# Overview

This application will allow a user to search a city by name and by shown related information like coordinates, a map and weather

Number and name of feature: Feature #1 - Location
Estimate of time needed to complete: 1hr
Start time: 8:02pm
Finish time: 9:15pm
Actual time needed to complete: 1hr 13min

Number and name of feature: Feature #2 - Weather
Estimate time needed to complete: 1hr 13min
Start time: 9:16pm
Finish time: 10:30pm
Actual time needed to complete: 1hr 14min

Number and name of feature: Feature #3 - Errors
Estimate time needed to complete: 1hr 13min
Start time: 10:31pm
Finish time: 2:57pm
Actual time needed to complete: 2hr 15min

Number and name of feature: Feature #4 - Data formatting
Estimate time needed to complete: 1hr
Start time: 4:15pm
Finish time: 4:45pm
Actual time needed to complete: 30min

Number and name of feature: Feature #5 - Locations
Estimate time needed to complete: 30min
Start time: 4:46pm
Finish time: 9:30pm
Actual time needed to complete: ~7hr

Number and name of feature: Feature #6 - Weather
Estimate time needed to complete: 30min
Start time: 6:30pm
Finish time: 10:30pm
Actual time needed to complete: ~6hr

Number and name of feature: Feature #7 - Hiking
Estimate time needed to complete: 1hr 30min
Start time: 8:46pm
Finish time: 10:55pm
Actual time needed to complete: 2hr 15min

Number and name of feature: Feature #8 - Database
Estimate time needed to complete: 2hr
Start time: 8:30pm
Finish time: 10:00pm
Actual time needed to complete: 1hr 30min

Number and name of feature: Feature #9 - Server
Estimate time needed to complete: 4hr
Start time: 4:30pm
Finish time: 6:30pm
Actual time needed to complete: 2hr

Number and name of feature: Feature #10 - Movies
Estimate time needed to complete: 2hr 30min
Start time: 1:00pm
Finish time: 3:15pm
Actual time needed to complete: 2hr 15min

Number and name of Feature: Feature #11 - Yelp
Estimate time needed to complete: 2hr 15min
Start time: 2:16pm
Finish time: 5:30pm
Actual time needed to complete: 2hr 15min

## Getting Started

To bring this app to your own device, start by visiting https://github.com/holdermatthew5/06lab-301.git and forking the repository.

From there you can copy the link from the browsers search bar and run the following code in your command line pasting the url in place of 'url':
  - `git clone url`

You'll then need to create an account with all the necessary APIs. When you do you'll be assigned an API key for each API. This key is individual to you and can result in a charge if overused, so be sure to add it to your .env file and add your .env file to your .gitignore file. This will ensure your keys are not sent to heroku or github so they're not used by unauthorized users.

Each API will also have a link. This link is needed to access the API and should replace the string parts of the respective url variables (do not replace urls in constructors).

Once you've collected your APIs you'll need to create the .env file mentioned above in the same level as your server.js file and type the following code with no spaces or punctuation into the file (this is case sensitive, make sure to account for the example keys and search queries in the link):
  - `PORT=3000`.
  - `GEOCODE_API_KEY=your-key`.
  - `WEATHER_API_KEY=your-key`.
  - `HIKING_API_KEY=your-key`.
  - `DATABASE_URL=postgres://your-user-name:your-pass-word@localhost:5432/your-database-name`.

To create your database run the following command in your sql command line:
  - `CREATE DATABASE name-of-database`.

Then, if you created a database with a name other than 'cityexplorer' look for every instance of the string cityexplorer in your schema.sql file and server.js file.

To deploy:
- To deploy to github:
  - Find your forked repo.
  - Find the settings page.
  - Find 'Source' in the 'GitHub Pages' section.
  - Open the drop down list and select master or main (whichever appears to you).
  - Finally click save and scroll back down to find the link to your app in the same place.

- To deploy with heroku:
  - From your command line, run `heroku create` then `git push heroku master`.
  - Then to find the link to your deployed app run `git remote -v` in the command line while in the root level of the repository.
  - Once done you can copy your database to your heroku version with the following command:
    - `heroku pg:psql -f path/to/schema.sql --app your-app-name`.
  - From the settings page of your app (on heroku) find the config vars section and click 'Reveal Config Vars'. This will show a hidden area on screen where you can enter your API keys. The names of these keys should perfectly match the way they are referenced in your code.

## Architecture

This app uses:
  - Javascript
  - JQuery
  - Node.js
  - cors
  - express
  - superagent
  - postgresql

## Change Log

10-15-2020 11:19pm - Base file system and necessary data in place.
10-16-2020 9:15pm - Feature #1 allows a user to find a location by city, state, etc.
10-16-2020 10:30pm - Feature #2 allows a user to find forecasts based on the searched city.
10-17-2020 2:57pm - Feature #3 alerts front-end and back-end developers when there's an error with the API request.
10-19-2020 4:45pm - Feature #4 uses .map() to send an array of tailored data to the front-end team, in order to provide consistency for the developer and the user.
10-20-2020 9:30pm - Feature #5 replaces a location.json file with a legitimate API request.
10-20-2020 10:30pm - Feature #6 replaces a weather.json file with a legitimate API request.
10-21-2020 10:55pm - Feature #7 allows a user to view local hiking spots and their ratings based on their searched location.
10-22-2020 10:00pm - Feature #8 uses a database to store data from the previous call and overwrites old data after each query.
10-23-2020 6:20pm - Feature #9 sends data from the previous query if it exists in the database. If the necessary data does not exist in the database the server will make a new API call to collect data to send to front-end and save to database.
10-24-2020 3:15pm - Feature #10 gives the user a list of movies related to their search.
10-23-2020 5:30pm - Feature #11 gives the user a list of restaurants in the general area of their search.

## Credits and Collaborations

All code present was built by Code Fellows. After 10-15-2020 11:19pm code will be built/modified by Matthew Holder.

The APIs used in this server are listed here:
  - [LocationIQ](https://locationiq.com/) - https://locationiq.com/
  - [Weatherbit.io](https://www.weatherbit.io/) - https://www.weatherbit.io/
  - [Hiking Project](http://www.hikingproject.com/) - http://www.hikingproject.com/
  - [The Movie Db](https://developers.themoviedb.org/3/getting-started/introduction) - https://developers.themoviedb.org/3/getting-started/introduction
  - [Yelp Fusion](https://www.yelp.com/developers/documentation/v3/business_search) - https://www.yelp.com/developers/documentation/v3/business_search