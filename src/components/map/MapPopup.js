import React, { useEffect, useState, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import { Row, Col } from "react-bootstrap"

const MapPopup = (props) => {
    const [geolocations, setGeolocations] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const [coordinatesArray, setCoordinatesArray] = useState([]);
    const [articleData, setArticleData] = useState([]);

    const firstUpdateArticle = useRef(true);
    const firstUpdateCoords = useRef(true);

    const position = [55.860916, -4.251433]; //Glasgow coords
    
    useEffect(() => {
        if(props.article) {
            if (firstUpdateArticle.current) { firstUpdateArticle.current = false; } 
            else { setArticleData((prevState) => [...prevState, props.article]); }
        }
    }, [props.article]) //triggered on props.sentimentArray update - when articles with sentiment values are passed

    useEffect(() => {
        if (articleData.length > 0) { setGeolocations(articleData.map(({location}) => (location))); }
    }, [articleData]) //triggered when articleData is set

    useEffect(() => {
        if (geolocations.length > 0) {
            for(let i = 0; i <= geolocations.length-1; i++) {
                const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(geolocations[i])}.json?proximity=ip&access_token=`;

                fetch(url + process.env.REACT_APP_MAPBOX_API_KEY)
                .then((response) => {
                    if (!response.ok) { throw response }
                    return response.json();
                })
                .then((incomingData) => {
                    if (incomingData.features[0]) {
                        let lat = incomingData.features[0].center[0];
                        let long = incomingData.features[0].center[1];
                        let position = [long, lat]

                        setCoordinates(position);
                    }
                })
                .catch((err) => console.error(err));
            }
        }
    }, [geolocations]) //triggered when geolocations are set

    useEffect(() => {
        if (firstUpdateCoords.current) {
            firstUpdateCoords.current = false;
        } else {
            setCoordinatesArray((prevState) => {
                const duplicatedValue = prevState.some((coordinate) => JSON.stringify(coordinate) === JSON.stringify(coordinates)); //if equal then duplicateValue = true

                if (!duplicatedValue) { return [...prevState, coordinates]; } // if not duplicate
                else { return prevState; } //if duplicate
            });
        }
    }, [coordinates]);


    return (
        <div>
            <Row className="d-flex justify-content-center">
                <Col className="col-12 col-xl-8 col-xxl-6 m-5 bg-dark p-2 rounded-2">
                    <MapContainer style={{ width: "100%", height: "60vh" }} center={position} zoom={2}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {coordinatesArray.length > 0 && articleData.length > 0
                            ?   coordinatesArray.map((coords, index) => (
                                articleData[index]
                                ?   <Marker key={articleData[index].title} position={coords} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                        <Popup> 
                                            <Row>
                                                <Col className="col-12">
                                                    <h5 className="tooltip-text">{articleData[index].title}</h5>
                                                </Col>
                                                <Col className="col-12 d-flex justify-content-center">
                                                    <img 
                                                        style={{ width: "inherit", margin: "auto" }}
                                                        className='w-50' 
                                                        src={"https://www.nytimes.com/" + articleData[index].image}
                                                        alt={articleData[index].title}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="col-12">
                                                    <hr></hr>
                                                    <p className="tooltip-text">{articleData[index].snippet}</p>
                                                    <hr></hr>
                                                </Col>
                                                {articleData[index].sentiment === "Anger"
                                                    ?   <Col className="col-11 mx-auto rounded-2 map-tooltip anger-map-tooltip">
                                                            <p className="tooltip-text"><strong>{articleData[index].sentiment}</strong></p>
                                                        </Col>
                                                    :   articleData[index].sentiment === "Fear"
                                                        ?   <Col className="col-11 mx-auto rounded-2 map-tooltip fear-map-tooltip">
                                                                <p className="tooltip-text"><strong>{articleData[index].sentiment}</strong></p>
                                                            </Col>
                                                        :   articleData[index].sentiment === "Joy"
                                                            ?   <Col className="col-11 mx-auto rounded-2 map-tooltip joy-map-tooltip">
                                                                    <p className="tooltip-text"><strong>{articleData[index].sentiment}</strong></p>
                                                                </Col>
                                                            :   articleData[index].sentiment === "Neutral"
                                                                ?   <Col className="col-11 mx-auto rounded-2 map-tooltip neutral-map-tooltip">
                                                                        <p className="tooltip-text"><strong>{articleData[index].sentiment}</strong></p>
                                                                    </Col>
                                                                :   articleData[index].sentiment === "Sadness"
                                                                    ?   <Col className="col-11 mx-auto rounded-2 map-tooltip sadness-map-tooltip">
                                                                            <p className="tooltip-text"><strong>{articleData[index].sentiment}</strong></p>
                                                                        </Col>
                                                                    :   articleData[index].sentiment === "N/A"
                                                                        ?   <Col className="col-11 mx-auto rounded-2">
                                                                                <p className="tooltip-text"><strong>{articleData[index].sentiment}</strong></p>
                                                                            </Col>
                                                                        :   <Col className="col-11 mx-auto rounded-2">
                                                                                <p className="tooltip-text"><strong>{articleData[index].sentiment}</strong></p>
                                                                            </Col>
                                                }
                                            </Row>
                                        </Popup>
                                    </Marker> 
                                :   ""
                            ))   
                            :   ""
                        }
                    </MapContainer>
                </Col>
            </Row>
        </div>
    )
}

export default MapPopup;