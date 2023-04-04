function InfoBlock({ number, Icon, text }) {
  return (
    <div className="info-block">
      <div className="info-block__container">
        <Icon />
        <i className="h2">{number}</i>
        <p className="subtitle h2">{text}</p>
      </div>
    </div>
  );
}

export default InfoBlock;
