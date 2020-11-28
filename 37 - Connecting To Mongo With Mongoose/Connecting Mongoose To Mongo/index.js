const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movies', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('we\'re connected!');
    })
    .catch(err => {
        console.log('OH NO!');
        console.log(err);
    });

const db = mongoose.connection;

const movieSchema = mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema);

const amadeus = new Movie({
    title: 'Amadeus',
    year: 1986,
    score: 9.2,
    rating: 'R'
});

// Movie.insertMany([
//     {
//         title: 'Parasite',
//         year: 2019,
//         score: 9.5,
//         rating: 'M'
//     },
//     {
//         title: 'The King Of Comedy',
//         year: 1988,
//         score: 7.5,
//         rating: 'R'
//     },
//     {
//         title: 'Verguizas cabronas',
//         year: 2005,
//         score: 6.5,
//         rating: 'M'
//     },
//     {
//         title: 'Cidade de Deus',
//         year: 2005,
//         score: 9.1,
//         rating: 'M'
//     },
//     {
//         title: 'Wall-e',
//         year: 2010,
//         score: 8.3,
//         rating: 'R'
//     }
// ]);