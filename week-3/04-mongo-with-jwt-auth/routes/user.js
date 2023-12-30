const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
const { JWT_secert } = require("../config");
const jwt = require("jsonwebtoken");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  //check if the user already exists
  const check = await User.findOne({
    username: username,
    password: password,
  });
  if (check) {
    res.json({
      msg: "User already exists",
    });
  } else {
    await User.create({
      username: username,
      password: password,
    });
    res.json({
      message: "User created successfully",
    });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const check = await User.findOne({
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

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.json({
    Courses: courses,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseid = req.params.courseId;
  const username = req.username;
  const course = await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourse: courseid,
      },
    }
  );
  res.json({
    message: "Course Purchased Successfully",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  const user = await User.findOne({
    username: username,
  });
  const course = await Course.findOne({
    _id: {
      $in: user.purchasedCourse,
    },
  });
  res.json({
    courses: course,
  });
});

module.exports = router;
