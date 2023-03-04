import { Link } from "react-router-dom";
import "./style/index.scss";
import { useLocation } from "react-router-dom";

function SidebarLink({ link, text, Icon }) {
  const location = useLocation();
  console.log(location.pathname === link, location.pathname, link);
  return (
    <li className={location.pathname === link ? "active" : null}>
      <Link to={link}>
        <Icon />
        <h6>{text}</h6>
      </Link>
    </li>
  );
}

export default SidebarLink;
