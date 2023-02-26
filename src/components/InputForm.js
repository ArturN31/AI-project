import React, { useState, useRef, useEffect } from "react"
import { Form, Button } from "react-bootstrap"

const InputForm = ({ get_input }) => {
    const [input, setInput] = useState("");
    const textAreaRef = useRef(null);

    //setting the input for the get function in the parent component
    const send_input_to_parent = () => get_input(input)

    //resizing the textarea to fit content
    const resizeTextArea = () => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    };

    useEffect(resizeTextArea, [input]);

    return (
        <>
            <Form>
                <Form.Group className="mb-4" controlId="textarea">
                    <Form.Label className="d-flex justify-content-center">Enter text for sentiment analysis: </Form.Label>
                    <Form.Control as="textarea" rows={3} ref={textAreaRef} value={input} onChange={e => setInput(e.target.value)}/>
                </Form.Group>
            </Form>
            <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit" onClick={send_input_to_parent}>
                    Submit
                </Button>
            </div>
        </>
    )
}

export default InputForm;