import React, { useState } from 'react';
import { MapContainer as LeafMap, TileLayer } from 'react-leaflet';
import './COVIDMap.css';
import { showDataOnMap } from '../../util'

const COVIDMap = ({ countries, casesType, center, zoom }) => {
    const [map, setMap] = useState(null);
    if (map) {
        map.flyTo(center);
    }
    return (
        <div className="map">
            <LeafMap center={center} zoom={zoom} whenCreated={setMap} scrollWheelZoom={false} >
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, casesType)}
            </LeafMap>
        </div>
    );
};

export default COVIDMap;