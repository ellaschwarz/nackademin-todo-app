//const { listDB, todoDB } = require('../db/db');

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const listSchema = new mongoose.Schema({
	title: String,
	userId: {type: Schema.Types.ObjectId, ref: "usersDB"},
	created: String,
});

const listDB = mongoose.model('listDB', listSchema);

const findLists = async filter => {
	const doc = await listDB.find(filter).sort({ created: -1 });
	return doc;
};

const findOneList = async id => {
	const doc = await listDB.findById(id);
	console.log(doc)
	return doc;
};

const insertList = async (title, userId) => {
	const doc = await listDB.create({
		title,
		userId,
		created: new Date().toLocaleString()
	});
	return doc;
};

const updateList = async (listId, title) => {
	const doc = await listDB.updateOne(
		{ _id: listId },
		{ $set: { title, updated: new Date().toLocaleString() } },
		{ returnUpdatedDocs: true }
	);
	return doc;
};

const removeList = async listId => {
	const doc = await listDB.deleteOne({ _id: listId });
	return doc;
};

const removeListFromUser = async userId => {
	const doc = await listDB.deleteOne({ userId: userId }, { multi: true });
	return doc;
}

const clearAllLists = async () => {
	const doc = await listDB.deleteMany({}, { multi: true });
	return doc;
};

const countLists = async () => {
	const doc = await listDB.count({});
	return doc;
};

module.exports = {
	findOneList,
	insertList,
	updateList,
	removeList,
	findLists,
	clearAllLists,
	countLists,
	removeListFromUser
};
