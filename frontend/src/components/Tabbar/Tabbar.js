import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CleanIcon from "@mui/icons-material/CleaningServices";
import EyeIcon from "@mui/icons-material/RemoveRedEye";
import SummaryIcon from '@mui/icons-material/List';
import {useStyles} from "./styles";
import {Typography} from "@mui/material";

const Tabbar = () => {
    const classes = useStyles();
    const [value, setValue] = useState(2);

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
                    sx={{mx:5, p:2}}
                    label={
                        <Typography>
                            <FileUploadIcon/>
                            Upload
                        </Typography>
                    }
                />
                <Tab
                    sx={{ms:5, p:2}}
                    label={
                        <Typography>
                            <CleanIcon/>
                            Preprocess
                        </Typography>
                    }
                />
                <Tab
                    sx={{mx:5, p:2}}
                    label={
                        <Typography>
                            <EyeIcon/>
                            Ocr
                        </Typography>
                    }
                />
                <Tab
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