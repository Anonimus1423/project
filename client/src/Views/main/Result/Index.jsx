import MainButton from "../../components/buttons/MainButton";
import "./style/index.scss";
import Header from "../../components/header/Header";
import VkIcon from "../../images/icons/Vk.svg";
import OkIcon from "../../images/icons/Ok.svg";
import InstagramIcon from "../../images/icons/Instagram.svg";
import FacebookIcon from "../../images/icons/Facebook.svg";
import TwitterIcon from "../../images/icons/Twitter.svg";

function Result() {
  return (
    <div className="result right-main-container">
      <Header
        buttons={{
          firstText: "Անգլերենի մակարդակի ստուգում",
          secondText: "Գրանցվել անվճար",
          firstLink: "/test",
          secondLink: "/registration",
        }}
      />
      <h2 className="secondPage">Ստուգեք Ձեր անգլերենի մակարդակը</h2>
      <p>
        Շնորհավորում ենք դուք անցել եք թեստը <br /> կիսվեք Ձեր հաջողությամբ
        սոցիալական կայքերում
      </p>
      <div className="social-icons">
        <div className="social-icon">
          <img src={VkIcon} alt="vk" />
        </div>
        <div className="social-icon">
          <img src={InstagramIcon} alt="instagram" />
        </div>
        <div className="social-icon">
          <img src={TwitterIcon} alt="twitter" />
        </div>
        <div className="social-icon">
          <img src={FacebookIcon} alt="facebook" />
        </div>
        <div className="social-icon">
          <img src={OkIcon} alt="ok" />
        </div>
      </div>
      <div className="table">
        <div className="row">
          <div className="left">
            <p>Բոլոր հարցերը</p>
          </div>
          <div className="right">
            <p>48</p>
          </div>
        </div>
        <div className="row">
          <div className="left">
            <p>Ջիշտ պատասխաններ</p>
          </div>
          <div className="right">
            <p>32</p>
          </div>
        </div>
        <div className="row">
          <div className="left">
            <p>Սխալպատասխաններ</p>
          </div>
          <div className="right">
            <p>16</p>
          </div>
        </div>
        <div className="row">
          <div className="left">
            <p>Սխալպատասխաններ</p>
          </div>
          <div className="right">
            <p>16</p>
          </div>
        </div>
      </div>
      <div className="buttons">
        <MainButton color="transparent-yellow-bordered">Կրկնել</MainButton>
        <MainButton color="yellow">Բարելավե՛ք ձեր անգլերենը:</MainButton>
        <p className="s">
          Անցիր մեր դասընթացը հատուկ C1 <br /> մակարդակի համար
        </p>
      </div>
    </div>
  );
}

export default Result;
