//const { usersDB } = require('../db/db');

const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
	email: {type: String, unique: true},
	password: String,
	role: String,
});

const usersDB = mongoose.model('usersDB', userSchema);

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const insertUser = async (email, password) => {
	console.log('Entering insert user')
	const isRegistered = await usersDB.findOne({ email: email }).exec();
	console.log('Entering insert user after')

	if (!isRegistered) {
		const hash = bcrypt.hashSync(password, 10);
		let userData = {
			email: email,
			password: hash,
			role: 'user'
		};
		console.log(userData)
		const doc = await usersDB.create(userData);
		console.log(doc)
		return doc;
	} else {
		throw new Error('This usename already exists, try another one.');
	}
};

const loginUser = async (email, password) => {
	const doc = await usersDB.findOne({ email: email }, {});
	if (bcrypt.compareSync(password, doc.password)) {
		const token = await jwt.sign(
			{ email: doc.email, id: doc._id, role: doc.role },
			secret,
			{ expiresIn: '1h' }
		);
		return token;
	} else {
		throw new Error('Wrong email or password, try again');
	}
};

const deleteUser = async (userId) => {
	const doc = await usersDB.deleteOne({_id: userId});
	return doc;
};

const clearAllUsers = async () => {
	const doc = await usersDB.remove({});
	return doc;
};

const findUserData = async (userId) => {
	const userDoc = await usersDB.findOne({_id: userId})
	console.log(userDoc)
	return userDoc;
}

module.exports = {
	insertUser,
	loginUser,
	clearAllUsers,
	findUserData,
	deleteUser
};
