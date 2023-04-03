import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import NewsDisplay from "./NewsDisplay"

import 'react-calendar/dist/Calendar.css';
import MapPopup from "../map/MapPopup";

const NewsFetch = (count) => {
    const [news, setNews] = useState([]);
    
    useEffect(() => {
        //fetches news from NY Times API
        debugger;
        const newsArray = [];
        const url = `http://localhost:3001/news`

        fetch(url)
        .then(async (response) => {
            if (!response.ok) {throw response} 
            return await response.json();
        })
        .then((incomingData) => {
            let responseBody = JSON.parse(incomingData.body)

            for (let i = 0; i < responseBody.response.docs.length; i++) {
                if (responseBody.response.docs[i].web_url){
                    let hasGeoLocation = false;
                    let currentKeywords = responseBody.response.docs[i].keywords;
                    if(currentKeywords){
                        for (let j = 0; j < currentKeywords.length; j++) {
                            const keyword = currentKeywords[j];
                            if(keyword.name === "glocations"){
                                hasGeoLocation = true;
                                break;
                            }
                        }
                    }
                    
                    //returns articles with urls
                    if(hasGeoLocation){
                        newsArray.push(responseBody.response.docs[i]);
                    }
                    
                }
            }
            setNews(newsArray);
        })
        .catch((err) => console.error(err));
    }, [count, news])

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col className="col-6 m-4">
                    <p>Total amount of available articles: {news.length}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                {/* maps through NewsUrls and uses slice function to limit based on what the user sets as the count in SetNewsParams */}
                {news.slice(0, count.count).map((articles) =><NewsDisplay news={articles} key={articles.web_url} />)}
                </Col>
            </Row>
            {news.slice(0, count.count).length > 1 ? <MapPopup desiredCount = {count.count} articles={news.slice(0, count.count)}></MapPopup> : <MapPopup articles={[]}></MapPopup>}
        </>
    )
}

export default NewsFetch;

