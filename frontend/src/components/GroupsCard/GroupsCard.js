import {Button, Paper, Typography, TextField} from "@mui/material";
import {useState} from "react";
import {useStyles} from "./styles";

const GroupsCard = () => {
    const classes = useStyles();
    const [groupCode, setGroupCode] = useState("");
    const joinGroup = () => {
        console.log(groupCode);
    }

    const handleChange = (event) => {
        setGroupCode(event.target.value);
    }

    return (
        <Paper className={classes.card} elevation={3} sx={{ p: 2, borderRadius: 5 }}>
            <Typography variant="h6" gutterBottom>Join a group</Typography>
            <TextField
                label="Group code"
                value={groupCode}
                onChange={handleChange}
                variant="standard"
                fullWidth
            />
            <Button variant="contained" color="primary" onClick={joinGroup} className={classes.button}>Join</Button>
        </Paper>
    );
};

export default GroupsCard;