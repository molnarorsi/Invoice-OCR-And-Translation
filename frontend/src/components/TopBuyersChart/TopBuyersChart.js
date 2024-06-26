import React, { useEffect, useState } from 'react';
import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import httpRequest from "../../httpRequest";

const TopBuyersChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await httpRequest.get("http://localhost:5000/top-buyers-by-total-spend");
                const chartData = Object.entries(response.data).map(([buyer_name, total_spend]) => ({ name: buyer_name, value: total_spend }));
                setData(chartData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    // Enhanced color scheme for better visual appeal
    const COLORS = ['#2ca02c', '#d62728', '#9467bd', '#ff7f0e', '#1f77b4'];

    // Custom tooltip content
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <p className="label">{`${payload[0].name} : $${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={800}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${value}`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={200}
                    animationDuration={800}
                    isAnimationActive={true}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default TopBuyersChart;