
const {
    findTodos,
    insertTodo,
    updateTodo,
    removeTodo,
    findNextTodos,
    findOneTodo
} = require('../model/todo-model');

const createTodoItem = async (req, res) => {
    const {title, done} = req.body;
    try {
        const todo = await insertTodo(title, done, req.user.id);
        return res.status(200).json(todo);
    } catch (err) {
        return res.status(202).json(err);
    }
};

const readTodoItems = async (req, res) => {
    try {
        console.log(req.user);
        if(req.user.role === 'admin') {
            const todo = await findTodos({});
            return res.status(200).json(todo);
        } else if (req.user.role === 'user') {
            const todo = await findTodos({userId: req.user.id});
            return res.status(200).json(todo);
        }

    } catch (err) {
        return res.status(404).json(err);
    }
};

const readOneTodoItem = async (req, res) => {
    try {
        const todo = await findOneTodo(req.params.id);
        return res.status(200).json(todo);
    } catch (err) {
        return res.status(404).json(err);
    }
};

const updateTodoItem = async (req, res) => {
    const todoID = req.params.id;
    const {title, done} = req.body;
    try {
        const todo = await updateTodo(todoID, title, done, req.user);
        console.log(todo);
        return res.sendStatus(200).json(todo);
    } catch (err) {
        return res.status(404).json(err);
    };
};

const deleteTodoItem = async (req, res) => {
    const todoID = req.params.id;
    console.log(req.user.role);
    try {
        if(req.user.role === 'admin') {
            const todo = await removeTodo(todoID, req.user.role);
            console.log('Går in i controllern remove todo');
            console.log(todo);
            return res.status(200).json(todo);
        } else {
            throw new Error('Not authorized to delete');
        }

    } catch (err) {
        console.log('Skickar 404');
        return res.status(401).json(err);
    };
};

const paginateTodoItems = async (req, res) => {
    let perPage = 5;
    let page = Math.max(0, req.params.page);
    try {
        if(req.user.role === 'admin') {
            const todo = await findNextTodos({}, perPage, page);
            return res.status(200).json(todo);
        } else if (req.user.role === 'user') {
            const todo = await findNextTodos({userId: id}, perPage, page);
            return res.status(200).json(todo);
        }

    } catch (err) {
        return res.status(202).json(err);
    }
};

module.exports = {
    createTodoItem,
    readTodoItems,
    updateTodoItem,
    deleteTodoItem,
    readOneTodoItem,
    paginateTodoItems
};