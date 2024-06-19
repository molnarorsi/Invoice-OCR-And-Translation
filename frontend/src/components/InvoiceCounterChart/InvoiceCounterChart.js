import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import httpRequest from "../../httpRequest";

const InvoiceCountChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await httpRequest.get("http://localhost:5000/invoice-count-over-time");
                const chartData = Object.entries(response.data).map(([key, value]) => ({ name: key, count: value }));
                setData(chartData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
      <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
              top: 50, right: 30, left: 20, bottom: 50,
          }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#C5C6C7" />
        <XAxis dataKey="name" stroke="#C5C6C7" padding={{ left: 30, right: 30 }} />
        <YAxis stroke="#C5C6C7" />
        <Tooltip 
            wrapperStyle={{ backgroundColor: "#f0f0f0" }} 
            labelStyle={{ color: "#000000" }} 
            itemStyle={{ color: "#8884d8" }} 
        />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
        <Line type="monotone" dataKey="count" name="Invoice count over time" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    );
};

export default InvoiceCountChart;