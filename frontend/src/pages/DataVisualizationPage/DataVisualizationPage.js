import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import httpRequest from "../../httpRequest";
import InvoiceCountChart from '../../components/InvoiceCounterChart/InvoiceCounterChart';
import AppLayout from '../../components/AppLayout/AppLayout';

const DataVisualizationPage = () => {
    return (
        <AppLayout>
            <h1>Data Visualization</h1>
            <InvoiceCountChart />
        </AppLayout>
    );

};
export default DataVisualizationPage;