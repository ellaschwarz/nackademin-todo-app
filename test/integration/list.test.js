const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const { expect, request } = chai;
const app = require('../../app');

const Database = require('../../db/database');

const listModel = require('../../model/list-model');
const userModel = require('../../model/user-model');
const todoModel = require('../../model/todo-model');

describe('RESTful resource test for lists', () => {
	before(async () => {
		await Database.connect();
	});

	after(async () => {
		await Database.disconnect();
	});

	beforeEach(
		'Clear databases, authenticate user and create list before testing',
		async function() {
			await listModel.clearAllLists();
			await userModel.clearAllUsers();

			const user = await userModel.insertUser('tester', 'tester');
			this.currentTest.user = user;
			this.currentTest.userId = user._id;

			const authenticatedUser = await userModel.loginUser(
				user.email,
				'tester'
			);
			this.currentTest.token = authenticatedUser;

			const list = await listModel.insertList(
				'This is a test list',
				this.currentTest.userId
			);

			this.currentTest.list = list;
			this.currentTest.listId = list._id;
		}
	);

	it('should create a new list ', async function() {
		const body = {
			title: 'This is a new list from HTTP-request'
		};

		await request(app)
			.post('/lists')
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.send(body)
			.then((res) => {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
			});
	});

	it('should read all lists', async function() {
		await request(app)
			.get('/lists')
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.then((res) => {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
			});
	});

	it('should read one list', async function() {
		await request(app)
			.get(`/lists/${this.test.listId}`)
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.then((res) => {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.deep.an('object');
			});
	});

	it('should read one list and return its todo items', async function() {
		await todoModel.insertTodo(
			'Todo item1 in todo list',
			'done',
			this.test.userId,
			this.test.listId
		);
		await todoModel.insertTodo(
			'Todo item2 in todo list',
			'done',
			this.test.userId,
			this.test.listId
		);
		await todoModel.insertTodo(
			'Todo item3 in todo list',
			'done',
			this.test.userId,
			this.test.listId
		);

		await request(app)
			.get(`/lists/${this.test.listId}/todos`)
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.then((res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.deep.an('array');
			});
	});

	it('should update the title of a list', async function() {
		const body = {
			title: 'This is a new list title'
		};

		await request(app)
			.patch(`/lists/${this.test.listId}`)
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.send(body)
			.then((res) => {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
			});
	});

	it('should delete one list', async function() {
		await request(app)
			.delete(`/lists/${this.test.listId}`)
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.then((res) => {
				expect(res).to.have.status(200);
			});
	});
 });
