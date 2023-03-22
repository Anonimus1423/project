function AboutCourse({ title, description, image, className }) {
  return (
    <div className={"about-course " + className}>
      <div className="about-course__left">
        <h3 className="h4">{title}</h3>
        <p className="m">{description}</p>
      </div>
      <img src={image} alt="course image" />
    </div>
  );
}

export default AboutCourse;
