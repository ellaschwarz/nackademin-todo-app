const {
    insertUser,
    loginUser
} = require('../model/user-model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = process.env.SECRET;

const createUser = async (req, res) => {
    console.log(req.body);
    const hash = bcrypt.hashSync(req.body.password, 10);
    let userData = {
        username: req.body.username,
        password: hash,
        role: "user"
    };
    try {
        const user = await insertUser(userData);
        res.status(200).send(user)
    } catch (err) {
        res.status(404).send(err)
    }
};

const userLogin = async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        const user = await loginUser(username, password);
        const token = jwt.sign(user, secret, {expiresIn: "1h"});
        res.status(200).send(token);
    } catch (err) {
        console.log('catchhhhh')
        res.status(404).send(err);
    }
}

module.exports = {
    createUser,
    userLogin
};