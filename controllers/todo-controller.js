
const {
    findTodos,
    createTodo
} = require('../model/todo-model');

const readTodos = async (req, res) => {
    try {
        const todos = await findTodos();
        res.status(200).send(todos);
    } catch (err) {
        res.status(404).send(err);
    }
};

module.exports = {
    readTodos
};