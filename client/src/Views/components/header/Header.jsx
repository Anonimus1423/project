import MainButton from "../buttons/MainButton";
import { Link } from "react-router-dom";
import OwlImageUrl from "../../images/owl.png";
import "./style/index.scss";
import { useSelector } from "react-redux";
import ProfileIcon from "../../images/icons/Profile.svg";
import * as appSelectors from "../../../redux/app/selectors";
import PopUp from "../popup/PopUp";

function Header({ buttons }) {
  const app = useSelector(appSelectors.appSelector);
  let authorized = false;
  const role = useSelector(appSelectors.roleSelector);
  if (role === 1) authorized = true;
  if (authorized)
    return (
      <header className="right-container">
        <div className="left">
          <Link to="/">
            <img src={OwlImageUrl} alt="Owl Go Language School Logo" />
          </Link>
          <h2 className="h4 subtitle">Սովորիր արագ և արդյունավետ</h2>
        </div>
        <div className="right authorized-right">
          <Link to="/test">
            <MainButton size="m" color="transparent">
              Անգլերենի մակարդակի ստուգում
            </MainButton>
          </Link>
          <div className="profile">
            <h6>A2</h6>
            <PopUp
              title="Right ansrer is 3"
              position={{
                top: "100%",
                left: "100%",
                transform:
                  "translateX(-100%) translateX(-100px) translateY(15px)",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              euismod bibendum laoreet. Proin gravida dolor sit amet lacus
              accumsan et viverra justo commodo. Proin sodales pulvinar sic
              tempor. Sociis natoque penatibus et magnis dis parturient?
            </PopUp>
            <div className="profile-icon">
              <img src={ProfileIcon} alt="profile" />
            </div>
          </div>
        </div>
      </header>
    );

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
