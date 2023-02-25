import "./style/index.scss";

function MainButton({ children, color, size, onClick }) {
  return (
    <button onClick={onClick} className={"mainButton " + size + " " + color}>
      <div className="background"></div>
      <p>{children}</p>
    </button>
  );
}

export default MainButton;
