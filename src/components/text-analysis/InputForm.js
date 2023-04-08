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
            <div className="user-input-div">
                <Form>
                    <Form.Group className="mb-4" controlId="textarea">
                        <Form.Label className="h1 d-flex justify-content-center">Enter your Text </Form.Label>
                        <p className="text-center">
                            Submit text in the manner of single sentences or even entire paragraphs. <br></br>
                            Upon which sentiment analysis will be performed to deterimne the emotion that it conveys.
                        </p>
                        <Form.Control as="textarea" rows={10} ref={textAreaRef} value={input} onChange={e => setInput(e.target.value)}/>
                    </Form.Group>
                </Form>
                <div className="d-flex justify-content-end">
                    <Button className="mx-2 btn-reset" onClick={text_area_reset}>
                        Reset
                    </Button>
                    <Button className="mx-2 btn-submit" onClick={send_input_to_parent}>
                        Analyse
                    </Button>
                </div>
            </div>
        </>
    )
}

export default InputForm;