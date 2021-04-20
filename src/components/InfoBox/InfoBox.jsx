import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import './InfoBox.css';

const InfoBox = ({ countryInfo }) => {
    return (
        <div className="app__stats">
            <Card style={{ margin: 'auto', marginTop: '0.7rem' }}>
                <CardContent>
                    <Typography className="infoBox__title" color="textSecondary">
                        CoronaVirus cases
                    </Typography>

                    <h2 className="infoBox__cases">{countryInfo.todayCases}</h2>

                    <Typography className="infoBox__total" color="textSecondary">
                        Total: {countryInfo.cases}
                    </Typography>
                </CardContent>
            </Card>
            <Card style={{ margin: 'auto', marginTop: '0.7rem' }}>
                <CardContent>
                    <Typography className="infoBox__title" color="textSecondary">
                        CoronaVirus Recovered
                    </Typography>

                    <h2 className="infoBox__cases">{countryInfo.todayRecovered}</h2>

                    <Typography className="infoBox__total" color="textSecondary">
                    Total: {countryInfo.recovered}
                    </Typography>
                </CardContent>
            </Card>
            <Card style={{ margin: 'auto', marginTop: '0.7rem' }}>
                <CardContent>
                    <Typography className="infoBox__title" color="textSecondary">
                        CoronaVirus Deaths
                    </Typography>

                    <h2 className="infoBox__cases">{countryInfo.todayDeaths}</h2>

                    <Typography className="infoBox__total" color="textSecondary">
                    Total: {countryInfo.deaths}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default InfoBox;