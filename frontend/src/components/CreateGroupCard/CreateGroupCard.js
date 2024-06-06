import { Button, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import httpRequest from "../../httpRequest";
import { useState } from "react";
import { useStyles } from "./styles";

const CreateGroupCard = () => {
    const classes = useStyles();
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    const createGroup = async () => {
        console.log("Group name:", groupName);
        console.log("Group description:", groupDescription);
        try {
            const response = await httpRequest.post("http://localhost:5000/create_group", {
                name: groupName,
                description: groupDescription
            });
            console.log(response);
        } catch (error) {
           if (error.response.status === 401) {
               console.log("Unauthorized");
           }
           if (error.response.status === 400) {
                console.log("Bad request. Name is required");
           }
        }
    };

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };

    const handleGroupDescriptionChange = (event) => {
        setGroupDescription(event.target.value);
    };

    return (
        <>
        <Paper elevation={3} className={classes.paper} sx={{p: 2, borderRadiud: 5}}>
            <Typography variant="h6">Create Group</Typography>
            <br></br>
            <div className={classes.inputContainer}>
                <TextField id="outlined-basic" label="Group Name" variant="outlined" fullWidth onChange={handleGroupNameChange} sx={{width: "100%"}} size="small" value={groupName}/>
                <br/>
                <TextField  id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    sx={{ mt: 2, width: "100%" }}
                    multiline
                    rows={4}
                    value={groupDescription}
                    onChange={handleGroupDescriptionChange}/>
            </div>
            <br/>
            <Button variant="contained" color="primary" onClick={createGroup}>Create Group</Button>
        </Paper>

        </>
    )
};

export default CreateGroupCard;