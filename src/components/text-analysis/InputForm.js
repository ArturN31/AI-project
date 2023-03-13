import React, { useState, useRef, useEffect } from "react"
import { Form, Button } from "react-bootstrap"

const InputForm = ({ get_input }) => {
    const [input, setInput] = useState("");
    const textAreaRef = useRef(null);

    //setting the input for the get function in the parent component
    const send_input_to_parent = () => get_input(input.replace(/["']/g, ""));

    //resizing the textarea to fit content
    const resize_text_area = () => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    };

    const text_area_reset = () => {
        document.getElementById('textarea').value="";
    }

    useEffect(resize_text_area);

    return (
        <>
            <Form>
                <Form.Group className="mb-4" controlId="textarea">
                    <Form.Label className="d-flex justify-content-center">Enter text for sentiment analysis: </Form.Label>
                    <Form.Control as="textarea" rows={3} ref={textAreaRef} value={input} onChange={e => setInput(e.target.value)}/>
                </Form.Group>
            </Form>
            <div className="d-flex justify-content-center">
                <Button className="mx-2" variant="primary" onClick={send_input_to_parent}>
                    Analyse
                </Button>
                <Button className="mx-2" variant="primary" onClick={text_area_reset}>
                    Reset
                </Button>
            </div>
        </>
    )
}

export default InputForm;