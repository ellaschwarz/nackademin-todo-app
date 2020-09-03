const {
    insertUser,
    loginUser,
    updateUser
} = require('../model/user-model');

const createUser = async (req, res) => {

    const {username, password} = req.body;
    try {
        if(req.user.role = 'admin') {
            const user = await insertUser(username, password);
            res.status(200).send(user)
        } else {
            throw new Error('Only admin can create a new user');
        }
    } catch (err) {
        res.status(404).send(err)
    }
};

const userLogin = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
        const token = await loginUser(username, password);
        console.log(token);
        res.status(200).json(token);
    } catch (err) {
        console.log('catchhhhh')
        res.status(404).send(err);
    }
};

const userUpdate = async (req, res) => {
    let userData = {
        id: req.params.id,
        username: req.body.username,
        password: req.body.password
    }

    try {
        console.log('try');
        const user = await updateUser(userData);
        console.log(user);
        res.sendStatus(200).send(user);
    } catch (err) {
        res.status(404).send(err);
    };
};

module.exports = {
    createUser,
    userLogin,
    userUpdate
};