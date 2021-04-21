import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';


const casesTypeColors = {
    cases: {
        hex: '#FFAD3F',
        rgb: 'rgb(255, 153, 17)',
        multiplier: 250,
    },
    recovered: {
        hex: '#71D640',
        rgb: 'rgb(125, 215, 29)',
        multiplier: 250,
    },
    deaths: {
        hex: '#FE0C0C',
        rgb: 'rgb(254, 89, 89)',
        multiplier: 1500,
    },
};


export const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1)
}

export const prettyPrintStat = (stat) => stat ? `+${numeral(stat).format('0.0a')}` : '+0';

// Drow circles on the map with interactive tooltips
export const showDataOnMap = (data, casesType = 'cases') => {
    return data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={{color: casesTypeColors[casesType].hex, fillColor: casesTypeColors[casesType].rgb}}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="info-container">
                    <div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: {numeral(country.cases).format('0,0')}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format('0,0')}</div>
                    <div className="info-deaths">Deaths: {numeral(country.deaths).format('0,0')}</div>
                </div>
            </Popup>
        </Circle>
    ))
}