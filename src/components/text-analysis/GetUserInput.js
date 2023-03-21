import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

import InputForm from "./InputForm";
import SentimentAnalysis from "./SentimentAnalysis";

const GetUserInput = () => {
    const [input, setInput] = useState('');

    const get_input = (user_input) => {
        setInput(user_input);
    }

    return (
        <>
            <Row className="mx-5">
                <Col className="col-xs-12 col-md-10 col-xl-6 mx-auto">
                    <InputForm get_input={get_input}/>
                </Col>
            </Row>
            <Row className="m-5 text-center">
                <Col>
                    <SentimentAnalysis analysed_text={input}/>
                </Col>
            </Row>
        </>
    )
}

export default GetUserInput;