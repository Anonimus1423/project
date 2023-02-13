import { useEffect, useState } from "react";
import { ReactComponent as TopButton1} from "../../images/icons/Top Button.svg"
import "./style/index.scss"

function TopButton() 
{
    const [scrollY, setScrollY] = useState(window.screenTop)
    let show = true;
    console.log("sadf");
    useEffect(() => 
    {
        if(scrollY > 3000)
        {
            show = true;
        }
    }, [scrollY])
    window.addEventListener("scroll", () => 
    {
        setScrollY(window.screenTop)
    })
    return ( 
        show
        ?
        <a href="/#" className="top-button">
            <TopButton1 />
        </a>
        :
        null
    );
}

export default TopButton;