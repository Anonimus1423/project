import { useEffect, useState } from "react";
import { ReactComponent as TopButton1 } from "../../images/icons/Top Button.svg";
import "./style/index.scss";
function TopButton() {
  const [scrollY, setScrollY] = useState(window.screenTop);
  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      setScrollY(window.scrollY > 1000);
    });
  }, []);
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return scrollY ? (
    <button onClick={() => scrollTop()} className="top-button">
      <TopButton1 />
    </button>
  ) : null;
}

export default TopButton;
