const mongoose = require("mongoose");
const { number } = require("zod");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://admin:Boomboom%40123@cluster0.5yshnow.mongodb.net/Course-Selling-app-2"
);

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
  purchasedCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});
//Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  imageLink: String,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
