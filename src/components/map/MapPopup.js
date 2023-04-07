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
        if(props.sentimentArray.length >= 0) {
            setArticleData(props.sentimentArray); //updates articleData state
        }
    }, [props.sentimentArray]) //triggered on props.sentimentArray update - when articles with sentiment values are passed

    useEffect(() => {
        let locations = [];
        if (articleData.length >= 0) {

            locations = articleData.map(({location}) => (location))
            setGeolocations(locations);
        }
    }, [articleData]) //triggered when articleData is set

    useEffect(() => {
        console.log(geolocations);

        // let coordinatesToPush = []; //array used to store article geolocation coordinates, e.g., Latitude, Longtitude.
        // if (geolocations.length >= 0) {
        //     for (let j = 0; j < geolocations.length; j++) {
        //         console.log(geolocations[j])

        //         const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${geolocations[j]}.json?proximity=ip&access_token=`;

        //         fetch(url + process.env.REACT_APP_MAPBOX_API_KEY)
        //         .then((response) => {
        //             if (!response.ok) { throw response }
        //             return response.json();
        //         })
        //         .then((incomingData) => {
        //             if (incomingData.features[0].center) {
        //                 let lat = parseFloat(incomingData.features[0].center[0]);
        //                 let long = parseFloat(incomingData.features[0].center[1]);
        //                 let fixedCoordinates = [long, lat];
                        
        //                 coordinatesToPush.push(fixedCoordinates); //setting coordinates array, e.g., Latitude, Longtitude.
        //                 setCoordinates(coordinatesToPush); //updates coordinates state
        //             }
        //         })
        //         .catch((err) => console.error(err));
        //     }
        // }
    }, [geolocations]) //triggered when geolocations are set

    // useEffect(() => {
    //     console.log(coordinates);
    // }, [coordinates])

    return (
        <div>
            <Row className="d-flex justify-content-center">
                <Col className="col-12 m-6">
                    <MapContainer style={{ width: "100%", height: "60vh" }} center={position} zoom={2}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* {coordinates.map((currentCoordinates, index) => {
                            return (
                                <Marker key={currentCoordinates + index} position={currentCoordinates} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                    <Popup>
                                        <Row>
                                            <Col className="col-12">
                                                {articleData[index]
                                                    ?   <h5 className="text-center">{articleData[index].title}</h5>
                                                    :   ""
                                                }
                                            </Col>
                                            <Col className="col-12 d-flex justify-content-center">
                                                {articleData[index]
                                                    ?   <img 
                                                            style={{ width: "inherit", margin: "auto" }}
                                                            className='w-50' 
                                                            src={"https://www.nytimes.com/" + articleData[index].image}
                                                            alt={articleData[index].title}
                                                        />
                                                    :   ""
                                                }
                                            </Col>
                                            <Col className="col-12">
                                                {articleData[index]
                                                    ?   <p className="text-center">{articleData[index].snippet}</p>
                                                    :   ""
                                                }
                                            </Col>
                                            <Col>
                                                {articleData[index]
                                                    ?   <p className="text-center">{articleData[index].sentiment}</p>
                                                    :   ""
                                                }
                                            </Col>
                                        </Row>
                                    </Popup>
                                </Marker>
                            )
                        })} */}
                    </MapContainer>
                </Col>
            </Row>
        </div>
    )
}

export default MapPopup;