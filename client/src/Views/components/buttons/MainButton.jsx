import "./style/index.scss"

function MainButton({children, color, size}) {
    return ( 
        <button className={"mainButton " + size + " " + color}>
            <div className="background"></div>
            <p>{children}</p>
        </button>
    );
}

export default MainButton;