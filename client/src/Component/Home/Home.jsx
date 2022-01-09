import React, {useEffect, useState, useContext} from 'react';
import {NavLink} from "react-router-dom";
import Particles from "react-particles-js";
import Button from "react-bootstrap/Button";
import Header from "../Header/Header";
import Typed from 'react-typed';
import 'bootstrap/dist/css/bootstrap.css';
import homePik from '../../FreePik/message.png';
import svgClip, {particals_data} from "../Extra";
import {UserContext} from "../../App";

import './Home.css';

const Home =() => {
    const {state, dispatch} = useContext(UserContext);
    const [userName, setUserName] = useState("");
    const  callHome = async () => {
        try{
            const res = await fetch("/getdata",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                } 
            });

            const data = await res.json();
            setUserName(`${data.firstname} ${data.lastname}`);

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
        }
        catch(e){
            console.log(e)
        }
    }
    useEffect(() => {
        callHome();
    },[userName])

   const RenderLink =()=>{
    if(userName){
        return(
            <>
             <NavLink to="/room">
                    <Button variant="outline-primary" className="reg">Chat Here</Button>
                </NavLink>
            </>
        )
    }else{
        return(
            <>
                <NavLink to="/register">
                    <Button variant="outline-primary" className="reg">Register</Button>
                </NavLink>

                <NavLink to="/">                               
                    <Button variant="outline-info " className="btn-log"> Login</Button>                          
                </NavLink>
            </>
        )
    }
}

    return(
      <>
      <Header/>
        <div className="home">
            <div className="content">
                <div className="content-area">
                    <h3 className="welcome">{userName? "Welcome": "Hello World"}</h3>
                    <h1 className="UserName">{userName?userName:null}</h1>
                <hr/>
                    {userName ? <h3 className='Greed'>Enjoy It!</h3> :
                        <Typed className="animate"
                        strings= {[
                            "Hello,",
                            "Please Tell, How it is ?",
                            "MSREN Web Chatting..."
                        ]}
                        typeSpeed= {20}
                        backSpeed= {20}
                        loop= {true}
                        /> 
                        }
                        
                    <div className="btns"> 
                        <RenderLink/>
                    </div>
                </div>

                <div className="imgBox">
                    <img src={homePik} alt="HomePik"/>
                </div>
            </div>

            {svgClip}
              
            <div className="part">
                <Particles className="particles-js"
                    params={ particals_data}/>
            </div>
        </div>
        </>
    )
}
export default Home;