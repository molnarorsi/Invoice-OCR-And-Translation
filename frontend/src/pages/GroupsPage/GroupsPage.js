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

const GroupsPage = () => {
    const classes = useStyles();
    const userCtx = useContext(userContext);
    const role = userCtx.role;
    const [page, setPage] = useState("");
    const [groupData, setGroupData] = useState([]);

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

    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <>
            <AppLayout>
                <GroupTabbar onPageChange={handlePageChange} activePage={page}/>
                <Grid container spacing={2}>
                    {page == "Groups" && groupData && groupData.map((groupData) => (
                        <Grid key={groupData.id} item md={4}>
                            <div>
                                <InvoiceCard data={groupData.name}/>
                            </div>
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.card}>
                    {page == "Join" && <CreateGroupCard/>}
                    {role == "admin" && page == "Create" && (
                        <CreateGroupCard onPageChange={handlePageChange}/>
                    )}
                </div>
            </AppLayout>
        </>
    );
};

export default GroupsPage;
