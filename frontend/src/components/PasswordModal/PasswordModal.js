import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
  } from "@mui/material";
  import { useState } from "react";
  import httpRequest from "../../httpRequest";
  import { useStyles } from "./styles";
  
  const PasswordModal = ({ open, onClose }) => {
    const classes = useStyles();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const handleClose = () => {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onClose();
    };
  
    const validatePassword = () => {
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return false;
      }
  
      if (newPassword.length < 6) {
        alert("Password must be at least 6 characters long");
        return false;
      }
      return true;
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      if (!validatePassword(newPassword, confirmPassword)) {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        return;
      }
  
      try {
        const resp = await httpRequest.post(
          "http://localhost:5000/modify-password",
          {
            old_password: oldPassword,
            new_password: newPassword,
          }
        );
  
      } catch (error) {
        if (error.resp.status === 401) {
          alert("Invalid credentials");
        }
      }
      handleClose();
    };
  
    return (
      <Dialog open={open} onClose={handleClose} className={classes.dialog}>
        <form onSubmit={handleFormSubmit}>
          <DialogTitle className={classes.title}>Change Password</DialogTitle>
          <DialogContent className={classes.content}>
            <TextField
              autoFocus
              margin="dense"
              label="Old Password"
              type="password"
              fullWidth
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              label="New Password"
              type="password"
              fullWidth
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Confirm Password"
              type="password"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions className={classes.actions}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };
  export default PasswordModal;