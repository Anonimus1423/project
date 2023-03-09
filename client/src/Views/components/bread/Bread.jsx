import { Link } from "react-router-dom";
import ArrowIcon from "../../images/icons/Small Arrow.svg";
import "./style/index.scss";

function Bread({ elements }) {
  return (
    <div className="bread">
      {elements.map((element, i) => (
        <div className="bread__element">
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
