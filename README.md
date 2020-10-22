# City Explorer?

**Author**: Matthew Holder
**Version**: 1.0.7

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

## Getting Started

To bring this app to your own device, start by visiting https://github.com/holdermatthew5/06lab-301.git and forking the repository.

From there you can copy the link from the browsers search bar and run the following code in your command line pasting the url in place of 'url':
  - `git clone url`

You'll then need to create an account with Location, Weather and Hiking APIs. When you do you'll be assigned an API key. This key is individual to you and can result in a charge if overused, so be sure to add your.env file to your .gitignore file. This will ensure your keys are not sent to heroku or github so they're not used by unauthorized users.

Each API will also have a link. This link is needed to access the API and should replace the string parts of the respective url variables (do not replace urls in constructors).

Once you've collected your APIs you'll need to create the .env file mentioned above in the same level as your server.js file and type the following code with no spaces or punctuation into the file (this is case sensitive, make sure to account for the example keys and search queries in the link):
  - PORT=3000
  - GEOCODE_API_KEY=your-key
  - WEATHER_API_KEY=your-key
  - HIKING_API_KEY=your-key

To deploy:
- To deploy to github:
  - Find your forked repo.
  - Find the settings page.
  - Find 'Source' in the 'GitHub Pages' section.
  - Open the drop down list and select master or main (whichever appears to you).
  - Finally click save and scroll back down to find the link to your app in the same place.

- To deploy with heroku:
  - from your command line, run `heroku create` then `git push heroku master`.
  - Then to find the link to your deployed app run `git remote -v` in the command line while in the root level of the repository.

## Architecture

This app uses:
  - Javascript
  - Node.js
  - cors
  - express

## Change Log

10-15-2020 11:19pm - Base file system and necessary data in place.
10-16-2020 9:15pm - Feature #1 allows a user to find a location by city, state, etc.
10-16-2020 10:30pm - Feature #2 allows a user to find forecasts based on the searched city.
10-17-2020 2:57pm - Feature #3 alerts front-end and back-end developers when there's an error with the API request.
10-19-2020 4:45pm - Feature #4 uses .map() to send an array of tailored data to the front-end team, in order to provide consistency for the developer and the user.
10-20-2020 9:30pm - Feature #5 replaces a location.json file with a legitimate API request.
10-20-2020 10:30pm - Feature #6 replaces a weather.json file with a legitimate API request.
10-21-2020 10:55pm - Feature #7 allows a user to view local hiking spots and their ratings based on their searched location.

## Credits and Collaborations

All code present was built by Code Fellows. After 10-15-2020 11:19pm code will be built/modified by Matthew Holder.

The APIs used in this server are listed here:
  - [LocationIQ](https://locationiq.com/) - https://locationiq.com/
  - [Weatherbit.io](https://www.weatherbit.io/) - https://www.weatherbit.io/
  - [Hiking Project](http://www.hikingproject.com/) - http://www.hikingproject.com/