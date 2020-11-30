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
    
    for (let i = 0; i < 50; i++) {
        // Toma una ciudad al azar.
        const random1000 = Math.floor(Math.random() * 1000);
        // Crea un nuevo Campground.
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        });
        // La guarda en la db.
        await camp.save();
    }
};

seedDb().then(() => {
    mongoose.connection.close();
});