import React, { useEffect, useState } from 'react';
import httpRequest from "../../httpRequest";
import { Line } from 'react-chartjs-2';
import AppLayout from '../../components/AppLayout/AppLayout';

const DataVisualizationPage = () => {
    const [data, setData] = useState({
        daily: [],
        monthly: [],
        quarterly: [],
        yearly: []
      });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await httpRequest.get("http://localhost:5000/invoice_count_over_time");
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const chartData = {
        labels: Object.keys(data.daily),
        datasets: [
            {
                label: 'Daily Invoice Count',
                data: Object.values(data.daily),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Monthly Invoice Count',
                data: Object.values(data.monthly),
                fill: false,
                backgroundColor: 'rgb(192, 75, 192)',
                borderColor: 'rgba(192, 75, 192, 0.2)',
            },

            {
                label: 'Quarterly Invoice Count',
                data: Object.values(data.quarterly),
                fill: false,
                backgroundColor: 'rgb(192, 192, 75)',
                borderColor: 'rgba(192, 192, 75, 0.2)',
            },

            {
                label: 'Yearly Invoice Count',
                data: Object.values(data.yearly),
                fill: false,
                backgroundColor: 'rgb(192, 192, 75)',
                borderColor: 'rgba(192, 192, 75, 0.2)',
            },
            
        ],
    };

    return (
    <AppLayout>
        <div>
            <h1>Data Visualization</h1>
            <Line data={chartData} />
        </div>
    </AppLayout>
    );
}

export default DataVisualizationPage;
