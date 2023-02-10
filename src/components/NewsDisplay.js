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
            .then((response) => {
                if (!response.ok) {throw response} 
                return response.json();
            })
            .then((incomingData) => {
                setNewsExtracted(incomingData.article.summary.replace(/(\r\n|\n|\r)/gm, " "));
            })
            .catch((err) => console.error(err));
        }
    },[newsExtracted, url.length, url.url.url]);

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
                                            <div style={{ textAlign: 'justify' }}>
                                                {newsExtracted.length > 0
                                                ?   <>
                                                        <h6 className="text-center">Summary:</h6>
                                                        {newsExtracted}
                                                    </>

                                                :   <p className="text-center">Loading Content ...</p>}
                                            </div>
                                        </Card.Body>
                                        {newsExtracted >= 0
                                        ?   ""

                                        :   <Card.Footer className="text-center">
                                                <NewsSentiment summary={newsExtracted}/>
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