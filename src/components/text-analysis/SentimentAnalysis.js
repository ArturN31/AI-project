import React, { useState, useEffect } from "react"

import SentimentOutput from './SentimentOutput';
import Anger from '../emotion-components/Anger';
import Fear from '../emotion-components/Fear';
import Joy from '../emotion-components/Joy';
import Neutral from '../emotion-components/Neutral';
import Sadness from "../emotion-components/Sadness";

const GetUserInput = ({ analysed_text }) => {
    const [sentimentAnalysis, setSentimentAnalysis] = useState([]);

    useEffect(() => {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.REACT_APP_TEXTPROBE_API_KEY,
                'X-RapidAPI-Host': 'textprobe.p.rapidapi.com'
            },
            body: '{"lang":"en", "text":"' + analysed_text + '"}'
        };

        if(analysed_text !== "") { 
            fetch('https://textprobe.p.rapidapi.com/feelings', options)
             .then((response) => {
                if (!response.ok) {throw response} 
                return response.json();
            })
            .then((incomingData) => {
                setSentimentAnalysis(incomingData);
            }) 
            .catch((err) => console.error(err)) 
        }
    }, [analysed_text])

    return (
        <div className="col-xs-12 col-md-10 col-xl-6 mx-auto">
            {
                sentimentAnalysis.emotion_prediction === "Anger"
                ?   <>
                        <Anger/>
                        <SentimentOutput sentimentAnalysis={sentimentAnalysis} analysed_text={analysed_text}/>
                    </>
                :   sentimentAnalysis.emotion_prediction === "Fear"
                    ?   <>
                            <Fear/>
                            <SentimentOutput sentimentAnalysis={sentimentAnalysis} analysed_text={analysed_text}/>
                        </>
                    :   sentimentAnalysis.emotion_prediction === "Joy"
                        ?   <>
                                <Joy/>
                                <SentimentOutput sentimentAnalysis={sentimentAnalysis} analysed_text={analysed_text}/>
                            </>
                        :   sentimentAnalysis.emotion_prediction === "Neutral"
                            ?   <>
                                    <Neutral/>
                                    <SentimentOutput sentimentAnalysis={sentimentAnalysis} analysed_text={analysed_text}/>
                                </>
                            :   sentimentAnalysis.emotion_prediction === "Sadness"
                                ?   <>
                                        <Sadness/>
                                        <SentimentOutput sentimentAnalysis={sentimentAnalysis} analysed_text={analysed_text}/>
                                    </>
                                :   <SentimentOutput sentimentAnalysis={sentimentAnalysis} analysed_text={analysed_text}/>
            }
        </div>
    )
}

export default GetUserInput;