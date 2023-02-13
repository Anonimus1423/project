import { useEffect, useState } from "react";
import { ReactComponent as TopButton1} from "../../images/icons/Top Button.svg"

function TopButton() 
{
    let scrollY = useState(window.screenTop)
    let show = false;
    console.log(scrollY, show);
    useEffect(() => 
    {
        if(scrollY > 3000)
        {
            show = true
        }
    }, [scrollY])
    window.addEventListener("scroll", () => 
    {
        scrollY.setState(() => window.screenTop)
    })
    return ( 
        show
        ?
        <button>
            <TopButton1 />
        </button>
        :
        null
    );
}

export default TopButton;