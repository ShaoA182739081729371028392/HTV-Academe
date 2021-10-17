import React, { useState } from 'react';
import Settings from "./Settings.jsx"
import Record from "./Recording.jsx"
import LoginPage from "./login_page.jsx";
import SignUpPage from "./signup_page.jsx"
import {  Link, Heading , VStack, Box, Button, ButtonGroup, IconButton, Text, useColorMode} from "@chakra-ui/react"
import "./urls.jsx"

import { _send_Home_not_logged_in, _send_Login, _send_Signup } from './urls.jsx';
import Nav from "./Nav.jsx"

export function Home_not_logged_in() { return(
        <>
            <VStack backgroundColor='#E3E8EE'>

                <Box w="100%" boxShadow="md" p="5" rounded="lg" bg="white">
                    <Heading fontWeight='extrabold' 
                        bgGradient="linear(to-r, pink.500, blue.500)" 
                        bgClip="text">
                            AcadeME Companion
                    </Heading>
                </Box>
                <Settings/>
                <Record/>
                <Nav/>
                <Text fontSize="md">Please <Link onClick = {_send_Login}>Login</Link> or <Link onClick = {_send_Signup}>Sign Up!</Link></Text>
            </VStack>
        </>
    ); 
}
export function Home() {     
            return (
            <>
                <VStack backgroundColor='#E3E8EE'>
                    <Box w="100%" boxShadow="md" p="5" rounded="lg" bg="white">
                        <Heading fontWeight='extrabold' 
                            bgGradient="linear(to-r, pink.500, blue.500)" 
                            bgClip="text">
                                AcadeME Companion
                        </Heading>
                    </Box>
                    <Settings/>
                    <Record/>
                    <Nav/>
                    <Text fontSize="md">Want to Log Out? <Link onClick = {_send_Home_not_logged_in}>Go Back!</Link></Text>   
                </VStack>
            </>
    );
}
export function Login() {
            return (
                <LoginPage></LoginPage>
            );
}

export function Signup() {
    return (
        <SignUpPage></SignUpPage>
    )

}