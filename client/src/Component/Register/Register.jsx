import React,{ useState} from 'react';
import {NavLink , useHistory} from "react-router-dom";
import Header from "../Header/Header";
import Swal from "sweetalert2";

import "./Register.css"
// let socket;

const Register = () => {
    const history = useHistory();

    let [user, setUser] = useState({
        firstname:"",
        lastname:"",
        email: "",
        phone:"",
        password:"",
        confirmpassword:""
    });


    let name, value;
    const handleInput = (e) =>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value });
    }


    const handleRegister = async (e) => {
        e.preventDefault();

        const {firstname, lastname, email, phone, password, confirmpassword} = user;

        const res = await fetch("/register",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstname, lastname, email, phone, password, confirmpassword })
        });

        const Userdata = await res.json();
        // console.log(Userdata);
       
        if(res.status === 422 || !Userdata)
        {
            Swal.fire({
                icon: "warning",
                // title: "Please Fill Form Correctly",
                showConfirmButton: true,
                confirmButtonText: "Please Fill Form Correctly"
            })
        }
        else{
            Swal.fire({
                icon: "success",
                title: "Registration Successful",
                timer: 25000
            })

            history.push("/");
        }

        setUser({...user, firstname:"", lastname:"", email:"", phone:"", password:"", confirmpassword:""});
    }


     return (
         <>
         <Header/>
            <div className="RegisterPage">

                <div className="regForm">
                    <h2>Registration Form</h2>

                    <form method="POST" className="signupForm">        

                        <div className="row100"> 

                            <div className="col">
                                <div className="inputBox">
                                    <input type="text" name="firstname" autoComplete="off" onChange={handleInput} required value={user.firstname}/>
                                    <span className="text">First Name</span>
                                    <span className="line"></span>
                                </div>
                            </div>

                            <div className="col">
                                <div className="inputBox">
                                    <input type="text" name="lastname" autoComplete="off" onChange={handleInput} required value={user.lastname}/>
                                    <span className="text">Last Name</span>
                                    <span className="line"></span>
                                </div>
                            </div>

                        </div>
                        <div className="row100">
                            <div className="col">
                                <div className="inputBox">
                                    <input type="email" name="email" autoComplete="off" onChange={handleInput} required value={user.email}/>
                                    <span className="text">Email</span>
                                    <span className="line"></span>
                                </div>
                            </div>

                            <div className="col">
                                <div className="inputBox">
                                    <input type="text" name="phone" autoComplete="off" onChange={handleInput} required value={user.phone}/>
                                    <span className="text">Mobile</span>
                                    <span className="line"></span>
                                </div>
                            </div>

                        </div>
                        <div className="row100">
                            <div className="col">
                                <div className="inputBox">
                                    <input type="password" name="password" autoComplete="off" onChange={handleInput} required value={user.password}/>
                                    <span className="text">Password</span>
                                    <span className="line"></span>
                                </div>
                            </div>

                            <div className="col">
                                <div className="inputBox">
                                    <input type="password" name="confirmpassword" autoComplete="off" onChange={handleInput} required value={user.confirmpassword}/>
                                    <span className="text">Confirm Password</span>
                                    <span className="line"></span>
                                </div>
                            </div>
                        </div>

                        <p className="signUp">Already have an account?
                            <NavLink to="/" className="signLink">Sign In</NavLink>
                        </p>

                        <div className="row100">
                            <div className="col">

                            
                                <input type="submit" onClick={handleRegister}  value="Ok" id="submit"/>
                            

                                
                            </div>

                        </div>


                    </form>

                </div>

            </div>
         </>
     )
 }



 export default Register;