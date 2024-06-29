import React, {useContext, useState, useEffect} from 'react';
import userContext from '../../context/user-context';
import {Avatar, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField, Typography} from '@mui/material';
import {useStyles} from './styles';
import AppLayout from '../../components/AppLayout/AppLayout';
import httpRequest from '../../httpRequest';

const ProfilePage = () => {
    const classes = useStyles();
    const user = useContext(userContext);
    const [userName, setUserName] = useState(user.userName);
    const [email, setEmail] = useState(user.email);
    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [currentGroup, setCurrentGroup] = useState("");


    const validateEmail = (event) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const email = event.target.value;
        if (!emailRegex.test(email) && email.length > 0) {
          setEmailValid(false);
        } else {
          setEmailValid(true);
        }
    };

    const handleSaveChanges = async () => {
        if (emailValid) {
          user.setUserName(userName);
          user.setEmail(email);
          setEditName(false);
          setEditEmail(false);
          setSnackbarOpen(true);
          setDialogOpen(false);
          await updateChanges(userName, email);
        } else {
          alert("Invalid email format");
        }
    };

    useEffect(() => {
        setUserName(user.userName);
        setEmail(user.email);
        if(user.currentGroup) {
            setCurrentGroup(user.currentGroup);
        }
        if(user.currentGroup) {
            setCurrentGroup(user.currentGroup);
        }
    }, [user.userName, user.email]);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleEditName = (event) => {
        setUserName(event.target.value);
    };

    const handleEditEmail = (event) => {
        setEmail(event.target.value);
        validateEmail(event);
    };

    const handleNameEditClick = () => {
        setEditName(true);
    };

    const handleEmailEditClick = () => {
        setEditEmail(true);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const updateChanges = async (name, email) => {
        try {
            const response = await httpRequest.post("http://localhost:5000/update-users", {
                name: userName,
                email: email,
            });
        } catch (error) {
            if(error.response.status === 400) {
                alert("Invalid email format");
            }
        }
        
    };

    return (
        <AppLayout>
        <Container className={classes.container}>
            <Typography sx={{fontFamily: "Staatliches', sans-serif !important"}}> Your Profile </Typography>
            <Card  sx={{backgroundColor: "#d6536d"}}>
                <CardContent sx={{justifyContent: "space-between"}}>
                    <Avatar className={classes.avatar}>{userName.charAt(0).toUpperCase()}</Avatar>
                    {!editName && (
                        <div className={classes.profile} sx={{fontFamily: "'Staatliches', sans-serif !important",}}>
                            <Typography sx={{fontFamily:"'Staatliches', sans-serif !important"}}>Username: {userName}</Typography>
                            <Button variant="outlined" sx={{color: '#efb11d !important',border: '2px solid #efb11d !important', borderRadius: '50px !important',}} onClick={handleNameEditClick}>Edit Username</Button>
                        </div>
                    )}
                    {editName && (
                        <TextField
                            className={classes.textField}
                            label="Username"
                            variant="outlined"
                            value={userName}
                            onChange={handleEditName}
                            fullWidth
                            sx={{fontFamily: "'Staatliches', sans-serif !important",}}
                        />
                    )}
                    {!editEmail && (
                        <div className={classes.profile} sx={{fontFamily: "'Staatliches', sans-serif !important",}}>
                            <Typography sx={{fontFamily:"'Staatliches', sans-serif !important"}}>Email: {email}</Typography>
                            <Button variant="outlined" sx={{color: '#efb11d !important',border: '2px solid #efb11d !important', borderRadius: '50px !important',}} onClick={handleEmailEditClick}>Edit Email</Button>
                        </div>
                    )}
                    {editEmail && (
                        <TextField
                            className={classes.textField}
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={handleEditEmail}
                            fullWidth
                            sx={{fontFamily: "'Staatliches', sans-serif !important",}}
                        />
                    )}
                    <div className={classes.profile}>
                        <div>Active Group: {currentGroup.name}</div>
                    </div>
                    <Button className={classes.button} variant="text" onClick={handleDialogOpen}>Save Changes</Button>
                </CardContent>
            </Card>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Changes Saved Successfully"
            />
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle sx={{fontFamily: "'Staatliches', sans-serif !important",}}>Save Changes?</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{fontFamily: "'Staatliches', sans-serif !important"}}>Are you sure you want to save the changes?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.button} onClick={handleDialogClose}>Cancel</Button>
                    <Button className={classes.button} onClick={handleSaveChanges}>Save</Button>
                </DialogActions>
            </Dialog>
            
        </Container>
        </AppLayout>
    );
};

export default ProfilePage;