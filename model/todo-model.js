
const Datastore = require('nedb-promises');
const todoDB = new Datastore({
    filename: "./db/todo.db",
    autoload: true,
});

const readTodos = async () => {
    const doc = await todoDB.find({});
    return doc;
}

const createTodo = async (title, done) => {
    const doc = await todoDB.insert({title, done});
};

// const updateTodo = async (todoId, title, done) => {
//     const doc = await todoDB.update({_id: todoId, })
// }