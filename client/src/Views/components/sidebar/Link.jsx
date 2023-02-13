import { Link } from "react-router-dom";
import "./style/index.scss"

function SidebarLink({link, text, icon}) {
    console.log({link, text, icon});
    return ( 
        <li>
            <Link to={link}>
                <img src={icon} alt="Sidebar Icon" />
                <p>{text}</p>
            </Link>
        </li>
    );
}

export default SidebarLink;