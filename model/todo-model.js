const Datastore = require("nedb-promises");
const todoDB = new Datastore({
  filename: "./db/todo.db",
  autoload: true
});

const findTodos = async (id, role) => {
  if (role === "admin") {
    const doc = await todoDB
      .find({})
      .sort({ created: -1 })
      .limit(10);
    return doc;
  } else if (role === "user") {
    const doc = await todoDB
      .find({ userId: id })
      .sort({ created: -1 })
      .limit(10);
    return doc;
  }
};

const findOneTodo = async id => {
  const doc = await todoDB.findOne({ _id: id }, {});
  return doc;
};

const findNextTodos = async (user, perPage, page) => {
  if (user.role === "admin") {
    const doc = await todoDB
      .find({})
      .sort({ created: -1 })
      .skip(page * perPage)
      .limit(perPage);
    return doc;
  } else if (user.role === "user") {
    const doc = await todoDB
      .find({ userId: id })
      .sort({ created: -1 })
      .skip(page * perPage)
      .limit(perPage);
    return doc;
  }
};

const insertTodo = async (title, done, userId) => {
  const doc = await todoDB.insert({
    title,
    done,
    userId,
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
  if (role === "admin") {
    const doc = await todoDB.remove({ _id: todoId });
    console.log("Går in i modellen remove todo");
    console.log(doc);
    return doc;
    // res.sendStatus(200).send(doc);
  } else {
    throw new Error("Not authorized to delete");
    //return doc;
  }
};

module.exports = {
  findTodos,
  insertTodo,
  updateTodo,
  removeTodo,
  findNextTodos,
  findOneTodo
};
