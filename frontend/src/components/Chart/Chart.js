import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {Paper} from "@mui/material";
import {useStyles} from "./styles";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Chart = ({handleCloseChart}) => {
    const classes = useStyles();
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ["Recognition", "Parsing", "Other"],
        datasets: [
            {
                label: "Time",
                data: [50, 30, 20],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                borderWidth: 1,
            },
        ],
    };

    const handleChartOpen = () => {
        handleCloseChart(false);
    };

    return (
        <>

        <div className={classes.center}>
            <Paper elevation={3} sx={{pl: 15, pr: 15, pt: 2, pb: 10, borderRadius: 10, textAlign: "left"}}>
                <IconButton onClick={handleChartOpen}>
                    <ArrowBackIcon/>
                </IconButton>
                <div className={classes.chartContainer}>
                    <Doughnut data={data}/>
                </div>
                <p className={classes.centerText}>50%</p>
                <p className={classes.paragraph}>Total time for invoice processing: </p>
            </Paper>
        </div>
        </>
    );
};

export default Chart;