import { useState, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import EyeIcon from "@mui/icons-material/RemoveRedEye";
import SummaryIcon from '@mui/icons-material/List';
import {useStyles} from "./styles";
import {Typography} from "@mui/material";
import OCRContext from "../../context/ocr-context";
import SpellcheckIcon from '@mui/icons-material/Spellcheck';

const Tabbar = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const ocrCtx = useContext(OCRContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        ocrCtx.setActivePage(newValue);
    };

    return (
        <>
        <div className={classes.rootContainer}>
            <Tabs
                className={classes.tabsContainer}
                centered
                value={ocrCtx.activePage}
                onChange={handleChange}
            >
                <Tab
                    sx={{mx:5, p:2}}
                    label={
                        <Typography className={classes.typography}>
                            <FileUploadIcon/>
                            Upload
                        </Typography>
                    }
                />
                <Tab
                    sx={{ms:5, p:2}}
                    label={
                        <Typography className={classes.typography}>
                            <SpellcheckIcon/>
                            Preprocess
                        </Typography>
                    }
                />
                <Tab
                    sx={{mx:5, p:2}}
                    label={
                        <Typography className={classes.typography}>
                            <EyeIcon/>
                            Ocr
                        </Typography>
                    }
                />
                <Tab
                    sx={{mx:5, p:2}}
                    label={
                        <Typography className={classes.typography}>
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