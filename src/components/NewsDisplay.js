import React, { useEffect, useState } from "react"
import { Row, Col, Card, Accordion, ListGroup } from "react-bootstrap"

const NewsDisplay = (url) => {
    const [newsExtracted, setNewsExtracted] = useState([]);
    const [sentimentAnalysis, setSentimentAnalysis] = useState([]);

    useEffect(() => {
        if (!url.length > 0) {
            //extracts content from NY Times News
            const encodedParamsExtract = new URLSearchParams();
            encodedParamsExtract.append("language", "english");
            encodedParamsExtract.append("url", url.url.url);

            const optionsExtract = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': process.env.REACT_APP_TEXT_ANALYSIS_API_KEY,
                    'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
                },
                body: encodedParamsExtract 
            };

            fetch('https://text-analysis12.p.rapidapi.com/article-extraction/api/v1.3', optionsExtract)
            .then((response) => {
                if (!response.ok) {throw response} 
                return response.json();
            })
            .then(async (incomingData) => {
                setNewsExtracted(incomingData.article.summary.replace(/(\r\n|\n|\r)/gm, " "));

                if (newsExtracted) { 
                    //sentiment analysis
                    const optionsSentiment = {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'X-RapidAPI-Key': process.env.REACT_APP_TEXT_ANALYSIS_API_KEY,
                            'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
                        },
                        body: '{"language":"english","text":"'+newsExtracted+'"}'
                    };

                    await fetch('https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1', optionsSentiment)
                    .then((response) => {
                        if (!response.ok) {throw response} 
                        return response.json();
                    })
                    .then((incomingData) => {
                        setSentimentAnalysis(incomingData);
                    }) 
                    .catch((err) => console.error(err))  
                }
            })
            .catch((err) => console.error(err));
        }
    },[newsExtracted, sentimentAnalysis, url.length, url.url.url]);

    return (
        <Row className="m-3">
            <Col>
                <Accordion flush>
                    <Accordion.Item eventKey={url.url.title}>
                        <Accordion.Header>
                            <h5>{url.url.title} <p>{url.url.published_date.split("T")[0]} - {url.url.published_date.split("T")[1].split("-")[0]}</p></h5>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Card>
                                <Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <Card.Img 
                                            style={{ width: "50vw" }} 
                                            className="mx-auto" 
                                            src={url.url.multimedia[0].url}
                                        />
                                        <Card.Body>
                                            <h6 className="text-center">Summary:</h6>
                                            <div style={{ textAlign: 'justify' }}>
                                                {newsExtracted.length > 0
                                                ? newsExtracted
                                                : <p className="text-center">Loading summary...</p>}
                                            </div>
                                        </Card.Body>

                                        <Card.Footer className="text-center">
                                        {sentimentAnalysis.length >= 0
                                            ?   <>
                                                    <h6 className="text-center">Sentiment analysis:</h6>
                                                    <p>Loading analysis...</p>
                                                </>
                                            :   <>
                                                    <h6 className="text-center">Sentiment analysis:</h6>
                                                    <p>{sentimentAnalysis.sentiment}</p>
                                                </>
                                        }
                                        </Card.Footer> 
 
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Col>
        </Row>
    )
}

export default NewsDisplay;