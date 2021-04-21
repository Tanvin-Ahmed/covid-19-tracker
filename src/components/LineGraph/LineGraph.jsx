import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './Linegraph.css';

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0
        },
    },
    maintainAspectRatio: false,
    tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: (tooltipItem, data) => {
                return numeral(tooltipItem.value).format('+0,0');
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    format: 'MM/DD/YY',
                    tooltipFormat: 'll',
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: (value, index, values) => {
                        return numeral(value).format('0a');
                    },
                },
            },
        ],
    },
}


const LineGraph = ({ country, casesType = 'cases' }) => {
    const [data, setData] = useState({});


    const buildChartData = (data, casesType = 'cases') => {
        const chartData = [];
        let lastDataPoint;
        for (let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }


    useEffect(async () => {
        if (country === 'worldwide') {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const chartData = buildChartData(data, casesType);
                    setData(chartData);
                })
                .catch(err => console.log(err));
        } else {
            await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`)
                .then(res => res.json())
                .then(data => {
                    const chartData = buildChartData(data?.timeline, casesType);
                    setData(chartData);
                })
                .catch(err => console.log(err));
        }
    }, [casesType, country])



    return (
        <div style={{ marginTop: '2rem', height: '300px', padding: '1rem' }}>
            <h3 className={`graph--headline ${(casesType === 'cases' && 'cases--headline') || (casesType === 'recovered' && 'recovered--headline') || (casesType === 'deaths' && 'deaths--headline')}`}>{`${country}  ${casesType}`}</h3>
            {data?.length > 0 && <Line
                options={options}
                data={{
                    datasets: [{
                        backgroundColor: (casesType === 'cases' && '#ffc46b70') || (casesType === 'recovered' && '#b6ff8891') || (casesType === 'deaths' && '#fa5959ab'),
                        borderColor: (casesType === 'cases' && '#FF9900') || (casesType === 'recovered' && '#62FE00') || (casesType === 'deaths' && '#FF0000'),
                        data: data
                    }]
                }}
            />}
        </div>
    );
};

export default LineGraph;