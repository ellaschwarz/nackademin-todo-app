const { listDB, todoDB } = require('../db/db');
const mongoose = require ('mongoose');

const listSchema = new mongoose.Schema({
	title: String,
	userId: String,
	created: String,
});

//const List = 

const findLists = async filter => {
	const doc = await listDB.find(filter).sort({ created: -1 });
	return doc;
};

const findOneList = async id => {
	const doc = await listDB.findOne({ _id: id }, {});
	return doc;
};

const findTodoItems = async id => {
	const todos = await todoDB.find({ listId: id });
	return todos;
};

const insertList = async (title, userId) => {
	const doc = await listDB.insert({
		title,
		userId,
		created: new Date().toLocaleString()
	});
	return doc;
};

const updateList = async (listId, title) => {
	const doc = await listDB.update(
		{ _id: listId },
		{ $set: { title, updated: new Date().toLocaleString() } },
		{ returnUpdatedDocs: true }
	);
	return doc;
};

const removeList = async listId => {
	const doc = await listDB.remove({ _id: listId });
	const todo = await todoDB.remove({ listId: listId }, { multi: true });
	return doc;
};

const removeListFromUser = async userId => {
	const doc = await listDB.remove({ userId: userId }, { multi: true });
	return doc;
}

const clearAllLists = async () => {
	const doc = await listDB.remove({}, { multi: true });
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
	findTodoItems,
	removeListFromUser
};
