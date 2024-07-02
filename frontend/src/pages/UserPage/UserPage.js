import httpRequest from "../../httpRequest";
import userContext from "../../context/user-context";
import AppLayout from "../../components/AppLayout/AppLayout";
import {useStyles} from "./styles";
import {useContext, useEffect, useState} from "react";
import UserData from "../../components/UserData/UserData";

const UserPage = () => {
    const classes = useStyles();
    const user = useContext(userContext);
    const role = user.role;
    const [userNames, setUserNames] = useState();
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState({});

    useEffect(() => {
        (async () => {
            if(role !== "admin") {
                window.location.href = "/";
            }
            else {
                try {
                    const response = await httpRequest.get("http://localhost:5000/get-users");
                    console.log(response.data);
                    setUsers(response.data.users);
                } catch (error) {
                    console.error("Error: Not authorized");
                    window.location.href = "/login";
                }
            }
        })();
    }, [role, editUser]);

    useEffect(() => {
        (async () => {
            try {
                const response = await httpRequest.get("http://localhost:5000/@");
                user.setUserName(response.data.userName);
                user.setEmail(response.data.email);
                user.setRole(response.data.role);
                setUserNames(response.data.userName);
            } catch (error) {
                console.error("Error: Not authorized");
                window.location.href = "/login";
            }
        })();
    }, []);

    const handleUserEdit = (editUserId, editUserRole) => {
        console.log("Edit successfull!");
        setEditUser({editUserId, editUserRole});
    };

    return (
        <>
        <AppLayout userName={userNames}> 
            <div className={classes.rootContainer}>
                <UserData users={users} onUserEdit={handleUserEdit}/>
            </div>
        </AppLayout>
        </>
    );
};

export default UserPage;