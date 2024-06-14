import {useStyles} from "./styles";
import {useState, useEffect, useContext} from "react";
import httpRequest from "../../httpRequest";
import userContext from "../../context/user-context";
import {Button} from "@mui/material";

const Group = (props) => {
    const classes = useStyles();
    const groupData = props.dataFromDB;

    const [currentGroup, setCurrentGroup] = useState(false);
    const userContextData = useContext(userContext);

    useEffect(() => {
        (async () => {
            try {
                const response = await httpRequest.get("http://localhost:5000/get-group-invoices", {
                    group_id: groupData.id,
                });
                console.log("This is the response: ", response.data.invoices);
            } catch (error) {
                if (error.response.status === 401) {
                    alert("You are not authorized to perform this action.");
                }
            }
        })();
    }, []);
        

    useEffect(() => {
        if(userContextData.currentGroup) {
            if(userContextData.currentGroup.id === groupData.id) {
                setCurrentGroup(true);
            } else {
                setCurrentGroup(false);
            }
        }
    }, [userContextData.currentGroup]);

    const setCurrentGroupActive = async () => {
        setCurrentGroup(true);
        userContextData.setCurrentGroup(groupData);
        try {
            const response = await httpRequest.post("http://localhost:5000/current-group",
                {
                    group_id: groupData.id,
                }
            );
        } catch (error) {
            if (error.response.status === 401) {
                alert("You are not authorized to perform this action.");
            }
        }
    };

    const deactivateCurrentGroup = async () => {
        setCurrentGroup(false);
        userContextData.setCurrentGroup(null);
        try {
            const response = await httpRequest.post("http://localhost:5000/deactivate-current-group",
                {
                    group_id: groupData.id,
                }
            );
        } catch (error) {
            if (error.response.status === 401) {
                alert("You are not authorized to perform this action.");
            }
        }
    }
    
    console.log("This is the groupdata: ", groupData);

    return (
        <div className={classes.rootContainer}>
            {currentGroup && (
                <Button onClick={deactivateCurrentGroup} variant="contained" color="secondary">
                    Deactivate
                </Button>
            )}
            {!currentGroup && (
                <Button onClick={setCurrentGroupActive} variant="contained" color="primary">
                    Set as current group
                </Button>
            
            )}
            <h1>{groupData.name}</h1>
            <h3>Invite code: {groupData.invite_code}</h3>
         </div>
    );
};

export default Group;