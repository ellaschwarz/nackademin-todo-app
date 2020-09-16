const {
	insertUser,
	loginUser,
	updateUser,
	findUserData,
	deleteUser
} = require('../model/user-model');
const { findLists, removeListFromUser } = require('../model/list-model');
const { findAllTodos, removeTodosFromUser } = require('../model/todo-model');

const createUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		if ((req.user.role = 'admin')) {
			const user = await insertUser(email, password);
			res.status(200).send(user);
		} else {
			throw new Error('Only admin can create a new user');
		}
	} catch (err) {
		res.status(404).send(err);
	}
};

const userLogin = async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	try {
		const token = await loginUser(email, password);
		res.status(200).json(token);
	} catch (err) {
		res.status(404).send(err);
	}
};

const getUser = async (req, res) => {
	console.log('entering get user in controller')
	let user = req.user;
	console.log(user + 'at controller');
	try {
		return res.status(200).json(user)
	} catch (err) {
		res.status(404).send(err)
	}
}

const userUpdate = async (req, res) => {
	let userData = {
		id: req.params.id,
		email: req.body.email,
		password: req.body.password
	};

	try {
		const user = await updateUser(userData);
		res.sendStatus(200).send(user);
	} catch (err) {
		res.status(404).send(err);
	}
};

const userData = async (req, res) => {
	let userId = req.params.id;
	try {
		const user = await findUserData(userId);
		const todoLists = await findLists({ userId: userId });

		let todos = [];

		for await (todoList of todoLists) {
			const todoItems = await findAllTodos({ listId: todoList._id });
			todos.push({ title: todoList.title, items: todoItems });
		}

		let allUserData = {
			user: user,
			lists: todos
			//items: todoItems
		};
		//console.log(allUserData);

		res.status(200).send(allUserData);
	} catch (err) {
		res.status(404).send(err);
	}
};

const deleteUserData = async (req, res) => {
	let userId = req.params.id;
	try {
		const user = await deleteUser(userId);
		const list = await removeListFromUser(userId);
		const todoItems = await removeTodosFromUser(userId);
		const message = 'All user data has been deleted';
		return res.status(200).send(message);
	} catch {
		res.status(404).send(err);
	}
};

module.exports = {
	createUser,
	userLogin,
	userUpdate,
	userData,
	deleteUserData,
	getUser
};
