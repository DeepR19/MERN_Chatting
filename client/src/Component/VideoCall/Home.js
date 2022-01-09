import React, { useEffect } from "react";
import {NavLink}from "react-router-dom";

import "antd/dist/antd.css";
import "font-awesome/css/font-awesome.min.css";
import Video from "./components/Video/Video";
import VideoState from "./context/VideoState";
import Options from "./components/options/Options";
import "./Video.css";

const Home = () => {
  useEffect(() => {
    if (!navigator.onLine) alert("Connect to internet!");
  }, [navigator]);
 
 useEffect(()=>{
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
 }, [])

 const styled = {
  color: "#fff",
  textDecoration: "none"
}
  return (<>
           <button className="btn btn-secondary exit">
                <NavLink to="/home" style={styled}>EXIT</NavLink>
            </button>
    <VideoState>
      <div className="App" style={{ height: "100%", width: "100%" }}>
        <Video />
        <Options />
      </div>
    </VideoState>
  </>
  );
};

export default Home;
