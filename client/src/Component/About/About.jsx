import React ,{useEffect, useState}from 'react';
import Header from "../Header/Header"
import "./About.css";

const About = () => {
    const [userData, setUserData] = useState({});

    const callAbout = async () => {
        try{
            const res = await fetch("/about",{
                method: "GET",
                headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json"
                    
                },
                credentials: "include"
            });

            // get data from server
            const data = await res.json();
            setUserData(data);

            if(!res.status=== 200){
                const error = new Error(res.error);
                throw error;
            }
        }catch(e){
            console.log(e);
        }
    }


    useEffect(() => {
        callAbout();
    },[userData]);

    return(
        <>
        <div className="about">
            <Header />
            <form method="GET" id="about">
                <h1 className='about-name'>{`${userData.firstname} ${userData.lastname}`}</h1>
                <h2 className='about-email'>{userData.email}</h2>
                <h4 className='about-number'>{userData.phone}</h4>
            </form>
        </div>
        </>
    )
}
export default About;
