const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

app.use(cookieParser('thisismysecret'));

app.get('/greet', (req, res) => {
    const { name = 'User'} = req.cookies;
    res.send(`Hey there ${name}!`);
});

app.get('/setname', (req, res) => {
    res.cookie('name', 'Machochin');
    res.cookie('animal', 'Harlequin Shrimp');
    res.send('OK I SENT YOU A COOKIE');
});

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true });
    res.send('OK SENT SIGNED COOKIE');
});

app.get('/verifyfruit', (req, res) => {
    res.send(req.signedCookies)
});

app.listen(3000, () => {
    console.log('Started on 3000!');
});