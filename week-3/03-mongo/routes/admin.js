const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db");
const { Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  //check if the user already exists
  const check = await Admin.findOne({
    username: username,
    password: password,
  });
  if (check) {
    res.json({
      msg: "Admin already exists",
    });
  } else {
    await Admin.create({
      username: username,
      password: password,
    });
    res.json({
      message: "Admin created successfully",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  // give the username and password in the headers

  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  //For more authentication and proper filtering use ZOD
  // We are not using here....

  const newCourse = await Course.create({
    title,
    description,
    price,
    imageLink,
  });
  res.json({
    msg: "Course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const response = await Course.find({});

  res.json({
    Courses: response,
  });
});

module.exports = router;
