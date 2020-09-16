const {
    createUser,
    userLogin,
    userUpdate,
    userData,
    deleteUserData,
    getUser
} = require('../controllers/user-controller');

const {
    authorizeUser
} = require('../middleware/authorize')

const express = require('express');
const router = express.Router();

router.post('/login', userLogin);
router.get('/:id', authorizeUser, userData);
router.get('/user', authorizeUser, getUser);
router.post('/', authorizeUser, createUser);

router.patch('/:id', authorizeUser, userUpdate);
router.delete('/:id', authorizeUser, deleteUserData)


module.exports = router;