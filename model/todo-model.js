//const { todoDB } = require('../db/db');

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new mongoose.Schema({
	title: String,
	done: String,
	userId: {type: Schema.Types.ObjectId, ref: "usersDB"},
	listId: {type: Schema.Types.ObjectId, ref: "listDB"},
	created: String
});

const todoDB = mongoose.model('todoDB', todoSchema);

const findTodos = async filter => {
	const doc = await todoDB
		.find(filter)
		.sort({ created: -1 })
		.limit(10);
	return doc;
};

const findAllTodos = async filter => {
	const doc = await todoDB
		.find(filter)
		.sort({ created: -1 })
		console.log(doc)
	return doc;
};

const findOneTodo = async id => {
	const doc = await todoDB.findOne({ _id: id }, {});
	return doc;
};

const findTodoByList = async id => {
	const todos = await todoDB.find({ listId: id });
	return todos;
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
	const doc = await todoDB.create({
		title,
		done,
		userId,
		listId,
		created: new Date().toLocaleString()
	});
	return doc;
};

const updateTodo = async (todoId, title, done) => {
	const doc = await todoDB.updateOne(
		{ _id: todoId },
		{ $set: { title, done, updated: new Date().toLocaleString() } },
		{}
	);
	return doc;
};

const removeTodo = async todoId => {
	const doc = await todoDB.removeOne({ _id: todoId });
	return doc;
};

const removeTodosFromList = async listId => {
	const doc = await todoDB.deleteMany({ listId: listId });
	return doc;
}

const removeTodosFromUser = async userId => {
	const doc = await todoDB.remove({userId: userId}, { multi: true });
	return doc;
};

const clearAllTodos = async () => {
	const doc = await todoDB.remove({});
	return doc;
};

const countTodos = async filter => {
	const doc = await todoDB.count(filter);
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
	countTodos,
	findAllTodos,
	removeTodosFromUser,
	findTodoByList,
	removeTodosFromList
};
