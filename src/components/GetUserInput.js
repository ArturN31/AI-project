import React, { useState } from "react"
import { Row, Col } from "react-bootstrap"

import InputForm from "./InputForm";
import SentimentAnalysis from "./SentimentAnalysis";

const GetUserInput = () => {
    const [input, setInput] = useState('');

    const get_input = (user_input) => {
        setInput(user_input);
    }

    return (
        <>
            <Row className="m-5">
                <Col>
                    <InputForm get_input={get_input}/>
                </Col>
            </Row>
            <Row className="m-5 text-center">
                <Col>
                    {/* Conditional rendering of user input */}
                    {input
                    ?   <>
                            <h5>The text you have entered:</h5>
                            <p>{input}</p>
                        </>
                    :   ""
                    }
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