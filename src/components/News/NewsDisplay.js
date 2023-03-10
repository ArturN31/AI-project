import React, { useEffect, useState } from "react"
import { Row, Col, Card, Accordion, ListGroup } from "react-bootstrap"
import NewsSentiment from "./NewsSentiment";

const NewsDisplay = (url) => {
    const [newsExtracted, setNewsExtracted] = useState([]);

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
            .then(async (response) => {
                if (!response.ok) {throw response} 
                return await response.json();
            })
            .then((incomingData) => {
                setNewsExtracted(incomingData.article);
            })
            .catch((err) => console.error(err));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <Row className="m-3">
            <Col>
                <Accordion flush>
                    <Accordion.Item eventKey={url.url.title}>
                        <Accordion.Header>                        
                            <span>
                                <h5>{url.url.title}</h5>
                                <p>News date: {url.url.published_date.split("T")[0]} - {url.url.published_date.split("T")[1].split("-")[0]}</p>
                            </span> 
                        </Accordion.Header>
                        <Accordion.Body>
                            <Card>
                                <Card.Body>
                                    <ListGroup className="list-group-flush">
                                        {url.url.multimedia
                                        ?   <Card.Img 
                                                style={{ width: "50vw" }} 
                                                className="mx-auto" 
                                                src={url.url.multimedia[0].url}
                                            />

                                        :   ""
                                        }
                                        <Card.Body>
                                            <div style={{ textAlign: 'justify' }}>

                                                {/* News summary output */}
                                                {newsExtracted.summary
                                                ?   <>
                                                        <h6 className="text-center">Summary:</h6>
                                                        {newsExtracted.summary}
                                                    </>

                                                :   <p className="text-center">Loading Content ...</p>}
                                            </div>
                                        </Card.Body>

                                        {/* Sentiment analysis output */}
                                        {newsExtracted >= 0
                                        ?   ""

                                        :   <Card.Footer className="text-center">
                                                <NewsSentiment text={newsExtracted.text.replace(/(\r\n|\n|\r)/gm, " ")}/>
                                            </Card.Footer> 
                                        }
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