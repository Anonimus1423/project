import MainButton from "../buttons/MainButton";
import { Link } from "react-router-dom";
import OwlImageUrl from "../../images/owl.png";
import "./style/index.scss";

function Header({ authorized, buttons }) {
  if (authorized) return <header></header>;

  if (!authorized)
    return (
      <header className="right-container">
        <div className="left">
          <Link to="/">
            <img src={OwlImageUrl} alt="Owl Go Language School Logo" />
          </Link>
          <h2 className="h4 subtitle">Սովորիր արագ և արդյունավետ</h2>
        </div>
        <div className="right">
          <Link to={buttons.firstLink}>
            <MainButton size="m" color="transparent">
              {buttons.firstText}
            </MainButton>
          </Link>
          <Link to={buttons.secondLink}>
            <MainButton size="s" color="purple">
              {buttons.secondText}
            </MainButton>
          </Link>
        </div>
      </header>
    );
}

export default Header;
