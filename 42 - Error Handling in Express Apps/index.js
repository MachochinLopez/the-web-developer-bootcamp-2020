const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Product = require('./models/product');

const AppError = require('./AppError.js');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo connected!');
    })
    .catch(err => {
        console.log('Mongo error!');
        console.log(err);
    });

app.use(express.urlencoded({ extended: true }));

app.use(morgan('common'));
app.use((req, res, next) => {
    req.requestTime = Date.now();
    next();
});

// app.use((req, res, next) => {
//     console.log('FIRST MIDDLEWARE YEAHH!!!');
//     return next();
// });

// app.use((req, res, next) => {
//     console.log('SECOND MIDDLEWARE YEAHH!!!');
//     return next();
// });

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    throw new AppError('Password required!', 401);
    //res.send('SORRY YOU NEED A PASSWORD!');
};

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('HOME PAGE!');
});

app.get('/error', (req, res) => {
    chicken.fly();
});

app.get('/dogs', (req, res) => {
    res.send('WOOF WOOF!');
});

app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I don\'t have to talk to anyone');
});

app.get('/admin', (req, res) => {
    throw new AppError('You are not an Admin!', 403);
});

// INDEX
app.get('/products', async (req, res) => {
    const { category } = req.query;
    let products = [];
    if (category) {
        products = await Product.find({ category });
    } else {
        products = await Product.find({});
    }
    res.send(products);
});

// CREATE
app.get('/products/new', (req, res) => {
    throw new  AppError('NOT ALLOWED', 401);
});

// SHOW
app.get('/products/:id', async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    if (!product) {
        return next(new AppError('Product not found', 404));
    }
    res.send('Holaa');
});

app.use((req, res) => {
    res.status(404).send('NOT FOUND WHOOPSY!');
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
    next();
});

app.listen(3000, () => {
    console.log('Started on 3000!!');
});