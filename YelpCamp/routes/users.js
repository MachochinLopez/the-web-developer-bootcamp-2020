const catchAsync = require('../utils/catchAsync');
const express = require('express');
const router = express.Router();
const passport = require('passport');

// CONTROLLERS
const controller = require('../controllers/users');

router.route('/register')
    .get(controller.registerForm)
    .post(catchAsync(controller.register));

router.route('/login')
    .get(controller.loginForm)
    .post(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login'
    }), controller.login);

router.get('/logout', controller.logout);

module.exports = router;
