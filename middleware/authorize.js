
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const authorizeUser = async (req, res, next) => {
    if(!req.headers.authorization) {
        res.redirect('/');
        return res.sendStatus(403);
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    console.log(token);

    try {
        const payload = jwt.verify(token, secret);
        req.user = {
            ...payload,
            owns(document) {
                console.log(this._id);
                console.log(document._id);

                return this._id == document._id;
            }
        };
        console.log(req.user);
        next();

    } catch (err) {
        console.log(err);
        res.sendStatus(403);
    }
}

module.exports = {
    authorizeUser
}
