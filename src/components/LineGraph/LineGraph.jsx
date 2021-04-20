import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

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


const LineGraph = ({ casesType = 'cases' }) => {
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
        await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(res => res.json())
            .then(data => {
                const chartData = buildChartData(data, casesType);
                setData(chartData);
            })
            .catch(err => console.log(err));
    }, [casesType])



    return (
        <div style={{marginTop: '2rem'}}>
            <h3 style={{color: 'red'}}>Cases Chart</h3>
            {data?.length > 0 && <Line
                options={options}
                data={{
                    datasets: [{
                        backgroundColor: 'rgba(204, 16, 52, 0.5)',
                        borderColor: '#CC1034',
                        data: data
                    }]
                }}
            />}
        </div>
    );
};

export default LineGraph;