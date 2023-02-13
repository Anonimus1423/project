function Header({authorized}) 
{
    if(authorized)
        return ( 
            <header>
                <div className="left">
                    Autorized Header
                </div>
            </header>
        );

    
    if(!authorized)
        return ( 
            <header>
                <div className="left">
                    UnAutorized Header
                </div>
            </header>
        );
}

export default Header;