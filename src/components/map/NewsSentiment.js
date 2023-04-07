import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"

import SentimentOutput from './SentimentOutput';
import Anger from '../emotion-components/Anger';
import Fear from '../emotion-components/Fear';
import Joy from '../emotion-components/Joy';
import Neutral from '../emotion-components/Neutral';
import Sadness from "../emotion-components/Sadness";

const NewsSentiment = (props) => {
    const [sentimentAnalysis, setSentimentAnalysis] = useState([]);

    useEffect(() => {
        //cheching if text is not ""
        if(props.text !== "") {
            fetchData(); 
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    async function fetchData() {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.REACT_APP_TEXTPROBE_API_KEY,
                'X-RapidAPI-Host': 'textprobe.p.rapidapi.com'
            },
            body: '{"text":"' + props.text + '"}'
        };

        await fetch('https://textprobe.p.rapidapi.com/feelings', options)
             .then((response) => {
                if (!response.ok) {throw response} 
                return response.json();
            })
            .then((incomingData) => {
                setSentimentAnalysis(incomingData); //setting state
                props.setNewSentiment(incomingData.emotion_prediction); //passing sentiment to Parent component - NewsDisplay.js
                
            }) 
            .catch((err) => console.error(err)) 
    }

    return (
        <div className="col-xs-12 col-md-11 mx-auto">
            {
                sentimentAnalysis.emotion_prediction === "Anger"
                ?   <Row>
                        <Col className="col-xs-12 col-sm-12 col-xl-8">
                            <Anger/>
                        </Col>
                        <Col className="col-xs-12 col-sm-12 col-xl-4 mx-auto">
                            <SentimentOutput sentimentAnalysis={sentimentAnalysis} text={props.text}/>
                        </Col>
                    </Row>
                :   sentimentAnalysis.emotion_prediction === "Fear"
                    ?   <Row>
                            <Col className="col-xs-12 col-sm-12 col-xl-8">
                                <Fear/>
                            </Col>
                            <Col className="col-xs-12 col-sm-12 col-xl-4 mx-auto">
                                <SentimentOutput sentimentAnalysis={sentimentAnalysis} text={props.text}/>
                            </Col>
                        </Row>
                    :   sentimentAnalysis.emotion_prediction === "Joy"
                        ?   <Row>
                                <Col className="col-xs-12 col-sm-12 col-xl-8">
                                    <Joy/>
                                </Col>
                                <Col className="col-xs-12 col-sm-12 col-xl-4 mx-auto">
                                    <SentimentOutput sentimentAnalysis={sentimentAnalysis} text={props.text}/>
                                </Col>
                            </Row>
                        :   sentimentAnalysis.emotion_prediction === "Neutral"
                            ?   <Row>
                                    <Col className="col-xs-12 col-sm-12 col-xl-8 d-flex align-items-center">
                                        <Neutral/>
                                    </Col>
                                    <Col className="col-xs-12 col-sm-12 col-xl-4 mx-auto">
                                        <SentimentOutput sentimentAnalysis={sentimentAnalysis} text={props.text}/>
                                    </Col>
                                </Row>
                            :   sentimentAnalysis.emotion_prediction === "Sadness"
                                ?   <Row>
                                        <Col className="col-xs-12 col-sm-12 col-xl-8">
                                            <Sadness/>
                                        </Col>
                                        <Col className="col-xs-12 col-sm-12 col-xl-4 mx-auto">
                                            <SentimentOutput sentimentAnalysis={sentimentAnalysis} text={props.text}/>
                                        </Col>
                                    </Row>
                                :   sentimentAnalysis.emotion_prediction
                                    ?   <Col className="col-xs-12 col-sm-12 col-xl-4 mx-auto">
                                            <SentimentOutput sentimentAnalysis={sentimentAnalysis} text={props.text}/>
                                        </Col>
                                    :   ""
            }
        </div>
    )
}

export default NewsSentiment;