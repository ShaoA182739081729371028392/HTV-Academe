
import {  Link, Heading , VStack, Box, Button, ButtonGroup, IconButton, Text, useColorMode} from "@chakra-ui/react"


export function _send_Home_not_logged_in() { 
    window['signed_in'] = false;
    window['change_cur_page']('home_not_logged_in'); 
}
export function _send_Home() {     
    window['change_cur_page']('home')
}
export function _send_Login() {
    window['change_cur_page']("login")
}

export function _send_Signup() {
    window['change_cur_page']('signup')
}