const {listDB} = require('../db/db')

const findLists = async (filter) => {
    const doc = await listDB
      .find(filter)
      .sort({ created: -1 })
    return doc;
};

const findOneList = async id => {
    const doc = await listDB.findOne({ _id: id }, {});
    return doc;
  };
  
  const insertList = async (title, userId) => {
    const doc = await listDB.insert({
      title,
      userId,
      created: new Date().toLocaleString()
    });
    return doc;
  };
  
  const updateList = async (listId, title, user) => {
    const list = await findOneList(listId);
    if (user.id === list.userId || user.role === "admin") {
      const doc = await listDB.update(
        { _id: listId },
        { $set: { title, updated: new Date().toLocaleString() } },
        {}
      );
      return doc;
    } else {
      throw new Error("Not authorized to edit");
    }
  };
  
  const removeList = async (listId, role) => {
    console.log(role);
      const doc = await listDB.remove({ _id: listId });
      console.log("Går in i modellen remove list");
      console.log(doc);
      return doc;
      // res.sendStatus(200).send(doc);
  };

  const clearAllLists = async () => {
    const doc = await listDB.remove({}, { multi: true });
    return doc;
  }

  const countLists = async () => {
    const doc = await listDB.countDocuments(filter);
    return doc;
  }

  module.exports = {
    findOneList,
    insertList,
    updateList,
    removeList,
    findLists,
    clearAllLists,
    countLists
  };