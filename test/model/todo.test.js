const chai = require('chai');
chai.should();

const userModel = require('../../model/user-model');
const todoModel = require('../../model/todo-model');
const listModel = require('../../model/list-model');

describe('Testing the todo model', () => {
	beforeEach(
		'Clear databases, then create a user, list and todo item before tests',
		async function() {
			await todoModel.clearAllTodos();
			await userModel.clearAllUsers();

			const user = await userModel.insertUser('tester', 'tester');
			this.currentTest.user = user;
			this.currentTest.userId = user._id;

			const list = await listModel.insertList(
				'This is a test list',
				this.currentTest.userId
			);
			this.currentTest.list = list;
			this.currentTest.listId = list._id;

			let title = 'This is a test todo item';
			const todo = await todoModel.insertTodo(
				title,
				'done',
				this.currentTest.userId,
				this.currentTest.listId
			);
			this.currentTest.todo = todo;
			this.currentTest.todoId = todo._id;
		}
	);

	it('should count the number of Todos', async function() {
		//Arrange
		let title = 'This is another test todo';
		let userId = this.test.userId;

		for (let i = 0; i < 9; i++) {
			await todoModel.insertTodo(title, userId);
		}

		//Act
		const numberOfTodos = await todoModel.countTodos({});

		//Assert
		numberOfTodos.should.equal(10);
	});

	it('should insert a new todo to database', async function() {
		//Arrange
		let title = 'This is also a test todo';

		//Act
		const newTodo = await todoModel.insertTodo(
			title,
			'done',
			this.test.userId,
			this.test.listId
		);
		//Assert
		newTodo.should.deep.equal({
			title: newTodo.title,
			done: newTodo.done,
			created: newTodo.created,
			_id: newTodo._id,
			userId: newTodo.userId,
			listId: newTodo.listId
		});
		newTodo.should.be.an('object');
		newTodo.should.not.be.a('null');
	});

	it('should find all Todos in database', async function() {
		//Act
		let allTodos = await todoModel.findTodos({});
		//console.log(allTodos);

		//Assert
		allTodos.should.be.an('array');
		//allTodos.should.include.an('object');
	});

	it('should find one Todo in database', async function() {
		//Act
		const findTodo = await todoModel.findOneTodo(this.test.todoId);

		//Assert
		findTodo.should.be.an('object');
		findTodo.should.have.property('title');
		findTodo.should.have.property('userId');
	});

	it('should update a todo title', async function() {
		//Arrange
		let title = 'Updated todo title';

		//Act
		const updateTodo = await todoModel.updateTodo(
			this.test.todoId,
			title,
			'done'
		);
		const updatedTodo = await todoModel.findOneTodo(this.test.todoId);

		//Assert
		updatedTodo.should.have.property('title');
		updatedTodo.should.have.property('updated');
	});

	it('should remove one todo item from database', async function() {
		//Act
		const deleteTodo = await todoModel.removeTodo(this.test.todoId);
		const numberOfTodos = await todoModel.countTodos({});

		//Assert
		deleteTodo.should.be.equal(1);
		numberOfTodos.should.be.equal(0);
	});
});
