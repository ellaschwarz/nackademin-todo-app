const Datastore = require("nedb-promises");
require("dotenv").config();

let listDB, todoDB, usersDB;

switch (process.env.ENVIRONMENT) {

  case "development":
     listDB = new Datastore({
      filename: "./db/list.db",
      autoload: true
    });

     todoDB = new Datastore({
      filename: "./db/todo.db",
      autoload: true
    });

     usersDB = new Datastore({
      filename: "./db/users.db",
      autoload: true
    });
    break;

  case "test":
    listDB = new Datastore({
      filename: "./database/test_list.db",
      autoload: true,
    });
    todoDB = new Datastore({
      filename: "./database/test_todo.db",
      autoload: true,
    });
    usersDB = new Datastore({
      filename: "./database/test_users.db",
      autoload: true,
    });
    
    listDB.remove({});
    todoDB.remove({});
    usersDB.remove({});
}

module.exports = { listDB, todoDB, usersDB };