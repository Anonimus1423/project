import ErrorRequest from "../../utils/Error.js";
import Course from "../../modules/Course.js";
import moment from "moment";
import Lesson from "../../modules/Lesson.js";
import errorsGenerator from "../../utils/errorsGenerator.js";
import User from "../../modules/User.js";
import Search from "../../utils/search.js";

export const createCourse = async (req, res) => {
  const errors = ErrorRequest(req, res);
  const { title, description, tags = [], image, lessons } = req.body;
  if (errors.length) {
    return res.status(400).json({ errors: errors });
  }
  const findResult = await Course.findOne({ title });
  if (findResult) {
    return res
      .status(400)
      .json({ errors: errorsGenerator(["Course already exist."]) });
  }
  const course = await Course.create({
    title,
    description,
    tags,
    picture_src: image,
    created_at: moment(),
  });
  const courseLessons = [];
  for (const e of lessons) {
    const less = await Lesson.create({
      ...e,
      created_at: moment(),
      courseId: course._id,
    });
    courseLessons.push(less);
  }
  return res.status(200).send({
    created: true,
    course: {
      ...JSON.parse(JSON.stringify(course)),
      lessons: courseLessons,
    },
  });
};

export const getUsersList = async (req, res) => {
  const data = await User.find().select("-password -__v");
  return res.status(200).json(Search(data, "name", req.query.search));
};

export const getCoursesList = async (req, res) => {
  const data = await Course.find();
  return res.status(200).json(data);
};