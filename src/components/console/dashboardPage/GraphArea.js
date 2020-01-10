import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
  } from 'recharts';

const GraphArea = props => {

    const data = [
        {
          name: 'Sunday', Visitors: 0,
        },
        {
          name: 'Monday', Visitors: 21,
        },
        {
          name: 'Tuesday', Visitors: 90,
        },
        {
          name: 'Wednessday', Visitors: 20,
        },
        {
          name: 'Thursday', Visitors: 81,
        },
        {
          name: 'Friday', Visitors: 25,
        },
        {
          name: 'Saturday', Visitors: 0,
        },
      ];

  return (
    <div>
        <div className='console-graph-area'>
        <div className='console-graph-header'>
        <p>Visitors</p>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', fontSize: '12px', color: '#253061', width: '300px'}}>
            <p>Past Week</p>
            <p>Past Month</p>
            <p>Past Year</p>
        </div>
        </div>
       
        <LineChart
        width={1000}
        height={400}
        data={data}
        margin={{
          top: 20, right: 50, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine x="Tuesday" stroke="red" label="Highest Number of Visitors" />
        <ReferenceLine y={90} label="Max" stroke="red" />
        <Line type="monotone" dataKey="Visitors" stroke="#8884d8" />
      </LineChart>

      </div>
    </div>
  )
}

export default GraphArea;
