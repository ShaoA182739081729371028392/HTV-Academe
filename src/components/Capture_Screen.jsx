import React from 'react'
import { VStack, HStack, Text, Switch, StackDivider, Spacer, Select, Button, ButtonGroup } from "@chakra-ui/react"
import { MdRadioButtonChecked, MdPhotoCameraFront} from "react-icons/md"
import {getScreenCapture} from "../../public/background.js";



function Capture_Screen (){
    return(
        <VStack p='2'>
            <Button onClick = {getScreenCapture} bg="white" p='40px 80px 40px 80px' size='lg'><MdPhotoCameraFront color='red' fontSize='38px'/>Take Capture</Button>
        </VStack>
    )
}      

export default Capture_Screen