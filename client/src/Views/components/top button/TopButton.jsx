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
  console.log(scrollY);
  return scrollY ? (
    <a href="/#" className="top-button">
      <TopButton1 />
    </a>
  ) : null;
}

export default TopButton;
