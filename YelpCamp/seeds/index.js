const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database connected');
});

/**
 * Toma un muestra al azar del arreglo indicado.
 * @param {array} arr 
 */
const sample = arr => arr[Math.floor(Math.random() * arr.length)]

/**
 * Vacía la tabla campgrounds y luego la llena con registros generados al azar.
 */
const seedDb = async () => {
    // Vacía la tabla.
    await Campground.deleteMany({});
    
    for (let i = 0; i < 300; i++) {
        // Toma una ciudad al azar.
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        // Crea un nuevo Campground.
        const camp = new Campground({
            author: '5fca92629bbc552874773619',
            geometry: {
                type : "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dshys24wz/image/upload/v1607207012/YelpCamp/20190423_154916_muml3d.jpg',
                    filename: '20190423_154916_muml3d'
                },
                {
                    url: 'https://res.cloudinary.com/dshys24wz/image/upload/v1607207010/YelpCamp/20190429_131855_wdqda5.jpg',
                    filename: 'YelpCamp/20190429_131855_wdqda5'
                },
                {
                    url: 'https://res.cloudinary.com/dshys24wz/image/upload/v1607207006/YelpCamp/20191111_185906_ghgb50.jpg',
                    filename: 'YelpCamp/20191111_185906_ghgb50'
                },
                {
                    url: 'https://res.cloudinary.com/dshys24wz/image/upload/v1607207006/YelpCamp/20191212_183146_fycpqc.jpg',
                    filename: 'YelpCamp/20191212_183146_fycpqc'
                },
                {
                    url: 'https://res.cloudinary.com/dshys24wz/image/upload/v1607207006/YelpCamp/20190423_112219_forhix.jpg',
                    filename: 'YelpCamp/20190423_112219_forhix'
                },
                {
                    url: 'https://res.cloudinary.com/dshys24wz/image/upload/v1607207004/YelpCamp/Screenshot_2017-08-06-00-25-26_d97bqw.png',
                    filename: 'YelpCamp/Screenshot_2017-08-06-00-25-26_d97bqw'
                },
            ],
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque officia tenetur nulla molestiae accusantium quam suscipit ipsa eligendi aliquam delectus ducimus, reiciendis debitis recusandae iste aut odit dignissimos! Totam, quod?',
            location: `${cities[random1000].city}, ${cities[random1000].state}`
        });
        // La guarda en la db.
        await camp.save();
    }
};

seedDb().then(() => {
    mongoose.connection.close();
});