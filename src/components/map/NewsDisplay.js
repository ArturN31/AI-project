import React, { useEffect, useState } from "react"
import { Row, Col, Card, Accordion, ListGroup } from "react-bootstrap"
import NewsSentiment from "./NewsSentiment";

const NewsDisplay = (props) => {
    const [newsExtracted, setNewsExtracted] = useState([]);
    const [geoLocation, setGeoLocation] = useState("");

    let articleTitlesForMarker = "";
    let articleSnippetsForMarker = "";
    let articleImagesForMarker = "";
    let articleLocationForMarker = "";
    let currentKeyword = null;
    let passedArticleWithSentiment = {
        title: "",
        snippet: "",
        image: "",
        location: "",
        sentiment: ""
    };

    let handleNewSentiment = sentiment => {
        //getting article title
        if(props.news.headline.print_headline && props.news.headline.main) {articleTitlesForMarker = props.news.headline.print_headline}
        else if (!props.news.headline.print_headline && props.news.headline.main) {articleTitlesForMarker = props.news.headline.main}

        if(props.news.snippet) {articleSnippetsForMarker = props.news.snippet} //getting article snippet

        if(props.news.multimedia[0] && props.news.multimedia[0] !== undefined) {articleImagesForMarker = props.news.multimedia[0].url} //getting article image

        for (let i = 0; i < props.news.keywords.length; i++) {
            currentKeyword = props.news.keywords[i];
            if (currentKeyword.name === "glocations") {
                articleLocationForMarker = currentKeyword.value; //setting article location
                break;
            }
        }

        passedArticleWithSentiment = {
            title: articleTitlesForMarker,
            snippet: articleSnippetsForMarker,
            image: articleImagesForMarker,
            location: articleLocationForMarker,
            sentiment: sentiment
        } //combining all data

        props.setNewSentiment(passedArticleWithSentiment); //passing entire article with sentiment to Parent component - NewsFetch.js
    }

    useEffect(() => {
        for (let j = 0; j < props.news.keywords.length; j++) {
            let currentKeyword = props.news.keywords[j];
            if (currentKeyword.name === "glocations"){
                setGeoLocation(currentKeyword.value);
            }
        }

        if (props.news) {
            //extracts content from NY Times News
            const encodedParamsExtract = new URLSearchParams();
            encodedParamsExtract.append("language", "english");
            encodedParamsExtract.append("url", props.news.web_url);

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
    },[props.news]);

    return (
        <>
            <Row className="m-3">
                <Col>
                    <Accordion flush>
                        <Accordion.Item eventKey={props.news.headline.print_headline}>
                            <Accordion.Header>                        
                                <span>
                                    {geoLocation 
                                        ?  <h5 style={{color:"gray"}}>{geoLocation}</h5> 
                                        : ""
                                    }
                                    {props.news.headline.print_headline && props.news.headline.main
                                        ?   <h5>{props.news.headline.print_headline}</h5>
                                        :   ""
                                    }
                                    {!props.news.headline.print_headline && props.news.headline.main
                                        ?   <h5>{props.news.headline.main}</h5>
                                        :   ""
                                    }
                                    <p>News date: {props.news.pub_date.split("T")[0]} - {props.news.pub_date.split("T")[1].split("-")[0]}</p>
                                </span> 
                            </Accordion.Header>
                            <Accordion.Body>
                                <Card>
                                    <Card.Body>
                                        <ListGroup className="list-group-flush">
                                            {props.news.multimedia[0]
                                            ?   <Card.Img 
                                                    style={{ width: "50vw" }} 
                                                    className="mx-auto" 
                                                    src={"https://www.nytimes.com/" + props.news.multimedia[0].url}
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
                                                    <NewsSentiment setNewSentiment={handleNewSentiment} text={newsExtracted.text.replace(/(\r\n|\n|\r)/gm, " ")}/>
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
        </>
    )
}

export default NewsDisplay;