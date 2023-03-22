import TimeIcon from "../../images/icons/Time.svg";

function PageTitle({ title, tags, proggress, time, className }) {
  return (
    <div className={"page-title"}>
      <div className="page-title__top">
        <h2>{title}</h2>
        {time ? (
          <div className="time">
            <img src={TimeIcon} alt="time" />
            <p>{time}</p>
          </div>
        ) : (
          <ul className={"tags " + className}>
            {tags?.map((tagText) => {
              return (
                <li
                  key={Math.random()}
                  className={Math.random() > 0.5 ? "tag yellow" : "tag white"}
                >
                  <p className="s">{tagText}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className={"proggress " + className}>
        <div className="proggress__back"></div>
        <div
          style={{ width: proggress + "%" }}
          className="proggress__pointer"
        ></div>
      </div>
    </div>
  );
}

export default PageTitle;
