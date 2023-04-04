import "./style/index.scss";
import { ReactComponent as ArrowRight } from "../../images/icons/Arrow.svg";

function MainButton({
  children,
  color,
  size,
  onClick,
  arrowLeft,
  arrowRight,
  className,
  disabled,
  type,
}) {
  return (
    <button
      onClick={onClick}
      className={"mainButton " + size + " " + color + " " + className}
      disabled={disabled}
      type={type}
    >
      {arrowLeft ? <ArrowRight className="left" /> : ""}
      <div className="background"></div>
      <p>{children}</p>
      {arrowRight ? <ArrowRight /> : ""}
    </button>
  );
}

export default MainButton;
