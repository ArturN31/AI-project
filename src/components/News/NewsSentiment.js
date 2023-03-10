import React, { useEffect, useState } from "react"

const NewsSentiment = (text) => {
    const [sentimentAnalysis, setSentimentAnalysis] = useState([]);

    useEffect(() => {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.REACT_APP_TEXT_ANALYSIS_API_KEY,
                'X-RapidAPI-Host': 'textprobe.p.rapidapi.com'
            },
            body: '{"text":"' + text.text + '"}'
        };

        if(text.text !== "") { 
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
    },[text.text]);

    return (
        sentimentAnalysis.length <= 0
        ?   <>
                {text.text.length <= 0
                    ? ""
                    : "Loading analysis..."
                }
            </>
        :   <>
                <h5>Sentiment analysis:</h5>
                {sentimentAnalysis.emotion_prediction && sentimentAnalysis.emotion_scores.Anger
                    ?   <>
                            <p>Emotion prediction: <span> {sentimentAnalysis.emotion_prediction}</span></p>
                            <p>Anger: <span> {sentimentAnalysis.emotion_scores.Anger}</span></p>
                            <p>Fear: <span> {sentimentAnalysis.emotion_scores.Fear}</span></p>
                            <p>Joy: <span> {sentimentAnalysis.emotion_scores.Joy}</span></p>
                            <p>Neutral: <span> {sentimentAnalysis.emotion_scores.Neutral}</span></p>
                            <p>Sadness: <span> {sentimentAnalysis.emotion_scores.Sadness}</span></p>
                            <p>Negative:  <span> {sentimentAnalysis.sentiment_scores.Negative}</span></p>
                            <p>Positive: <span> {sentimentAnalysis.sentiment_scores.Positive}</span></p>
                        </>
                    :   <>
                            <p>Emotion prediction: <span> {sentimentAnalysis.emotion_prediction}</span> - cannot be processed</p>
                            <p>Negative:  <span> {sentimentAnalysis.sentiment_scores.Negative}</span></p>
                            <p>Positive: <span> {sentimentAnalysis.sentiment_scores.Positive}</span></p>
                        </>
                }
            </>
    )
}

export default NewsSentiment;