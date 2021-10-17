import React from "react";
import { render } from "react-dom";
import App from "./components/app.jsx"
import { ChakraProvider } from "@chakra-ui/react"
import regeneratorRuntime from "regenerator-runtime";
import {extendTheme} from "@chakra-ui/react"

const customTheme = {
    fonts: {
        body: 'Times New Roman, sans-serif',
        heading: 'Times New Roman, sans-serif',
        mono: 'Times New Roman, sans-serif', }}


const theme = extendTheme({customTheme})
function Popup(){
    return(
        <ChakraProvider theme = {theme}>
            <script src="https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/OpusMediaRecorder.umd.js"></script>

<script src="https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/encoderWorker.umd.js"></script>
            <App/>
        </ChakraProvider>
    );
}

render(<Popup/>, document.getElementById("react-target"));