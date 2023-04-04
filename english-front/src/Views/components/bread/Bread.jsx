import { Link } from "react-router-dom";
import ArrowIcon from "../../images/icons/Small Arrow.svg";
import "./style/index.scss";

function Bread({ elements, className }) {
  return (
    <div className={"bread " + className}>
      {elements.map((element, i) => (
        <div className="bread__element" key={i}>
          <Link to={element[1]}>
            <p className="s">{element[0]}</p>
          </Link>
          {i !== elements.length - 1 ? (
            <img src={ArrowIcon} alt="arrow" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Bread;
