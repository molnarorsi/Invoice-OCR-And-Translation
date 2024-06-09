import httpRequest from "../../httpRequest";
import userContext from "../../context/user-context";
import AppLayout from "../../components/AppLayout/AppLayout";
import {useStyles} from "./styles";
import {useContext, useEffect, useState} from "react";

const UserPage = () => {
    const classes = useStyles();
    const user = useContext(userContext);
    const role = user.role;
    const [userNames, setUserNames] = useState();

    useEffect(() => {
        if (role !=="admin") {
            window.location.href = "/";
        }
    }, [role]);

    useEffect(() => {
        (async () => {
            try {
                const response = await httpRequest.get("http://localhost:5000/@me");
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

    return (
        <>
        <AppLayout userName={userNames}> Handle User Management Here </AppLayout>
        </>
    );
};

export default UserPage;