import "./style/index.scss";
import { ReactComponent as Close } from "../../images/icons/Close.svg";

function PopUp({ title, position, children }) {
  return (
    <div className="pop-up" style={position}>
      <Close />
      <h6>{title}</h6>
      <p className="s">{children}</p>
    </div>
  );
}

export default PopUp;
