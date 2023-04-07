import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import { Row, Col } from "react-bootstrap"

const MapPopup = (props) => {
    const [geolocations, setGeolocations] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const [articleData, setArticleData] = useState([]);

    const position = [55.860916, -4.251433]; //Glasgow coords
    
    useEffect(() => {
        let arr = [];
        arr.push(props.article)
        setArticleData(arr);
    }, [props.article]) //triggered on props.sentimentArray update - when articles with sentiment values are passed

    useEffect(() => {
        console.log(articleData);
        setGeolocations(articleData.location);
    }, [articleData]) //triggered when articleData is set

    useEffect(() => {
        if (geolocations !== undefined) {

            // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${geolocations}.json?proximity=ip&access_token=`;

            // fetch(url + process.env.REACT_APP_MAPBOX_API_KEY)
            // .then((response) => {
            //     if (!response.ok) { throw response }
            //     return response.json();
            // })
            // .then((incomingData) => {
            //     if (incomingData.features[0]) {
            //         let lat = incomingData.features[0].center[0];
            //         let long = incomingData.features[0].center[1];
            //         let fixedCoordinates = [long, lat];
                    
            //         setCoordinates(fixedCoordinates); //updates coordinates state
            //     }
            // })
            // .catch((err) => console.error(err));
        }
    }, [geolocations, props.desiredCount]) //triggered when geolocations are set

    useEffect(() => {
        console.log(coordinates);
    }, [coordinates])

    

    return (
        <div>
            <Row className="d-flex justify-content-center">
                <Col className="col-12 m-6">
                    <MapContainer style={{ width: "100%", height: "60vh" }} center={position} zoom={2}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* {coordinates.length > 0
                            ?   <Marker key={articleData.title} position={coordinates} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                    <Popup>
                                        <Row>
                                            <Col className="col-12">
                                                {articleData
                                                    ?   <h5 className="text-center">{articleData.title}</h5>
                                                    :   ""
                                                }
                                            </Col>
                                            <Col className="col-12 d-flex justify-content-center">
                                                {articleData
                                                    ?   <img 
                                                            style={{ width: "inherit", margin: "auto" }}
                                                            className='w-50' 
                                                            src={"https://www.nytimes.com/" + articleData.image}
                                                            alt={articleData.title}
                                                        />
                                                    :   ""
                                                }
                                            </Col>
                                            <Col className="col-12">
                                                {articleData
                                                    ?   <p className="text-center">{articleData.snippet}</p>
                                                    :   ""
                                                }
                                            </Col>
                                            <Col>
                                                {articleData
                                                    ?   <p className="text-center">{articleData.sentiment}</p>
                                                    :   ""
                                                }
                                            </Col>
                                        </Row>
                                    </Popup>
                                </Marker>
                            :   ""
                        } */}
                    </MapContainer>
                </Col>
            </Row>
        </div>
    )
}

export default MapPopup;