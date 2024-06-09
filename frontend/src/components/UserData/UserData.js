import {useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {Button, Typography, Box, Modal, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import {useStyles} from "./styles";

function EditRoleModal({open, onClose, user, onSave}) {
    const [selectedRole, setSelectedRole] = useState("");
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleSave = () => {
        onSave(selectedRole);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, boerderRadius: 2}}>
                <Typography variant="h6">Edit {user?.name}'s Role</Typography>
                <FormControl fullWidth sx={{my: 2}}>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select labelId="role-select-label" id="role-select" value={selectedRole} label="Role" onChange={handleRoleChange}>
                        <MenuItem value={"admin"}>Admin</MenuItem>
                        <MenuItem value={"admin"}>Owner</MenuItem>
                        <MenuItem value={"user"}>User</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleSave}>Save</Button>
            </Box>
        </Modal>
    );
}

function UserData({users}) {
    const classes = useStyles();
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleEdit = (user) => {
        if(user.email === "admin@admin.com") {
            alert("Cannot edit admin's role");
            return;
        }
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSave = (role) => {
        console.log(selectedUser, role);
        setShowModal(false);
    };

    return (
        <>
        <DataGrid className={classes.dataGrid}
            rows={users}
            columns={[
                {field: "name", headerName: "Name", flex: 1},
                {field: "email", headerName: "Email", flex: 1},
                {field: "role", headerName: "Role", flex: 1},
                {field: "actions", headerName: "Actions", flex: 1, 
                    renderCell: (params) => 
                    <Button onClick={() => handleEdit(params.row)}>Edit</Button>
                },
            ]}
            autoHeight
            sx={{backgroundColor: "white", marginBottom: "30px"}}/>

            {selectedUser && (<EditRoleModal className={classes.editRoleModal} open={showModal} onClose={handleModalClose} user={selectedUser} onSave={handleSave} />)}
        </>
    );
}

export default UserData;