import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

const NewsDisplay = (url) => {
   
    setTimeout(function () {
        window.dispatchEvent(new Event("resize"));
     }, 500);

    const position = [42.698334, 23.319941]

    return (
        <div>
            <MapContainer style={{ width: "60%", height: "60vh", marginLeft:290 }} center={position} zoom={9}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                <Marker position={position}  icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
        
    )
}

export default NewsDisplay;