import React from 'react'
import Img from "../../FreePik/404(2).jpg";
import Header from "../Header/Header";
import "./ErrPage.css"
const ErrPage = () => {
    return(
        <>
        <Header/>
            <div className="ErrPage">
                <img className="ErrPik" src={Img} alt="Error"/>
            </div>
        </>
        
    )
}

export default ErrPage;