import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react";

//idk
const axios = require("axios");
import {get_STT} from "../src/components/STT.jsx"


var recorder = undefined

export async function get_screenshot() {
    const data = await chrome.tabs.captureVisibleTab(getCurrentTab().id);
    console.log(data);
    return data;
}


export function Kill_recorder() {
    recorder.stop()
    recorder = undefined
}
export function send_Data(data) {
    console.log(data);
    get_STT(data);
}
export function getScreenCapture() {
    chrome.tabs.query({ active: true }, function (tabs) {
        console.log(tabs);
        let tab = tabs[0];
        console.log(tab)
        let s = chrome.tabCapture.capture({
            video: false, audio: true,
        }, (stream) => {
            /*
            const audioCtx = new AudioContext();
            const source = audioCtx.createMediaStreamSource(stream);
            let mediaRecorder = new Recorder(source);
            setTimeout()
            mediaRecorder.stop();
            mediaRecorder.exportWAV((blob)=> {
            const audioURL = window.URL.createObjectURL(blob);
                
            })
            */

            recorder = new MediaRecorder(stream);
            const func = event => {
                //console.log("data available after MediaRecorder.stop() called.");


                var blob = new Blob([event.data], {'type': 'audio/webm;codecs=opus'});
                let fileReader = new FileReader()
                fileReader.onload = (e) => {
                    let data = fileReader.result;
                    send_Data(data);
                }
                fileReader.readAsDataURL(blob);



            };
            recorder.onstop = func
            recorder.ondataavailable = func


            /*
            var audio = document.createElement('audio');
                audio.controls = true;
                console.log(event.data)
                var blob = new Blob([event.data], { 'type' : 'audio/webm; codecs=opus' });
                var audioURL = window.URL.createObjectURL(blob);
                audio.src = audioURL;
                alert(audio.src)
                */

            // make data available event fire every one second
            recorder.start(5000);

        })
    })
}
chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.sendMessage(tab.id, { message: 'load' });
});


chrome.contextMenus.create({
    "title": 'Simplify Word "%s"',
    "contexts": ["selection"],
    "id": "simplify-word"
});

chrome.contextMenus.create({
    "title": 'Define Word "%s"',
    "contexts": ["selection"],
    "id": "define-word"
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "simplify-word" && info.selectionText) {
        fetch("http://localhost:3000/api/simplification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sentence: info.selectionText
            })
        }).then(res => res.json().then(data => alert("Simplified: " + data.simplifiedSentence)));
    } else if (info.menuItemId == "define-word" && info.selectionText) {
        fetch("http://localhost:3000/api/define", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                word: info.selectionText
            })
        }).then(res => res.json().then(data => alert("Definition: " + data.definition)));
    }
})


async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

export async function startTheCoolStuff() {
    chrome.scripting.executeScript({
        target: {
            tabId: (await getCurrentTab()).id,
        },
        files: ["inject.js"]
    });
}