const catchAsync = require('../utils/catchAsync');
const express = require('express');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const router = express.Router({ mergeParams: true });

// CONTROLLER
const controller = require('../controllers/reviews');

// CREATE
router.post('/', isLoggedIn, validateReview, catchAsync(controller.create));
// DELETE
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(controller.delete));

module.exports = router;