import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import NewsDisplay from "./NewsDisplay"

const NewsFetch = () => {
    const [newsUrls, setNewsUrls] = useState([]);

    useEffect(() => {
        //fetches news from NY Times API
        const url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=";
        fetch(url + process.env.REACT_APP_NY_TIMES_API_KEY)
        .then(async (response) => {
            if (!response.ok) {throw response} 
            return await response.json();
        })
        .then((incomingData) => {
            setNewsUrls(incomingData.results);
        })
        .catch((err) => console.error(err));
    }, []);

    return (
        <Row>
            <Col>
                {newsUrls.map((n) => (
                    <NewsDisplay url={n} key={n.url}/>
                ))}
            </Col>
        </Row>
    )
}

export default NewsFetch;