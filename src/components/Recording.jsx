import React from 'react'
import { VStack, HStack, Text, Switch, StackDivider, Spacer, Select, Button, ButtonGroup } from "@chakra-ui/react"
import { MdRadioButtonChecked } from "react-icons/md"
import { getScreenCapture, startTheCoolStuff } from "../../public/background.js"
function Record() {
    return (
        <VStack p='2'>
            <Button onClick={getScreenCapture} bg="white" p='40px 70px 40px 70px' size='lg'><MdRadioButtonChecked color='red' fontSize='38px' />Start Recording</Button>
            <Button onClick={startTheCoolStuff} bg="white" p='40px 70px 40px 70px' size='lg'><MdRadioButtonChecked color='red' fontSize='38px' />Make Text Selectable</Button>
        </VStack>
    )
}

export default Record