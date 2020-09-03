const {todoDB} = require('../db/db')

const findTodos = async (filter) => {
    const doc = await todoDB
      .find(filter)
      .sort({ created: -1 })
      .limit(10);
    return doc;
};

const findOneTodo = async id => {
  const doc = await todoDB.findOne({ _id: id }, {});
  return doc;
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
  const doc = await todoDB.insert({
    title,
    done,
    userId,
    listId,
    created: new Date().toLocaleString()
  });
  return doc;
};

const updateTodo = async (todoId, title, done, user) => {
  const todo = await findOneTodo(todoId);
  if (user.id === todo.userId || user.role === "admin") {
    const doc = await todoDB.update(
      { _id: todoId },
      { $set: { title, done, updated: new Date().toLocaleString() } },
      {}
    );
    return doc;
  } else {
    throw new Error("Not authorized to edit");
  }
};

const removeTodo = async (todoId, role) => {
  console.log(role);
    const doc = await todoDB.remove({ _id: todoId });
    console.log("Går in i modellen remove todo");
    console.log(doc);
    return doc;
    // res.sendStatus(200).send(doc);
};

module.exports = {
  findTodos,
  insertTodo,
  updateTodo,
  removeTodo,
  findNextTodos,
  findOneTodo
};
