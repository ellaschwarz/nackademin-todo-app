const chai = require("chai");
chai.should();

const userModel = require("../../model/user-model");
const listModel = require("../../model/list-model");

describe("Testing the list model", () => {
  beforeEach(async function() {
    await listModel.clearAllLists();
    await userModel.clearAllUsers();

    const user = await userModel.insertUser("tester", "tester");
    this.currentTest.user = user;
    this.currentTest.userId = user._id;

    let title = "This is a test list";
    let userId = this.test.userId;
    const list = await listModel.insertList(title, userId);
    this.currentTest.list = list;
    this.currentTest.listId = list._id;

  });

  it("should count the number of lists", async function() {
    //Arrange
    let title = "This is another test list";
    let userId = this.test.userId;

    for (let i = 0; i < 9; i++) {
      await listModel.insertList(title, userId);
    }

    //Act
    const numberOfLists = await listModel.countLists();

    //Assert
    numberOfLists.should.equal(10);
  });

  it("should insert a new list to database", async function() {
    //Arrange
    let title = "This is also a test list";
    let userId = this.test.userId;

    //Act
     const newList = await listModel.insertList(title, userId);

    //Assert
    newList.should.deep.equal({
        title: newList.title,
        userId: newList.userId,
        created: newList.created,
        _id: newList._id
    });
  });

  it('should find all lists in database', async function () {
      //Arrange

      //Act
      let allLists = await listModel.findLists({});

      //Assert
      allLists.should.be.an('array');
      
  });

  it('should find one list in database', async function () {
        //Arrange
        let listId = this.test.listId;

       //Act
       const findList = await listModel.findOneList(listId);

       findList.should.be.an('object');
       findList.should.have.property('title');
       findList.should.have.property('userId');
  });

  it('should update a list title', async function () {
      //Arrange
      let listId = this.test.listId;
      let title = "Updated list title";

      //Act
      const updateList = await listModel.updateList(listId, title);
      const updatedList = await listModel.findOneList(listId);

      //Assert
      updateList.should.be.equal(1);
      updatedList.should.have.property('title');
      updatedList.should.have.property('updated');

  });

  it('should remove one list item from database', async function () {
      //Arrange
      let listId = this.test.listId;

      //Act
      const deleteList = await listModel.removeList(listId);
      const numberOfLists = await listModel.countLists();

      //Assert
      deleteList.should.be.equal(1);
      numberOfLists.should.be.equal(0);

  })
});
