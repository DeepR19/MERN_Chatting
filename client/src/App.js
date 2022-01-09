import React, { createContext, useReducer } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import ErrPage from "./Component/ErrPage/ErrPage";
import Register from "./Component/Register/Register";
import Room from "./Component/RoomUI/Room";
import Contact from "./Component/Contact/Contact";
import About from "./Component/About/About";
import Logout from "./Component/Logout/Logout";
import Video from "./Component/VideoCall/Home";
import {reducer, initialState} from "../src/reducer/useReducer";

// contextAPI
    export const UserContext = createContext();

    console.log(document.cookie)

const App =() => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <UserContext.Provider value={{state, dispatch}}>

            <Router>
                <Switch>
                    <Route exact path="/home"  component={Home}/>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/room" component={Room}/>
                    <Route exact path="/contact" component={Contact}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/logout" component={Logout}/>
                    <Route exact path="/videocall" component={Video}/>

                    <Route component={ErrPage}/>
                </Switch>
            </Router>

        </UserContext.Provider>
    )
}
export default App;