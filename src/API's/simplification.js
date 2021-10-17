// Uses Rewordify API to simplify words
// Works with Next.js!
// Make sure to send a POST request + JSON body

import axios from "axios"
import FormData from "form-data"
import fetch from "node-fetch"

const endpoint = "https://rewordify.com/rwprocess.php";

function simplifyAlgo(sentence, body) {
    let mapping = {};
    let string_output = JSON.stringify(body)
    let first = true;
    for (let i = 0; i < string_output.length; i++) {
        if (string_output.charAt(i) === '=') {
            if (first) {
                first = false;
                continue;
            }
            // Find the Word Behind by searching for \"
            let word_behind = "";
            let j = 0;
            while (string_output.charAt(i - j) !== '\"') {
                j++;
            }
            // Found the Word Behind 
            word_behind = string_output.slice(i - j + 1, i);
            // Find the word ahead
            let start = i + 1;
            j = 0;
            while (string_output.charAt(start + j) !== '\"') {
                j++;
            }
            let word_ahead = string_output.slice(start, start + j)
            // Clean Words by Removing all \
            let clean_word_ahead = '';
            let clean_word_behind = '';
            for (let k = 0; k < word_ahead.length; k++) {
                if (word_ahead.charAt(k) === '\\') {
                    continue;
                }
                clean_word_ahead += word_ahead.charAt(k)
            }

            

            for (let k = 0; k < word_behind.length; k++) {
                if (word_behind.charAt(k) === '\\') {
                    continue;
                }
                clean_word_behind += word_behind.charAt(k)
            }

            mapping[clean_word_behind] = clean_word_ahead
        }
    }

    Object.keys(mapping).forEach(key => {
        sentence = sentence.split(key).join(mapping[key])
    })

    return sentence
}

export default async function handler(req, res) {
    console.log(req.body);
    console.log(req.body.sentence);

    const sentence = req.body.sentence;

    try {
        const bodyFormData = new FormData();
        bodyFormData.append('s', sentence);

        const apiReq = await fetch("https://rewordify.com/rwprocess.php", {
            method: 'post',
            body: bodyFormData,
            headers: bodyFormData.getHeaders()
        });

        if (apiReq.status === 200) {
            const apiData = await apiReq.text();
            const simplifiedSentence = simplifyAlgo(sentence, apiData);

            res.status(200).json({
                simplifiedSentence
            })
        } else {
            throw apiReq.statusText;
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("500 Server Error")
    }
}