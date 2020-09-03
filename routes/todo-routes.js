
const {Router} = require('express');
const router = new Router();

const Todo = require('../controllers/todo-controller');

const {
    authorizeUser
} = require('../middleware/authorize')

//Creating todos
router.post('/', authorizeUser, Todo.createTodoItem);

//Reading todos
router.get('/', authorizeUser, Todo.readTodoItems);

//Reading one todo
router.get('/:id', authorizeUser, Todo.readOneTodoItem)

//Updating todos
router.patch('/:id', authorizeUser, Todo.updateTodoItem);

//Deleting todos
router.delete('/:id', authorizeUser, Todo.deleteTodoItem);

//Reading paginated todos
router.get('/page/:page', Todo.paginateTodoItems);

module.exports = router;