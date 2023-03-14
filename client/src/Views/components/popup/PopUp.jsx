import "./style/index.scss";
import { ReactComponent as Close } from "../../images/icons/Close.svg";

function PopUp({ title, className, children, popupOpened, togglePopup }) {
  return (
    <div
      className={
        popupOpened ? "pop-up active " + className : "pop-up " + className
      }
    >
      <Close onClick={() => togglePopup()} />
      <h6>{title}</h6>
      <p className="s">{children}</p>
    </div>
  );
}

export default PopUp;
