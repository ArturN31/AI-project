import React from "react";
import { Row, Col, Image } from 'react-bootstrap';
import image from './images/sad-face.png';

const Sadness = () => {
    return (
        <div className="emotion-div sadness">
            <Row>
                <Col className="col-6 col-md-4 col-lg-4 order-12 d-flex align-items-center mx-auto mb-4 emotion-div-image-container">
                    <Image src={image} className="img-fluid"></Image>
                </Col>
                <Col className="col-12 col-md-8 col-lg-8 order-1 d-flex align-items-center">
                    <div>
                        <h1>Sadness</h1>
                        <p>Sadness refers to a variety of emotional states that we can go through, including mild sadness, extreme dejection, and agony.</p>
                        <p>One of the seven universal feelings that everyone in the world feels after losing someone or something significant is sadness. Depending on how we view death personally and culturally, different things can make us sad. Although sadness is frequently regarded as a "negative" feeling, it plays a crucial role in indicating a need for support or comfort.</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Sadness;