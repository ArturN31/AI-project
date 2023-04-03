import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import { Row, Col } from "react-bootstrap"


const MapPopup = (articles) => {

    const [coordinates, setCoordinates] = useState([]);
    const [articleTitles, setArticleTitles] = useState([]);
    
    //var coordinates = [];

    const position = [42.683756, 23.378234];

    var geoLocations = [];

    var articleCount = 0;

    useEffect(() => {

        if(articles){
            articleCount = articles.articles.length;
        }
    
        setTimeout(function () {
            window.dispatchEvent(new Event("resize"));
        }, 500);
    
    
        debugger;
        let aritlceTitlesToPush = [];
        if (articleCount > 0) {
            let currentKeyword = null;
            for (let j = 0; j < articles.articles.length; j++) {
                let currentArticle = articles.articles[j];
                for (let k = 0; k < currentArticle.keywords.length; k++) {
                    currentKeyword = currentArticle.keywords[k];
                    if (currentKeyword.name === "glocations") {
                        geoLocations.push(currentKeyword.value)
                        aritlceTitlesToPush.push(currentArticle.headline.main);
                        setArticleTitles(aritlceTitlesToPush);
                        break;
                    }
                }
            }
        }

        let coordinatesToPush = [];
    
        for (let i = 0; i < geoLocations.length; i++) {
            let currentLocationName = geoLocations[i];
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${currentLocationName}.json?proximity=ip&access_token=pk.eyJ1Ijoia2Fsb3lhbjEiLCJhIjoiY2xmZWdzMHRvMDM3bTN2b3puamg2OG51diJ9.nIXZf1IgtvjFbmx3GzcpCQ`;
            
            //put in env
            fetch(url)
                .then(async (response) => {
                    if (!response.ok) { throw response }
                    return await response.json();
                })
                .then((incomingData) => {
                    if (incomingData.features[0].center) {
    
                        let lat = parseFloat(incomingData.features[0].center[0].toFixed(2));
                        let long = parseFloat(incomingData.features[0].center[1].toFixed(2));
                        let fixedCoordinates = [long, lat];
                        coordinatesToPush.push(fixedCoordinates);
                        setCoordinates(coordinatesToPush);
                    }
                })
                .catch((err) => console.error(err));
        }
    }, [articles])
    
    return (

        <div>
            {console.log("gla:" + geoLocations)}
            <Row className="d-flex justify-content-center">
                <Col className="col-18 m-6">
                    <MapContainer style={{ width: "60%", height: "60vh", marginLeft: 290 }} center={position} zoom={9}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {coordinates.length > 0 ? coordinates.map((currentCoordinates, index) =>
                            <Marker position={currentCoordinates} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                <Popup>
                                   {articleTitles[index]}
                                   {/* {console.log("at: " + articleTitles)} */}
                                </Popup>
                            </Marker>
                        ) : ""}
                    </MapContainer>
                </Col>
            </Row>
        </div>
    )
}

export default MapPopup;