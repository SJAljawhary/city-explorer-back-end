'use strict';

const axios = require('axios'); 
module.exports = weatherFunction; 

function weatherFunction(req, res) {

    let searchQuery = req.query.cityName;


    let url = `http://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`

    // http://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=5e489f4f316c467897395ae6a03624fd


    axios.get(url).then(weatherData => {

      res.status(200).send(weatherData.data.data.map(day => {

            return new Forecast(day)
        }))
       
    }).catch(error => {
        res.status(500).send(error)
    }

    )
}
class Forecast {
    constructor(day) {
        this.date = day.valid_date;
        this.description = day.weather.description;
    }
}
console.log(Forecast);

