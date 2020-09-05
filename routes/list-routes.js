
const {Router} = require('express');
const router = new Router();

const List = require('../controllers/list-controller');

const {
    authorizeUser
} = require('../middleware/authorize')

//Creating Lists
router.post('/', authorizeUser, List.createList);

//Reading Lists
router.get('/', authorizeUser, List.readLists);

//Reading one List
router.get('/:id', authorizeUser, List.readOneList)

//Reading one list with all items
router.get('/:id/todos', authorizeUser, List.getListItems)

//Updating Lists
router.patch('/:id', authorizeUser, List.updateTodoList);

//Deleting Lists
router.delete('/:id', authorizeUser, List.deleteTodoList);

module.exports = router;