import SidebarLink from "./Link";

function Sidebar() {
    return ( 
        <nav>
            <ul>
                <SidebarLink 
                    text="Գլխավոր էջ"
                    icon=""
                    link="/" 
                />
                <SidebarLink 
                    text="Անգլերենի մակարդակի ստուգում"
                    icon=""
                    link="/" 
                />
                <SidebarLink 
                    text="Իմ դասընթացները"
                    icon=""
                    link="/" 
                />
                <SidebarLink 
                    text="Բոլոր դասընթացները"
                    icon=""
                    link="/" 
                />
            </ul>        
        </nav>
    );
}

export default Sidebar;