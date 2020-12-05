const User = require('../models/user');

/**
 * Carga la vista de register.
 * 
 * @param {*} req Request
 * @param {*} res Response
 * 
 * @return Vista de Register.
 */
module.exports.registerForm = (req, res) => {
    return res.render('users/register');
};

/**
 * Registra el nuevo usuario.
 * 
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Acción post-middleware
 * 
 * @return Redirect al indice de campgrounds.
 */
module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        // Crea el nuevo usuario con los datos del formulario.
        const user = new User({ email, username, password });
        // Lo guarda con passport.
        const registeredUser = await User.register(user, password);
        // Inicia sesión.
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp!');
            res.redirect('/campgrounds');
        });        
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
};

/**
 * Carga la vista de login.
 * 
 * @param {*} req Request
 * @param {*} res Response
 * 
 * @return Vista de login.
 */
module.exports.loginForm = (req, res) => {
    res.render('users/login');
};

/**
 * Acción posterior a Iniciar sesión.
 * 
 * @param {*} req Request
 * @param {*} res Response
 * 
 * @return Redirect al url previo.
 */
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    // Borra de la sesión el url
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

/**
 * Cierra sesión.
 * 
 * @param {*} req Request
 * @param {*} res Response
 * 
 * @return Redirect al index de campgrounds.
 */
module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
};