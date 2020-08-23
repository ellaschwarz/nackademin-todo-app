
const Datastore = require('nedb-promises');
const todoDB = new Datastore({
    filename: "./db/todo.db",
    autoload: true,
});

const findTodos = async () => {
    const doc = await todoDB.find({}).sort({created: -1}).limit(10);
    return doc;
}

const findNextTodos = async(perPage, page) => {
    console.log(page);
    const doc = await todoDB.find({}).sort({created: -1}).skip(page*perPage).limit(perPage);
    return doc;
};


const insertTodo = async (title, done) => {
    const doc = await todoDB.insert({
        title, 
        done, 
        created: new Date().toLocaleString()});
    return doc;
};

const updateTodo = async (todoId, title, done) => {
    const doc = await todoDB.update(
        {_id: todoId}, 
        { $set: {title, done, updated: new Date().toLocaleString(), }, }, {})
        return doc;
};

const removeTodo = async (todoId) => {
    const doc = await todoDB.remove({_id: todoId}, {});
};

module.exports = {
    findTodos,
    insertTodo,
    updateTodo,
    removeTodo,
    findNextTodos
}