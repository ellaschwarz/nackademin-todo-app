
const {
    findTodos,
    insertTodo,
    updateTodo,
    removeTodo
} = require('../model/todo-model');

const createTodoItem = async (req, res) => {
    const {title, done} = req.body;
    try {
        const todo = await insertTodo(title, done);
        res.status(200).send(todo);
    } catch (err) {
        res.status(202).send(err);
    }
};

const readTodoItem = async (req, res) => {
    try {
        const todo = await findTodos();
        res.status(200).send(todo);
    } catch (err) {
        res.status(404).send(err);
    }
};

const updateTodoItem = async (req, res) => {
    const todoID = req.params.id;
    const {title, done} = req.body;
    try {
        const todo = await updateTodo(todoID, title, done);
        res.sendStatus(200).send(todo);
    } catch (err) {
        res.status(404).send(err);
    };
};

const deleteTodoItem = async (req, res) => {
    const todoID = req.params.id;
    try {
        const todo = await removeTodo(todoID);
        res.status(200).send(todo);
    } catch (err) {
        res.status(404).send(err);
    };
};

module.exports = {
    createTodoItem,
    readTodoItem,
    updateTodoItem,
    deleteTodoItem
};