
const Datastore = require('nedb-promises');
const usersDB = new Datastore({
    filename: "./db/users.db",
    autoload: true,
});

const bcrypt = require('bcryptjs');

const insertUser = async (userData) => {
    const doc = await usersDB.insert(userData)    
        return doc;
};

const loginUser = async(username, password) => {
    const doc = await usersDB.findOne({username: username}, {})
    console.log(password);
    console.log(doc.password);
    
   if(bcrypt.compare(password, doc.password)) {
        return doc;
    } else {
        throw new Error('User cannot login');
    }
};

module.exports = {
    insertUser, 
    loginUser
};
