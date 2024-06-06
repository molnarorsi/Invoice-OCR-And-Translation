import { Button, Paper, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import httpRequest from "../../httpRequest";
import { useState } from "react";
import { useStyles } from "./styles";

const CreateGroupCard = (props) => {
    const classes = useStyles();
    
    const createGroup = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const groupName = data.get("name");
        const groupDescription = data.get("info");

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

    return (
        <>
        <Paper elevation={3} className={classes.paper} sx={{p: 2, borderRadiud: 5}}>
            <Typography variant="h6">Create Group</Typography>
            <br></br>
            <Box component="form" onSubmit={createGroup} className={classes.inputContainer}>
                <TextField id="name" name="name" label="Group Name" variant="outlined" fullWidth sx={{width: "100%"}} size="small" required/>
                <br/>
                <TextField  id="info"
                    name="info"
                    label="Description"
                    variant="outlined"
                    sx={{ mt: 2, width: "100%" }}
                    multiline
                    rows={4}/>
            <br/>
            <Button variant="contained" type="submit" sx={{mt: 2}}>Create Group</Button>
            </Box>
        </Paper>

        </>
    )
};

export default CreateGroupCard;