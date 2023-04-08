import React from "react";
import { Row, Col, Image } from 'react-bootstrap';
import image from './images/scared-face.webp';

const Fear = () => {
    return (
        <div className="emotion-div fear">
            <Row>
                <Col className="col-6 col-md-4 col-lg-4 order-12 d-flex align-items-center mx-auto mb-4 emotion-div-image-container">
                    <Image src={image} className="img-fluid"></Image>
                </Col>
                <Col className="col-12 col-md-8 col-lg-8 order-1 d-flex align-items-center">
                    <div>
                        <h1>Fear</h1>
                        <p>The threat of harm, whether actual or imagined, is the primary cause of all forms of fear.Our bodily, emotional, or psychological health may be at risk. While most of us have certain situations that make us fearful, we can learn to be afraid of almost anything.</p>
                        <p>One of the seven feelings that affect everyone on the planet is fear. When there is an actual or imagined threat of harm—either physical, emotional, or psychological—fear develops. Although fear is typically regarded as a "negative" emotion, it actually plays a crucial part in keeping us safe as it prepares us to deal with possible danger.</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Fear;