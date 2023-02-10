import React, { useEffect, useState } from "react"

const NewsSentiment = (summary) => {
    const [sentimentAnalysis, setSentimentAnalysis] = useState([]);

    useEffect(() => {
        if (!summary.length > 0) { 
            //sentiment analysis
            const optionsSentiment = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': process.env.REACT_APP_TEXT_ANALYSIS_API_KEY,
                    'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
                },
                body: '{"language":"english","text":"'+summary.summary+'"}'
            };

            fetch('https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1', optionsSentiment)
            .then((response) => {
                if (!response.ok) {throw response} 
                return response.json();
            })
            .then((incomingData) => {
                setSentimentAnalysis(incomingData);
            }) 
            .catch((err) => console.error(err))  
        }
    },[summary]);

    return (
        sentimentAnalysis.length >= 0
        ?   ""

        :   <>
                <h6 className="text-center">Sentiment analysis:</h6>
                <p>{sentimentAnalysis.sentiment}</p>
            </>
    )
}

export default NewsSentiment;