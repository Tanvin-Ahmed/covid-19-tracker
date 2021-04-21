import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import './InfoBox.css';
import {prettyPrintStat} from '../../util';

const InfoBox = ({ countryInfo, casesType, setCasesType }) => {
    return (
        <div className="app__stats">
            <Card onClick={(e) =>setCasesType('cases')} className={casesType === 'cases' && 'infoBox--orangered'} style={{ margin: 'auto', marginTop: '0.7rem', cursor: 'pointer' }}>
                <CardContent>
                    <Typography className="infoBox__title" color="textSecondary">
                        CoronaVirus cases
                    </Typography>

                    <h2 style={{color: 'orangered'}} className="infoBox__cases">{prettyPrintStat(countryInfo.todayCases)}</h2>

                    <Typography className="infoBox__total" color="textSecondary">
                        Total: {countryInfo.cases}
                    </Typography>
                </CardContent>
            </Card>
            <Card onClick={(e) =>setCasesType('recovered')} className={casesType === 'recovered' && 'infoBox--green'}  style={{ margin: 'auto', marginTop: '0.7rem', cursor: 'pointer' }}>
                <CardContent>
                    <Typography className="infoBox__title" color="textSecondary">
                        CoronaVirus Recovered
                    </Typography>

                    <h2 style={{color: 'lime'}} className="infoBox__cases">{prettyPrintStat(countryInfo.todayRecovered)}</h2>

                    <Typography className="infoBox__total" color="textSecondary">
                    Total: {countryInfo.recovered}
                    </Typography>
                </CardContent>
            </Card>
            <Card onClick={(e) =>setCasesType('deaths')} className={casesType === 'deaths' && 'infoBox--red'} style={{ margin: 'auto', marginTop: '0.7rem', cursor: 'pointer' }}>
                <CardContent>
                    <Typography className="infoBox__title" color="textSecondary">
                        CoronaVirus Deaths
                    </Typography>

                    <h2 className="infoBox__cases">{prettyPrintStat(countryInfo.todayDeaths)}</h2>

                    <Typography className="infoBox__total" color="textSecondary">
                    Total: {countryInfo.deaths}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default InfoBox;