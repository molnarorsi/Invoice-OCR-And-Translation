import {useContext, useEffect, useState} from 'react';
import httpRequest from '../../httpRequest';
import {useStyles} from './styles';
import AppLayout from '../../components/AppLayout/AppLayout';
import GroupsCard from '../../components/GroupsCard/GroupsCard';
import userContext from '../../context/user-context';
import CreateGroupCard from '../../components/CreateGroupCard/CreateGroupCard';
import GroupTabbar from './GroupTabbar/GroupTabbar';
import Grid from "@mui/material/Grid";
import InvoiceCard from "../../components/InvoiceCard/InvoiceCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Group from '../../components/Group/Group';

const GroupsPage = () => {
    const classes = useStyles();
    const userCtx = useContext(userContext);
    const role = userCtx.role;
    const [page, setPage] = useState(0);
    const [pageName, setPageName] = useState("Groups");
    const [groupData, setGroupData] = useState([]);
    const [isGroupOpen, setIsGroupOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const response = await httpRequest.get("http://localhost:5000/@me");
                userCtx.setUserName(response.data.name);
                userCtx.setEmail(response.data.email);
                userCtx.setRole(response.data.role);
            } catch (error) {
                console.log(error);
                console.log("You are not authenticated!");
                window.location.href = "/login";
            }
        })();
    }, [page]);

    useEffect(() => {
    (async () => {
        try {
            const response = await httpRequest.get("http://localhost:5000/get-group");
            console.log(response.data.groups);
        }
        catch (error) {
            console.log(error);
        }
    })();
    }, []);

    const handlePageChange = (page, name) => {
        setPage(page);
        setPageName(name);
        setIsGroupOpen(false);
    };

    const openGroup = (groupData) => {
        setIsGroupOpen(true);
        setSelectedGroup(groupData);
    }

    return (
        <>
            <AppLayout>
                <GroupTabbar onPageChange={handlePageChange} activePage={page}/>
                {!isGroupOpen && (
                    <div>
                        <Grid container spacing={2}>
                            {pageName == "Groups" && 
                            groupData && groupData.map((groupData) => (
                                <Grid key={groupData.id} item md = {3}>
                                    <div onClick={() => openGroup(groupData)}>
                                        <InvoiceCard data={groupData.name}/>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                        <div className={classes.card}>
                            {pageName == "Join" && (
                                <GroupsCard onPageChange={handlePageChange}/>
                            )}
                            {role == "admin" && pageName == "Create" && (
                                <CreateGroupCard onPageChange={handlePageChange}/>
                            )}
                        </div>{" "}
                    </div>
                )}
                {isGroupOpen && (
                    <div>
                        <IconButton onClick={() => setIsGroupOpen(false)}>
                            <ArrowBackIcon/>
                        </IconButton>
                        <Group dataFromDB={selectedGroup}/>
                    </div>
                )}
            </AppLayout>
        </>
    );
};

export default GroupsPage;
