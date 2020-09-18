// const chai = require('chai');
// const chaiHttp = require('chai-http');
// chai.should();
// chai.use(chaiHttp);

// const { expect, request } = chai;
// const app = require('../../app');

// const listModel = require('../../model/list-model');
// const userModel = require('../../model/user-model');
// const todoModel = require('../../model/todo-model');

// describe('RESTful resource test for todos', () => {
// 	beforeEach(
// 		'Clear databases, authenticate user and create todo before testing',
// 		async function() {
// 			await todoModel.clearAllTodos();
// 			await userModel.clearAllUsers();

// 			const user = await userModel.insertUser('tester', 'tester');
// 			this.currentTest.user = user;
// 			this.currentTest.userId = user._id;

// 			const authenticatedUser = await userModel.loginUser(
// 				user.email,
// 				'tester'
// 			);
// 			this.currentTest.token = authenticatedUser;

// 			let title = 'This is a test todo item';
// 			const todo = await todoModel.insertTodo(
// 				title,
// 				'done',
// 				this.currentTest.userId,
// 				this.currentTest.listId
// 			);
// 			this.currentTest.todo = todo;
// 			this.currentTest.todoId = todo._id;
// 		}
// 	);

// 	it('should create a new todo ', async function() {
// 		const body = {
// 			title: 'This is a new todo from HTTP-request'
// 		};

// 		request(app)
// 			.post('/todos')
// 			.set('Authorization', `Bearer ${this.test.token}`)
// 			.set('Content-Type', 'application/json')
// 			.send(body)
// 			.end((err, res) => {
// 				expect(res).to.have.status(200);
// 				expect(res).to.be.json;
// 			});
// 	});

// 	it('should read all todos', async function() {
// 		request(app)
// 			.get('/todos')
// 			.set('Authorization', `Bearer ${this.test.token}`)
// 			.set('Content-Type', 'application/json')
// 			.end((err, res) => {
// 				expect(res).to.have.status(200);
// 				expect(res).to.be.json;
// 			});
// 	});
// 	it('should read one todo', async function() {
// 		request(app)
// 			.get(`/todos/${this.test.todoId}`)
// 			.set('Authorization', `Bearer ${this.test.token}`)
// 			.set('Content-Type', 'application/json')
// 			.end((err, res) => {
// 				expect(res).to.have.status(200);
// 				expect(res).to.be.json;
// 				expect(res.body).to.deep.an('object');
// 			});
// 	});

// 	// it('should update the title of a todo', async function() {
// 	// 	const body = {
// 	// 		title: 'This is a new todo title',
// 	// 		done: 'done'
// 	// 	};

// 	// 	request(app)
// 	// 		.patch(`/todos/${this.test.todoId}`)
// 	// 		.set('Authorization', `Bearer ${this.test.token}`)
// 	// 		.set('Content-Type', 'application/json')
// 	// 		.send(body)
// 	// 		.end((err, res) => {
// 	// 			expect(res).to.have.status(200);
// 	// 			expect(res).to.be.json;
// 	// 		});
// 	// });
// 	// it('should delete one todo', async function() {
// 	// 	request(app)
// 	// 		.delete(`/todos/${this.test.todoId}`)
// 	// 		.set('Authorization', `Bearer ${this.test.token}`)
// 	// 		.set('Content-Type', 'application/json')
// 	// 		.end((err, res) => {
// 	// 			expect(res).to.have.status(200);
// 	// 		});
// 	// });
// });
