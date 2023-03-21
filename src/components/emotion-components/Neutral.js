import React from "react";
import { Row, Col, Image } from 'react-bootstrap';
import image from './images/neutral-face.png';

const Neutral = () => {
    return (
        <div className="emotion-div neutral">
            <Row>
                <Col className="col-6 col-md-4 col-lg-4 order-12 d-flex align-items-center mx-auto mb-4 emotion-div-image-container">
                    <Image src={image} className="img-fluid"></Image>
                </Col>
                <Col className="col-12 col-md-8 col-lg-8 order-1 d-flex align-items-center">
                    <div>
                        <h1>Neutral</h1>
                        <p>There is no emotion in the scanned text or it cannot be determined properly.</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Neutral;