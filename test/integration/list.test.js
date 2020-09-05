const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const { expect, request } = chai;
const app = require('../../app');

const listModel = require('../../model/list-model');
const userModel = require('../../model/user-model');
const todoModel = require('../../model/todo-model');

describe('RESTful resource test for lists', () => {
	beforeEach(async function() {
		await listModel.clearAllLists();
		await userModel.clearAllUsers();

		const user = await userModel.insertUser('tester', 'tester');
		this.currentTest.user = user;
		this.currentTest.userId = user._id;

		const authenticatedUser = await userModel.loginUser(
			user.username,
			'tester'
		);
		this.currentTest.token = authenticatedUser;

		const list = await listModel.insertList(
			'This is a test list',
			this.currentTest.userId
		);

		this.currentTest.list = list;
		this.currentTest.listId = list._id;
	});

	it('should create a new list ', async function() {
		const body = {
			title: 'This is a new list from HTTP-request'
		};

		request(app)
			.post('/lists')
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.send(body)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				//expect(res.body).to.have.keys(['title', 'userId', 'created', '_id']);
			});
	});

	it('should read all lists', async function() {
		request(app)
			.get('/lists')
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				// expect(res.body).to.deep.an('array');
				// expect(res.body[0]).to.have.all.keys(
				// 	'_id',
				// 	'created',
				// 	'title',
				// 	'userId'
				// );
			});
	});
	it('should read one list', async function() {
		request(app)
			.get(`/lists/${this.test.listId}`)
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				// expect(res.body).to.deep.an('object');
				// expect(res.body).to.have.all.keys('_id', 'created', 'title', 'userId');
			});
	});
	it('should read one list and return its todo items', async function() {
		//let listId = this.test.listId;
		//let userId = this.test.userId;

		await todoModel.insertTodo(
			'Todo item1 in todo list',
			'done',
			this.test.userId,
			this.test.listId,
			//userId,
			//listId
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

		request(app)
			.get(`/lists/${this.test.listId}/todos`)
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.deep.an('array');
			});
	});
	it('should update the title of a list', async function() {
		//let listId = this.test.listId;
		const body = {
			title: 'This is a new list title'
		};

		request(app)
			.patch(`/lists/${this.test.listId}`)
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.send(body)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				// expect(res.body).to.have.keys(
				// 	'_id',
				// 	'created',
				// 	'title',
				// 	'userId',
				// 	'updated'
				// );
			});
			
	});
	it('should delete one list', async function () {
		//let listId = this.test.listId;
		console.log(this.test.listId + 'from delete')
		request(app)
			.delete(`/lists/${this.test.listId}`)
			.set('Authorization', `Bearer ${this.test.token}`)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
				expect(res).to.have.status(200);
			})

	})
});
