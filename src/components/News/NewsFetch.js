import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import NewsDisplay from "./NewsDisplay"
import { SetNewsParams } from "./SetNewsParams"

const NewsFetch = () => {
    const [newsUrls, setNewsUrls] = useState([]);

    // useState for selectedTheme and count
    const [selectedTheme, setSelectedTheme] = useState("home");
    const [selectedCount, setSelectedCount] = useState(1);

    // handle Submit from setNewsParams
    const handleSubmit = ({ themes, count }) => {
        setSelectedTheme(themes);
        setSelectedCount(count);
    };

    useEffect(() => {
        const newsArray = [];
        //fetches news from NY Times API
        const url = `https://api.nytimes.com/svc/topstories/v2/${selectedTheme}.json?api-key=`;
        fetch(url + process.env.REACT_APP_NY_TIMES_API_KEY)
        .then(async (response) => {
            if (!response.ok) {throw response} 
            return await response.json();
        })
        .then((incomingData) => {
            for (let i = 0; i < incomingData.results.length; i++) {
                if (!incomingData.results[i].url || incomingData.results[i].url === "null") {
                    //returns articles with no urls
                    //console.log(incomingData.results[i]);
                } else {
                    //returns articles with urls
                    newsArray.push(incomingData.results[i])
                }
            }
            setNewsUrls(newsArray);
        })
        .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTheme]);

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col className="col-6">
                    <SetNewsParams onSubmit={handleSubmit}/>
                    <p>Total amount of available articles: {newsUrls.length}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                {/* maps through NewsUrls and uses slice function to limit based on what the user sets as the count in SetNewsParams */}
                {newsUrls.slice(0, selectedCount)
                    .map((n) => <NewsDisplay url={n} key={n.url} />)}
                </Col>
            </Row>
        </>
    )
}

export default NewsFetch;