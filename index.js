const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const session = require("express-session");
const mongodb = require("mongodb");
const mongoose = require("mongoose");

const app = express();

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");
const Product = require("./model/Product");
const User = require("./model/User");
const { mongoConnect } = require("./util/database");
const { getDb } = require("./util/database");

app.use(
  session({
    secret: "this is a secret",
    resave: false,
    saveUninitialized: false,
  })
);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
  next();
});

app.use("/feed", feedRoutes);

app.get("/hello/a", (req, res, next) => {
  console.log("hello a");
  next();
});

app.use("/hello", (req, res, next) => {
  console.log("hello");
  next();
});

app.use(authRoutes);

/*fs.unlink(path.join("images", "sample.png"), (err) => {
  console.log(err);
});*/

//error handler
app.use((error, req, res, next) => {
  console.log("error arrived here with status code => ", error.httpStatusCode);
  res.status(500).json({
    status: error.httpStatusCode || 500,
    message: error.message,
  });
});

/*mongoConnect(() => {
  app.listen(3000);
  (async () => {
    const db = await getDb();
    //db.collection("users").insertOne(new User("name", "email@gmail.com"));
    db.collection("products").insertOne(
      new Product("title", 12.99, "description", "imageUrl")
    );
    const entry = await db.collection("products").find().next();
    const user = await db.collection("users").find().next();
    const id = entry._id.toString();
    console.log(id);
    const result = await db
      .collection("products")
      .find({
        _id: new mongodb.ObjectId(id),
      })
      .next();
    console.log(result.title);

    const product = await Product.findById(id);
    if (product) {
      const updatedProduct = new Product(
        "abcdef",
        product.price,
        product.description,
        product.imageUrl,
        product._id,
        user._id
      );
      updatedProduct.save(updatedProduct);
    }
    Product.deleteById(id);
  })();
});*/

(async () => {
  await mongoose.connect(
    "mongodb+srv://jjmongo:roQ0hp7FUj1EUM1L@cluster0.7d13b.mongodb.net/shop?retryWrites=true&w=majority"
  );
  const product = new Product({
    title: "the title",
    price: 15.99,
    description: "this is the description of the product",
    imageUrl: "this is imageUrl",
  });
  try {
    //await product.save();
    // const firstProduct = await Product.find().cursor().next();
    const fetchedProduct = await Product.findById("6448afc4348d4b15cbf34036");
    console.log("fetched => " + fetchedProduct);
    fetchedProduct.title = "updated title";
    console.log("updated => " + fetchedProduct);
    await fetchedProduct.save();
    // console.log(products);
    app.listen(3000);
  } catch (err) {
    throw err;
  }
})();
