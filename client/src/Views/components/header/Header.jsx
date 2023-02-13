import MainButton from "../buttons/MainButton";
import { Link } from "react-router-dom";
import OwlImageUrl from "../../images/owl.png"
import "./style/index.scss"

function Header({authorized}) 
{
    if(authorized)
        return ( 
            <header>
            </header>
        );

    
    if(!authorized)
        return ( 
            <header className="right-container">
                <div className="left">
                    <Link to="/">
                        <img src={OwlImageUrl} alt="Owl Go Language School Logo" />
                    </Link>
                    <h2 className="h4 subtitle">Սովորիր արագ և արդյունավետ</h2>
                </div>
                <div className="right">
                    <Link to="/test">
                        <MainButton size="m" color="transparent">Անգլերենի մակարդակի ստուգում</MainButton>
                    </Link>
                    <Link to="/registration">
                        <MainButton size="s" color="purple">Գրանցվել անվճար</MainButton>
                    </Link>
                </div>
            </header>
        );
}

export default Header;