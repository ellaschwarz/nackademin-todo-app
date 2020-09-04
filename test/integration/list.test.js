const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const { expect, request } = chai;
const app = require('../../app');

const listModel = require('../../model/list-model');
const userModel = require('../../model/user-model');

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

        let title = "This is a test list";
        let userId = this.currentTest.userId;
        const list = await listModel.insertList(title, userId);
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
				expect(res.body).to.have.keys(['title', 'userId', 'created', '_id']);
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
                expect(res.body).to.deep.an('array');
                expect(res.body[0]).to.have.all.keys('_id', 'created', 'title', 'userId');
            });
    });
    it('should read one list', async function () {

        let listId = this.test.listId;

        request(app)
            .get(`/lists/${listId}`)
            .set('Authorization', `Bearer ${this.test.token}`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                console.log(res.body);
                expect(res.body).to.deep.a('object');
                expect(res.body).to.have.all.keys('_id', 'created', 'title', 'userId');
            })
    })
});
