const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const authorizeUser = async (req, res, next) => {
	if (!req.headers.authorization) {
		res.redirect('/');
		return res.sendStatus(403);
	}
	const token = req.headers.authorization.replace('Bearer ', '');

	try {
		const payload = jwt.verify(token, secret);
		req.user = {
			...payload,
			owns(document) {
				return this._id == document._id;
			}
		};
		next();
	} catch (err) {
		res.sendStatus(403);
	}
};

module.exports = {
	authorizeUser
};
