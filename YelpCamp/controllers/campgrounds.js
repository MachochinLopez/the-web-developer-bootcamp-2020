const { cloudinary } = require('../cloudinary');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

// MODELOS
const Campground = require('../models/campground');

/**
 * Carga la vista del índice, donde lista todos los campamentos.
 * 
 * @param {*} req Request
 * @param {*} res Response
 * 
 * @result Vista de result.
 */
module.exports.index = async (req, res) => {
    // Se trae todos los campgrounds.
    const campgrounds = await Campground.find({});
    // Genera la vista.
    return res.render('campgrounds/index', { campgrounds });
};

/**
 * Carga el formulario de crear campamentos.
 * 
 * @param {*} req Request
 * @param {*} res Response
 * 
 * @result Vista de create.
 */
module.exports.create = (req, res) => {
    // Genera la vista de crear.
    return res.render('campgrounds/create');
};

/**
 * Guarda en la base de datos el nuevo campamento.
 * 
 * @param {*} req  Request
 * @param {*} res  Response
 * @param {*} next Continuar post-middleware
 * 
 * @result Redirect al show del campground.
 */
module.exports.store = async (req, res, next) => {
    // Crea el campground con los datos del request.
    const campground = new Campground(req.body.campground);
    // Le agrega el autor del campground.
    campground.author = req.user._id;
    // Le agrega las imágenes que se hayan subido.
    campground.images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }));

    // Consulta la locación dada en el formulario.
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send();
    // Guarda las coordenadas.
    campground.geometry = geoData.body.features[0].geometry;
    
    // Guarda el campground recién creado.
    await campground.save();
    
    req.flash('success', 'Successfully created campground!');
    return res.redirect(`/campgrounds/${campground._id}`);
};

/**
 * Carga la vista de show del campground.
 * 
 * @param {*} req Request
 * @param {*} res Response
 * 
 * @result Vista de show / Redirect a index.
 */
module.exports.show = async (req, res) => {
    const { id } = req.params;
    // Trae de la base de datos el campamento buscado junto con los
    // datos adicionales que se mostrarán en la vista.
    const campground = await Campground.findById(id)
        .populate('author')
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        });
        
    // Si no existe el campamento buscado...
    if (!campground) {
        // Devuelve un error.
        req.flash('error', 'Campground not found!');
        return res.redirect('/campgrounds');
    }
    // Genera la vista de show.
    return res.render('campgrounds/show', { campground });
};

/**
 * Carga la vista de edit del campground.
 * 
 * @param {*} req Request
 * @param {*} res Response
 * 
 * @result Vista de edit / Redirect a index.
 */
module.exports.edit = async (req, res) => {
    const { id } = req.params;
    // Trae de la base de datos el campamento a editar.
    const campground = await Campground.findById(id);

    // Si no existe el campamento...
    if (!campground) {
        // Marca un error.
        req.flash('error', 'Campground not found!');
        return res.redirect('/campgrounds');
    }
    // Carga la vista de editar.
    return res.render('campgrounds/edit', { campground });
};

/**
 * Actualiza en la base de datos el campground deseado con los 
 * datos enviados.
 * 
 * @param {*} req Request
 * @param {*} res Response
 * 
 * @result Redirect a show.
 */
module.exports.update = async (req, res) => {
    const { id } = req.params;
    // Busca y actualiza el campground con los datos enviados en el formulario.
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    // Le agrega las imágenes que se hayan subido.
    const images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }));
    campground.images.push(...images);
    // Consulta la locación dada en el formulario.
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send();
    // Guarda las coordenadas.
    campground.geometry = geoData.body.features[0].geometry;
    
    await campground.save();
    // Si hay imágenes que borrar...
    if (req.body.deletedImages) {
        // Por cada imagen que haya que eliminar...
        for (const filename of req.body.deletedImages) {
            await cloudinary.uploader.destroy(filename);
        }
        // Saca del arreglo las imágenes cuyo filename coincida con el arreglo mandado en el form.
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deletedImages}}}});
    }
    req.flash('success', 'Successfully updated campground!');

    return res.redirect(`/campgrounds/${campground._id}`);
};

/**
 * Elimina de la DB el registro deseado.
 * 
 * @param {*} req Request
 * @param {*} res Response
 * 
 * @result Redirect a index.
 */
module.exports.delete = async (req, res) => {
    const { id } = req.params;
    // Busca y elimina el campground deseado.
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!');
    
    return res.redirect('/campgrounds');
};