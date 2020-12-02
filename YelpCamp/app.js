const catchAsync = require('./utils/catchAsync');
const express = require('express');
const ExpressError = require('./utils/ExpressError');
const ejsMate = require('ejs-mate');
const { campgroundSchema } = require('./schemas');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database connected');
});

const app = express();

app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

// HOME
app.get('/', (req, res) => {
    res.render('home');
});

const Campground = require('./models/campground');

// CAMPGROUND INDEX
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});

// CAMPGROUND CREATE
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/create');
});

// CAMPGROUND STORE
app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));

// CAMPGROUND SHOW
app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', { campground });
}));

// CAMPGROUND EDIT
app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', { campground });
}));

// CAMPGROUND UPDATE
app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
}));

// CAMPGROUND DELETE
app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));

app.all('*', (req, res, next) =>  {
    next(new ExpressError('Page Not Found...', 404));
    res.send('404!!!');
});

// ERROR HANDLING
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('Started on 3000!');
});