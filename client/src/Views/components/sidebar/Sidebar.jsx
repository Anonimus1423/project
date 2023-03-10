import SidebarLink from "./Link";
import {ReactComponent as HomeIcon} from "../../images/icons/Home.svg"
import {ReactComponent as TestIcon} from "../../images/icons/Test.svg"
import {ReactComponent as ClassIcon} from "../../images/icons/Class.svg"
import {ReactComponent as CheckedIcon} from "../../images/icons/Checked.svg"

function Sidebar() {
    return ( 
        <nav className="sidebar">
            <ul>
                <SidebarLink 
                    text="Գլխավոր էջ"
                    Icon={HomeIcon}
                    link="/" 
                />
                <SidebarLink 
                    text="Անգլերենի մակարդակի ստուգում"
                    Icon={TestIcon}
                    link="/a" 
                />
                <SidebarLink 
                    text="Իմ դասընթացները"
                    Icon={ClassIcon}
                    link="/b" 
                />
                <SidebarLink 
                    text="Բոլոր դասընթացները"
                    Icon={CheckedIcon}
                    link="/c" 
                />
            </ul>        
        </nav>
    );
}

export default Sidebar;