const Datastore = require("nedb-promises");
const usersDB = new Datastore({
  filename: "./db/users.db",
  autoload: true
});

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const insertUser = async (username, password, role) => {
  if (role === "admin") {
    const isRegistered = await usersDB.findOne({ username: username });
    if (!isRegistered) {
      const hash = bcrypt.hashSync(password, 10);
      let userData = {
        username: username,
        password: hash,
        role: "user"
      };
      const doc = await usersDB.insert(userData);
      return doc;
    }
  } else {
    throw new Error("Only admin can create a new user");
  }
};

const loginUser = async (username, password) => {
  const doc = await usersDB.findOne({ username: username }, {});

  if (bcrypt.compareSync(password, doc.password)) {
    const token = await jwt.sign(
      { username: doc.username, id: doc._id, role: doc.role },
      secret,
      { expiresIn: "1h" }
    );
    return token;
  } else {
    throw new Error("Wrong username or password, try again");
  }
};

// findUser = async (req, res) => {

// }

// const updateUser = async (id, userData) => {

//     const doc = await todoDB.update({_id: userData.id}, {$set: userData}, {});
//         console.log(doc);
//         return doc;
// };

module.exports = {
  insertUser,
  loginUser
  //updateUser
};
