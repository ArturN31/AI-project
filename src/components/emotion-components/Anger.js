import React from "react";
import { Row, Col, Image } from 'react-bootstrap';
import image from './images/annoyed-face.png'

const Anger = () => {
    return (
        <div className="emotion-div anger">
            <Row>
                <Col className="col-6 col-md-4 col-lg-4 order-12 d-flex align-items-center mx-auto mb-4 emotion-div-image-container">
                    <Image src={image} className="img-fluid"></Image>
                </Col>
                <Col className="col-12 col-md-8 col-lg-8 order-1 d-flex align-items-center">
                    <div>
                        <h1>Anger</h1>
                        <p>Conveys everything from simple displeasure to threatening.</p>
                        <p>One of the seven universal feelings, anger is triggered when we are denied access to
                        something or are subjected to unfair treatment. Because of its potential link to violence, 
                        anger can be one of the most dangerous emotions when it's at its worst, making it a
                        prevalent emotion for which people seek support.</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Anger;