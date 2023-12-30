const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const { JWT_secert } = require("../config");
const { Admin, Course } = require("../db/index");

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

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const check = await Admin.findOne({
    username: username,
    password: password,
  });
  if (check) {
    jwt_token = jwt.sign(
      {
        username,
      },
      JWT_secert
    );
    res.json({ jwt_token });
  } else {
    res.status(403).json({
      error: "Admin Doesnot Exist",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  const newCourse = await Course.create({
    title,
    description,
    price,
    imageLink,
  });
  res.json({
    message: "Course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const courses = await Course.find({});
  res.json({
    Courses: courses,
  });
});

module.exports = router;
