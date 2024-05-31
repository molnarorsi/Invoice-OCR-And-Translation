import {useContext, useEffect, useState} from 'react';
import httpReques from '../../httpRequest';
import {useStyles} from './styles';
import AppLayout from '../../components/AppLayout/AppLayout';
import GroupsCard from '../../components/GroupsCard/GroupsCard';
import userContext from '../../context/user-context';
import CreateGroupCard from '../../components/CreateGroupCard/CreateGroupCard';
import GroupTabbar from './GroupTabbar/GroupTabbar';

const GroupsPage = () => {
    const classes = useStyles();
    const userCtx = useContext(userContext);
    const role = userCtx.role;

    const [page, setPage] = useState(0);

    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <>
            <AppLayout>
                <GroupTabbar onPageChange={handlePageChange} />
                <div className={classes.root}>
                    {page == 0 && <GroupsCard />}
                    {role === 'admin' &&  page == 1 &&<CreateGroupCard />}
                </div>
            </AppLayout>
        </>
    );
};

export default GroupsPage;
