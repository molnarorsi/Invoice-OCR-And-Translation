import React, { useState } from "react";
import { Button, Modal, Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import httpRequest from "../../httpRequest";
import { useStyles } from "./styles";

const UserData = ({ users, onUserEdit }) => {
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [search, setSearch] = useState("");

  const handleEdit = (event, user) => {
    if (user.email === "admin@admin.com") {
      return;
    }
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleRoleChange = (event) => setSelectedRole(event.target.value);

  const handleSearchChange = (event) => setSearch(event.target.value);

  const filteredUsers = users.filter((user) => {
    const searchString = search.toLowerCase();
    return (
      user.username.toLowerCase().includes(searchString) ||
      user.email.toLowerCase().includes(searchString) ||
      user.role.toLowerCase().includes(searchString)
    );
  });

  const handleSave = async () => {
    try {
      const resp = await httpRequest.post("http://localhost:5000/manage-users", {
        user_id: selectedUser.id,
        role: selectedRole,
      });
      console.log(resp);
      onUserEdit(selectedUser.id, selectedRole);
    } catch (error) {
      console.log("Error.Problem in updating user role.");
    }
    setShowModal(false);
  };



  const columns = [
    { field: "username", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button variant="text" sx={{fontFamily: "'Staatliches', sans-serif !important", color: "#efb11d !important", backgroundColor: "transparent", border: "2px solid #efb11d !important", borderRadius: "50px !important",}} onClick={(event) => handleEdit(event, params.row)}>
          Edit Role
        </Button>
      ),
    },
  ];

  return (
    <>
      <TextField label="Search Users"  value={search} onChange={handleSearchChange} />
      <DataGrid className={classes.dataGrid} rows={filteredUsers} columns={columns} autoHeight sx={{ backgroundColor: "white", marginBottom: "30px" }} />
      <Modal open={showModal} onClose={handleModalClose}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography variant="h6">Edit Role for {selectedUser?.name}</Typography>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="select-role-label">Role</InputLabel>
            <Select labelId="select-role-label" id="select-role" value={selectedRole} label="Role" onChange={handleRoleChange}>
              <MenuItem value="USER">User</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        </Box>
      </Modal>
    </>
  );
};

export default UserData;