import React, { useState, useEffect } from "react"

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
            body: '{"text":"' + analysed_text + '"}'
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
        sentimentAnalysis.length <= 0
        ?   <>
                {analysed_text.length <= 0
                    ? ""
                    : "Loading analysis..."
                }
            </>
        :   <>
                <h5>Sentiment analysis:</h5>
                {sentimentAnalysis.emotion_prediction
                    ? <p>Emotion prediction: <span> {sentimentAnalysis.emotion_prediction}</span></p>
                    : "Loading analysis..."
                }
                {sentimentAnalysis.emotion_scores.Anger
                    ? <p>Anger: <span> {sentimentAnalysis.emotion_scores.Anger}</span></p>
                    : "Loading analysis..."
                }
                {sentimentAnalysis.emotion_scores.Fear
                    ? <p>Fear: <span> {sentimentAnalysis.emotion_scores.Fear}</span></p>
                    : "Loading analysis..."
                }
                {sentimentAnalysis.emotion_scores.Joy
                    ? <p>Joy: <span> {sentimentAnalysis.emotion_scores.Joy}</span></p>
                    : "Loading analysis..."
                }
                {sentimentAnalysis.emotion_scores.Neutral
                    ? <p>Neutral: <span> {sentimentAnalysis.emotion_scores.Neutral}</span></p>
                    : "Loading analysis..."
                }
                {sentimentAnalysis.emotion_scores.Sadness
                    ? <p>Sadness: <span> {sentimentAnalysis.emotion_scores.Sadness}</span></p>
                    : "Loading analysis..."
                }
                {sentimentAnalysis.sentiment_scores.Negative
                    ? <p>Negative:  <span> {sentimentAnalysis.sentiment_scores.Negative}</span></p>
                    : "Loading analysis..."
                }
                {sentimentAnalysis.sentiment_scores.Positive
                    ? <p>Positive: <span> {sentimentAnalysis.sentiment_scores.Positive}</span></p>
                    : "Loading analysis..."
                }
            </>
    )
}

export default GetUserInput;