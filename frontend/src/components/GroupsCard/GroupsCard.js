import {Button, Paper, Typography, TextField} from "@mui/material";
import {useState} from "react";
import {useStyles} from "./styles";
import httpRequest from "../../httpRequest";

const GroupsCard = (props) => {
    const classes = useStyles();
    const [groupCode, setGroupCode] = useState("");


    const joinGroup = async () => {
        console.log(groupCode);
        try {
            const response = await httpRequest.post("http://localhost:5000/join-group",
                {
                    code: groupCode,
                }
            );
            console.log("This is the code: $groupCode", groupCode);
            console.log(response);
            
            const status = response.status;
            if(status === 200) {
                props.onPageChange(0, "Groups");
            }
        }
        catch (error) {
            if(error.response.status === 401) {
                alert("Unauthorized access. Please login to join a group.");
            }
            if(error.response.status === 404) {
                alert("Group not found.");
            }
        }
    }

    const handleChange = (event) => {
        setGroupCode(event.target.value);
    }

    return (
        <Paper className={classes.card} elevation={3} sx={{ p: 2, borderRadius: 5, backgroundColor: "#d6536d", }}>
            <Typography variant="h6" gutterBottom>Join a group</Typography>
            <TextField
                label="Group code"
                value={groupCode}
                onChange={handleChange}
                variant="standard"
                fullWidth
                sx={{fontFamily: "'Staatliches', sans-serif !important"}}
            />
            <Button variant="text" sx={{fontFamily: "'Staatliches', sans-serif !important",color: "#efb11d !important", backgroundColor: "transparent", border: "2px solid #efb11d !important",}} onClick={joinGroup} className={classes.button}>Join</Button>
        </Paper>
    );
};

export default GroupsCard;