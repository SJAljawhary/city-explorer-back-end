'use strict';

const express = require('express');
require('dotenv').config();

const axios = require('axios');


const cors = require('cors');


const weatherData = require('./data/weather.json');
const { response } = require('express');


const server = express();
const PORT = process.env.PORT;
server.use(cors());


server.get('/', (req, res) => {
    res.status(200).send('home route')
})

server.get('/test', (request, response) => {
    response.status(200).send('my server is working')
})


//localhost:3001/getWeatherInfo?cityName=Amman
// let lat = req.query.lat;
// let lon = req.query.lon;

server.get('/getWeatherInfo', weatherFunction);


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


server.get('/getMovieInfo', movieFunction);


function movieFunction(req, res) {

    let searchQuery = req.query.cityName;


    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`

    //https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&${searchQuery}


    axios.get(url).then(movieData => {

      res.status(200).send(movieData.data.results.map(movie=> {

            return new Movie(movie)
        }))
       
    }).catch(error => {
        res.status(500).send(error)
    }

    )
}
class Movie {
    constructor(movie) {
        this.title = movie.original_title;
        this.overview = movie.overview;
        this.average_votes = movie.vote_average;
        this.total_votes = movie.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        this.popularity = movie.popularity;
        this.released_on = movie.release_date;
    }
}
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})