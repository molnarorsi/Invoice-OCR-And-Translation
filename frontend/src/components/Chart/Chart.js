import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {Paper, Tooltip as MuiTooltip} from "@mui/material";
import {useStyles} from "./styles";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useEffect, useState} from 'react';
import httpRequest from "../../httpRequest";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

const Chart = ({handleCloseChart, invoice_id}) => {
    const classes = useStyles();
    ChartJS.register(ArcElement, Tooltip, Legend);
    const [recognition, setRecognition] = useState(null);
    const [parsing, setParsing] = useState(null);
    const [other, setOther] = useState(null);
    const [score, setScore] = useState(null);
    const [ocrMethod, setOcrMethod] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await httpRequest.post("http://localhost:5000/get-performance-data", {
                    invoice_id: invoice_id,    
                },
            );
            setRecognition(response.data.rect_time);
            setParsing(response.data.parse_time);
            setOther(response.data.other_time);
            setScore(response.data.avg_score);
            setOcrMethod(response.data.ocr_method);
            } catch (error) {
                console.log("Error!");
            }
        };
        fetchData();
    }, [invoice_id]);

    let data = "";
    if (recognition) {
    data = {
            labels: ["Recognition", "Parsing", "Other"],
            datasets: [
                {
                    label: "Time",
                    data: [recognition, parsing, other],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    borderWidth: 1,
                },
            ],
        };

    }

    const handleChartOpen = () => {
        handleCloseChart(false);
    };

    return (
        <>

        <div className={classes.center}>
            <Paper elevation={3} sx={{pl: 15, pr: 15, pt: 2, pb: 10, borderRadius: 10, textAlign: "left"}}>
                {recognition ? (
                    <>
                    <div className={classes.titleContainer}>
                        <IconButton onClick={handleChartOpen}>
                            <ArrowBackIcon />
                        </IconButton>
                        <h4 className={classes.title}>Performance Chart of {ocrMethod}</h4>
                        <MuiTooltip title = "Tesseract and DocTROCR score represents different metrics and are calculated using different methods">
                            <PriorityHighIcon className={classes.icon}/>
                        </MuiTooltip>
                    </div>
                    <div className={classes.chartContainer}>
                        <Doughnut data={data}/>
                    </div>
                    {ocrMethod === "Tesseract" ? (
                        <MuiTooltip title="Percentage indicating confidence in the OCR result.">
                            <p className={classes.centerScore}>{score.toFixed(2)}%</p>
                        </MuiTooltip>
                    ) : (
                        <MuiTooltip title="Recognition score is calculated based on the number of correct words in the recognized text.">
                            <p className={classes.centerScore}>{score.toFixed(2)}%</p>
                        </MuiTooltip>
                    
                    )}
                    
                    <p className={classes.paragraph}>
                            Total invoice processing time:{" "}
                            <strong>
                                {recognition && (recognition + parsing + other).toFixed(2)}s
                            </strong>
                    </p>
                 </>
                ) : (
                    <p className={classes.centerText}> No data available! </p>
                )} 
            </Paper>
        </div>
        </>
    );
};

export default Chart;