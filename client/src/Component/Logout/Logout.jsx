import React, { useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom';
import {UserContext} from "../../App";
import "./LO.css";

const Logout = () => {
    const {state, dispatch} = useContext(UserContext);

    const history = useHistory();
    useEffect(()=>{

         fetch('/logout',{
                method: 'GET',
                headers:{
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                credentials: 'include'
            }).then((res) => {
                dispatch({type: 'USER', payload: false});

                history.push('/', {replace: true});
                if(res.status !== 200){
                    const err = new Error(res.error);
                    throw err;
                }
            }).catch((e) => {
                console.log(e);
            });
    })
  
    return (
        <>
            <h1 id="LO">Logout you plz wait...</h1>
        </>
    )
}

export default Logout
