import React from "react";
import { Row, Col, Image } from 'react-bootstrap';
import image from './images/happy-face.png';

const Joy = () => {
    return (
        <div className="emotion-div joy">
            <Row>
                <Col className="col-6 col-md-4 col-lg-4 order-12 d-flex align-items-center mx-auto mb-4 emotion-div-image-container">
                    <Image src={image} className="img-fluid"></Image>
                </Col>
                <Col className="col-12 col-md-8 col-lg-8 order-1 d-flex align-items-center">
                    <div>
                        <h1>Joy</h1>
                        <p>We use the term "enjoyment" to refer to a group of connected pleasant states, ranging from tranquilly to ecstasy.</p>
                        <p>The most desirable of the seven universal feelings, enjoyment is frequently a result of connection or sensory pleasure. Although the terms happiness and enjoyment can be used interchangeably, more and more people use the term happiness to describe their overall sense of wellbeing or assessment of their lives rather than a specific feeling associated with enjoyment.</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Joy;