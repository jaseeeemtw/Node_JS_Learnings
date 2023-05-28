const express = require("express");
const { check, body } = require("express-validator");

const feedController = require("../controller/feed");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/posts", isAuth, feedController.getAllPosts);
router.post(
  "/post",
  [
    check("data")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        if (value === "test@test.com") {
          throw new Error("this email is forbidden");
        }
        console.log(value);
        return true;
      }),
    body("password", "this is the new default message")
      .isLength({ min: 5, max: 10 })
      .isAlphanumeric(),
    body("confirm-password").custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("passwords do not match");
      }
      return true;
    }),
  ],
  feedController.createPost
);

router.get("/download/image", feedController.getImage);

router.get("/products/categories", feedController.getCategories);
router.get("/products", feedController.getProducts);

module.exports = router;
