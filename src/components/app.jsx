import React, { useState } from 'react';
import {Settings} from "./Settings.jsx"
import {Record} from "./Recording.jsx"
import {Capture_Screen} from "./Capture_Screen.jsx"
import {LoginPage }from "./login_page.jsx";
import {SignUpPage} from "./signup_page.jsx"
import {  Link, Heading , VStack, Box, Button, ButtonGroup, IconButton, Text, useColorMode} from "@chakra-ui/react"
import {Home_not_logged_in, Home, Login, Signup} from "./pages.jsx";
import {_send_Home, _send_Login, _send_Signup, _send_Home_not_logged_in} from './urls.jsx'
import { MdStraighten } from 'react-icons/md';
function App(){
    
    var value = undefined
    var first = false;
    var signed_in = false;
    if ("signed_in" in localStorage) {
        if (localStorage['signed_in']) {
            signed_in = true;
        }
    }
    if ('cur_page' in localStorage) {
        value = localStorage['cur_page']
    } 
    else{
        if (!signed_in){
        value = 'home_not_logged_in'
        localStorage['cur_page'] = value;
        }
        else{
            value = "home"
            localStorage['cur_page'] = value;
        }
    }
    window['change_cur_page'] = (new_val) => {
        localStorage['cur_page'] = new_val
        value = new_val
        window.location.reload(false);
        
    }
  
    

    switch(value) {
        case "home_not_logged_in": return(
            <Home_not_logged_in></Home_not_logged_in>
            ); 
            break
        
        case "home":
            return (
                <Home></Home>
            );
            break
         
        case "login":
            return (
                <Login></Login>
            );
            break
        case "signup": 
            return (
                <Signup></Signup>
            )
            break

    }

}

export default App;