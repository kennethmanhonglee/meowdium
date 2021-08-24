const db = require('./db/models');
const { User } = db;

const loginUser = (req, res, user) => {
    req.session.auth = { userId: user.id };
}

const logoutUser = (req, res) => {
    delete req.session.auth;
}

const restoreUser = async (req, res, next) => {
    console.log(req.session);

    if (req.session.auth) {
        const { userId } = req.session.auth;

        const user = await User.findByPk(userId);

        if (user) {
            res.locals.authenticated = true;
            res.locals.user = user;
            next();
        } else {
            res.locals.authenticated = false;
            const err = new Error('Cannot login user.');
            next(err);
        }
    } else {
        res.locals.authenticated = false;
        next();
    }
}


module.exports = {
    loginUser,
    restoreUser,
    logoutUser
};