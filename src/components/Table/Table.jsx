import React from 'react';
import './Table.css';
import numeral from 'numeral';

const Table = ({ countries }) => {
    return (
        <div className="table">
            <tr style={{backgroundColor: 'red', color: 'white'}}>
                <td><strong>Country</strong></td>
                <td><strong>Total Case</strong></td>
            </tr>
            {
                countries.map(({ country, cases }) => (
                    <tr>
                        <td>{country}</td>
                        <td>
                            <strong>{numeral(cases).format('0,0')}</strong>
                        </td>
                    </tr>
                ))
            }
        </div>
    );
};

export default Table;