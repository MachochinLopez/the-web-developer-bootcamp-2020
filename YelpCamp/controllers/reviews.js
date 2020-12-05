const Campground = require('../models/campground');
const Review = require('../models/review');

/**
 * Crea el nuevo review y lo agrega a la lista de reviews
 * del campground.
 * 
 * @param {*} req Request
 * @param {*} res Response
 * 
 * @result Redirect al show del campground.
 */
module.exports.create = async (req, res) => {
    // Busca el campground en el que se va a dejar el review.
    const campground = await Campground.findById(req.params.id);
    // Crea un nuevo Review según la información enviada.
    const review = new Review(req.body.review);
    // Le agrega el autor al review.
    review.author = req.user._id;
    // Lo agrega a la colección de reviews del campground.
    campground.reviews.push(review);
    // Guarda en la DB el review.
    await review.save();
    // Actualiza el campground.
    await campground.save();

    req.flash('success', 'Successfully created review!');
    return res.redirect(`/campgrounds/${campground._id}`);
};

/**
 * Elimina el review y lo quita de la lista de reviews del
 * campground.
 * 
 * @param {*} req Request
 * @param {*} res Response
 * 
 * @result Redirect al show del campground.
 */
module.exports.delete = async (req, res) => {
    const { id, reviewId } = req.params;
    // Elimina el review de la lista de reviews del campground.
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    // Elimina el review de la DB.
    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Successfully deleted review!');
    return res.redirect(`/campgrounds/${id}`);
};