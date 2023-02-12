import ErrorRequest from "../../utils/Error.js";
import Course from "../../modules/Course.js";
import moment from "moment";
import Lesson from "../../modules/Lesson.js";
import errorsGenerator from "../../utils/errorsGenerator.js";
import User from "../../modules/User.js";
import Search from "../../utils/search.js";
import Quizes from "../../modules/Quizes.js";

export const createCourse = async (req, res) => {
  const errors = ErrorRequest(req, res);
  const { title, description, tags = [], picture_src, lessons } = req.body;
  if (errors.length) {
    return res.status(400).json({ errors: errors });
  }
  const findResult = await Course.findOne({ title });
  if (findResult) {
    return res
      .status(400)
      .json({ errors: errorsGenerator(["Course already exist."]) });
  }
  const isHaveEmptyTitleLesson = lessons.some((e) => !e.title);
  if (isHaveEmptyTitleLesson) {
    return res
      .status(400)
      .json({ errors: errorsGenerator(["Lesson title field is required."]) });
  }
  const course = await Course.create({
    title,
    description,
    tags,
    picture_src: picture_src,
    created_at: moment(),
  });
  const courseLessons = [];
  for (const e of lessons) {
    const quizesArray = [];
    const less = await Lesson.create({
      ...e,
      created_at: moment(),
      courseId: course._id,
      slug: e.slug,
    });
    for (const quiz of e.quizes) {
      const quizModule = await Quizes.create({
        ...quiz,
        lessonId: less._id,
      });
      quizesArray.push(quizModule);
    }
    courseLessons.push({
      ...JSON.parse(JSON.stringify(less)),
      test: quizesArray,
    });
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

export const getClass = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findOne({ _id: id });
  const lessons = JSON.parse(
    JSON.stringify(await Lesson.find({ courseId: course._id }))
  );
  const lessonsWithTest = [];
  for (const e of lessons) {
    const allQuizes = await Quizes.find({ lessonId: e._id });
    lessonsWithTest.push({
      ...e,
      quizes: allQuizes,
    });
  }
  const data = {
    ...JSON.parse(JSON.stringify(course)),
    lessons: lessonsWithTest,
  };
  return res.status(200).json(data);
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const errors = ErrorRequest(req, res);
  const quizesArray = [];
  const {
    title,
    description,
    tags = [],
    picture_src,
    lessons,
    toDeleteIds,
  } = req.body;
  if (errors.length) {
    return res.status(400).json({ errors: errors });
  }
  const findResult = await Course.findOne({ _id: id });
  if (!findResult) {
    return res
      .status(400)
      .json({ errors: errorsGenerator(["Course dose not exist."]) });
  }
  const isHaveEmptyTitleLesson = lessons.some((e) => !e.title);
  if (isHaveEmptyTitleLesson) {
    return res
      .status(400)
      .json({ errors: errorsGenerator(["Lesson title field is required."]) });
  }
  await Course.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
      tags,
      picture_src: picture_src,
    }
  );
  for (const e of toDeleteIds) {
    await Lesson.deleteOne({ _id: e });
  }
  for (const e of lessons) {
    if (e._id) {
      await Lesson.deleteOne({ _id: e._id });
      await Quizes.deleteMany({ lessonId: e._id });
      await Lesson.insertMany([
        {
          _id: e._id,
          ...e,
          created_at: e.created_at ? e.created_at : moment(),
          courseId: id,
          slug: e.slug,
        },
      ]);
      for (const quiz of e.quizes) {
        const quizModule = await Quizes.create({
          ...quiz,
          lessonId: less._id,
        });
        quizesArray.push(quizModule);
      }
    } else {
      const less = await Lesson.create({
        ...e,
        created_at: moment(),
        courseId: id,
        slug: e.slug,
      });
      for (const quiz of e.quizes) {
        const quizModule = await Quizes.create({
          ...quiz,
          lessonId: less._id,
        });
        quizesArray.push(quizModule);
      }
    }
    // if (e._id) {
    //   await Lesson.findOneAndUpdate(
    //     { _id: e._id },
    //     {
    //       ...e,
    //     }
    //   );
    // } else {
    //   await Lesson.create({
    //     ...e,
    //     created_at: moment(),
    //     courseId: id,
    //     slug: e.slug,
    //   });
    // }
  }
  return res.status(200).send({
    updated: true,
  });
};
