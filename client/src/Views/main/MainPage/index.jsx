import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";

function MainPage() {
    return ( 
        <div className="big-container">
            <Sidebar />
            <div className="right-container">
                <Header />
            </div>
        </div>
    );
}

export default MainPage;