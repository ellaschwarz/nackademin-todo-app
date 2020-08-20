
const {
    findTodos,
    insertTodo
} = require('../model/todo-model');

const readTodos = async (req, res) => {
    try {
        const todos = await findTodos();
        res.status(200).send(todos);
    } catch (err) {
        res.status(404).send(err);
    }
};

const createTodo = async (req, res) => {
    const {title, done} = req.body;
    try {
        const todo = await insertTodo(title, done);
        res.status(200).send(todo);
    } catch (err) {
        res.status(202).send(err);
    }
};

module.exports = {
    readTodos,
    createTodo
};