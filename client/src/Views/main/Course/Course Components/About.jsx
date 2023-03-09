function AboutCourse({ title, description, image }) {
  return (
    <div className="about-course">
      <div className="about-course__left">
        <h3 className="h4">{title}</h3>
        <p className="m">{description}</p>
      </div>
      <img src={image} alt="course image" />
    </div>
  );
}

export default AboutCourse;
