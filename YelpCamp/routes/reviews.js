const catchAsync = require('../utils/catchAsync');
const express = require('express');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const router = express.Router({ mergeParams: true });

// MODELOS
const Campground = require('../models/campground');
const Review = require('../models/review');

// CREATE
router.post('/', isLoggedIn, validateReview, async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully created review!');
    res.redirect(`/campgrounds/${campground._id}`);
});

// DELETE
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;