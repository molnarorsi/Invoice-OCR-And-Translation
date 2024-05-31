import {useContext, useEffect, useState} from 'react';
import httpReques from '../../httpRequest';
import {useStyles} from './styles';
import AppLayout from '../../components/AppLayout/AppLayout';

const GroupsPage = () => {
    const classes = useStyles();
    return (
        <>
            <AppLayout></AppLayout>
        </>
    );
};

export default GroupsPage;
