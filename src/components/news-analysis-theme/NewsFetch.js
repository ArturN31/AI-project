import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import NewsDisplay from "./NewsDisplay"

const NewsFetch = (params) => {
    const [newsUrls, setNewsUrls] = useState([]);
    const [sentimentOccurrence, setSentimentOccurrence] = useState([]);

    let sentimentTotalArray = [] //array that stores all sentiment values

    const handleTotalSentiment = sentiment => {
        //pushing values to an array
        //values are being passed from NewsSentiment.js to NewsDisplay.js, then to NewsFetch.js
        //NewsSentiment(children of NewsDisplay file) -> NewsDisplay(children of current file) -> NewsFetch(current file)
        if(sentiment === "N/A") {sentimentTotalArray.push("Not_Applicable")} 
        else {sentimentTotalArray.push(sentiment)}
        
        if(sentimentTotalArray.length + 1 >= params.params.count) {handleOccurence(sentimentTotalArray)} //calls handleOccurence function when number of sentiments >= article count
    }

    const handleOccurence = (array) => {
        //creates an array, which contains the emotions and their occurrences
        var occurrence = array.reduce((acc, value) => ({
            ...acc,
            [value]: (acc[value] || 0) + 1
        }), {});
        console.log(occurrence);
        setSentimentOccurrence(occurrence); //updates the state
    }

    useEffect(() => {
        const newsArray = [];
        //fetches news from NY Times API
        const url = `https://api.nytimes.com/svc/topstories/v2/${params.params.themes}.json?api-key=`;
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
    }, [params]);

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col className="col-6 m-4 text-white text-center">
                    <span>Total amount of available articles: {newsUrls.length}</span><br></br>
                    <div className="text-center text-bg-dark rounded p-1 m-4">
                        {sentimentOccurrence
                            ?   <span>Emotion occurrence:<br></br></span>
                            :   ""
                        }
                        <span>
                            {sentimentOccurrence.Anger
                                ?   "Anger: " + sentimentOccurrence.Anger + " "
                                :   ""
                            }
                            {sentimentOccurrence.Fear
                                ?   "Fear: " + sentimentOccurrence.Fear + " "
                                :   ""
                            }
                            {sentimentOccurrence.Joy
                                ?   "Joy: " + sentimentOccurrence.Joy + " "
                                :   ""
                            }
                            {sentimentOccurrence.Neutral
                                ?   "Neutral: " + sentimentOccurrence.Neutral + " "
                                :   ""
                            }
                            {sentimentOccurrence.Sadness
                                ?   "Sadness: " + sentimentOccurrence.Sadness + " "
                                :   ""
                            }
                            {sentimentOccurrence.Not_Applicable
                                ?   "N/A: " + sentimentOccurrence.Not_Applicable + " "
                                :   ""
                            }
                        </span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                {/* maps through NewsUrls and uses slice function to limit based on what the user sets as the count in SetNewsParams */}
                {newsUrls.slice(0, params.params.count)
                    .map((n) => <NewsDisplay handleTotalSentiment={handleTotalSentiment} url={n} key={n.url} />)}
                </Col>
            </Row>
        </>
    )
}

export default NewsFetch;