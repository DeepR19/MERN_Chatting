import React ,{useEffect, useState}from 'react';
import {NavLink} from "react-router-dom";
import Header from "../Header/Header";
import "./Contact.css";

const Contact =() => {
    // const history = useHistory();
    const [userData, setUserData] = useState({
        firstname:"",
        email:"",
        message:""
    });

    // const data=null;
    const callContact = async () => {
        try{
            const res = await fetch("/getdata",{
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                }
            });

            // get data from server
           const data = await res.json();

           setUserData({  firstname:data.firstname, email:data.email });
           
            if(!res.status=== 200){
                const error = new Error(res.error);
                throw error;
            }

        }catch(e){
            console.log(e);
            // history.push("/login");
        }
    
    }


    useEffect(() => {
        callContact();
        console.log(window.innerWidth)
    },[]);

    const handleInput = (e) => 
    {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({...userData, [name]:value})
    }


    const handleMessage = async (e) => {
        e.preventDefault();

        const {firstname, email, message} = userData;

        const res = await fetch("/contact",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstname, email, message })
        });
        const resData = await res.json();

        if(!resData){
            console.log("message not Send");
        }
        else{
            console.log("SEND");
            setUserData({...userData, message:""});
        }
    }

    return(
        <>
        <Header/>
    <div className="cpage">
<div className="ContactPage">
            <h1>Contact Us</h1>
       
        <div className="contactArea">
            <div className="contactInfo">
                <h2>GET IN TOUCH</h2>

                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, omnis? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, aut!</p>

                <ul>
                    <li>
                        {/* <img src="..." alt=""> */}
                        <p>Deepak_34</p>
                    </li>
                    <li>
                        {/* <img src="..." alt=""> */}
                        <p>deepak-cse19@satyug.edu.in</p>
                    </li>
                    <li>
                        {/* <img src="..." alt=""> */}
                        <p>91+ 8368606409</p>
                    </li>
                </ul>
            </div>
            <div className="contactLink">
                <h2>WebChat Application</h2>
                <p>This is a chatting WebApp. By this You can chat with a persor or a group of person.</p>


                <ul>
                    <li><NavLink to="/home">Go To Home</NavLink></li>
                </ul>
            </div>
        </div>

        <div className="contactForm">
            <form className="contactDetails" method="POST">
        
                <div className="row">
                    <div className="col">
                        <div className="inputBox">
                            <input type="text"  name="firstname" required="required" onChange={handleInput} value={userData.firstname} />

                            <span className="text">Username</span>
                            <span className="line"></span>
                        </div>
                    </div>

                    <div className="col">
                        <div className="inputBox">
                            <input type="text"  name="email" required="required" onChange={handleInput} value={userData.email} />
                            <span className="text">Email</span>
                            <span className="line"></span>
                        </div>
                    </div>

                </div>
            
        {/* <form method="POST"> */}
                <div className="row">
                    <div className="col">
                        <div className="inputBox textarea">
                            <textarea required="required" cols="30" rows="10" name="message" value={userData.message} onChange={handleInput}></textarea>
                            <span className="text">Type Your Messages here...</span>
                            <span className="line"></span>
                        </div>
                    </div>
                </div>
            {/* </form> */}

                <div className="row">
                    <div className="col">
                        <input type="submit" value="Send" id="messageSubmit" onClick={handleMessage}/>
                    </div>
                </div>
            </form>
        </div>
        
    </div>
</div>











        </>
    )
}

export default Contact;