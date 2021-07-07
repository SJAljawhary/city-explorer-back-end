'use strict';

const axios = require('axios'); 
module.exports = movieFunction; 


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

