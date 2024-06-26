import { Button, Paper, Box, Snackbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import httpRequest from "../../httpRequest";
import { useState } from "react";
import { useStyles } from "./styles";

const CreateGroupCard = (props) => {
    const classes = useStyles();
    
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const createGroup = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const groupName = data.get("name");
        const groupDescription = data.get("info");

        try {
            const response = await httpRequest.post("http://localhost:5000/create-groups", {
                name: groupName,
                info: groupDescription
            });
            if (response.status === 201) {
                setSnackbarMessage('Group created successfully!');
                setOpenSnackbar(true);
                props.onPageChange(0, "Groups");
            }
        } catch (error) {
           if (error.response.status === 401) {
               console.log("Unauthorized");
           }
           if(error.response.status === 400) {
            setSnackbarMessage('Name is required.');
            setOpenSnackbar(true);
            }
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
        <Paper elevation={3} className={classes.paper} sx={{p: 2, borderRadius: 5}}>
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
            <Button className={classes.createButton}variant="text" type="submit" sx={{mt: 2}}>Create Group</Button>
            </Box>
        </Paper>
        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
        </>
    )
};

export default CreateGroupCard;