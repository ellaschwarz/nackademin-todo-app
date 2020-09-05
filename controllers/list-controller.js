const {
	findOneList,
	insertList,
	updateList,
	removeList,
	findLists,
	findTodoItems
} = require('../model/list-model');

const readLists = async (req, res) => {
	try {
		if (req.user.role === 'admin') {
			const lists = await findLists({});
			return res.status(200).json(lists);
		} else if (req.user.role === 'user') {
			const lists = await findLists({ userId: req.user.id });
			return res.status(200).json(lists);
		}
	} catch (err) {
		return res.status(404).json(err);
	}
};

const getListItems = async (req, res) => {
	try {
		console.log('CONTROLLEEEER')
		const listId = req.params.id;
		let todoItems = await findTodoItems(listId);
		//console.log(todoItems)
		return res.status(200).json(todoItems);
	} catch (err) {
		return res.status(404).json(err);
	}
};

const readOneList = async (req, res) => {
	try {
		console.log('Går in i read list')
		const list = await findOneList(req.params.id);
		return res.status(200).json(list);
	} catch (err) {
		return res.status(404).json(err);
	}
};

const createList = async (req, res) => {
	const { title } = req.body;
	try {
		const list = await insertList(title, req.user.id);
		return res.status(200).json(list);
	} catch (err) {
		return res.status(202).json(err);
	}
};

const updateTodoList = async (req, res) => {
	const listId = req.params.id;
	const { title } = req.body;
	try {
		const list = await findOneList(listId);
		if (req.user.id === list.userId || req.user.role === 'admin') {
			const list = await updateList(listId, title);
			return res.status(200).json(list);
		} else {
			throw new Error('Not authorized to edit');
		}
	} catch (err) {
		console.log('catching what')
		return res.status(404).json(err);
	}
};

const deleteTodoList = async (req, res) => {
	const listId = req.params.id;
	console.log(listId)
	try {
		if (req.user.id === list.userId || req.user.role === 'admin') {
			const list = await removeList(listId);
			console.log(list);
			return res.status(200).json(list);
		} else {
			throw new Error('Not authorized to delete');
		}
	} catch (err) {
		return res.status(401).json(err);
	}
};

module.exports = {
	createList,
	readLists,
	updateTodoList,
	deleteTodoList,
	readOneList,
	getListItems
};
