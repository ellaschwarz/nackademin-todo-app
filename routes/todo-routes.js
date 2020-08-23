
const {Router} = require('express');
const router = new Router();

const Todo = require('../controllers/todo-controller');

//Creating todos
router.post('/', Todo.createTodoItem);

//Reading todos
router.get('/', Todo.readTodoItem);

//Updating todos
router.put('/:id', Todo.updateTodoItem);

//Deleting todos
router.delete('/:id', Todo.deleteTodoItem);

//Reading paginated todos
router.get('/page/:page', Todo.paginateTodoItems);

module.exports = router;