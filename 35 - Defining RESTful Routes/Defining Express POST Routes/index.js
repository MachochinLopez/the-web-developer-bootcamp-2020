const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/tacos', (req, res) => {
    res.send('GET /tacos response');
});

app.post('/tacos', (req, res) => {
    console.log(req.body);
    res.send('POST /tacos response');
});

app.listen(3000, () => {
    console.log('Service Started on port 3000!');
});