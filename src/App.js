import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import COVIDMap from './components/COVIDMap/COVINMap';
import InfoBox from './components/InfoBox/InfoBox';
import Table from './components/Table/Table';
import { sortData } from './util';
import LineGraph from './components/LineGraph/LineGraph';
import 'leaflet/dist/leaflet.css';
import logo from './img/SARS-CoV-2_without_background-min.png';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');


  useEffect(async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
      .then(res => res.json())
      .then(data => {
        const countries = data.map(country => ({
          name: country.country,
          value: country.countryInfo.iso2
        }));
        setMapCountries(data);
        const sortedData = sortData(data);
        setCountries(countries);
        setTableData(sortedData);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(async () => {
    await fetch('https://disease.sh/v3/covid-19/all')
      .then(res => res.json())
      .then(data => {
        setCountryInfo(data);
      })
      .catch(err => console.log(err));
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(res => res.json())
      .then(data => {
        setMapCenter(countryCode === 'worldwide' ? [34.80746, -40.4796] : [data.countryInfo.lat, data.countryInfo.long]);
        setCountry(countryCode);
        setCountryInfo(data);
        setMapZoom(6);
      })
      .catch(err => console.log(err));
  }


  return (
    <div className="covid__tracker">
      <div className="app">
        <div style={{ flex: 0.9 }} className="app_left">
          <div className="app__header">
            <div className="app__headerLeft">
              <img className="logo" src={logo} alt="" />
              <h1 className="app__headline" style={{ color: 'red' }}>COVID-19 TRACKER</h1>
            </div>
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                value={country}
                onChange={onCountryChange}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {
                  countries.map(country => <MenuItem value={country.value}>{country.name}</MenuItem>)
                }
              </Select>
            </FormControl>
          </div>
          <div>
            <InfoBox key={countryInfo?.countryInfo?._id} countryInfo={countryInfo} casesType={casesType} setCasesType={setCasesType} />
          </div>
          <div style={{marginTop:'1rem', textAlign:'center', color:'gray'}} className="notice"><h3>Everyday report publish at 6:30PM-7:30PM</h3></div>
          <COVIDMap casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
        </div>
        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <br />
            <Table countries={tableData} />
            <div className="app__graph">
              <LineGraph country={country} casesType={casesType} />
            </div>
          </CardContent>
        </Card>
      </div>
      <footer style={{textAlign: 'center', margin: '1.5rem 0'}}>
        <h5>&copy; by <span style={{color: 'orangered'}}>Tanvin Ahmed</span> {new Date().getFullYear()}. All rights reserved.</h5>
      </footer>
    </div>
  );
}

export default App;
