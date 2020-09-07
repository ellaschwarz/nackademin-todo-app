const { todoDB } = require('../db/db');

const findTodos = async filter => {
	const doc = await todoDB
		.find(filter)
		.sort({ created: -1 })
		.limit(10);
	return doc;
};

const findOneTodo = async id => {
	const doc = await todoDB.findOne({ _id: id }, {});
	return doc;
};

const findNextTodos = async (filter, perPage, page) => {
	const doc = await todoDB
		.find(filter)
		.sort({ created: -1 })
		.skip(page * perPage)
		.limit(perPage);
	return doc;
};

const insertTodo = async (title, done, userId, listId) => {
	console.log('INSERT TODO')
	const doc = await todoDB.insert({
		title,
		done,
		userId,
		listId,
		created: new Date().toLocaleString()
	});
	return doc;
};

const updateTodo = async (todoId, title, done) => {
	const doc = await todoDB.update(
		{ _id: todoId },
		{ $set: { title, done, updated: new Date().toLocaleString() } },
		{}
	);
	return doc;
};

const removeTodo = async todoId => {
	const doc = await todoDB.remove({ _id: todoId });
	console.log(doc);
	return doc;
};

const clearAllTodos = async () => {
	const doc = await todoDB.remove({}, { multi: true });
	return doc;
};

const countTodos = async () => {
	const doc = await todoDB.count({});
	return doc;
};

module.exports = {
	findTodos,
	insertTodo,
	updateTodo,
	removeTodo,
	findNextTodos,
	findOneTodo,
	clearAllTodos,
	countTodos
};
