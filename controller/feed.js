const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const products = require("../data/products");
const categories = require("../data/categories");


exports.getAllPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: "first-post", description: "this is the first post" }],
  });
};

exports.getProducts = (req, res, next) => {
  console.log("products fetched");
  res.status(200).json(products);
};

exports.getCategories = (req, res, next) => {
  console.log("categories fetched");
  res.status(200).json(categories);
};

exports.createPost = (req, res, next) => {
  try {
    console.log(req.file);
    const { title, description } = req.body;
    if (title === "hello") {
      throw new Error("this title is not allowed");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.errors[0].msg);
      //ideally return a response
    }
    res.status(201).json({
      message: "Post created successfully",
      post: { title, description },
    });
  } catch (err) {
    const error = new Error("title cannot be hello");
    error.httpStatusCode = 500;
    next(error);
  }
};

exports.getImage = (req, res, next) => {
  const imgPath = path.join("images", "sample.png");

  //fs.readFile(imgPath, (err, data) => {

  /*  if (err) {
      console.log("error occured!");
      return next(new Error(err.message));
    }*/

  const file = fs.createReadStream(imgPath);

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Disposition", "attachment; filename=newImage.png");
  //res.send(data);
  file.pipe(res);
  //});
};
