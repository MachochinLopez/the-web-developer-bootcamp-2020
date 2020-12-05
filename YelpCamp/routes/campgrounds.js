const catchAsync = require('../utils/catchAsync');
const express = require('express');
const router = express.Router({ mergeParams: true });
const { isAuthor, isLoggedIn, validateCampground } = require('../middleware');

// CONTROLLERS
const controller = require('../controllers/campgrounds');

router.route('/')
    // INDEX
    .get(catchAsync(controller.index))
    // CREATE
    .post(isLoggedIn, validateCampground, catchAsync(controller.store));

// CREATE
router.get('/new', isLoggedIn, controller.create);

router.route('/:id')
    // SHOW
    .get(catchAsync(controller.show))
    // UPDATE
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(controller.update))
    // DELETE
    .delete(isLoggedIn, isAuthor, catchAsync(controller.delete));

// EDIT
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(controller.edit));

module.exports = router;