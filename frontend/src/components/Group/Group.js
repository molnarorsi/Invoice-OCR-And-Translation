import {useStyles} from "./styles";
import {useState, useEffect, useContext} from "react";
import httpRequest from "../../httpRequest";
import userContext from "../../context/user-context";
import {Button, Grid} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import GroupInvoiceTable from "../GroupInvoiceTable/GroupInvoiceTable";
import SummaryCard from "../SummaryCard/SummaryCard";

const Group = (props) => {
    const classes = useStyles();
    const groupData = props.dataFromDB;

    const [currentGroup, setCurrentGroup] = useState(false);
    const userContextData = useContext(userContext);

    const[invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState({});
    const [openSummary, setOpenSummary] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await httpRequest.post("http://localhost:5000/get-group-invoices", {
                    group_id: groupData.id,
                });
                setInvoices(response.data.invoices);
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

    const handleOpenSummary = (invoiceData) => {
        console.log("This is the invoice data: ", invoiceData);
        setOpenSummary(true);
        setSelectedInvoice(invoiceData);
    };

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
            <Grid container spacing={3}>
                {!openSummary && (
                    <div className={classes.table}>
                        <GroupInvoiceTable invoiceData={invoices} openSummary={handleOpenSummary}/>
                    </div>
                )}
            </Grid>
            {openSummary && (
                <div>
                    <IconButton onClick={() => setOpenSummary(false)}>
                        <ArrowBackIcon />
                    </IconButton>
                    <SummaryCard dataFromDB={selectedInvoice}/>
                </div>
            )}
         </div>
    );
};

export default Group;