import {useContext, useEffect, useState} from 'react';
import httpReques from '../../httpRequest';
import {useStyles} from './styles';
import AppLayout from '../../components/AppLayout/AppLayout';
import GroupsCard from '../../components/GroupsCard/GroupsCard';

const GroupsPage = () => {
    const classes = useStyles();
    return (
        <>
            <AppLayout>
                <div className={classes.root}>
                    <GroupsCard />
                </div>
            </AppLayout>
        </>
    );
};

export default GroupsPage;
