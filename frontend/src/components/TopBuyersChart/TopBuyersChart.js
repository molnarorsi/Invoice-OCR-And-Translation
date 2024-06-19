import React, { useEffect, useState } from 'react';
import { Tooltip, PieChart, Pie, Cell } from 'recharts';
import httpRequest from "../../httpRequest";

const TopBuyersChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await httpRequest.get("http://localhost:5000/top-buyers-by-total-spend");
                const chartData = Object.entries(response.data).map(([buyer_name, total_spend]) => ({ name: buyer_name, total_spend }));
                setData(chartData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    // Colors for the pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div>

            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={({ name, total_spend }) => `${name}: ${total_spend}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="total_spend"
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default TopBuyersChart;