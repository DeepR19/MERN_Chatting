import React, {useState,useRef,useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {NavLink } from "react-router-dom";
import Swal from "sweetalert2";

import "./Login.css";

const Login = () => {

    // const {state, dispatch} = useContext(UserContext);
    let _isMounted = useRef(true);
    let history = useHistory();
    let [user, setUser] =useState({
        name:"",
        email:"",
        password:""
    });
    // let [Userdata, setUserdata] =useState(null);
    
    const checkUser = async ()=>{
        try{
            const res = await fetch("/getdata",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                } 
            });
            const data = await res.json();
            // setUserdata(data);
            if(!data){
                console.log(null);
            }else{
               history.push("/home");
            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        
        checkUser();

    })

    let names, values;
    const handleLoginInput = (e) =>{
        names = e.target.name;
        values = e.target.value;

        setUser({...user, [names]:values });
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const { name, email, password } = user;

        const res = await fetch("/login",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });
        const Userdata = await res.json();

        if(_isMounted){
            if(res.status === 400 || !Userdata)
            {
                Swal.fire({
                    icon: "question",
                    title: "Invalid Data",
                    showConfirmButton: true,
                    confirmButtonText: "Fix this"
                })
            }
            else{
                // dispatch({type: 'USER', payload: true});
                console.log(Userdata)
                history.push("/home");
            }
        }

        setUser({...user, name:"", email: "", password: ""});

        return(()=>{
            _isMounted.current = false;
        })
    }
   
    return(
        <>

            <div className="loginPage">
        <div className="loginArea">

            <div className="logImg">
                <img src={"https://images.pexels.com/photos/461064/pexels-photo-461064.jpeg?cs=srgb&dl=pexels-pixabay-461064.jpg&fm=jpg"} alt="loginPik"/>
               <span></span>
            </div>


            <div className="loginForm">

                <h2>Login</h2>

                <form method="POST">
                    <div className="row100"> 
                        <div className="col">
                            <div className="inputBox">
                                <input type="text" name="name" required onChange={handleLoginInput} value={user.name}/>
                                <span className="text">Username</span>
                                <span className="line"></span>
                            </div>
                        </div>
                          <div className="col">
                            <div className="inputBox">
                                <input type="text" name="email" required onChange={handleLoginInput} value={user.email}/>
                                <span className="text">Email</span>
                                <span className="line"></span>
                            </div>
                        </div>   
                    </div>
    
                    <div className="row100"> 
                        <div className="col">
                            <div className="inputBox">
                                <input type="password" name="password" required onChange={handleLoginInput} value={user.password}/>
                                <span className="text">Password</span>
                                <span className="line"></span>
                            </div>
                        </div>  
    
                       
                    </div>
    
                    
                    <div className="row">
                        
                            <input type="submit" onClick={handleLogin}  value="Submit" id="submit"/>
                    </div>
     

                    <div className="row">
                        <div className="col links">
                            <p className="link">Don't have an account ? <NavLink to="/register"> Click Here</NavLink></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
        </>
    )
}
export default Login;