import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap";

const NewsSentiment = (text) => {
    const [sentimentAnalysis, setSentimentAnalysis] = useState([]);

    useEffect(() => {
        if (!text.length > 0) { 
            //sentiment analysis
            const optionsSentiment = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': process.env.REACT_APP_TEXT_ANALYSIS_API_KEY,
                    'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
                },
                body: '{"language":"english","text":"'+text.text+'"}'
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        sentimentAnalysis.length >= 0
        ?   <p className="text-center"> Processing {text.text.split(".").length} sentences - please wait until sentiment analysis is completed.</p>

        :   <>
                <h6 className="text-center">Sentiment analysis:</h6>
                <Row>
                    <Col>
                        <p>{sentimentAnalysis.sentiment}</p>
                    </Col>
                </Row> 
            </>
    )
}

export default NewsSentiment;