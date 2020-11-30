const express = require('express');
const app = express();
const morgan = require('morgan');

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
    res.send('SORRY YOU NEED A PASSWORD!');
};

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('HOME PAGE!');
});

app.get('/dogs', (req, res) => {
    res.send('WOOF WOOF!');
});

app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I don\'t have to talk to anyone');
});

app.use((req, res) => {
    res.status(404).send('NOT FOUND WHOOPSY!');
});

app.listen(3000, () => {
    console.log('Started on 3000!!');
});