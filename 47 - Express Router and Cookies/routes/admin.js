const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    }
    res.send('SORRY, NOT AN ADMIN');
});

router.get('/topsecret', (req, res) => {
    res.send('THIS IS TOP SECRET ;)');
});

router.post('/deleteeverything', (req, res) => {
    res.send('OK DELETED ALL!!');
});

module.exports = router;
