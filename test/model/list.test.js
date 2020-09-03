const chai = require("chai");

chai.should();

const userModel = require("../../model/user-model");
const listModel = require("../../model/list-model");

describe("Testing the list model", () => {
  beforeEach(async () => {
    await listModel.clearAllLists();

    const user = await userModel.insertUser({
      username: "tester",
      password: "tester"
    });

    this.currentTest.userId = user._id;

  });

  it("should count the number of lists", async function () {
        let newList = {
            
        }
  });
});


