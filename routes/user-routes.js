const {
    createUser,
    userLogin,
    userUpdate,
    userData,
    deleteUserData
} = require('../controllers/user-controller');

const {
    authorizeUser
} = require('../middleware/authorize')

const express = require('express');
const router = express.Router();

router.get('/:id', authorizeUser, userData);
router.post('/', authorizeUser, createUser);
router.post('/login', userLogin);
router.patch('/:id', authorizeUser, userUpdate);
router.delete('/:id', authorizeUser, deleteUserData)


module.exports = router;