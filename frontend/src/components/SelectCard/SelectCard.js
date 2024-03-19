import { Button, Typography } from "@mui/material";
import { useStyles } from "./styles";

const SelectCard = () => {
    const classes = useStyles();

    return (
        <>
        <div className={classes.rootContainer}>
            <Typography variant="h4" sx={{pt: 2}}>
                Upload document here
            </Typography>
            <div className={classes.input}>
                <input
                    type="file"
                    className="form-control"
                />
            </div>
            <Button variant="contained" sx={{margin: "20px", px: "50px"}}>
                Next
            </Button>
        </div>
        </>
    );
};

export default SelectCard;