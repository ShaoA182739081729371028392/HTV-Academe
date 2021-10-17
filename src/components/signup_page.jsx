import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

import "./urls.jsx"
import  {test, signup, login, SearchExistingUsers, update_entry, insert_entry} from "./my_firebase.js"

import { _send_Home, _send_Home_not_logged_in, _send_Login, _send_Signup } from './urls.jsx';


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
function clear_username() {
  let username = document.getElementById("username-signup")
  let password = document.getElementById("password-signup")
  username.value = "";
  password.value = "";
}
function submit_form_signup(e) {
  e.preventDefault();
  let username = document.getElementById("username-signup").value
  let password = document.getElementById("password-signup").value
  console.log(username)
  console.log(password)
  SearchExistingUsers(username, (docs) => {
    console.log(docs)
    let Alert = document.getElementById("alert-id-signup")
    let AlertText = document.getElementById("alert-text-signup")
    
    if (Object.keys(docs).length > 0) {
      Alert.hidden = false 
      AlertText.innerHTML = "Already Taken"
    }
    else{
      // Log the Userin and Store Local Storage
      // Send back to home logged in
      signup(username, password)
      
    }
    
    clear_username();
  
  })
}

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form id="signUpform">
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="text" placeholder="Username" id = "username-signup"/>
                </InputGroup>
              </FormControl>
              <FormControl >
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id = "password-signup" 
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>

              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={submit_form_signup}
              >
                Signup!
              </Button>
            </Stack>
          </form>
        </Box>
        <Alert id = "alert-id-signup"status="error" hidden = {true}>
  <AlertIcon />
  <AlertTitle id = "alert-text-signup" mr={2}>Your browser is outdated!</AlertTitle>
</Alert>
      </Stack>
      <Box>
        Want to Login? {" "}
        <Link onClick={_send_Login}>
          Log In
        </Link>
      </Box>
      <Box>
        Want to Return to Home? 
        <Link onClick = {_send_Home_not_logged_in}>
          Go Back!
        </Link>
      </Box>
    </Flex>
  );
};

export default SignupPage;
