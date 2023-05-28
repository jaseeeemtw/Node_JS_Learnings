const getDb = require("../util/database").getDb;

const mongodb = require("mongodb");

class User {
  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this._id = id;
  }

  save = async () => {
    const db = getDb();
    if (this._id) {
      console.log("hello");
      try {
        console.log(this);
        const result = await db
          .collection("users")
          .updateOne({ _id: this._id }, { $set: this });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const result = await db.collection("users").insertOne(this);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
  };

  static findById = async (id) => {
    const db = getDb();
    const result = await db
      .collection("users")
      .find({
        _id: new mongodb.ObjectId(id),
      })
      .next();
    return result;
  };

  static deleteById = (id) => {
    const db = getDb();
    try {
      return db
        .collection("users")
        .deleteOne({ _id: new mongodb.ObjectId(id) });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = User;
