
const Datastore = require('nedb-promises');
const todoDB = new Datastore({
    filename: "./db/todo.db",
    autoload: true,
});

const findTodos = async () => {
    const doc = await todoDB.find({});
    return doc;
}

const insertTodo = async (title, done) => {
    const doc = await todoDB.insert({
        title, 
        done, 
        timestamp: new Date().toLocaleString()});
    return doc;
};

const updateTodo = async (todoId, title, done) => {
    const doc = await todoDB.update(
        {_id: todoId}, 
        {title, done, timestamp: new Date().toLocaleString()}, {})
        return doc;
};

module.exports = {
    findTodos,
    insertTodo,
    updateTodo
}