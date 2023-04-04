import MainButton from "../buttons/MainButton";
import { Link, useNavigate } from "react-router-dom";
import OwlImageUrl from "../../images/owl.png";
import "./style/index.scss";
import { useDispatch, useSelector } from "react-redux";
import ProfileIcon from "../../images/icons/Profile.svg";
import * as appSelectors from "../../../redux/app/selectors";
import PopUp from "../popup/PopUp";
import { useState } from "react";
import { logoutApp } from "../../../redux/app/reducer";

function Header({ buttons, isForm }) {
  const [popupOpened, setPopupOpened] = useState(false);
  const [userPopupOpened, setUserPopupOpened] = useState(false);
  const togglePopup = () => setPopupOpened((state) => !state);
  let authorized = false;
  const app = useSelector(appSelectors.appSelector);
  const role = useSelector(appSelectors.roleSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logoutApp());
    navigate("/");
  };

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
          <Link to="/test" className="authorized">
            <MainButton size="m" color="transparent">
              Անգլերենի մակարդակի ստուգում
            </MainButton>
          </Link>
          <div className="profile">
            <h6 onClick={() => togglePopup()}>{app?.user?.level}</h6>
            <PopUp
              popupOpened={popupOpened}
              togglePopup={togglePopup}
              title="Right ansrer is 3"
              className="header"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              euismod bibendum laoreet. Proin gravida dolor sit amet lacus
              accumsan et viverra justo commodo. Proin sodales pulvinar sic
              tempor. Sociis natoque penatibus et magnis dis parturient?
            </PopUp>
            <div
              className="profile-icon"
              onClick={() => setUserPopupOpened((state) => !state)}
            >
              <img src={ProfileIcon} alt="profile" />
            </div>
            <div
              onClick={() => logout()}
              className={userPopupOpened ? "logout active" : "logout"}
            >
              <p>Log-out</p>
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
        <div
          className={isForm ? "right unautorized formm" : "right unautorized"}
        >
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
