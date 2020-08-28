const {
    createUser,
    userLogin,
    userUpdate
} = require('../controllers/user-controller');

const {
    authorizeUser
} = require('../middleware/authorize')

const express = require('express');
const router = express.Router();

router.post('/', authorizeUser, createUser);
router.post('/login', userLogin);
router.patch('/:id', authorizeUser, userUpdate);


module.exports = router;