import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import NewsDisplay from "./NewsDisplay"
import { SetNewsParams } from "./SetNewsParams"


import 'react-calendar/dist/Calendar.css';

const NewsFetch = () => {
    const [news, setNews] = useState([]);

    // useState for selectedTheme and count
    const [selectedYear, setSelectedYear] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedCount, setSelectedCount] = useState(1);
   
    // handle Submit from setNewsParams
    const handleSubmit = ({ year, month, count }) => {
        setSelectedYear(year);
        setSelectedMonth(month);
        setSelectedCount(count);
    };

    useEffect(() => {
        const newsArray = [];
        //fetches news from NY Times API
        
        const url = `http://localhost:3001/news`
        const key = process.env.REACT_APP_NY_TIMES_API_KEY;

        //const url = `https://api.nytimes.com/svc/topstories/v2/${selectedTheme}.json?api-key=`;

        
        // RIGHT NOW EXPRESS SERVER PROVIDES DATA RETRIEVED FROM 'https://api.nytimes.com/svc/archive/v1/2023/3.json?api-key=' + process.env.NY_TIMES_API_KEY

        //- IMPLEMENT ABILITY TO PASS USER INPUT TO SERVER WHICH WILL FETCH DATA. THEN RETRIEVE NEWS TO REACT.

        fetch(url)
        .then(async (response) => {
            if (!response.ok) {throw response} 
            return await response.json();
        })
        .then((incomingData) => {
            let responseBody = JSON.parse(incomingData.body)

            for (let i = 0; i < responseBody.response.docs.length; i++) {
                if (!responseBody.response.docs[i].web_url || responseBody.response.docs[i].web_url === "null") {
                    //returns articles with no urls
                    //console.log(incomingData.results[i]);
                } else {
                    //returns articles with urls
                    newsArray.push(responseBody.response.docs[i])
                }
            }
            setNews(newsArray);
        })
        .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col className="col-6">
                    <SetNewsParams onSubmit={handleSubmit}/>
                    <p>Total amount of available articles: {news.length}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                {/* maps through NewsUrls and uses slice function to limit based on what the user sets as the count in SetNewsParams */}
                {news.slice(0, selectedCount)
                    .map((news) => <NewsDisplay news={news} key={news.web_url} />)}
                </Col>
            </Row>
        </>
    )
}

export default NewsFetch;