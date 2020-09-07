const chai = require('chai');
chai.should();

const userModel = require('../../model/user-model');
const listModel = require('../../model/list-model');
const todoModel = require('../../model/todo-model');


describe('Testing the list model', () => {
	beforeEach('insert a test user and a test list', async function() {
		await listModel.clearAllLists();
		await userModel.clearAllUsers();

		const user = await userModel.insertUser('tester', 'tester');
		this.currentTest.user = user;
		this.currentTest.userId = user._id;

		let title = 'This is a test list';
		let userId = this.currentTest.userId;
		const list = await listModel.insertList(title, userId);
		this.currentTest.list = list;
		this.currentTest.listId = list._id;
	});

	it('should count the number of lists', async function() {
		//Arrange
		let title = 'This is another test list';
		let userId = this.test.userId;

		for (let i = 0; i < 9; i++) {
			await listModel.insertList(title, userId);
		}
		//Act
		const numberOfLists = await listModel.countLists();

		//Assert
		numberOfLists.should.equal(10);
	});

	it('should insert a new list to database', async function() {
		//Arrange
		let title = 'This is also a test list';
		let userId = this.test.userId;

		//Act
		const newList = await listModel.insertList(title, userId);
		const numberOfLists = await listModel.countLists();

		//Assert
		newList.should.deep.equal({
			title: newList.title,
			userId: newList.userId,
			created: newList.created,
			_id: newList._id
		});
		newList.should.be.an('object');
		numberOfLists.should.equal(2);
	});

	it('should find all lists in database', async function() {

		//Act
		let allLists = await listModel.findLists({});

		//Assert
		allLists.should.be.an('array');
		allLists.should.have.lengthOf(1);
		allLists[0].should.have.property('title', allLists[0].title);

	});

	it('should find one list in database', async function() {

		//Act
		const findList = await listModel.findOneList(this.test.listId);

		findList.should.be.an('object');
		findList.should.have.property('title');
		findList.should.have.property('userId');
	});

	it('should update a list title', async function() {
		//Arrange
		let listId = this.test.listId;
		let title = 'Updated list title';

		//Act
		const updateList = await listModel.updateList(listId, title);
		const updatedList = await listModel.findOneList(listId);

		//Assert
		updatedList.should.have.property('title', updatedList.title);
		updatedList.should.have.property('updated', updatedList.updated);
		updatedList.should.be.an('object');
	});

	it('should remove one list item from database and delete its todo items', async function() {
		//Arrange
		await todoModel.insertTodo(
			'Todo item1 in todo list',
			'done',
			this.test.userId,
			this.test.listId
		);

		const todoItemsInList = await todoModel.findTodos({listId: this.test.listId})

		//Act
		const deleteList = await listModel.removeList(this.test.listId);
		const numberOfLists = await listModel.countLists();
		const numberOfTodosInList = await todoModel.countTodos({listId: this.test.listId})

		//Assert
		deleteList.should.be.equal(1);
		numberOfLists.should.be.equal(0);
		todoItemsInList.should.have.lengthOf(1);
		numberOfTodosInList.should.be.equal(0);
	});
});
