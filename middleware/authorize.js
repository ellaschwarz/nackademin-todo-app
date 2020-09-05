const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const authorizeUser = async (req, res, next) => {
	if (!req.headers.authorization) {
		res.redirect('/');
		return res.status(403);
	}

	try {
		const token = await req.headers.authorization.replace('Bearer ', '');
		const payload = await jwt.verify(token, secret);
		req.user = {
			...payload,
			owns(document) {
				return this._id == document._id;
			}
		};
		next();
	} catch (err) {
		return res.status(403).json(err);
	}
};

module.exports = {
	authorizeUser
};
