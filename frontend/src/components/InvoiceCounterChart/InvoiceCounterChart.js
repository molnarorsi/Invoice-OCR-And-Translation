import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
      <ResponsiveContainer width="100%" height={800}>
        <LineChart
            data={data}
            margin={{
                top: 50, right: 30, left: 20, bottom: 50,
            }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#EDEDED" />
          <XAxis dataKey="name" stroke="#666" padding={{ left: 30, right: 30 }} />
          <YAxis stroke="#666" />
          <Tooltip 
              wrapperStyle={{ backgroundColor: "#ffffff", borderColor: "#cccccc" }} 
              labelStyle={{ color: "#000000" }} 
              itemStyle={{ color: "#007bff" }} 
          />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          <Line type="monotone" dataKey="count" name="Invoice count over time" stroke="#007bff" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
};

export default InvoiceCountChart;