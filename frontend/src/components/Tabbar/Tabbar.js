import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CleanIcon from "@mui/icons-material/CleaningServices";
import EyeIcon from "@mui/icons-material/RemoveRedEye";
import SummaryIcon from '@mui/icons-material/List';
import {useStyles} from "./styles";
import {Typography} from "@mui/material";

const Tabbar = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(props.pageNumber);
    const navigate = useNavigate();

    const HandleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
        <div className={classes.rootContainer}>
            <Tabs
                className={classes.tabsContainer}
                centered
                value={value}
                onChange={handleChange}
            >
                <Tab
                    onClick={() => navigate("/upload")}
                    sx={{mx:5, p:2}}
                    label={
                        <Typography>
                            <FileUploadIcon/>
                            Upload
                        </Typography>
                    }
                />
                <Tab
                    onClick={() => navigate("/preprocessing")}
                    sx={{ms:5, p:2}}
                    label={
                        <Typography>
                            <CleanIcon/>
                            Preprocess
                        </Typography>
                    }
                />
                <Tab
                    onClick={() => navigate("/ocr")}
                    sx={{mx:5, p:2}}
                    label={
                        <Typography>
                            <EyeIcon/>
                            Ocr
                        </Typography>
                    }
                />
                <Tab
                    onClick={() => navigate("/summary")}
                    sx={{mx:5, p:2}}
                    label={
                        <Typography>
                            <SummaryIcon/>
                            Summary
                        </Typography>
                    }
                />
            </Tabs>
        </div>
        </>
    );
};

export default Tabbar;