import { useEffect, useState } from "react";
import { ReactComponent as TopButton1 } from "../../images/icons/Top Button.svg";

function TopButton() {
  const [scrollY, setScrollY] = useState(window.screenTop);
  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      setScrollY(window.scrollY > 1000);
    });
  }, []);
  return scrollY ? <button>asdasd</button> : null;
}

export default TopButton;
