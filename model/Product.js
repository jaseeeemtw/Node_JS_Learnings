const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// const getDb = require("../util/database").getDb;

// const mongodb = require("mongodb");

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id;
//     this.userId = userId;
//   }

//   save = async () => {
//     const db = getDb();
//     if (this._id) {
//       console.log("hello");
//       try {
//         console.log(this);
//         const result = await db
//           .collection("products")
//           .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
//         console.log("result");
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       try {
//         const result = await db.collection("products").insertOne(this);
//         console.log(result);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };
//   static findById = async (id) => {
//     const db = getDb();
//     const result = await db
//       .collection("products")
//       .find({
//         _id: new mongodb.ObjectId(id),
//       })
//       .next();
//     return result;
//   };

//   static deleteById = (id) => {
//     const db = getDb();
//     try {
//       return db
//         .collection("products")
//         .deleteOne({ _id: new mongodb.ObjectId(id) });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

// module.exports = Product;
