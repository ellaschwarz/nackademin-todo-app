
const {Router} = require('express');
const router = new Router();

const Todo = require('../controllers/todo-controller');

//Creating todos
// router.post('/', xxx);

//Reading todos
router.get('/', Todo.readTodos);


// //Updating todos
// router.put('/', xxx);

// //Deleting todos
// router.delete('/', xxx);

module.exports = router;