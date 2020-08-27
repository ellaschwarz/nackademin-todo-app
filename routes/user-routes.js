const {
    createUser,
    userLogin
} = require('../controllers/user-controller');

const express = require('express');
const router = express.Router();

router.post('/', createUser);
router.post('/login', userLogin);


module.exports = router;