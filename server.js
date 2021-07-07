'use strict';

const weatherFunction = require('./modules/weather.js');
const movieFunction = require('./modules/movies.js');

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

server.get('/getWeatherInfo', weatherFunction);

server.get('/getMovieInfo', movieFunction);

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})