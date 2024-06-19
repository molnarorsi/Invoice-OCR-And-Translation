import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import httpRequest from "../../httpRequest";
import InvoiceCountChart from '../../components/InvoiceCounterChart/InvoiceCounterChart';
import TopBuyersChart from '../../components/TopBuyersChart/TopBuyersChart';
import AppLayout from '../../components/AppLayout/AppLayout';
import {useStyles} from "./styles";

const DataVisualizationPage = () => {
    const classes = useStyles();
    return (
        <AppLayout>
            <div className={classes.chartContainer}>
                <InvoiceCountChart />
                <TopBuyersChart />
            </div>
        </AppLayout>
    );

};
export default DataVisualizationPage;