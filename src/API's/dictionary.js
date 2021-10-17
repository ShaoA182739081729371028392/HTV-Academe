// Uses Simple Dictionary API to find synonyms for words
// Works with Next.js!
// Make sure to send a POST request + JSON body

import axios from "axios"
import { main } from "./dcp"

export default async function handler(req, res) {
    console.log(req.body);
    console.log(req.body.word);

    const word = req.body.word;
    const website = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const apiReq = await axios.get(website);

        if (apiReq.status === 200) {
            const apiData = apiReq.data;

            console.log(apiData);

            let allMeanings = apiData[0].meanings;
            let allDefinitions = await main(meaning => {
                const definitionObj = meaning.definitions[0];
                const synonym = definitionObj.synonyms ? definitionObj.synonyms[0] : null;
                const antonym = definitionObj.antonyms ? definitionObj.antonyms[0] : null;

                return {
                    definition: definitionObj.definition,
                    synonym,
                    antonym
                }
            },
                allMeanings
            );

            console.log(allDefinitions);

            res.status(200).json({
                allDefinitions
            })
        } else {
            throw apiReq.statusText;
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("500 Server Error")
    }
}




export async function Testing(request) {
    const word = 'big';
    console.log(word);
    const website = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const apiReq = await axios.get(website);

        if (apiReq.status === 200) {
            const apiData = apiReq.data;

            let allMeanings = apiData[0].meanings;

            let allDefinitions = allMeanings.map(meaning => {
                const definitionObj = meaning.definitions[0];
                const synonym = definitionObj.synonyms ? definitionObj.synonyms[0] : null;
                const antonym = definitionObj.antonyms ? definitionObj.antonyms[0] : null;

                return {
                    definition: definitionObj.definition,
                    synonym,
                    antonym
                }
            })

            console.log(allDefinitions);


        } else {
            throw apiReq.statusText;
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("500 Server Error")
    }
}
