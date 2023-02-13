import { useEffect, useState } from "react";
import { ReactComponent as TopButton1} from "../../images/icons/Top Button.svg"

function TopButton() 
{
    let scrollY = useState(window.screenTop)
    let show = useState(false);
    console.log(scrollY, show);
    if(scrollY > 3000)
    {
        scrollY.setState(true)
    }
    else
    {
        scrollY.setState(false)
    }
    
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