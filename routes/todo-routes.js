
const {Router} = require('express');
const router = new Router();

//Creating todos
// router.post('/', xxx);

//Reading todos
router.get('/', (req, res) => {
    res.send('Hello');
});

// //Updating todos
// router.put('/', xxx);

// //Deleting todos
// router.delete('/', xxx);

module.exports = router;